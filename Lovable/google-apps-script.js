/**
 * Google Apps Script para receber resultados de partidas e salvá-los no Google Sheets.
 * 
 * ID da Planilha: 1De46pnM_Ltycbe46esonztgI9cdX8H0SanrtR-rhTyE
 * Aba de destino: "Resultados"
 * Colunas na planilha: Data | Nome | Avatar | Pontos | Acertos | Erros | Tempo | Fase
 */

/**
 * Recebe requisições HTTP POST com payloads JSON.
 * 
 * @param {Object} e Objeto de evento fornecido pelo Apps Script.
 * @return {TextOutput} Resposta em formato JSON (sucesso ou erro).
 */
function doPost(e) {
  // Configura um ScriptLock para evitar concorrência (condição de corrida) ao escrever na planilha
  var lock = LockService.getScriptLock();
  try {
    // Tenta adquirir o bloqueio por até 30 segundos
    lock.waitLock(30000);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error", 
        message: "Tempo limite esgotado: Não foi possível obter acesso exclusivo para salvar." 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // Validação básica do corpo da requisição
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Nenhum dado recebido ou formato de requisição inválido.");
    }

    // Lê o conteúdo da requisição POST
    var rawContent = e.postData.contents;
    var data = JSON.parse(rawContent);

    // Valida campos obrigatórios do payload do jogo
    var requiredFields = ["playerName", "avatar", "score", "hits", "misses", "timeSec", "phase", "date"];
    for (var i = 0; i < requiredFields.length; i++) {
      var field = requiredFields[i];
      if (data[field] === undefined || data[field] === null) {
        throw new Error("Campo obrigatório ausente: " + field);
      }
    }

    // Acessa a planilha e a aba "Resultados"
    var spreadsheetId = "1De46pnM_Ltycbe46esonztgI9cdX8H0SanrtR-rhTyE";
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName("Resultados");

    if (!sheet) {
      throw new Error("Aba chamada 'Resultados' não foi encontrada na planilha.");
    }

    // Converte a string de data ISO recebida em um objeto Date para formatação no Sheets
    var dateValue = new Date(data.date);
    if (isNaN(dateValue.getTime())) {
      dateValue = new Date(); // Fallback se a data recebida for inválida
    }

    // Prepara a linha de acordo com as colunas:
    // Data | Nome | Avatar | Pontos | Acertos | Erros | Tempo | Fase
    var rowData = [
      dateValue,         // Data (coluna A)
      data.playerName,   // Nome (coluna B)
      data.avatar,       // Avatar (coluna C)
      data.score,        // Pontos (coluna D)
      data.hits,         // Acertos (coluna E)
      data.misses,       // Erros (coluna F)
      data.timeSec,      // Tempo (coluna G)
      data.phase         // Fase (coluna H)
    ];

    // Adiciona a nova linha
    sheet.appendRow(rowData);

    // Retorna resposta de sucesso estruturada
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Resultado gravado com sucesso." 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Registra erros nos logs de execução do console do Apps Script
    Logger.log("Erro ao processar doPost: " + error.toString());

    // Retorna erro estruturado para o cliente
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error", 
        message: error.message || error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Garante que o lock é liberado para as próximas requisições
    lock.releaseLock();
  }
}
