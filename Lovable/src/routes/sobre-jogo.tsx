import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";

export const Route = createFileRoute("/sobre-jogo")({
  head: () => ({
    meta: [
      { title: "Sobre o Jogo — Alessa" },
      { name: "description", content: "Proposta pedagógica e funcionamento do jogo Alessa." },
    ],
  }),
  component: SobreJogo,
});

function SobreJogo() {
  return (
    <PageContainer title="📊 Sobre o Jogo">
      <p>
        <strong>Alessa</strong> é uma plataforma educacional gamificada para a prática da
        acentuação gráfica da língua portuguesa.
      </p>
      <h3 className="mt-6 text-xl font-bold text-primary">Proposta pedagógica</h3>
      <p>
        O jogador encontra palavras em um tabuleiro de 16x16 letras. As palavras aparecem
        em pares: a forma <em>correta</em> e a forma <em>incorreta</em>. O objetivo é localizar
        apenas as formas corretamente acentuadas.
      </p>
      <h3 className="mt-6 text-xl font-bold text-primary">Como jogar</h3>
      <ul className="list-disc space-y-1 pl-6">
        <li>Clique e arraste pelas letras em linha reta (horizontal, vertical ou diagonal).</li>
        <li>Acertou? Ganha pontos e o mascote comemora.</li>
        <li>Errou? A regra de acentuação é exibida para aprendizado.</li>
      </ul>
      <h3 className="mt-6 text-xl font-bold text-primary">Categorias</h3>
      <p>Oxítonas, paroxítonas, regras de hiato e exceções do acordo ortográfico.</p>
    </PageContainer>
  );
}