export const RANKS = [
  { name: "Unranked", min: 0, max: 99, color: "#9aa294", label: "Start your journey" },
  { name: "Bronze", min: 100, max: 249, color: "#c58b5a", label: "Building the habit" },
  { name: "Silver", min: 250, max: 499, color: "#b8c2cc", label: "Finding your rhythm" },
  { name: "Gold", min: 500, max: 849, color: "#f2c65d", label: "Consistency is growing" },
  { name: "Platinum", min: 850, max: 1299, color: "#72d5c2", label: "Strong foundations" },
  { name: "Diamond", min: 1300, max: 1899, color: "#76bdf5", label: "Disciplined progress" },
  { name: "Master", min: 1900, max: 2699, color: "#b39af4", label: "Above the ordinary" },
  { name: "Grandmaster", min: 2700, max: 3699, color: "#ee8e75", label: "Elite consistency" },
  { name: "Epic", min: 3700, max: 4999, color: "#e879b8", label: "A force of habit" },
  { name: "Legend", min: 5000, max: 6499, color: "#f1a65c", label: "Remarkable discipline" },
  { name: "Mythic", min: 6500, max: 8499, color: "#e66b79", label: "Exceptional dedication" },
  { name: "Greek Physique", min: 8500, max: Number.MAX_SAFE_INTEGER, color: "#d8ed9a", label: "The pinnacle — earned, not rushed" },
] as const;

export function getRank(totalXp: number) {
  const xp = Math.max(0, Math.floor(Number.isFinite(totalXp) ? totalXp : 0));
  const index = RANKS.findIndex((rank) => xp >= rank.min && xp <= rank.max);
  const current = RANKS[Math.max(0, index)];
  const next = RANKS[index + 1];
  return {
    xp, rank: current.name, label: current.label, color: current.color,
    nextRank: next?.name ?? null, nextXp: next?.min ?? null,
    progress: next ? Math.min(100, Math.round(((xp - current.min) / (next.min - current.min)) * 100)) : 100,
    xpToNext: next ? Math.max(0, next.min - xp) : 0,
  };
}
