# Configuração do Google Apps Script & Integração com Planilha

Este documento explica como implantar o script do Google Apps Script e conectar a aplicação React ao Google Sheets.

---

## 1. Configurar o Apps Script na Planilha

Siga os passos abaixo para configurar o código na sua planilha do Google Sheets:

1. Abra a sua planilha pelo link: [Google Sheet](https://docs.google.com/spreadsheets/d/1De46pnM_Ltycbe46esonztgI9cdX8H0SanrtR-rhTyE/edit)
2. No menu superior, clique em **Extensões** > **Apps Script**.
3. Apague qualquer código existente no editor (`Código.gs`) e cole o conteúdo completo do arquivo [google-apps-script.js](file:///C:/faculdade/projeto/google-apps-script.js).
4. No topo esquerdo do painel do Apps Script, clique no ícone de disquete (**Salvar projeto**) ou pressione `Ctrl + S`.
5. Renomeie o projeto para algo descritivo, como `Alessa Match Logger`.

---

## 2. Publicar como Web App

Para que o jogo consiga enviar os dados, o script precisa estar publicado publicamente como um Web App:

1. No canto superior direito da tela do Apps Script, clique em **Implantar** (Deploy) > **Nova implantação** (New deployment).
2. Clique no ícone de engrenagem ao lado de "Selecionar tipo" e selecione **Foco na Web** / **App da Web** (Web App).
3. Preencha as configurações exatamente como descrito abaixo:
   * **Descrição**: `Salvar resultados do jogo`
   * **Executar como** (Execute as): Selecione **Eu** (Sua conta Google / `me`).
   * **Quem tem acesso** (Who has access): Selecione **Qualquer pessoa** (Anyone).
     * > **[!IMPORTANT]**
     * > **Não** selecione "Qualquer pessoa com uma conta do Google" ou "Somente eu". Deve ser **Qualquer pessoa** (ou *Anyone* em inglês), para que o jogo consiga fazer a requisição de gravação sem exigir login dos alunos.
4. Clique em **Implantar**.

---

## 3. Autorizar Permissões

Na primeira implantação, o Google exigirá que você conceda permissão para o script editar suas planilhas:

1. Clique no botão **Autorizar acesso** (Authorize access) que aparecerá na tela.
2. Selecione a sua conta do Google correspondente.
3. Se aparecer um aviso de "O Google não verificou este app" (*Google hasn't verified this app*), clique em **Avançado** (Advanced) no canto inferior esquerdo.
4. Clique em **Acessar Alessa Match Logger (não seguro)** (*Go to Alessa Match Logger (unsafe)*).
5. Na próxima janela, clique em **Permitir** (Allow) para autorizar que o script acesse e modifique as planilhas do Google Drive em seu nome.
6. Copie a **URL do App da Web** gerada (exemplo: `https://script.google.com/macros/s/XXXXX/exec`). Você precisará desta URL no próximo passo.

---

## 4. Integrar com o Projeto React

O código do jogo já foi atualizado para enviar os resultados para o Google Sheets em segundo plano (preservando o funcionamento offline e o `localStorage`).

Para ativar o envio:

1. Na raiz do seu projeto local (`C:\faculdade\projeto`), crie um arquivo chamado `.env` (se ele ainda não existir).
2. Insira a seguinte linha nele, substituindo a URL fictícia pela URL gerada no passo anterior:
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
   ```
3. Se o servidor de desenvolvimento estiver em execução, reinicie-o para carregar as novas variáveis de ambiente.

---

## 5. Estrutura da Planilha ("Resultados")

Certifique-se de que a aba **Resultados** possui a seguinte linha de cabeçalho na primeira linha (Linha 1):

| A | B | C | D | E | F | G | H |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Data** | **Nome** | **Avatar** | **Pontos** | **Acertos** | **Erros** | **Tempo** | **Fase** |

* O script adicionará automaticamente as novas linhas abaixo do cabeçalho a cada fim de rodada.
* Se a aba **Resultados** não existir ou for renomeada, o script retornará um erro `status: "error"`.
