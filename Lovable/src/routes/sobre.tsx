import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Alessa" },
      { name: "description", content: "Sobre a aplicação Alessa e seu contexto." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <PageContainer title="Sobre">
      <p>
        <strong>Alessa</strong> é uma aplicação web gamificada criada para auxiliar no
        ensino e prática da acentuação gráfica da língua portuguesa, em um formato
        leve e divertido.
      </p>
      <p className="mt-4">
        A interface segue uma estética <em>cyberpunk minimalista</em> em tema escuro,
        com tipografia clara, glow suave e foco na legibilidade do tabuleiro.
      </p>
    </PageContainer>
  );
}