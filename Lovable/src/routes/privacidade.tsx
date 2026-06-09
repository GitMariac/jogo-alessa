import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/Layout";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Privacidade — Alessa" },
      { name: "description", content: "Política de privacidade do jogo Alessa." },
    ],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <PageContainer title="Política de Privacidade">
      <p>
        Os dados do jogador (nome, avatar e histórico de partidas) são armazenados
        localmente no navegador via <code>localStorage</code>. Nenhum dado é enviado a
        terceiros sem consentimento.
      </p>
      <h3 className="mt-6 text-xl font-bold text-primary">Coleta</h3>
      <ul className="list-disc space-y-1 pl-6">
        <li>Nome de usuário informado pelo jogador</li>
        <li>Identificador numérico do avatar escolhido</li>
        <li>Pontuações, acertos, erros e tempo de cada partida</li>
      </ul>
      <h3 className="mt-6 text-xl font-bold text-primary">Compartilhamento</h3>
      <p>
        Quando integrado a uma planilha do Google Sheets via Apps Script, os dados são
        gravados na planilha configurada pelo administrador do projeto.
      </p>
      <h3 className="mt-6 text-xl font-bold text-primary">Remoção</h3>
      <p>O jogador pode limpar todos os dados apagando o armazenamento do navegador.</p>
    </PageContainer>
  );
}