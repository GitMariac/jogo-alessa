# 🎮 Projeto Jogo Educativo - Alessa

Este projeto surgiu como parte avaliativa do Projeto de Extensão da Faculdade de Análise e Desenvolvimento de Sistemas Anhanguera desdobrado de outro projeto desenvolvido na mesma Instituição estadual de ensino no semestre anterior. Estar com a comunidade escolar despertou um desejo de buscar a transformação da educação em escolas públicas através do uso de tecnologias que agregassem ao leque de opções do professor e despertasse nos alunos interesse e incentivo. 

## 📖 Diário de Bordo (Histórico Acadêmico)

### Fase 1: Esboço do Front-End
Começamos fazendo um esboço inicial do Layout a ser implementado no próprio Figma. 
A arquitetura informacional do software priorizou a sobriedade estética, evitando sobrecargas sensoriais que pudessem comprometer a experiência do usuário. Manteve-se, todavia, o alinhamento com os padrões de design vigentes na indústria de jogos atuais do mesmo ramo.

<img width="300" height="150" alt="Captura de tela 2026-03-05 171834" src="https://github.com/user-attachments/assets/1404bf1c-6fde-408c-b746-ad8d4aa699d6" /> <img width="300" height="150" alt="Captura de tela 2026-03-05 172349" src="https://github.com/user-attachments/assets/200254f5-7184-4afa-889b-58c68bb2ce39" /> <img width="300" height="150" alt="Captura de tela 2026-03-05 172739" src="https://github.com/user-attachments/assets/a2bc080c-12f0-4184-a379-b7c4e04052fd" />



A escolha das tonalidades pautou-se em critérios de conforto visual e ergonomia, zelando pelo bem-estar de crianças em fase de maturação. O desenvolvimento da personagem principal, Alessa, originou-se de uma interlocução com a docente de português, atendendo a uma demanda por ferramentas lúdicas no ambiente escolar. Complementando a dimensão autoral do projeto, as representações gráficas (avatares) foram desenvolvidas através da produção digital discente, integrando o talento artístico individual ao ecossistema tecnológico da escola.

Após a etapa de idealização e baixa fidelidade (esboços iniciais) realizada na plataforma Figma, o processo de design evoluiu para a fase de prototipagem de média fidelidade mediante o uso de Inteligência Artificial Generativa. Para tal, foi estruturado um prompt técnico detalhado, parametrizando elementos fundamentais do Design System, tais como paletas cromáticas, tipografia e diretrizes formais de interface. Essa abordagem permitiu a transposição ágil do conceito abstrato para um wireframe estruturado, garantindo a consistência visual e a padronização dos componentes desde os estágios iniciais de desenvolvimento.

Link do projeto:
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/make/6hTi7BbmvCGOLORAkNLXOx/Wireframe-e-Design-System?t=TMLMFfChklPHKjGz-1)

Com o resultado, passamos a implementar A transição do design (Figma) para o código real (React/Vite) refatorando o código para que ele se encaixasse de uma tecnologia para a outra. Nesta fase:

- **Desafios:** Realizamos uma limpeza nas dependências do projeto, corrigindo conflitos de versão do Tailwind CSS que impediam a renderização correta dos estilos. Além disso, estruturamos a base do front-end com a implementação de bibliotecas estratégicas, garantindo que o ambiente de desenvolvimento esteja estável e pronto para a escalabilidade do layout.
- **Aprendizado:** Entendi que "rodar liso no Figma" é um simulacro; a vida real exige configuração de PostCSS, gerenciamento de pacotes via NPM e ajustes manuais de diretivas de CSS. 

Além disso também começamos com os esboços do avatar principal do jogo (A Alessa, inspirada na professora de português). Para a sua criação adotamos um fluxo de co-criação com IA: o conceito e a descrição detalhada foram estruturados via ChatGPT bem como a geração da imagem original, e foi refinada pelo Nano Banana 2. Esse processo permitiu transformar a inspiração na professora de português em uma identidade visual concreta para o jogo.
| Inicial | Comemorando | Triste | Raiva | Feliz | Explicação |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img width="150" height="150" alt="Avatar inicial" src="https://github.com/user-attachments/assets/d106bc73-cae0-447e-8693-74825bbe4f7e" /> | <img width="150" height="150" alt="comemorando" src="https://github.com/user-attachments/assets/7fe30e08-506e-47dd-83eb-3cf71c236e7a" /> | <img width="150" height="150" alt="triste" src="https://github.com/user-attachments/assets/af8144f0-9e36-4992-b665-2da0de313443" /> | <img width="150" height="150" alt="raiva" src="https://github.com/user-attachments/assets/79a4b19d-5df1-4ae6-9d83-cecbb44305cd" /> | <img width="150" height="150" alt="feliz" src="https://github.com/user-attachments/assets/b33aeb1e-adbf-4bea-a28f-b5657409a3eb" /> | <img width="150" height="150" alt="explicação" src="https://github.com/user-attachments/assets/8680297e-26c0-4685-9657-71e5cedd653f" /> |


### 🛠️ Tecnologias e Ferramentas

#### **Design & Concepção Visual**
- ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white) **Figma:** Prototipagem de baixa fidelidade e estruturação de *Wireframes*.
- ![ChatGPT](https://img.shields.io/badge/ChatGPT-74aa9c?style=flat-square&logo=openai&logoColor=white) **ChatGPT:** Geração assistida da arte inicial e identidade visual da protagonista
- ![AI](https://img.shields.io/badge/Nano_Banana_2-blueviolet?style=flat-square&logo=google-gemini&logoColor=white) **Nano Banana 2:** .Engenharia de *prompts* e refinamento do *storytelling* da personagem Alessa.

#### **Desenvolvimento Front-end**
- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) **React + Vite:** Framework e ferramenta de build para alta performance.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) **Tailwind CSS v4:** Estilização utilitária com foco em modernidade e performance (v4).
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) **Framer Motion:** Implementação de micro-interações e transições fluidas.
- ![Lucide](https://img.shields.io/badge/Lucide_React-374151?style=flat-square&logo=lucide&logoColor=white) **Lucide React:** Biblioteca de ícones vetoriais.

### Fase 2: Esboço do Back-End 
Separei a engine da interface para garantir o desacoplamento e melhor manutenção dos componentes do código seguindo a linha do mercado, seguindo padrões de separação de responsabilidades para garantir um código limpo e fácil de manter.

Começamos a pensar na estrutura do caça-palavras e de como seria implementado. Tinhamos duas abordagens iniciais: com o Word Canvas e como estrutura de Matriz. 
Para esta parte, o motor de geração de palavras, recorremos para seu desenvolvimento o auxílio de ferramentas de IA (Gemini/ChatGPT), visando aplicar padrões otimizados de algoritmos de busca e preenchimento de matrizes. Depois Procuramos compreender 

#### 🧩 Game Engine - Caça-Palavras (Word Search)

Este módulo contém a lógica central (Engine) para a geração dinâmica de uma grade de Caça-Palavras. Ele foi desenvolvido em **TypeScript** e foca em eficiência e flexibilidade para diferentes tamanhos de jogo.

##### 📋 Funcionalidades

- **Geração Dinâmica:** Cria grades de qualquer tamanho (N x N).
- **Posicionamento Multi-Direcional:** Suporta palavras na horizontal, vertical e diagonal.
- **Inteligência de Sobreposição:** Permite que palavras compartilhem letras em comum.
- **Preenchimento Automático:** Completa os espaços vazios com letras aleatórias (A-Z).
- **Rastreamento de Respostas:** Retorna as coordenadas exatas das palavras colocadas para facilitar a validação do jogo.

---

#### 🛠️ Estrutura do Código

O motor utiliza três pilares principais:

##### 1. Definições de Tipos
O código utiliza `GridType` para representar a matriz de strings e `Position` para gerenciar coordenadas específicas na grade.

##### 2. Funções de Validação e Escrita
* **`canPlace`**: Verifica se há espaço suficiente e se não há conflito com outras letras.
* **`place`**: Escreve a palavra na grade e mapeia suas coordenadas para o banco de dados do jogo.

##### 3. Algoritmo de Preenchimento
O sistema tenta posicionar cada palavra até 50 vezes em locais aleatórios antes de desistir, garantindo que a grade não fique travada em loops infinitos.

---

#### 🏆 Lógica de Armazenamento e Ranking

O código organiza a persistência em três pilares: Definição de Dados, Gestão de Ranking e Perfil do Usuário.

##### 📋 Funcionalidades
-**Estrutura de Dados (Interface):** O uso da interface RankingEntry garante que todo item no ranking tenha o mesmo formato, evitando erros de dados faltando:
-nome e avatar: Identificação visual do aluno.
-score: Valor numérico para ordenação.
-data: Registro temporal (ISO string) de quando a pontuação foi feita.
-**Funções do Ranking (gameStorage):** O objeto gameStorage centraliza as operações para manter o código limpo e reutilizável. O saveScore salva e processa os dados, recupera a lista atual de jogadores, adiciona a nova pontuação, ordena, persiste convertendo o array para String (JSON) e salva no navegador.
-**getRanking e clearRanking:** O getRanking tenta ler o RANK_KEY. Se estiver vazio (primeira vez jogando), retorna um array vazio [] para evitar erros de renderização. Já o clearRanking remove a chave do ranking. 

-**Perfil do Usuário**: Diferente do ranking, que é uma lista, o perfil (USER_KEY) armazena apenas os dados do aluno atual. Isso permite que o jogo "lembre" quem está jogando sem que ele precise digitar o nome toda vez que iniciar uma nova partida.

--
Nessa fase recebemos os primeiros avatares a serem disponibilizados paraos jogadores escolherem em seu perfil. Ficaram uma fofura! A ideia é que na hora de acesso do jogador ele possa escolher o avatar juntamente a entrada do nome. O avatar ficará no ranking e na identificação do jogador. 


| **Avatar dos jogadores** | | | | | |
| :---: | :---: | :---: | :---: | :---: | :---: |
<img width="150" height="150" alt="1" src="https://github.com/user-attachments/assets/e64e98be-e9c9-42b8-a560-852f1687e82b" /> | <img width="150" height="150" alt="2" src="https://github.com/user-attachments/assets/ee3189f0-da70-4971-88cf-e129a4b2f54f" /> | <img width="150" height="150" alt="3" src="https://github.com/user-attachments/assets/0b05d0e1-a18e-4c0e-8da3-be2fd796f61f" /> | <img width="150" height="150" alt="5" src="https://github.com/user-attachments/assets/0a610001-5832-485a-92c4-eaee5c2629a0" /> | <img width="150" height="150" alt="6" src="https://github.com/user-attachments/assets/6d8a251a-4325-4a01-b2e2-c670e5843138" /> | <img width="150" height="150" alt="7" src="https://github.com/user-attachments/assets/6438b610-c88c-4f18-a88c-dadf3ff5d30a" /> | 
| <img width="150" height="150" alt="8" src="https://github.com/user-attachments/assets/886f3317-77a5-4e9a-b4ca-5214e309c3b0" /> | <img width="150" height="150" alt="9" src="https://github.com/user-attachments/assets/caa0d7ac-a865-422b-a0b0-c7cec94c9391" /> | <img width="150" height="150" alt="10" src="https://github.com/user-attachments/assets/311ea905-bce3-439d-babc-9cddc6b479d8" /> | <img width="150" height="150" alt="11" src="https://github.com/user-attachments/assets/bd392e31-3c53-4422-9c67-9dfde2678aae" /> | <img width="150" height="150" alt="12" src="https://github.com/user-attachments/assets/cb88609b-d195-42b0-88e1-f9359efa489a" /> | |

## Mudança de Arquitetura do Projeto

Ao longo do desenvolvimento do projeto foram constatados vários percalços que acabaram atravancando o avançar do projeto. A mudança para TypeScript, uma linguagem da qual não dominamos, e o excesso de dependências, configurações e abstrações acabou transformando um projeto relativamente simples em uma estrutura difícil de manter dentro do tempo disponível. Em determinados momentos, o foco deixou de ser o desenvolvimento do jogo em si e passou a ser a resolução de problemas de ambiente, build e compatibilidade

Mesmo que, inicialmente, o projeto foi desenvolvido utilizando React e outras ferramentas modernas do ecossistema frontend, com o objetivo de aprofundar os estudos e experimentar uma arquitetura mais robusta, durante o desenvolvimento, a complexidade estrutural começou a crescer além das necessidades reais do projeto.

Diante disso, foi tomada a decisão de reestruturar o projeto utilizando HTML, CSS e JavaScript puros. A escolha não representa um retrocesso técnico, mas sim uma decisão consciente de engenharia e gerenciamento de escopo e tempo, afinal temos prazo para entrega do projeto.

A mudança foi inspirada pelo princípio de que estruturas excessivamente complexas podem prejudicar projetos pequenos ou em fase inicial — ideia frequentemente associada à filosofia do minimalismo em software e ao conceito de *overengineering* (engenharia excessiva).

O objetivo passou a ser:
- priorizar entendimento real da aplicação;
- reduzir dependências externas;
- facilitar manutenção;
- aumentar produtividade;
- garantir a conclusão funcional do projeto.

A versão antiga em React foi mantida dentro do repositório como parte do processo de aprendizagem e da evolução do desenvolvimento e, quem sabe mais tarde por diversão, podemos voltar a ele e desenvolver da maneira que queremos não só com um tema único, mas um conjunto de vários outros temas e habilidades. 

Fizemos a estrutura inspirada no layout inicial.






