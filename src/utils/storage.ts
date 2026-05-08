// src/utils/storage.ts

const RANK_KEY = "@jogo-alessa:ranking";

export const gameStorage = {
  // Salva um novo jogador na lista
  savePlayer: (nome: string, avatar: string) => {
    const currentRank = gameStorage.getRanking();
    const newUser = { nome, avatar, data: new Date().toISOString() };
    
    const updatedRank = [...currentRank, newUser];
    localStorage.setItem(RANK_KEY, JSON.stringify(updatedRank));
  },

  // Busca a lista de quem já jogou
  getRanking: () => {
    const data = localStorage.getItem(RANK_KEY);
    return data ? JSON.parse(data) : [];
  },

  // A "limpeza" que você pensou para trocar de turma
  clearRanking: () => {
    localStorage.removeItem(RANK_KEY);
  }
};