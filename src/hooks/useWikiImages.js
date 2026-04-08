import { useState, useEffect, useRef } from "react";
import { IMAGE_OVERRIDES } from "../data/custom-buildings";

export function useWikiImages(buildings) {
  const [images, setImages] = useState({ ...IMAGE_OVERRIDES });
  const [extracts, setExtracts] = useState({});
  const fetched = useRef(new Set());

  useEffect(() => {
    const toF = buildings.filter(b => b.wiki && !fetched.current.has(b.wiki));
    if (!toF.length) return;
    const sm = {};
    toF.forEach(b => { if (!sm[b.wiki]) sm[b.wiki] = []; sm[b.wiki].push(b.id); fetched.current.add(b.wiki); });
    const slugs = Object.keys(sm);

    (async () => {
      const ni = {}, ne = {};
      
      // Standard Wikipedia headers to prevent being blocked as a bot
      const headers = { "Api-User-Agent": "SkylineExplorer/1.0 (Educational Project)" };

      for (let i = 0; i < slugs.length; i += 40) {
        const batch = slugs.slice(i, i + 40);
        try {
          // 1. WIKIPEDIA FETCH
          const r = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(batch.join("|"))}&prop=pageimages|extracts&redirects=1&pithumbsize=500&exintro=1&explaintext=1&format=json&origin=*`, { headers });
          
          // Prevent the SyntaxError by checking if Wikipedia blocked us (429)
          if (!r.ok) {
            console.warn(`Wikipedia Image API skipped batch due to status: ${r.status}`);
            continue; 
          }
          
          const d = await r.json();
          
          const redirectMap = {};
          if (d.query?.redirects) {
             d.query.redirects.forEach(r => { redirectMap[r.to] = r.from; });
          }

          Object.values(d?.query?.pages || {}).forEach(p => {
            const originalTitle = redirectMap[p.title] || p.title;
            const sl = originalTitle.replace(/ /g, "_");
            
            Object.entries(sm).forEach(([os, ids]) => {
              if (sl === os || sl.replace(/_/g, " ").toLowerCase() === os.replace(/_/g, " ").toLowerCase()) {
                ids.forEach(id => {
                  if (p.thumbnail?.source && !IMAGE_OVERRIDES[id]) {
                     ni[id] = p.thumbnail.source;
                  }
                  if (p.extract) ne[id] = p.extract;
                });
              }
            });
          });
          
          // 2. WIKIDATA FALLBACK
          const missingImageIds = batch.filter(slug => !ni[sm[slug][0]]); 
          if (missingImageIds.length > 0) {
             const wdRes = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=${encodeURIComponent(missingImageIds.join("|"))}&props=claims&format=json&origin=*`, { headers });
             
             if (wdRes.ok) {
                 const wdData = await wdRes.json();
                 
                 Object.values(wdData.entities || {}).forEach(entity => {
                    const imageClaim = entity.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
                    if (imageClaim) {
                       const filename = imageClaim.replace(/ /g, "_");
                       const commonsUrl = `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${encodeURIComponent(filename)}&width=500`;
                       
                       const wikiSlug = entity.sitelinks?.enwiki?.title.replace(/ /g, "_");
                       if (wikiSlug && sm[wikiSlug]) {
                          sm[wikiSlug].forEach(id => {
                             if (!IMAGE_OVERRIDES[id]) ni[id] = commonsUrl;
                          });
                       }
                    }
                 });
             }
          }

          // 3. ULTIMATE SATELLITE FALLBACK
          batch.forEach(slug => {
            const ids = sm[slug];
            ids.forEach(id => {
              if (!ni[id] && !IMAGE_OVERRIDES[id]) {
                const bData = buildings.find(b => b.id === id);
                if (bData && bData.lat && bData.lng) {
                   ni[id] = `https://static-maps.yandex.ru/1.x/?ll=${bData.lng},${bData.lat}&z=16&l=sat&size=400,400`;
                }
              }
            });
          });

          // 4. THE THROTTLE (This is the magic line)
          // Tell the loop to pause for 500 milliseconds before asking Wikipedia for more images
          await new Promise(resolve => setTimeout(resolve, 500));

        } catch (e) {
          console.error("Image fetch error:", e);
        }
      }
      
      setImages(p => ({ ...p, ...ni }));
      setExtracts(p => ({ ...p, ...ne }));

      const fromBuildings = {};
      buildings.forEach(b => { if (b.img && !IMAGE_OVERRIDES[b.id]) fromBuildings[b.id] = b.img; });
      if (Object.keys(fromBuildings).length) setImages(p => ({ ...p, ...fromBuildings }));
      
    })();
  }, [buildings]);

  return { images, extracts };
}