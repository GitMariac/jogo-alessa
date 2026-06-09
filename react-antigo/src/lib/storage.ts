export type Player = {
  id: number;
  name: string;
  avatar: number; // 1..11
  createdAt: string;
};

export type MatchRecord = {
  id: number;
  playerId: number;
  score: number;
  hits: number;
  misses: number;
  timeSec: number;
  phase: number;
  date: string;
};

export type Settings = {
  musicMuted: boolean;
  sfxMuted: boolean;
};

const K_PLAYERS = "alessa.players";
const K_MATCHES = "alessa.matches";
const K_CURRENT = "alessa.currentPlayerId";
const K_SETTINGS = "alessa.settings";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const getPlayers = (): Player[] => read<Player[]>(K_PLAYERS, []);
export const getMatches = (): MatchRecord[] => read<MatchRecord[]>(K_MATCHES, []);
export const getSettings = (): Settings =>
  read<Settings>(K_SETTINGS, { musicMuted: false, sfxMuted: false });
export const saveSettings = (s: Settings) => write(K_SETTINGS, s);

export function getCurrentPlayer(): Player | null {
  const id = read<number | null>(K_CURRENT, null);
  if (id == null) return null;
  return getPlayers().find((p) => p.id === id) ?? null;
}
export function setCurrentPlayer(id: number | null) {
  write(K_CURRENT, id);
}

/** Register or reuse a player. Returns { player, created } or throws if name taken by another. */
export function registerPlayer(name: string, avatar: number): Player {
  const players = getPlayers();
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Informe um nome de usuário.");
  const existing = players.find((p) => p.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) {
    throw new Error("Nome de usuário já utilizado. Escolha outro nome.");
  }
  const id = (players.at(-1)?.id ?? 0) + 1;
  const player: Player = {
    id,
    name: trimmed,
    avatar,
    createdAt: new Date().toISOString(),
  };
  players.push(player);
  write(K_PLAYERS, players);
  setCurrentPlayer(id);
  return player;
}

export function updateCurrentPlayer(patch: Partial<Pick<Player, "name" | "avatar">>): Player | null {
  const current = getCurrentPlayer();
  if (!current) return null;
  const players = getPlayers();
  if (patch.name && patch.name !== current.name) {
    const taken = players.find(
      (p) => p.id !== current.id && p.name.toLowerCase() === patch.name!.toLowerCase(),
    );
    if (taken) throw new Error("Nome de usuário já utilizado.");
  }
  const next: Player = { ...current, ...patch, name: (patch.name ?? current.name).trim() };
  const updated = players.map((p) => (p.id === current.id ? next : p));
  write(K_PLAYERS, updated);
  return next;
}

export function recordMatch(m: Omit<MatchRecord, "id" | "date">): MatchRecord {
  const matches = getMatches();
  const id = (matches.at(-1)?.id ?? 0) + 1;
  const record: MatchRecord = { ...m, id, date: new Date().toISOString() };
  matches.push(record);
  write(K_MATCHES, matches);
  return record;
}

export type RankRow = {
  player: Player;
  bestScore: number;
  bestTime: number;
  games: number;
};

export function getRanking(): RankRow[] {
  const players = getPlayers();
  const matches = getMatches();
  const rows: RankRow[] = players.map((player) => {
    const mine = matches.filter((m) => m.playerId === player.id);
    const bestScore = mine.reduce((a, m) => Math.max(a, m.score), 0);
    const bestTime = mine
      .filter((m) => m.score === bestScore)
      .reduce((a, m) => (a === 0 ? m.timeSec : Math.min(a, m.timeSec)), 0);
    return { player, bestScore, bestTime, games: mine.length };
  });
  return rows
    .filter((r) => r.games > 0)
    .sort((a, b) => (b.bestScore - a.bestScore) || (a.bestTime - b.bestTime));
}