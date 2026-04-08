import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";

/**
 * Fetches aggregated leaderboard data from Supabase.
 *
 * We query user_buildings directly and aggregate client-side.
 * This avoids needing a custom Supabase function/view —
 * it works with just the existing user_buildings table.
 *
 * Returns: { data, loading, error, refresh }
 *   data = { visited: [...], wishlist: [...], popular: [...] }
 *   Each entry: { wikidata_id, count }
 */
export function useLeaderboard() {
  const [data, setData] = useState({ visited: [], wishlist: [], popular: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all non-"none" entries — we aggregate client-side
      // For a large user base you'd want a Supabase RPC/view instead
      const { data: rows, error: err } = await supabase
        .from("user_buildings")
        .select("wikidata_id, status")
        .neq("status", "none");

      if (err) throw err;
      if (!rows) { setData({ visited: [], wishlist: [], popular: [] }); return; }

      // Aggregate counts per building per status
      const visitedMap = {};
      const wishlistMap = {};
      const popularMap = {}; // combined: visited + wishlist

      rows.forEach(({ wikidata_id, status }) => {
        if (status === "visited") {
          visitedMap[wikidata_id] = (visitedMap[wikidata_id] || 0) + 1;
        } else if (status === "wishlist") {
          wishlistMap[wikidata_id] = (wishlistMap[wikidata_id] || 0) + 1;
        }
        // Everything counts toward popularity
        popularMap[wikidata_id] = (popularMap[wikidata_id] || 0) + 1;
      });

      const toSorted = (map) =>
        Object.entries(map)
          .map(([wikidata_id, count]) => ({ wikidata_id, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 50);

      setData({
        visited: toSorted(visitedMap),
        wishlist: toSorted(wishlistMap),
        popular: toSorted(popularMap),
      });
    } catch (e) {
      console.error("[Leaderboard] fetch error:", e);
      setError(e.message || "Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { data, loading, error, refresh: fetchStats };
}
