import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { getCurrentPlayer, getMatches, type MatchRecord, type Player } from "@/lib/storage";

export const Route = createFileRoute("/scores")({
  head: () => ({
    meta: [
      { title: "Meus Scores — Alessa" },
      { name: "description", content: "Histórico de pontuações das suas partidas." },
    ],
  }),
  component: ScoresPage,
});

function ScoresPage() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  useEffect(() => {
    const p = getCurrentPlayer();
    setPlayer(p);
    if (p) setMatches(getMatches().filter((m) => m.playerId === p.id).reverse());
  }, []);

  return (
    <Layout>
      <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-6 sm:p-10">
        <header>
          <h2 className="text-3xl font-bold text-glow sm:text-4xl">⭐ Meus Scores</h2>
          <p className="text-muted-foreground">
            {player ? `Histórico de ${player.name}` : "Entre para ver seu histórico."}
          </p>
        </header>
        {!player ? (
          <p className="rounded-xl border border-border bg-card/60 p-6 text-center text-muted-foreground">
            Você ainda não criou um jogador.
          </p>
        ) : matches.length === 0 ? (
          <p className="rounded-xl border border-border bg-card/60 p-6 text-center text-muted-foreground">
            Nenhuma partida registrada.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
            <table className="w-full text-left">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Pontos</th>
                  <th className="px-4 py-3">Acertos</th>
                  <th className="px-4 py-3">Erros</th>
                  <th className="px-4 py-3">Tempo</th>
                  <th className="px-4 py-3">Fase</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m) => (
                  <tr key={m.id} className="border-t border-border/40">
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(m.date).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 font-bold text-primary">{m.score}</td>
                    <td className="px-4 py-3 text-accent">{m.hits}</td>
                    <td className="px-4 py-3 text-destructive">{m.misses}</td>
                    <td className="px-4 py-3">{m.timeSec}s</td>
                    <td className="px-4 py-3">{m.phase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}