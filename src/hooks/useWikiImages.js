import { useState, useEffect, useRef } from "react";
import { IMAGE_OVERRIDES } from "../data/custom-buildings";

export function useWikiImages(buildings) {
  const [images, setImages] = useState({ ...IMAGE_OVERRIDES });
  const [extracts, setExtracts] = useState({});
  const fetched = useRef(new Set());
  const fetchedQids = useRef(new Set());

  // ── Pass 1: Wikipedia images + extracts (for buildings with wiki slugs) ──
  useEffect(() => {
    const toF = buildings.filter(b => b.wiki && !fetched.current.has(b.wiki));
    if (!toF.length) return;
    const sm = {};
    toF.forEach(b => { if (!sm[b.wiki]) sm[b.wiki] = []; sm[b.wiki].push(b.id); fetched.current.add(b.wiki); });
    const slugs = Object.keys(sm);

    (async () => {
      const ni = {}, ne = {};
      const headers = { "Api-User-Agent": "SkylineExplorer/1.0 (Educational Project)" };

      for (let i = 0; i < slugs.length; i += 40) {
        const batch = slugs.slice(i, i + 40);
        try {
          const r = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(batch.join("|"))}&prop=pageimages|extracts&redirects=1&pithumbsize=500&exintro=1&explaintext=1&format=json&origin=*`, { headers });
          if (!r.ok) { console.warn(`Wikipedia API batch skipped: ${r.status}`); continue; }
          const d = await r.json();

          const redirectMap = {};
          if (d.query?.redirects) d.query.redirects.forEach(r => { redirectMap[r.to] = r.from; });

          Object.values(d?.query?.pages || {}).forEach(p => {
            const originalTitle = redirectMap[p.title] || p.title;
            const sl = originalTitle.replace(/ /g, "_");
            Object.entries(sm).forEach(([os, ids]) => {
              if (sl === os || sl.replace(/_/g, " ").toLowerCase() === os.replace(/_/g, " ").toLowerCase()) {
                ids.forEach(id => {
                  if (p.thumbnail?.source && !IMAGE_OVERRIDES[id]) ni[id] = p.thumbnail.source;
                  if (p.extract) ne[id] = p.extract;
                });
              }
            });
          });

          await new Promise(resolve => setTimeout(resolve, 400));
        } catch (e) {
          console.error("Wikipedia image fetch error:", e);
        }
      }

      setImages(p => ({ ...p, ...ni }));
      setExtracts(p => ({ ...p, ...ne }));

      // Also apply any direct image URLs from building data
      const fromBuildings = {};
      buildings.forEach(b => { if (b.img && !IMAGE_OVERRIDES[b.id]) fromBuildings[b.id] = b.img; });
      if (Object.keys(fromBuildings).length) setImages(p => ({ ...p, ...fromBuildings }));
    })();
  }, [buildings]);

  // ── Pass 2: Wikidata P18 images (for buildings without wiki slugs or missing images) ──
  useEffect(() => {
    // Wait a bit for pass 1 to finish populating
    const timer = setTimeout(() => {
      const missing = buildings.filter(b =>
        b.id.startsWith("Q") &&
        !fetchedQids.current.has(b.id) &&
        !IMAGE_OVERRIDES[b.id]
      );
      if (!missing.length) return;

      // Mark as fetched immediately to prevent re-runs
      missing.forEach(b => fetchedQids.current.add(b.id));

      (async () => {
        const ni = {};
        const headers = { "Api-User-Agent": "SkylineExplorer/1.0 (Educational Project)" };

        // Check which ones still need images after pass 1
        // We read current state via a callback pattern
        const currentImages = await new Promise(resolve => {
          setImages(prev => { resolve(prev); return prev; });
        });

        const stillMissing = missing.filter(b => !currentImages[b.id]);
        if (!stillMissing.length) return;

        // Batch Wikidata API requests (50 QIDs per batch)
        for (let i = 0; i < stillMissing.length; i += 50) {
          const batch = stillMissing.slice(i, i + 50);
          const qids = batch.map(b => b.id).join("|");
          try {
            const r = await fetch(
              `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${qids}&props=claims&format=json&origin=*`,
              { headers }
            );
            if (!r.ok) { console.warn(`Wikidata P18 batch skipped: ${r.status}`); continue; }
            const d = await r.json();

            Object.entries(d.entities || {}).forEach(([qid, entity]) => {
              const imageClaim = entity.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
              if (imageClaim) {
                const filename = imageClaim.replace(/ /g, "_");
                ni[qid] = `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${encodeURIComponent(filename)}&width=500`;
              }
            });

            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (e) {
            console.error("Wikidata P18 fetch error:", e);
          }
        }

        if (Object.keys(ni).length > 0) {
          console.log(`[Skyline] P18 fallback found ${Object.keys(ni).length} additional images`);
          setImages(p => ({ ...p, ...ni }));
        }
      })();
    }, 3000); // Wait 3s for pass 1 to finish

    return () => clearTimeout(timer);
  }, [buildings]);

  return { images, extracts };
}
