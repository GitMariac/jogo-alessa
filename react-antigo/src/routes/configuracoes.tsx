import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { AvatarPicker } from "@/components/AvatarPicker";
import {
  getCurrentPlayer,
  getSettings,
  saveSettings,
  updateCurrentPlayer,
  type Player,
  type Settings,
} from "@/lib/storage";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — Alessa" },
      { name: "description", content: "Ajuste nome, avatar e preferências sonoras do jogo." },
    ],
  }),
  component: ConfigPage,
});

function ConfigPage() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(1);
  const [settings, setSettings] = useState<Settings>({ musicMuted: false, sfxMuted: false });
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    const p = getCurrentPlayer();
    setPlayer(p);
    if (p) {
      setName(p.name);
      setAvatar(p.avatar);
    }
    setSettings(getSettings());
  }, []);

  const toggle = (k: keyof Settings) => {
    const next = { ...settings, [k]: !settings[k] };
    setSettings(next);
    saveSettings(next);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!player) return;
    try {
      const updated = updateCurrentPlayer({ name, avatar });
      setPlayer(updated);
      setMsg({ type: "ok", text: "Preferências salvas!" });
    } catch (err) {
      setMsg({ type: "err", text: err instanceof Error ? err.message : "Erro" });
    }
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-6 sm:p-10">
        <header>
          <h2 className="text-3xl font-bold text-glow sm:text-4xl">⚙️ Configurações</h2>
          <p className="text-muted-foreground">Ajuste seu perfil e preferências de áudio.</p>
        </header>

        {!player ? (
          <div className="rounded-xl border border-border bg-card/60 p-6 text-center">
            <p className="text-muted-foreground">Você precisa entrar para editar seu perfil.</p>
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="mt-4 rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground shadow-[var(--glow-primary)]"
            >
              Ir para o início
            </button>
          </div>
        ) : (
          <form onSubmit={onSave} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Nome do jogador
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                maxLength={32}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Avatar
              </label>
              <AvatarPicker value={avatar} onChange={setAvatar} />
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Áudio
              </h3>
              <label className="flex items-center justify-between gap-4">
                <span>Avisos sonoros (efeitos)</span>
                <input
                  type="checkbox"
                  checked={!settings.sfxMuted}
                  onChange={() => toggle("sfxMuted")}
                  className="h-5 w-5"
                />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Música de fundo</span>
                <input
                  type="checkbox"
                  checked={!settings.musicMuted}
                  onChange={() => toggle("musicMuted")}
                  className="h-5 w-5"
                />
              </label>
            </div>

            {msg && (
              <p
                className={
                  "rounded-md px-3 py-2 text-sm " +
                  (msg.type === "ok"
                    ? "border border-accent/60 bg-accent/10 text-accent"
                    : "border border-destructive/60 bg-destructive/10 text-destructive")
                }
              >
                {msg.text}
              </p>
            )}

            <button
              type="submit"
              className="self-start rounded-xl bg-primary px-6 py-3 font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--glow-primary)] transition hover:scale-105"
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}