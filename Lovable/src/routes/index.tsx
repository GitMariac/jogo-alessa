import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { AvatarPicker, AVATAR_SRC } from "@/components/AvatarPicker";
import { findPlayerByName, loginPlayer, registerPlayer, type Player } from "@/lib/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alessa — Jogo de Acentuação" },
      { name: "description", content: "Plataforma gamificada para praticar acentuação da língua portuguesa." },
      { property: "og:title", content: "Alessa — Jogo de Acentuação" },
      { property: "og:description", content: "Pratique acentuação da língua portuguesa em um caça-palavras interativo." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [welcome, setWelcome] = useState<string | null>(null);
  const [existing, setExisting] = useState<Player | null>(null);

  const onStart = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setWelcome(null);
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Informe um nome de usuário.");
      return;
    }
    const found = findPlayerByName(trimmed);
    if (found) {
      setExisting(found);
      return;
    }
    try {
      registerPlayer(name, avatar);
      setWelcome(`Bem-vinda, ${trimmed}!`);
      setTimeout(() => navigate({ to: "/game" }), 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao iniciar.");
    }
  };

  const confirmExisting = () => {
    if (!existing) return;
    loginPlayer(existing.id);
    navigate({ to: "/game" });
  };

  const useOtherName = () => {
    setExisting(null);
    setName("");
  };

  return (
    <Layout>
      <form
        onSubmit={onStart}
        className="mx-auto flex h-full w-full max-w-2xl flex-col items-center justify-center gap-8 p-8 text-center"
      >
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-glow sm:text-5xl">Bem-vindo a Alessa</h2>
          <p className="text-muted-foreground">
            Encontre as palavras com a acentuação correta no tabuleiro.
          </p>
        </div>

        <div className="w-full space-y-3">
          <label className="block text-left text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Escolha seu avatar
          </label>
          <AvatarPicker value={avatar} onChange={setAvatar} />
        </div>

        <div className="w-full space-y-2 text-left">
          <label htmlFor="name" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Nome do jogador
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Nome e Sobrenome"
            className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            maxLength={32}
            required
          />
        </div>

        {error && (
          <p className="w-full rounded-md border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
            {error}
          </p>
        )}

        {welcome && !existing && (
          <div className="w-full space-y-2 rounded-xl border border-primary/60 bg-primary/10 px-4 py-3 text-center">
            <p className="text-lg font-bold text-glow">{welcome}</p>
            <p className="text-xs uppercase tracking-wider text-primary">[Nova Jogadora]</p>
          </div>
        )}

        <button
          type="submit"
          className="rounded-xl bg-primary px-8 py-3 text-lg font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--glow-primary)] transition hover:scale-105"
        >
          Começar Jogo
        </button>
      </form>

      {existing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--glow-primary)]">
            <img
              src={AVATAR_SRC[existing.avatar]}
              alt=""
              className="mx-auto h-20 w-20 rounded-full border-2 border-primary object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                Já existe uma jogadora chamada <span className="text-glow">{existing.name}</span>.
              </p>
              <p className="text-sm text-muted-foreground">Você é essa pessoa?</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={confirmExisting}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--glow-primary)] transition hover:scale-105"
              >
                Sim, sou eu
              </button>
              <button
                type="button"
                onClick={useOtherName}
                className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-bold uppercase tracking-wider text-secondary-foreground transition hover:scale-105"
              >
                Usar outro nome
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
