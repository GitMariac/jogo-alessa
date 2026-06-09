import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";

export const Route = createFileRoute("/creditos")({
  head: () => ({
    meta: [
      { title: "Créditos — Alessa" },
      { name: "description", content: "Equipe e referências do projeto Alessa." },
    ],
  }),
  component: Creditos,
});

function Creditos() {
  return (
    <PageContainer title="Créditos">
      <p>Projeto desenvolvido por <strong>Maria</strong> como ferramenta educacional.</p>
      <h3 className="mt-6 text-xl font-bold text-primary">Tecnologias</h3>
      <ul className="list-disc space-y-1 pl-6">
        <li>TanStack Start + React</li>
        <li>Tailwind CSS</li>
        <li>Canvas Confetti</li>
        <li>Web Audio API</li>
      </ul>
      <h3 className="mt-6 text-xl font-bold text-primary">Referências</h3>
      <p>
        Conteúdo baseado nas regras de acentuação do <em>Acordo Ortográfico da Língua
        Portuguesa</em>.
      </p>
    </PageContainer>
  );
}