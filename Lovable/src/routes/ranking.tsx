import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { AVATAR_SRC } from "@/components/AvatarPicker";
import { getRanking, type RankRow } from "@/lib/storage";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking — Alessa" },
      { name: "description", content: "Classificação dos jogadores no Alessa." },
    ],
  }),
  component: RankingPage,
});

function RankingPage() {
  const [rows, setRows] = useState<RankRow[]>([]);
  useEffect(() => setRows(getRanking()), []);

  return (
    <Layout>
      <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-6 sm:p-10">
        <header>
          <h2 className="text-3xl font-bold text-glow sm:text-4xl">🏆 Ranking</h2>
          <p className="text-muted-foreground">Classificação geral dos jogadores.</p>
        </header>

        {rows.length === 0 ? (
          <p className="rounded-xl border border-border bg-card/60 p-6 text-center text-muted-foreground">
            Nenhuma partida registrada ainda. Jogue para aparecer no ranking!
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
            <table className="w-full text-left">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Jogador</th>
                  <th className="px-4 py-3">Pontos</th>
                  <th className="px-4 py-3">Tempo</th>
                  <th className="px-4 py-3">Partidas</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.player.id} className="border-t border-border/40">
                    <td className="px-4 py-3 font-bold text-primary">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={AVATAR_SRC[r.player.avatar]}
                          alt=""
                          className="h-10 w-10 rounded-full border border-primary/40 object-cover"
                        />
                        <span className="font-semibold">{r.player.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-accent">{r.bestScore}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.bestTime}s</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.games}</td>
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