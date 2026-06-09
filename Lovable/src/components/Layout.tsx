import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/logo.png";
import { setCurrentPlayer } from "@/lib/storage";

type NavAction = { icon: string; label: string; to?: string; onClick?: () => void };

function NavBar() {
  const navigate = useNavigate();
  const router = useRouter();
  const actions: NavAction[] = [
    { icon: "🏆", label: "Ranking", to: "/ranking" },
    { icon: "⭐", label: "Meus Scores", to: "/scores" },
    { icon: "📊", label: "Sobre o Jogo", to: "/sobre-jogo" },
    { icon: "⚙️", label: "Configurações", to: "/configuracoes" },
    {
      icon: "⏻",
      label: "Sair",
      onClick: () => {
        setCurrentPlayer(null);
        router.invalidate();
        navigate({ to: "/" });
      },
    },
  ];

  return (
    <nav className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-card/70 px-5 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Link to="/" aria-label="Início">
          <img
            src={logo}
            alt="Alessa"
            className="h-16 w-16 cursor-pointer rounded-full object-cover ring-2 ring-primary/40 transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <Link to="/" aria-label="Início">
          <h1 className="text-2xl font-bold tracking-wide text-glow transition-colors hover:text-primary">
            Alessa
          </h1>
        </Link>
      </div>

      <ul className="flex list-none items-center gap-3">
        {actions.map((a) =>
          a.to ? (
            <li key={a.label}>
              <Link
                to={a.to}
                title={a.label}
                aria-label={a.label}
                className="grid h-12 w-12 place-items-center rounded-full border border-border/60 bg-secondary/70 text-lg text-foreground transition hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--glow-primary)]"
              >
                <span aria-hidden>{a.icon}</span>
              </Link>
            </li>
          ) : (
            <li key={a.label}>
              <button
                type="button"
                title={a.label}
                aria-label={a.label}
                onClick={a.onClick}
                className="grid h-12 w-12 place-items-center rounded-full border border-border/60 bg-secondary/70 text-lg text-foreground transition hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--glow-primary)]"
              >
                <span aria-hidden>{a.icon}</span>
              </button>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/70 px-4 py-4 text-sm backdrop-blur-md">
      <div className="mx-auto flex w-[90%] max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <p className="text-muted-foreground">Projeto desenvolvido por Maria</p>
        <div className="flex flex-wrap gap-4">
          <Link to="/sobre" className="text-foreground transition hover:text-primary">Sobre</Link>
          <Link to="/ranking" className="text-foreground transition hover:text-primary">Ranking</Link>
          <Link to="/creditos" className="text-foreground transition hover:text-primary">Créditos</Link>
          <Link to="/privacidade" className="text-foreground transition hover:text-primary">Política de Privacidade</Link>
        </div>
        <p className="text-muted-foreground">Alessa v0.1</p>
      </div>
    </footer>
  );
}

export function Layout({ children, container = true }: { children: ReactNode; container?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex flex-1 items-center justify-center p-5">
        {container ? (
          <section className="conteudo glass flex w-[92%] max-w-[1200px] flex-col overflow-hidden rounded-2xl border-2 border-border/60 shadow-[var(--shadow-card)]">
            {children}
          </section>
        ) : (
          children
        )}
      </main>
      <Footer />
    </div>
  );
}

/** Convenience wrapper for textual content pages. */
export function PageContainer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Layout>
      <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-8 sm:p-12">
        <h2 className="text-3xl font-bold text-glow sm:text-4xl">{title}</h2>
        <div className="prose prose-invert max-w-none text-base leading-relaxed text-foreground/90">
          {children}
        </div>
      </div>
    </Layout>
  );
}