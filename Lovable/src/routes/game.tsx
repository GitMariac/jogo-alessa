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

const MAX_ATTEMPTS = 30;

function newGrid(): Grid {
  const words = pickRoundWords(10);
  return buildGrid(words, 16);
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

type EndReason = "win" | "limit" | "giveup";

function GamePage() {
  const navigate = useNavigate();
  const [player] = useState(() => getCurrentPlayer());
  const [grid, setGrid] = useState<Grid>(() => newGrid());
  const [found, setFound] = useState<PlacedWord[]>([]);
  const [revealed, setRevealed] = useState<PlacedWord[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "received", text: "Encontre as palavras corretamente acentuadas!", id: 0 },
  ]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showGiveupConfirm, setShowGiveupConfirm] = useState(false);
  const [summary, setSummary] = useState<null | {
    hits: number;
    misses: number;
    attempts: number;
    score: number;
    timeSec: number;
    reason: EndReason;
  }>(null);
  const [errorFlash, setErrorFlash] = useState(false);
  const startedAt = useRef<number>(Date.now());
  const chatRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(1);

  const totalTargets = useMemo(
    () => grid.words.filter((w) => w.word.isCorrect).length,
    [grid],
  );
  const correctFound = found.filter((w) => w.word.isCorrect).length;
  const progressPct = totalTargets > 0 ? Math.round((correctFound / totalTargets) * 100) : 0;

  useEffect(() => {
    if (!player) navigate({ to: "/" });
  }, [player, navigate]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, [finished]);

  const pushMsg = (from: "received" | "sent", text: string) => {
    setMessages((prev) => [...prev, { from, text, id: msgId.current++ }]);
  };

  const flashError = () => {
    setErrorFlash(true);
    setTimeout(() => setErrorFlash(false), 600);
  };

  const celebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#ff4b4b", "#5bb6ff", "#ffd166", "#ffffff"],
    });
  };

  const finishRound = (finalState: {
    hits: number;
    misses: number;
    attempts: number;
    score: number;
    reason: EndReason;
  }) => {
    if (finished) return;
    const timeSec = Math.round((Date.now() - startedAt.current) / 1000);
    setFinished(true);
    setElapsed(timeSec);
    if (player) {
      recordMatch({
        playerId: player.id,
        score: finalState.score,
        hits: finalState.hits,
        misses: finalState.misses,
        timeSec,
        phase: 1,
      });
    }
    setSummary({ ...finalState, timeSec });
  };

  const handleGiveup = () => {
    if (finished) return;
    setShowGiveupConfirm(false);
    // Reveal remaining correct words
    const foundSet = new Set(found.map((f) => f.word));
    const remaining = grid.words.filter((w) => w.word.isCorrect && !foundSet.has(w.word));
    setRevealed(remaining);
    pushMsg("received", "Rodada encerrada por desistência. Veja as palavras restantes.");
    setTimeout(() => {
      finishRound({ hits, misses, attempts, score, reason: "giveup" });
    }, 2000);
  };

  const onSelection = (result: GridSelectionResult) => {
    if (finished) return;
    if (result.word) {
      const placed = result.word;
      if (found.find((f) => f.word === placed.word)) return;
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      pushMsg("sent", placed.word.display);
      if (placed.word.isCorrect) {
        const nextFound = [...found, placed];
        setFound(nextFound);
        const nextHits = hits + 1;
        const nextScore = score + 10;
        setHits(nextHits);
        setScore(nextScore);
        pushMsg("received", "Muito bem! Você acertou!");
        pushMsg("received", `Regra: ${placed.word.correctForm} — ${placed.word.rule}`);
        playSuccess();
        celebrate();
        const doneCorrect = nextFound.filter((w) => w.word.isCorrect).length;
        if (doneCorrect >= totalTargets) {
          finishRound({ hits: nextHits, misses, attempts: nextAttempts, score: nextScore, reason: "win" });
        } else if (nextAttempts >= MAX_ATTEMPTS) {
          finishRound({ hits: nextHits, misses, attempts: nextAttempts, score: nextScore, reason: "limit" });
        }
      } else {
        setFound((f) => [...f, placed]);
        const nextMisses = misses + 1;
        const nextScore = Math.max(0, score - 3);
        setMisses(nextMisses);
        setScore(nextScore);
        pushMsg(
          "received",
          `Errado! A grafia correta é "${placed.word.correctForm}" pois é uma ${placed.word.rule}.`,
        );
        playError();
        flashError();
        if (nextAttempts >= MAX_ATTEMPTS) {
          finishRound({ hits, misses: nextMisses, attempts: nextAttempts, score: nextScore, reason: "limit" });
        }
      }
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      pushMsg("sent", result.letters);
      pushMsg("received", "Esta não é uma palavra da rodada.");
      const nextMisses = misses + 1;
      setMisses(nextMisses);
      playError();
      flashError();
      if (nextAttempts >= MAX_ATTEMPTS) {
        finishRound({ hits, misses: nextMisses, attempts: nextAttempts, score, reason: "limit" });
      }
    }
  };

  const restart = () => {
    setGrid(newGrid());
    setFound([]);
    setRevealed([]);
    setHits(0);
    setMisses(0);
    setScore(0);
    setAttempts(0);
    setFinished(false);
    setSummary(null);
    setElapsed(0);
    setShowGiveupConfirm(false);
    startedAt.current = Date.now();
    setMessages([{ from: "received", text: "Nova rodada! Boa sorte.", id: msgId.current++ }]);
  };

  if (!player) return null;

  const attemptsWarn = attempts > 25 ? "text-destructive font-bold" : attempts > 20 ? "text-yellow-500 font-semibold" : "text-foreground";

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
            <button
              type="button"
              onClick={restart}
              className="rounded-md border border-border bg-secondary px-3 py-1 text-xs font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              Nova rodada
            </button>
          </div>

          <WordGrid grid={grid} foundWords={found} revealedWords={revealed} onSelection={onSelection} />
        </div>

        <aside className="glass flex w-full flex-col rounded-3xl border border-border/60 bg-card/60 p-3 lg:w-[340px]">
          <div className="mb-2 flex items-center gap-2 px-2">
            <img src={gameAvatar} alt="" className="h-8 w-8 rounded-full border border-primary/50 object-cover" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">Alessa</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">online</span>
            </div>
          </div>
          <div
            ref={chatRef}
            className="flex max-h-[40vh] min-h-[180px] flex-1 flex-col gap-3 overflow-y-auto px-2 pb-2"
          >
            {messages.map((m) => {
              const isSent = m.from === "sent";
              const avatarSrc = isSent ? AVATAR_SRC[player.avatar] : gameAvatar;
              return (
                <div
                  key={m.id}
                  className={
                    "flex items-end gap-2 " + (isSent ? "flex-row-reverse" : "flex-row")
                  }
                >
                  <img
                    src={avatarSrc}
                    alt=""
                    className={
                      "h-8 w-8 shrink-0 rounded-full border object-cover " +
                      (isSent ? "border-primary/60" : "border-accent/60")
                    }
                  />
                  <div
                    className={
                      "max-w-[75%] rounded-2xl px-3 py-2 text-sm " +
                      (isSent
                        ? "rounded-br-sm bg-primary text-primary-foreground shadow-[var(--glow-primary)]"
                        : "rounded-bl-sm bg-secondary text-secondary-foreground")
                    }
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/30 p-3 backdrop-blur-md">
            <div>
              <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>Progresso</span>
                <span>{correctFound}/{totalTargets}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md bg-card/60 px-2 py-1.5">
                <div className="text-[10px] uppercase text-muted-foreground">Pontuação</div>
                <div className="text-base font-bold text-primary">{score}</div>
              </div>
              <div className="rounded-md bg-card/60 px-2 py-1.5">
                <div className="text-[10px] uppercase text-muted-foreground">Tempo</div>
                <div className="text-base font-bold tabular-nums">{formatTime(elapsed)}</div>
              </div>
              <div className="rounded-md bg-card/60 px-2 py-1.5">
                <div className="text-[10px] uppercase text-muted-foreground">Acertos</div>
                <div className="text-base font-bold text-accent">{correctFound}/{totalTargets}</div>
              </div>
              <div className="rounded-md bg-card/60 px-2 py-1.5">
                <div className="text-[10px] uppercase text-muted-foreground">Erros</div>
                <div className="text-base font-bold text-destructive">{misses}</div>
              </div>
              <div className="col-span-2 rounded-md bg-card/60 px-2 py-1.5">
                <div className="text-[10px] uppercase text-muted-foreground">Tentativas</div>
                <div className={"text-base tabular-nums " + attemptsWarn}>{attempts} / {MAX_ATTEMPTS}</div>
              </div>
            </div>
            <button
              type="button"
              disabled={finished}
              onClick={() => setShowGiveupConfirm(true)}
              className="mt-1 w-full rounded-lg border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              Desistir da rodada
            </button>
          </div>
        </aside>
      </section>

      {showGiveupConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="glass w-full max-w-sm rounded-2xl border-2 border-border/60 bg-card/95 p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-2 text-center text-xl font-bold text-destructive">Desistir da rodada?</h2>
            <p className="mb-5 text-center text-sm text-muted-foreground">
              As palavras restantes serão reveladas e a rodada será encerrada.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowGiveupConfirm(false)}
                className="flex-1 rounded-lg border border-border bg-secondary px-4 py-2 font-semibold text-foreground transition hover:bg-muted"
              >
                Continuar jogando
              </button>
              <button
                type="button"
                onClick={handleGiveup}
                className="flex-1 rounded-lg bg-destructive px-4 py-2 font-semibold text-destructive-foreground transition hover:opacity-90"
              >
                Sim, desistir
              </button>
            </div>
          </div>
        </div>
      )}

      {summary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="glass w-full max-w-md rounded-2xl border-2 border-border/60 bg-card/95 p-6 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-center text-2xl font-bold text-primary">Rodada Finalizada</h2>
            {summary.reason === "giveup" && (
              <p className="mb-3 text-center text-sm font-medium text-destructive">
                Rodada encerrada por desistência.
              </p>
            )}
            <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border/60 bg-secondary/50 p-3">
                <div className="text-xs uppercase text-muted-foreground">Acertos</div>
                <div className="text-lg font-bold text-accent">{summary.hits}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-secondary/50 p-3">
                <div className="text-xs uppercase text-muted-foreground">Erros</div>
                <div className="text-lg font-bold text-destructive">{summary.misses}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-secondary/50 p-3">
                <div className="text-xs uppercase text-muted-foreground">Tentativas</div>
                <div className="text-lg font-bold">{summary.attempts}/{MAX_ATTEMPTS}</div>
              </div>
              <div className="rounded-lg border border-border/60 bg-secondary/50 p-3">
                <div className="text-xs uppercase text-muted-foreground">Pontuação</div>
                <div className="text-lg font-bold text-primary">{summary.score}</div>
              </div>
              <div className="col-span-2 rounded-lg border border-border/60 bg-secondary/50 p-3">
                <div className="text-xs uppercase text-muted-foreground">Tempo total</div>
                <div className="text-lg font-bold tabular-nums">{formatTime(summary.timeSec)}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={restart}
                className="flex-1 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition hover:opacity-90"
              >
                Jogar Novamente
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="flex-1 rounded-lg border border-border bg-secondary px-4 py-2 font-semibold text-foreground transition hover:bg-muted"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}