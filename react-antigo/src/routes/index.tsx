import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { AvatarPicker } from "@/components/AvatarPicker";
import { registerPlayer } from "@/lib/storage";

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

  const onStart = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      registerPlayer(name, avatar);
      navigate({ to: "/game" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao iniciar.");
    }
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
            placeholder="Ex.: Maria8A"
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

        <button
          type="submit"
          className="rounded-xl bg-primary px-8 py-3 text-lg font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--glow-primary)] transition hover:scale-105"
        >
          Começar Jogo
        </button>
      </form>
    </Layout>
  );
}
