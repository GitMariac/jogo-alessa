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
