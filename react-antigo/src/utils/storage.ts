// src/utils/storage.ts

const RANK_KEY = "@jogo-alessa:ranking";
const USER_KEY = "@jogo-alessa:user-profile";
const SETTINGS_KEY = "@jogo-alessa:settings";

export interface RankingEntry {
  nome: string;
  avatar: string;
  score: number;
  data: string;
}

export interface GameSettings {
  audioGame: boolean;
  music: boolean;
  animation: boolean;
  volume: number;
}

const DEFAULT_SETTINGS: GameSettings = {
  audioGame: true,
  music: true,
  animation: true,
  volume: 75,
};

export const gameStorage = {
  // Salva uma nova pontuação na lista
  saveScore: (nome: string, avatar: string, score: number) => {
    const currentRank = gameStorage.getRanking();
    const newEntry: RankingEntry = {
      nome,
      avatar,
      score,
      data: new Date().toISOString(),
    };

    const updatedRank = [...currentRank, newEntry]
      .sort((a, b) => b.score - a.score) // Ordena por maior pontuação
      .slice(0, 10); // Mantém apenas o top 10

    localStorage.setItem(RANK_KEY, JSON.stringify(updatedRank));
  },

  // Busca a lista de quem já jogou
  getRanking: (): RankingEntry[] => {
    const data = localStorage.getItem(RANK_KEY);
    return data ? JSON.parse(data) : [];
  },

  // A "limpeza" que você pensou para trocar de turma
  clearRanking: () => {
    localStorage.removeItem(RANK_KEY);
  },

  // Gerenciamento do perfil do aluno
  saveUserProfile: (nome: string, avatar: string = "Sandrinha") => {
    localStorage.setItem(USER_KEY, JSON.stringify({ nome, avatar }));
  },

  getUserProfile: (): { nome: string; avatar: string } | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveSettings: (settings: GameSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  getSettings: (): GameSettings => {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : DEFAULT_SETTINGS;
  },
};
