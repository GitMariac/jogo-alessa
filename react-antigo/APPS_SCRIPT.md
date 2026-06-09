# Alessa — Google Apps Script (planilha "Alessa_Ranking")

A plataforma já roda 100% no navegador usando `localStorage`. Para sincronizar
jogadores e partidas com a planilha Google "Alessa_Ranking" (abas `Jogadores`
e `Partidas`), publique o script abaixo como **Aplicativo Web** e exponha a
URL no frontend (por exemplo em uma variável `VITE_APPS_SCRIPT_URL`).

## Cabeçalhos esperados

- **Jogadores**: `JogadorID | NomeUsuario | Avatar | DataCadastro`
- **Partidas**: `PartidaID | JogadorID | Pontuacao | Acertos | Erros | Tempo | Fase | Data`

## Código (cole em Extensões → Apps Script)

```javascript
const SHEET_ID = '1De46pnM_Ltycbe46esonztgI9cdX8H0SanrtR-rhTyE';

function ss() { return SpreadsheetApp.openById(SHEET_ID); }
function sheet(name) { return ss().getSheetByName(name); }

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  if (action === 'ranking') return jsonOut(getRanking());
  if (action === 'players') return jsonOut(readPlayers());
  if (action === 'matches') {
    const pid = Number(e.parameter.playerId || 0);
    return jsonOut(readMatches().filter(m => !pid || m.JogadorID === pid));
  }
  return jsonOut({ ok: true, hint: 'Use ?action=ranking | players | matches' });
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  const action = (body.action || '').toLowerCase();
  try {
    if (action === 'register') return jsonOut(registerPlayer(body.name, body.avatar));
    if (action === 'match')    return jsonOut(recordMatch(body));
    return jsonOut({ error: 'unknown action' });
  } catch (err) {
    return jsonOut({ error: String(err.message || err) });
  }
}

function readPlayers() {
  const sh = sheet('Jogadores');
  const values = sh.getDataRange().getValues();
  const [head, ...rows] = values;
  return rows.filter(r => r[0] !== '').map(r => ({
    JogadorID: Number(r[0]),
    NomeUsuario: String(r[1]),
    Avatar: Number(r[2]),
    DataCadastro: r[3],
  }));
}

function readMatches() {
  const sh = sheet('Partidas');
  const values = sh.getDataRange().getValues();
  const [head, ...rows] = values;
  return rows.filter(r => r[0] !== '').map(r => ({
    PartidaID: Number(r[0]),
    JogadorID: Number(r[1]),
    Pontuacao: Number(r[2]),
    Acertos: Number(r[3]),
    Erros: Number(r[4]),
    Tempo: Number(r[5]),
    Fase: Number(r[6]),
    Data: r[7],
  }));
}

function registerPlayer(name, avatar) {
  if (!name || !String(name).trim()) throw new Error('Informe um nome de usuário.');
  const players = readPlayers();
  const exists = players.find(p => p.NomeUsuario.toLowerCase() === String(name).trim().toLowerCase());
  if (exists) throw new Error('Nome de usuário já utilizado. Escolha outro nome.');
  const id = (players.at(-1)?.JogadorID || 0) + 1;
  const row = [id, String(name).trim(), Number(avatar), new Date()];
  sheet('Jogadores').appendRow(row);
  return { JogadorID: id, NomeUsuario: row[1], Avatar: row[2], DataCadastro: row[3] };
}

function recordMatch(b) {
  const matches = readMatches();
  const id = (matches.at(-1)?.PartidaID || 0) + 1;
  const row = [id, Number(b.playerId), Number(b.score), Number(b.hits), Number(b.misses), Number(b.timeSec), Number(b.phase || 1), new Date()];
  sheet('Partidas').appendRow(row);
  return { PartidaID: id };
}

function getRanking() {
  const players = readPlayers();
  const matches = readMatches();
  const rows = players.map(p => {
    const mine = matches.filter(m => m.JogadorID === p.JogadorID);
    const bestScore = mine.reduce((a, m) => Math.max(a, m.Pontuacao), 0);
    const bestTime = mine.filter(m => m.Pontuacao === bestScore)
      .reduce((a, m) => (a === 0 ? m.Tempo : Math.min(a, m.Tempo)), 0);
    return { NomeUsuario: p.NomeUsuario, Avatar: p.Avatar, Pontuacao: bestScore, Tempo: bestTime, Partidas: mine.length };
  }).filter(r => r.Partidas > 0);
  rows.sort((a, b) => (b.Pontuacao - a.Pontuacao) || (a.Tempo - b.Tempo));
  return rows;
}
```

## Publicação

1. Em **Implantar → Nova implantação → Tipo: Aplicativo Web**.
2. Executar como **eu**; quem tem acesso: **qualquer pessoa**.
3. Copie a URL `https://script.google.com/macros/s/.../exec`.

No frontend, troque a camada de `storage.ts` por chamadas `fetch(URL, { method: 'POST', body: JSON.stringify({ action: 'register', ... }) })`.