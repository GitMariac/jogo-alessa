// Banco de palavras: [incorreta, correta, explicação]
export type WordEntry = [string, string, string];

export const wordsDatabase: Record<string, WordEntry[]> = {
  oxitonas: [
    ["vatapa", "Vatapá", "Oxítona terminada em A"],
    ["sofa", "sofá", "Oxítona terminada em A"],
    ["gamba", "gambá", "Oxítona terminada em A"],
    ["Para", "Pará", "Oxítona terminada em A"],
    ["cafe", "café", "Oxítona terminada em E"],
    ["voce", "você", "Oxítona terminada em E"],
    ["Tiete", "Tietê", "Oxítona terminada em E"],
    ["portugues", "português", "Oxítona terminada em E seguido de S"],
    ["avo", "avó", "Oxítona terminada em O"],
    ["jilo", "jiló", "Oxítona terminada em O"],
    ["cipo", "cipó", "Oxítona terminada em O"],
    ["carijo", "carijó", "Oxítona terminada em O"],
    ["chapeu", "chapéu", "Oxítona terminada em ditongo aberto ÉU"],
    ["trofeu", "troféu", "Oxítona terminada em ditongo aberto ÉU"],
    ["papeis", "papéis", "Oxítona terminada em ditongo aberto ÉI seguido de S"],
    ["fieis", "fiéis", "Oxítona terminada em ditongo aberto ÉI seguido de S"],
    ["heroi", "herói", "Oxítona terminada em ditongo aberto ÓI"],
    ["Niteroi", "Niterói", "Oxítona terminada em ditongo aberto ÓI"],
    ["anzois", "anzóis", "Oxítona terminada em ditongo aberto ÓI seguido de S"],
    ["destroi", "destrói", "Oxítona terminada em ditongo aberto ÓI"],
    ["parabens", "parabéns", "Oxítona terminada em ENS"],
    ["armazens", "armazéns", "Oxítona terminada em ENS"],
    ["alguem", "alguém", "Oxítona terminada em EM"],
    ["mantem", "mantém", "Oxítona terminada em EM"],
    ["porem", "porém", "Oxítona terminada em EM"],
    ["tambem", "também", "Oxítona terminada em EM"],
    ["acai", "açaí", "Oxítona acentuada pela regra do hiato"],
    ["Piaui", "Piauí", "Oxítona acentuada pela regra do hiato"],
    ["jacaranda", "jacarandá", "Oxítona terminada em A"],
    ["contrafile", "contrafilé", "Oxítona terminada em E"],
  ],
  paroxitonas: [
    ["facil", "fácil", "Paroxítona terminada em L"],
    ["hifen", "hífen", "Paroxítona terminada em N"],
    ["album", "álbum", "Paroxítona terminada em UM"],
    ["cadaver", "cadáver", "Paroxítona terminada em R"],
    ["albuns", "álbuns", "Paroxítona terminada em UNS"],
    ["torax", "tórax", "Paroxítona terminada em X"],
    ["juri", "júri", "Paroxítona terminada em I"],
    ["lapis", "lápis", "Paroxítona terminada em IS"],
    ["virus", "vírus", "Paroxítona terminada em US"],
    ["biceps", "bíceps", "Paroxítona terminada em PS"],
    ["orfao", "órfão", "Paroxítona terminada em ÃO"],
    ["ima", "ímã", "Paroxítona terminada em Ã"],
    ["proton", "próton", "Paroxítona terminada em ON"],
    ["amavel", "amável", "Paroxítona terminada em L"],
    ["carater", "caráter", "Paroxítona terminada em R"],
    ["serie", "série", "Paroxítona terminada em ditongo"],
    ["historia", "história", "Paroxítona terminada em ditongo"],
    ["medio", "médio", "Paroxítona terminada em ditongo"],
    ["agua", "água", "Paroxítona terminada em ditongo"],
  ],
  hiatos: [
    ["saida", "saída", "I tônico em hiato sozinho na sílaba"],
    ["ciume", "ciúme", "U tônico em hiato sozinho na sílaba"],
    ["reune", "reúne", "U tônico em hiato sozinho na sílaba"],
    ["raizes", "raízes", "I tônico em hiato sozinho na sílaba"],
    ["pais", "país", "I tônico em hiato seguido de S"],
    ["genuina", "genuína", "I tônico em hiato sozinho na sílaba"],
  ],
  excessoes: [
    ["raínha", "rainha", "Hiato seguido de NH"],
    ["baínha", "bainha", "Hiato seguido de NH"],
    ["moínho", "moinho", "Hiato seguido de NH"],
    ["vôo", "voo", "Hiatos -oo não são mais acentuados"],
    ["lêem", "leem", "Hiatos -eem não são mais acentuados"],
    ["feiúra", "feiura", "I ou U tônico após ditongo decrescente em paroxítona"],
  ],
};

export type WordItem = {
  display: string;
  letters: string[];
  isCorrect: boolean;
  correctForm: string;
  incorrectForm: string;
  rule: string;
};

function splitGraphemes(s: string): string[] {
  return Array.from(s.toUpperCase());
}

/** Pick a fresh round: `count` pairs (correct + incorrect) from the DB. */
export function pickRoundWords(count = 10): WordItem[] {
  const all: WordEntry[] = Object.values(wordsDatabase).flat();
  const pool = [...all].sort(() => Math.random() - 0.5).slice(0, count);
  const result: WordItem[] = [];
  for (const [incorrect, correct, rule] of pool) {
    result.push({
      display: correct,
      letters: splitGraphemes(correct),
      isCorrect: true,
      correctForm: correct,
      incorrectForm: incorrect,
      rule,
    });
    result.push({
      display: incorrect,
      letters: splitGraphemes(incorrect),
      isCorrect: false,
      correctForm: correct,
      incorrectForm: incorrect,
      rule,
    });
  }
  return result;
}