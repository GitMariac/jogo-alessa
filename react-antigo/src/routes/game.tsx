import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Layout } from "@/components/Layout";
import { WordGrid, type GridSelectionResult } from "@/components/WordGrid";
import { AVATAR_SRC } from "@/components/AvatarPicker";
import { buildGrid, type Grid, type PlacedWord } from "@/lib/grid";
import { pickRoundWords } from "@/lib/words";
import { getCurrentPlayer, recordMatch } from "@/lib/storage";
import { playSuccess, playError } from "@/lib/sounds";
import gameAvatar from "@/assets/game-avatar.png";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "Jogo — Alessa" },
      { name: "description", content: "Encontre as palavras corretamente acentuadas no tabuleiro." },
    ],
  }),
  component: GamePage,
});

type ChatMessage = { from: "received" | "sent"; text: string; id: number };

function newGrid(): Grid {
  const words = pickRoundWords(8);
  return buildGrid(words, 16);
}

function GamePage() {
  const navigate = useNavigate();
  const [player] = useState(() => getCurrentPlayer());
  const [grid, setGrid] = useState<Grid>(() => newGrid());
  const [found, setFound] = useState<PlacedWord[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "received", text: "Encontre as palavras corretamente acentuadas!", id: 0 },
  ]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [score, setScore] = useState(0);
  const [errorFlash, setErrorFlash] = useState(false);
  const [avatarMood, setAvatarMood] = useState<"idle" | "happy" | "sad">("idle");
  const [rule, setRule] = useState<string | null>(null);
  const startedAt = useRef<number>(Date.now());
  const chatRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(1);

  const totalTargets = useMemo(
    () => grid.words.filter((w) => w.word.isCorrect).length,
    [grid],
  );
  const correctFound = found.filter((w) => w.word.isCorrect).length;

  useEffect(() => {
    if (!player) navigate({ to: "/" });
  }, [player, navigate]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const pushMsg = (from: "received" | "sent", text: string) => {
    setMessages((prev) => [...prev, { from, text, id: msgId.current++ }]);
  };

  const flashError = () => {
    setErrorFlash(true);
    setAvatarMood("sad");
    setTimeout(() => setErrorFlash(false), 600);
    setTimeout(() => setAvatarMood("idle"), 900);
  };

  const celebrate = () => {
    setAvatarMood("happy");
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#ff4b4b", "#5bb6ff", "#ffd166", "#ffffff"],
    });
    setTimeout(() => setAvatarMood("idle"), 1100);
  };

  const endIfDone = (nextFound: PlacedWord[]) => {
    const done = nextFound.filter((w) => w.word.isCorrect).length;
    if (done >= totalTargets) {
      const timeSec = Math.round((Date.now() - startedAt.current) / 1000);
      if (player) {
        recordMatch({
          playerId: player.id,
          score,
          hits,
          misses,
          timeSec,
          phase: 1,
        });
      }
      setTimeout(() => {
        pushMsg("received", `Rodada concluída! Pontuação: ${score} em ${timeSec}s`);
      }, 400);
    }
  };

  const onSelection = (result: GridSelectionResult) => {
    if (result.word) {
      const placed = result.word;
      if (found.find((f) => f.word === placed.word)) return;
      pushMsg("sent", placed.word.display);
      if (placed.word.isCorrect) {
        const nextFound = [...found, placed];
        setFound(nextFound);
        setHits((h) => h + 1);
        const gained = 10;
        setScore((s) => s + gained);
        pushMsg("received", "Muito bem! Você acertou!");
        setRule(`${placed.word.correctForm} — ${placed.word.rule}`);
        playSuccess();
        celebrate();
        endIfDone(nextFound);
      } else {
        setFound((f) => [...f, placed]);
        setMisses((m) => m + 1);
        setScore((s) => Math.max(0, s - 3));
        pushMsg(
          "received",
          `Errado! A grafia correta é "${placed.word.correctForm}" pois é uma ${placed.word.rule}.`,
        );
        setRule(`${placed.word.correctForm} — ${placed.word.rule}`);
        playError();
        flashError();
      }
    } else {
      pushMsg("sent", result.letters);
      pushMsg("received", "Esta não é uma palavra da rodada.");
      setMisses((m) => m + 1);
      playError();
      flashError();
    }
  };

  const restart = () => {
    setGrid(newGrid());
    setFound([]);
    setHits(0);
    setMisses(0);
    setScore(0);
    setRule(null);
    startedAt.current = Date.now();
    setMessages([{ from: "received", text: "Nova rodada! Boa sorte.", id: msgId.current++ }]);
  };

  if (!player) return null;

  return (
    <Layout container={false}>
      <section
        className={
          "glass relative mx-auto flex w-[96%] max-w-[1400px] flex-col gap-6 overflow-hidden rounded-2xl border-2 border-border/60 p-4 shadow-[var(--shadow-card)] lg:flex-row " +
          (errorFlash ? "flash-error" : "")
        }
      >
        <div className="board-container relative flex-1 rounded-3xl p-4">
          <div className="mb-3 flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2">
              <img
                src={AVATAR_SRC[player.avatar]}
                alt=""
                className="h-10 w-10 rounded-full border border-primary/50 object-cover"
              />
              <span className="font-semibold">{player.name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
              <span>Pontos: <strong className="text-primary">{score}</strong></span>
              <span>Acertos: <strong className="text-accent">{correctFound}/{totalTargets}</strong></span>
              <span>Erros: <strong className="text-destructive">{misses}</strong></span>
              <button
                type="button"
                onClick={restart}
                className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground"
              >
                Nova rodada
              </button>
            </div>
          </div>

          <WordGrid grid={grid} foundWords={found} onSelection={onSelection} />

          <img
            src={gameAvatar}
            alt="Mascote"
            className={
              "pointer-events-none absolute -bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border-4 object-cover " +
              (avatarMood === "happy"
                ? "border-accent shadow-[var(--glow-accent)] float"
                : avatarMood === "sad"
                  ? "border-destructive shake"
                  : "border-primary shadow-[var(--glow-primary)] float")
            }
          />

          {rule && (
            <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-md rounded-xl border border-border/60 bg-card/90 px-4 py-2 text-center text-xs text-foreground/90 backdrop-blur-md">
              <strong className="text-primary">Regra:</strong> {rule}
            </div>
          )}
        </div>

        <aside className="flex w-full flex-col rounded-3xl border border-border/60 bg-card/60 p-3 lg:w-[320px]">
          <h3 className="mb-2 px-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Mensagens
          </h3>
          <div
            ref={chatRef}
            className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto px-2 pb-2"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
                  (m.from === "sent"
                    ? "ml-auto bg-primary text-primary-foreground shadow-[var(--glow-primary)]"
                    : "mr-auto bg-secondary text-secondary-foreground")
                }
              >
                {m.text}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </Layout>
  );
}