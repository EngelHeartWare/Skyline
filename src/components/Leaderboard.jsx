import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import Thumb from "./Thumb";

const TABS = [
  { key: "popular", label: "Most Popular", icon: "🔥", desc: "Most interactions overall" },
  { key: "visited", label: "Most Visited", icon: "✓", desc: "Buildings people have been to" },
  { key: "wishlist", label: "Most Wishlisted", icon: "★", desc: "Buildings people want to visit" },
];

export default function Leaderboard({
  data, loading, error, onRefresh,
  allBuildings, images, maxH,
  onSelect, onOpenDetail,
  favs, visited, wishlist,
}) {
  const { t, mode } = useTheme();
  const [tab, setTab] = useState("popular");

  const buildingMap = {};
  allBuildings.forEach((b) => { buildingMap[b.id] = b; });

  const entries = (data[tab] || [])
    .map((e) => ({ ...e, building: buildingMap[e.wikidata_id] }))
    .filter((e) => e.building); // only show buildings that are in our loaded set

  const currentTab = TABS.find((t) => t.key === tab);
  const maxCount = entries.length > 0 ? entries[0].count : 1;

  // Medal colors for top 3
  const medalColor = (rank) => rank === 1 ? "#ffd700" : rank === 2 ? "#c0c0c0" : rank === 3 ? "#cd7f32" : null;
  const medalEmoji = (rank) => rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

  return (
    <div style={{ animation: "fi .2s" }}>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap",
      }}>
        {TABS.map((tb) => (
          <button key={tb.key} onClick={() => setTab(tb.key)} style={{
            background: tab === tb.key ? t.accentBg : t.surface,
            border: `1px solid ${tab === tb.key ? t.accentBorder : t.border}`,
            borderRadius: 8, padding: "7px 14px", cursor: "pointer",
            color: tab === tb.key ? t.accent : t.textMuted,
            fontSize: 11.5, fontFamily: "inherit", fontWeight: tab === tb.key ? 600 : 400,
            transition: "all .15s",
          }}>
            {tb.icon} {tb.label}
          </button>
        ))}
        <button onClick={onRefresh} title="Refresh leaderboard" style={{
          background: "none", border: `1px solid ${t.border}`, borderRadius: 8,
          padding: "7px 10px", cursor: "pointer", color: t.textFaint, fontSize: 11,
          fontFamily: "inherit", marginLeft: "auto",
        }}>↻</button>
      </div>

      {/* Description */}
      <p style={{ fontSize: 10, color: t.textFaint, marginBottom: 12 }}>{currentTab.desc}</p>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 11, color: t.textMuted }}>Loading community data...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={{
          background: "rgba(255,80,80,.08)", border: "1px solid rgba(255,80,80,.2)",
          borderRadius: 10, padding: "14px 16px", marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, color: "#ff6b6b" }}>Could not load leaderboard: {error}</div>
          <button onClick={onRefresh} style={{
            marginTop: 8, background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 6, padding: "4px 12px", color: t.textMuted, fontSize: 10,
            cursor: "pointer", fontFamily: "inherit",
          }}>Retry</button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && entries.length === 0 && (
        <div style={{
          textAlign: "center", padding: "48px 20px",
          background: t.surface, borderRadius: 12, border: `1px solid ${t.border}`,
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏗</div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 4 }}>No community data yet</div>
          <div style={{ fontSize: 10, color: t.textFaint }}>
            Be the first to mark buildings as visited or add them to your wishlist!
          </div>
        </div>
      )}

      {/* Leaderboard entries */}
      {!loading && entries.length > 0 && (
        <div style={{
          borderRadius: 11, overflow: "hidden",
          border: `1px solid ${t.border}`,
        }}>
          {entries.map((e, idx) => {
            const rank = idx + 1;
            const b = e.building;
            const barWidth = `${Math.max(8, (e.count / maxCount) * 100)}%`;
            const medal = medalColor(rank);
            const isFav = favs.includes(b.id);
            const isVisited = visited.includes(b.id);
            const isWishlisted = wishlist.includes(b.id);

            return (
              <div key={b.id}
                onClick={() => onSelect(b.id)}
                onDoubleClick={() => onOpenDetail(b.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 12px",
                  background: rank <= 3
                    ? `linear-gradient(90deg, ${medal}08, transparent)`
                    : "transparent",
                  borderBottom: idx < entries.length - 1 ? `1px solid ${t.border}` : "none",
                  cursor: "pointer",
                  transition: "background .12s",
                }}
                onMouseEnter={(ev) => { ev.currentTarget.style.background = t.surfaceHover; }}
                onMouseLeave={(ev) => {
                  ev.currentTarget.style.background = rank <= 3
                    ? `linear-gradient(90deg, ${medal}08, transparent)`
                    : "transparent";
                }}
              >
                {/* Rank */}
                <div style={{
                  width: 28, textAlign: "center", flexShrink: 0,
                  fontSize: rank <= 3 ? 16 : 11,
                  fontWeight: rank <= 3 ? 700 : 500,
                  color: medal || t.textFaint,
                }}>
                  {medalEmoji(rank) || `#${rank}`}
                </div>

                {/* Thumbnail */}
                <Thumb src={images[b.id]} color={b.color} height={b.height} maxH={maxH} size={36} radius={6} />

                {/* Building info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12, fontWeight: 600, color: t.text,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    display: "flex", gap: 4, alignItems: "center",
                  }}>
                    {b.name}
                    {isFav && <span style={{ fontSize: 9, color: t.fav }}>♥</span>}
                    {isVisited && <span style={{ fontSize: 9, color: t.visited, fontWeight: 700 }}>✓</span>}
                    {isWishlisted && <span style={{ fontSize: 9, color: t.wishlist }}>★</span>}
                  </div>
                  <div style={{ fontSize: 9, color: t.textFaint, marginTop: 1 }}>
                    {[b.city, b.country].filter(Boolean).join(", ")} · {b.height}m
                  </div>
                  {/* Progress bar */}
                  <div style={{
                    marginTop: 4, height: 3, borderRadius: 2,
                    background: t.surface, overflow: "hidden",
                  }}>
                    <div style={{
                      width: barWidth, height: "100%", borderRadius: 2,
                      background: tab === "visited" ? t.visited
                        : tab === "wishlist" ? t.wishlist
                        : t.accent,
                      transition: "width .4s ease",
                    }} />
                  </div>
                </div>

                {/* Count */}
                <div style={{
                  flexShrink: 0, textAlign: "right",
                  fontSize: 14, fontWeight: 700,
                  color: tab === "visited" ? t.visited
                    : tab === "wishlist" ? t.wishlist
                    : t.accent,
                  minWidth: 32,
                }}>
                  {e.count}
                </div>
                <div style={{ fontSize: 8, color: t.textGhost, flexShrink: 0, width: 36 }}>
                  {e.count === 1 ? "user" : "users"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info note */}
      {!loading && entries.length > 0 && (
        <p style={{ fontSize: 9, color: t.textGhost, textAlign: "center", marginTop: 10 }}>
          Based on community data from all Skyline Explorer users · Double-click to open details
        </p>
      )}
    </div>
  );
}
