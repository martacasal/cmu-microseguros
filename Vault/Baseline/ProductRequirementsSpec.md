# Pulso - C2:06: Product Requirements Spec (`ProductRequirementsSpec.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file documents **what the product must do and the rules it must follow**. Sections 1 to 6 are filled in per product. Section 7 is a **fixed rules library** used to audit the product, and must not be edited per product.

**How an LLM should use this file**

1. Treat sections 1 to 4 as the source of truth for the product's problem, scope, data and flows.
2. Flows and screens are referenced by ID. Screen IDs must match the sitemap in the linked Information Architecture file.
3. Skip section 5 and every rule tagged `ai` in section 7 if section 2 says the product has no AI features.
4. When auditing, use section 7 and follow the reporting format in section 8.

**Fontes**: página Notion "MICRO SEGUROS" (Conceito v3, Personas), definição do projeto Pulso (métricas e âmbito), wireframes do grupo (A01 a A07, C01 a C10). As personas do projeto são **sintéticas** (hipóteses do grupo, não dados de campo); nada nesta spec deve ser lido como validado com utilizadores.

- **Version**: 1.0
- **Owner**: Grupo 1 (Nelson Delicado, Marta Casal, Ellen Dámasio, Susana Martins)
- **Last updated**: 2026-11-07
- **Linked IA Sitemap**: `Baseline/InformationArchSpec.md`

---

## 1. Problem and Goal

- **Product Name**: Pulso
- **Problem (the friction users have today)**: Quem pratica atividade física por conta própria, ao ar livre e de forma irregular (uma corrida no parque, uma tarde de surf, uma volta de bicicleta) não tem seguro para esses momentos. O seguro desportivo obrigatório (DL 10/2009) só cobre federados, utilizadores de instalações abertas ao público e participantes de provas; o seguro do ginásio só vale dentro do ginásio. Os produtos de acidentes pessoais em Portugal são anuais ou mensais, não encaixam numa prática irregular e muitas vezes espontânea, e por isso as pessoas decidem que não compensa e ficam descobertas, contando com o SNS. Muitas acham, sem saber, que já estão cobertas pelo ginásio, pelo cartão bancário ou pelo seguro da empresa.
- **Goal (what the user wants to achieve, and how the product helps)**: Ficar coberto só durante a atividade, em poucos toques: dizer o que vai fazer, onde e por quanto tempo, ver para que fica coberto, o que fica de fora, quanto custa e porquê, e saber o que fazer se se magoar. A IA prepara e explica a proposta; a pessoa decide e confirma. Se algo acontecer, um assistente faz a triagem e passa a uma pessoa da equipa.
- **Target Users (role, expertise level, how much data they handle)**: Praticantes ocasionais de atividade física ao ar livre, 18 a 40 anos, a viver ou de passagem em Portugal, não federados na modalidade que vão praticar. Literacia digital variável (de muito alta a média); usam a app no telemóvel, muitas vezes pouco antes de sair. Inclui pessoas com deficiência que praticam desporto adaptado. Lidam com pouca informação: uma sessão de cada vez. Personas de trabalho (sintéticas): Tiago, 31, surf e corrida, decide 1 a 3 h antes; Joana, 36, handbike e canoagem adaptada, teme ser recusada ou pagar mais; Rita, 42, BTT e trail com o filho (fora do corte de idade atual, mantida como referência). Anti-persona: Maria, 64, caminhada em grupo, não compra pelo telemóvel.
- **Success Looks Like (measurable)**: tempo até cobertura ativa < 60 s (mediana, de ATIVAR a ATIVA); compreensão ≥ 80% em 3 perguntas depois de ver PROPOSTA («Estás coberto para quê?», «Quanto custa e porquê?», «O que fazes se te magoares?»); confiança ≥ 5/7 sem diferença entre faixas etárias; diferença de taxa de sucesso por idade e por uso de tecnologias de apoio < 10 p.p.

---

## 2. Scope

- **In Scope**: ativar uma sessão de cobertura por atividade (escolha, proposta explicada pela IA, confirmação e pagamento), sessão ativa (tempo restante, prolongar, parar), exclusão de federados na modalidade, assistente para dúvidas sobre a cobertura com passagem a uma pessoa, início do pedido de ajuda depois de um acidente (triagem de segurança, 112, questionário, resumo, passagem a uma pessoa), proteção opcional do equipamento.
- **Out of Scope**: modelo atuarial e cálculo real do preço, desportos extremos e de alto risco (downhill, alpinismo, paraquedismo), venda B2B e via organizadores de eventos, integrações reais com seguradora, pagamentos e 112, validação jurídica formal, gestão completa do sinistro depois da passagem à equipa, onboarding e criação de conta (fluxo próprio, ainda por adaptar).
- **Platforms**: iOS / Android (app mobile; protótipo em Figma)
- **Accessibility Target**: WCAG 2.2 AA
- **Does This Product Include AI Features?**: Yes. A IA prepara e explica a proposta (PREPARAR, PROPOSTA) e o assistente faz triagem, responde a dúvidas e prepara o resumo do pedido de ajuda (TRIAGEM a PEDIDO).

---

## 3. Key Data

| Object | What It Is | Key Fields Users See | Who Can Change It |
| --- | --- | --- | --- |
| Atividade | Uma atividade do catálogo, com nível de intensidade 1 a 4 | Nome, nível («nível 2, moderada»), se inclui equipamento | Equipa Pulso (catálogo); o utilizador escolhe |
| Proposta | O que a IA prepara para uma atividade, local e duração | Atividade, local, horário, o que cobre (com limites [VALOR]), o que não cobre, preço, fatores do preço, validade | Gerada pela IA; o utilizador altera as escolhas que lhe dão origem |
| Sessão | Uma cobertura paga, com início e fim | Estado (ativa, terminada), atividade, local, início, fim, tempo restante, valor pago | Utilizador (prolongar, parar); termina sozinha no fim |
| Pagamento | O pagamento de uma sessão ou de um prolongamento | Meio (MB WAY, cartão ···· [0000]), valor, estado | Utilizador |
| Conversa | A conversa com o assistente ou com uma pessoa | Mensagens, rótulo de quem escreveu, hora, fonte das respostas | Utilizador e equipa; o assistente escreve mas não apaga |
| Pedido de ajuda | O resumo de um acidente passado à equipa | N.º [REF], sessão, o que aconteceu, onde se magoou, se foi visto por médico, fotos e documentos | Utilizador (antes de enviar e depois, com anexos); equipa Pulso |

---

## 4. Flows

### Flow F1: Ativar uma sessão

- **Starts When**: a pessoa vai praticar uma atividade e quer ficar coberta.
- **Starts on Screen (ID)**: ATIVAR
- **User Does**: escolhe atividade, local e duração; opcionalmente protege o equipamento; lê a proposta; responde à pergunta da federação; escolhe o meio de pagamento; toca em «Ativar e pagar».
- **Steps (user-visible)**:
  1. ATIVAR: escolhe atividade, local e duração e vê a hora de início e fim. Toca em «Ver proposta».
  2. PREPARAR: vê a IA a confirmar os 3 fatores do preço e o contexto. Toca em «Ver proposta».
  3. PROPOSTA: lê o que cobre, o que não cobre, quanto custa e porquê, e o que fazer se se magoar. Toca em «Continuar para pagar».
  4. PAGAR: responde «Não» à pergunta da federação, escolhe MB WAY ou cartão e toca em «Ativar e pagar [PREÇO]».
  5. ATIVA: vê «Estás coberto» e o tempo restante.
- **Success Result the User Sees**: cartão «Estás coberto» com atividade, local, hora de fim e tempo restante (screen ID: ATIVA)
- **Can the User Undo or Cancel?**: Sim, até ao passo 4: voltar em qualquer ecrã não cobra nada e mantém as escolhas. Depois de pagar, pode parar a sessão (PARAR).
- **High-Risk Step Needing Confirmation?**: passo 4, o pagamento («Ativar e pagar [PREÇO]»).
- **What If It Fails?**: pagamento falhado → ERROPAG («Nada foi cobrado», proposta guardada [N] min, «Tentar outra vez» / «Mudar a forma de pagar»). IA não consegue preparar a proposta → estado de erro de PREPARAR com «Tentar outra vez» e «Falar com uma pessoa». Pessoa federada na modalidade → F5.
- **What If There Is No Data Yet?**: primeira utilização: ATIVAR sem atividade recente, com chips das atividades mais comuns de cada nível; sem meio de pagamento, PAGAR pede para adicionar um.

### Flow F2: Prolongar ou parar uma sessão

- **Starts When**: a sessão está ativa e a pessoa precisa de mais tempo, ou acabou mais cedo.
- **Starts on Screen (ID)**: ATIVA
- **User Does**: toca num chip de prolongamento e confirma, ou toca em parar e confirma.
- **Steps (user-visible)**:
  1. ATIVA: toca em «+30 min», «+1 h» ou «+1 h 30».
  2. PROLONGAR: vê a nova hora de fim e o custo; toca em «Confirmar · + [PREÇO]».
  3. ATIVA: vê a nova hora de fim.
- **Success Result the User Sees**: nova hora de fim e tempo restante atualizado (screen ID: ATIVA)
- **Can the User Undo or Cancel?**: Sim, «Cancelar» no popup não altera nada.
- **High-Risk Step Needing Confirmation?**: passo 2 (cobra mais). Parar também é confirmado no popup PARAR.
- **What If It Fails?**: banner em ATIVA «Não foi possível prolongar. A tua sessão continua até às [HH:MM].»
- **What If There Is No Data Yet?**: Não aplicável (só existe com sessão ativa).

### Flow F3: Tirar uma dúvida sobre a cobertura

- **Starts When**: a pessoa não sabe se uma situação está coberta.
- **Starts on Screen (ID)**: TRIAGEM
- **User Does**: escolhe o tema, a sessão e escreve ou dita a dúvida; diz se a resposta ajudou.
- **Steps (user-visible)**:
  1. TRIAGEM: toca em «Tenho uma dúvida sobre a cobertura».
  2. DUVIDA: confirma o tema e escolhe a sessão; escreve a dúvida.
  3. RESPOSTA: lê a resposta com a fonte; responde «Respondeu à tua dúvida?».
  4. Se «Não», EQUIPA: a conversa passa a uma pessoa, que já leu o que escreveu.
- **Success Result the User Sees**: resposta com fonte e «Sim» à pergunta de verificação (screen ID: RESPOSTA), ou uma pessoa na conversa (screen ID: EQUIPA)
- **Can the User Undo or Cancel?**: Sim, «Não é isso, voltar ao início» e voltar em qualquer passo.
- **High-Risk Step Needing Confirmation?**: None
- **What If It Fails?**: baixa confiança do assistente → passa logo a uma pessoa (EQUIPA) em vez de responder; sem rede → banner com a mensagem guardada e o 112.
- **What If There Is No Data Yet?**: sem sessões, DUVIDA oferece só «Dúvida geral, antes de contratar».

### Flow F4: Pedir ajuda depois de um acidente

- **Starts When**: a pessoa magoa-se durante uma sessão.
- **Starts on Screen (ID)**: ATIVA (ou TRIAGEM, via «Aconteceu um acidente»)
- **User Does**: diz se precisa de socorro; liga 112 ou responde a 4 perguntas; confirma o resumo; escolhe como falar com a equipa.
- **Steps (user-visible)**:
  1. ATIVA: toca em «Aconteceu alguma coisa?».
  2. SEGURANCA: responde «Precisas de socorro agora?». Se «Sim, preciso» ou «Não sei» → URGENCIA (Ligar 112, partilhar localização, uma pessoa entra na conversa). Se «Não, estou em segurança» → passo 3.
  3. QUESTIONARIO: responde às 4 perguntas (pode saltar qualquer uma).
  4. RESUMO: confirma o resumo ou corrige; toca em «Confirmar e enviar».
  5. PEDIDO: escolhe falar no chat, ser ligado ou mais tarde; uma pessoa entra com o próximo passo.
- **Success Result the User Sees**: uma pessoa da equipa na conversa, com o pedido n.º [REF] e o próximo passo concreto (screen ID: PEDIDO)
- **Can the User Undo or Cancel?**: Sim, pode sair em qualquer passo; nada é enviado sem «Confirmar e enviar». «Falar já com uma pessoa» salta o questionário a qualquer momento.
- **High-Risk Step Needing Confirmation?**: passo 4, envio do pedido («Confirmar e enviar»).
- **What If It Fails?**: ninguém livre no chat → SEMPESSOAS («Ligar-me nos próximos 15 min», «Ligar já para a linha 24h», «Se for grave, liga 112»); sem rede → mensagem guardada e 112 (funciona sem dados móveis).
- **What If There Is No Data Yet?**: sem sessão ativa, a pergunta 1 do questionário pede a sessão ou permite «Saltar»; o pedido segue para uma pessoa.

### Flow F5: Exclusão por ser federado na modalidade

- **Starts When**: em PAGAR, a pessoa responde «Sim» a «Competes em [atividade] numa federação ou como profissional?».
- **Starts on Screen (ID)**: PAGAR
- **User Does**: lê a explicação e escolhe outra atividade, tira uma dúvida ou corrige a resposta.
- **Steps (user-visible)**:
  1. PAGAR: responde «Sim».
  2. EXCLUSAO: lê porquê (DL 10/2009), que nada foi cobrado e o que pode fazer.
  3. Toca em «Escolher outra atividade» (→ ATIVAR), «Alguma dúvida?» (→ TRIAGEM) ou «Enganei-me, não compito em [atividade]» (→ PAGAR).
- **Success Result the User Sees**: percebe porquê e segue para outra atividade (screen ID: ATIVAR)
- **Can the User Undo or Cancel?**: Sim, «Enganei-me…» volta a PAGAR.
- **High-Risk Step Needing Confirmation?**: None (nada é cobrado)
- **What If It Fails?**: Não aplicável.
- **What If There Is No Data Yet?**: Não aplicável.

---

## 5. AI Behavior (Only if Section 2 Says Yes)

| State | What the User Sees in This Product |
| --- | --- |
| Idle | ATIVAR: ícone de conversa no topo, sem texto nem sugestões a ocupar o ecrã. TRIAGEM: mensagem de apresentação que diz o que o assistente faz («esclarecer dúvidas sobre a tua cobertura ou ajudar-te se aconteceu alguma coisa») e que pode passar a uma pessoa. |
| Thinking | PREPARAR: badge «IA · a preparar» e os fatores do preço a aparecer um a um com visto. Assistente: indicador de escrita com o rótulo «Assistente automático». PROPOSTA a carregar: skeleton dos 4 cartões. |
| Streaming | Assistente: a resposta aparece progressivamente na bolha e pode ser interrompida («Parar»). PREPARAR: os fatores entram um a um. A proposta só é mostrada completa (nunca preço sem porquê). |
| Fallback / Low confidence / Offline | Baixa confiança numa dúvida: aviso «Esta dúvida precisa de uma pessoa. Vou passar a conversa à equipa Pulso. Tempo estimado: [N] min.» (EQUIPA). Falha a preparar a proposta: «Não conseguimos preparar a proposta agora…» + «Tentar outra vez» + «Falar com uma pessoa». Sem pessoas: SEMPESSOAS. Sem rede: banner com a mensagem guardada e o 112. Em todos os ecrãs de acidente, «Falar já com uma pessoa» está sempre visível. |

- **What the AI Can Do on Its Own**: preparar e explicar a proposta a partir das escolhas da pessoa; mostrar contexto informativo (ex.: meteorologia) que não altera a cobertura; responder a dúvidas citando as condições; fazer as 4 perguntas de triagem; preparar o resumo do pedido; passar a conversa a uma pessoa quando não tem confiança.
- **What the AI Only Suggests (user must confirm)**: a proposta (pagamento só com «Ativar e pagar»); prolongamentos (só com «Confirmar · + [PREÇO]»); o resumo do pedido de ajuda (só enviado com «Confirmar e enviar»); a interpretação do tema da conversa («Percebi que é sobre a cobertura. Certo?»).
- **What the AI Must Never Do**: ativar ou cobrar uma sessão; usar a idade, o género ou a condição física ou motora no preço; recusar alguém por deficiência; fingir ser uma pessoa; decidir sozinha um pedido de ajuda ou um sinistro; dar conselho médico; atrasar o acesso ao 112 com perguntas sobre o seguro.
- **How Confidence Is Shown**: respostas automáticas levam o badge «Resposta automática», a fonte («Fonte: Condições da sessão, ponto [X]») e a pergunta «Respondeu à tua dúvida?». Quando a confiança é baixa, o assistente não responde: diz que a dúvida precisa de uma pessoa e passa a conversa. A proposta mostra os fatores usados e os que não usa.
- **How the User Turns AI Help Off or Dismisses It**: em qualquer ecrã do assistente, «Falar já com uma pessoa» (acidente) ou «Não» à pergunta de verificação (dúvida) passam a uma pessoa; «Saltar» em cada pergunta do questionário; «Não é isso, voltar ao início»; voltar sai da conversa sem enviar nada. A ativação não depende do assistente.

---

## 6. Open Questions

- Que limites ([VALOR]) e preço ([PREÇO]) usar no protótipo? Fora de âmbito calcular, mas os testes de compreensão precisam de valores plausíveis.
- A IA prepara a proposta ou só a explica? Se o preço vier de uma tabela fixa por nível, «IA · proposta» pode criar uma expectativa errada (risco de over-claiming).
- A exclusão de federados deve ser perguntada antes de PROPOSTA, para não mostrar um preço a quem não pode comprar?
- Turistas: que meio de pagamento e que língua? O público-alvo inclui turistas, mas a IA e os wireframes são só em PT.
- O corte de 18 a 40 anos é de research (amostra), não do produto. O produto exclui alguém por idade? Se não, Maria e Rita continuam relevantes para os testes de acessibilidade e compreensão.
- AI Act: confirmar se acidentes pessoais com preço calculado por IA é sistema de alto risco.
- Hipóteses de maior risco ainda por validar (survey vaga 1 e entrevistas): há perceção de risco suficiente para pagar; a decisão é espontânea e no telemóvel; um só produto serve perfis muito diferentes; a explicação por IA aumenta a confiança.

---

## 7. Rules Library (Fixed)

Each rule has an ID, a yes/no check, a severity (`high`, `medium`, `low`) and a tag.

- Tag `all` = applies to every screen. Tag `ai` = applies only to screens with AI features.
- Source: **N** = Nielsen's 10 usability heuristics, **G** = Amershi et al. 2019 guidelines for human-AI interaction, **H** = house rule (not from a paper).

### 7.1 Usability (Nielsen)

| ID | Rule | Check | Severity | Tag |
| --- | --- | --- | --- | --- |
| N-01 | Visibility of system status | Does the screen show feedback for loading, progress and state changes? | high | all |
| N-02 | Match with the real world | Are labels in user language, with no internal or database terms? | medium | all |
| N-03 | User control and freedom | Can the user cancel, undo or exit every unwanted state in one step? | high | all |
| N-04 | Consistency and standards | Are the same words and controls used for the same things across screens? | medium | all |
| N-05 | Error prevention | Are destructive actions confirmed, and invalid inputs blocked or flagged early? | high | all |
| N-06 | Recognition over recall | Is needed information visible, so users don't have to remember it? | medium | all |
| N-07 | Flexibility and efficiency | Are there shortcuts or defaults for frequent tasks? | low | all |
| N-08 | Aesthetic and minimal design | Is every element on the screen needed for the screen's goal? | medium | all |
| N-09 | Help users recover from errors | Do error messages say what happened and how to fix it, in plain words? | high | all |
| N-10 | Help and documentation | Is help available in context where users may get stuck? | low | all |

### 7.2 Human-AI Interaction (Amershi)

| ID | Rule | Check | Severity | Tag |
| --- | --- | --- | --- | --- |
| G-01 | Make clear what the system can do | Does the UI state what the AI can and cannot do? | high | ai |
| G-02 | Make clear how well it can do it | Is confidence or reliability shown for AI outputs? | high | ai |
| G-03 | Time services based on context | Does AI help appear only when relevant? | medium | ai |
| G-04 | Show contextually relevant information | Is the AI output tied to the user's current task? | medium | ai |
| G-05 | Match relevant social norms | Is the AI's tone and wording appropriate for the audience? | low | ai |
| G-06 | Mitigate social biases | Are AI outputs free of stereotyped assumptions? | medium | ai |
| G-07 | Support efficient invocation | Can the user call the AI when they want it? | medium | ai |
| G-08 | Support efficient dismissal | Can the user dismiss or ignore AI suggestions in one step? | high | ai |
| G-09 | Support efficient correction | Can the user edit or fix AI output easily? | high | ai |
| G-10 | Scope services when in doubt | When unsure, does the AI ask, offer options or step back? | high | ai |
| G-11 | Make clear why the system did what it did | Can the user see a reason for each AI output or action? | medium | ai |
| G-12 | Remember recent interactions | Does the AI use recent context where it helps the user? | low | ai |
| G-13 | Learn from user behavior | If the AI personalizes, is it clear what it learned? | low | ai |
| G-14 | Update and adapt cautiously | Do AI behavior changes avoid surprising the user? | medium | ai |
| G-15 | Encourage granular feedback | Can the user give feedback on individual AI outputs? | low | ai |
| G-16 | Convey consequences of user actions | Does the UI say how an action will change AI behavior? | low | ai |
| G-17 | Provide global controls | Can the user set how much the AI monitors or acts? | medium | ai |
| G-18 | Notify users about changes | Is the user told when AI capabilities change? | low | ai |

### 7.3 House Rules

| ID | Rule | Check | Severity | Tag |
| --- | --- | --- | --- | --- |
| H-01 | AI idle state | Does the AI show a quiet ready state with its scope, without cluttering the screen? | medium | ai |
| H-02 | AI thinking state | Is there visible feedback while the AI works (badge, skeleton, progress text)? | high | ai |
| H-03 | AI streaming state | Does output appear progressively, and can the user stop it? | medium | ai |
| H-04 | AI fallback state | On low confidence or connection loss, does a banner appear with a manual option and a way back? | high | ai |
| H-05 | No automated high-risk actions | Do deletion, revocation, payments and similar actions always need explicit human confirmation? | high | all |
| H-06 | Primary action visible | Is the screen's single main action visible without scrolling on load? | high | all |
| H-07 | All four states defined | Does every key screen define normal, empty, loading and error states? | high | all |
| H-08 | Navigation matches the sitemap | Do back targets, breadcrumbs and transitions match the IA sitemap? | high | all |

---

## 8. Using This File in an Audit

- Report each failure as a **violation** with these fields: `id` (unique per report), `severity` (from the rule), `rule` (rule ID), `location` (screen ID + element), `found` (what was seen), `expected` (what the rule requires).
- `high` violations come first in the Orchestrator's summary, then `medium`, then `low`; the group decides what to fix.
- Skip rules tagged `ai` if section 2 says the product has no AI features.
- If a rule can't be checked from the available information, report it as "not checkable", not "pass".
