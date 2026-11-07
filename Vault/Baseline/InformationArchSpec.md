# Pulso - C2:06: Information Architecture Spec (`InformationArchSpec.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file documents the **structure of a digital product**: which screens exist, how they connect, what each one is for, how key screens are laid out and what the user sees in each state.

**How an LLM should use this file**

1. Treat the sitemap in section 1 as the complete list of screens: every screen and every navigation target you design is one listed there.
2. Use the screen cards in section 2 for each screen's goal, main action, content and navigation.
3. Use the layout tables in section 3 and the states in section 4 to design the detail of key screens.
4. The **Rules** in section 5 override any other interpretation of this file.

**Fontes deste ficheiro**: wireframes do grupo (`wireframes_png/A01` a `A07` e `C01` a `C10`, novembro 2026), breadboard em [[Baseline/C2-05/Fluxo StartInsurance/StructureIdea]] e `IMG_8682.jpg`, página Notion "MICRO SEGUROS" (Conceito v3, Personas, Info Architecture). Onde os wireframes e o breadboard divergem, mandam os wireframes, que são mais recentes. As divergências estão em §6.

**Língua**: toda a copy de interface é em Português de Portugal. Os textos entre «» são copy literal dos wireframes.

---

## 1. Sitemap

- **Version**: 1.0
- **Owner**: Grupo 1 (Nelson Delicado, Marta Casal, Ellen Dámasio, Susana Martins)
- **Last updated**: 2026-11-07
- **Entry Point (where a new user lands first)**: ATIVAR

Navegação global: barra inferior com 3 tabs (`Sessões`, `Ativar`, `Perfil`) em ATIVAR, ATIVA, SESSOES e PERFIL. O ícone de conversa no topo de ATIVAR e ATIVA abre TRIAGEM. Os ecrãs do assistente (C) não têm barra inferior.

````markdown
ATIVAR - Ativar uma sessão                         [A01]
  PREPARAR - A preparar a tua proposta             [A02]
    PROPOSTA - Proposta explicada                  [A03]
      PAGAR - Só falta confirmar                   [A04]
        EXCLUSAO - Não te podemos cobrir           [A06]
        ERROPAG - Ainda não estás coberto          [A07]
        ATIVA - Sessão ativa                       [A05]
          PROLONGAR - Confirmar prolongamento (popup)
          PARAR - Confirmar fim da sessão (popup)
          SEGURANCA - Precisas de socorro agora?   [C05]
  TRIAGEM - Assistente Pulso                       [C01]
    DUVIDA - Sobre que sessão é a dúvida?          [C02]
      RESPOSTA - Resposta automática               [C03]
        EQUIPA - Dúvida passada à equipa           [C04]
    SEGURANCA - Precisas de socorro agora?         [C05]
      URGENCIA - Pedir ajuda (socorro)             [C06]
      QUESTIONARIO - 4 perguntas rápidas           [C07]
        RESUMO - É isto que vou passar à equipa?   [C08]
          PEDIDO - Pedido com uma pessoa           [C09]
            SEMPESSOAS - Ninguém livre no chat     [C10]
SESSOES - Sessões (tab)
PERFIL - Perfil (tab)
````

SEGURANCA aparece duas vezes porque tem duas entradas (ATIVA e TRIAGEM). É o mesmo ecrã.

**Happy path (ativação)**: ATIVAR → PREPARAR → PROPOSTA → PAGAR → ATIVA.

---

## 2. Screens

### Screen: Ativar uma sessão (ATIVAR)

- **User's Goal**: Dizer o que vai fazer, onde e durante quanto tempo, para ver quanto custa ficar coberto.
- **Main Action (one button)**: «Ver proposta»
- **Secondary Actions**: escolher atividade (dropdown + chips das atividades recentes), escolher local (pré-preenchido com a localização atual), escolher duração (dropdown + chips «+30 min», «+1 h», «+1 h 30»), ativar «Proteger o equipamento» (opcional, com preço), abrir o assistente (ícone de conversa).
- **Must-Have Content**: saudação com o nome, campos Atividade / Onde / Duração, hora de início e fim calculada («Começa agora: das 10:15 às 11:15»), opção de equipamento com o preço extra, microcopy «Ainda não pagas nada.»
- **Comes From**: entrada da app; tab `Ativar`; EXCLUSAO («Escolher outra atividade»)
- **Goes Next To**: PREPARAR (via «Ver proposta»); TRIAGEM (via ícone de conversa); SESSOES e PERFIL (via tabs)
- **Back Goes To**: nenhum (ecrã raiz da tab)
- **Risky Actions Needing Confirmation**: None (nada é cobrado aqui)

### Screen: A preparar a tua proposta (PREPARAR)

- **User's Goal**: Perceber o que a IA está a ter em conta enquanto calcula a proposta.
- **Main Action (one button)**: «Ver proposta» (ativo quando o cálculo termina; no breadboard original o avanço era automático, ver §6)
- **Secondary Actions**: voltar para corrigir a escolha.
- **Must-Have Content**: badge «IA · a preparar», bloco «O que conta para o preço» com os 3 fatores confirmados (atividade e nível, local, duração e horário), a frase «Não usamos a tua idade nem a tua condição física.», bloco «Contexto» com informação de contexto que não altera a cobertura (ex.: meteorologia).
- **Comes From**: ATIVAR
- **Goes Next To**: PROPOSTA (via «Ver proposta»)
- **Back Goes To**: ATIVAR (com as escolhas mantidas)
- **Risky Actions Needing Confirmation**: None

### Screen: Proposta explicada (PROPOSTA)

- **User's Goal**: Saber, antes de pagar, para que está coberto, o que fica de fora, quanto custa e porquê, e o que fazer se se magoar.
- **Main Action (one button)**: «Continuar para pagar [PREÇO]»
- **Secondary Actions**: «Ler as condições completas (PDF)»; botão secundário abaixo do principal (cortado no wireframe A03, ver §6); voltar.
- **Must-Have Content**: badge «IA · proposta»; título com atividade, local e horário; bloco «Estás coberto para» (despesas médicas até [VALOR], lesão com consequências para a vida até [VALOR]); bloco «Não estás coberto para» (fora do horário, provas e treinos federados da modalidade, danos no equipamento se não foi escolhido); bloco «Quanto custa e porquê» (preço + os 3 fatores + «A tua idade e a tua condição física não contam.»); bloco «Se te magoares» (explica «Aconteceu alguma coisa?», 112 e passagem a uma pessoa).
- **Comes From**: PREPARAR
- **Goes Next To**: PAGAR (via «Continuar para pagar»)
- **Back Goes To**: ATIVAR (com as escolhas mantidas, para alterar)
- **Risky Actions Needing Confirmation**: None (o pagamento é confirmado em PAGAR)

### Screen: Só falta confirmar (PAGAR)

- **User's Goal**: Confirmar que pode ser coberto e pagar.
- **Main Action (one button)**: «Ativar e pagar [PREÇO]»
- **Secondary Actions**: responder à pergunta de exclusão («Competes em [atividade] numa federação ou como profissional?» Não / Sim, com «Não» pré-selecionado), escolher meio de pagamento (MB WAY / Cartão ···· [0000]).
- **Must-Have Content**: resumo da sessão (atividade, local, data e horário, preço), pergunta de federação com a explicação («Se sim, já tens o seguro da federação e o [atividade] não fica coberto aqui.»), meio de pagamento, microcopy «Começa assim que pagares. Não há renovação.»
- **Comes From**: PROPOSTA; ERROPAG («Tentar outra vez», «Mudar a forma de pagar»)
- **Goes Next To**: ATIVA (pagamento concluído); EXCLUSAO (se responder «Sim»); ERROPAG (pagamento falhou)
- **Back Goes To**: PROPOSTA
- **Risky Actions Needing Confirmation**: pagamento. O botão «Ativar e pagar [PREÇO]» é a confirmação explícita e mostra o valor no próprio rótulo.

### Screen: Não te podemos cobrir (EXCLUSAO)

- **User's Goal**: Perceber porque não pode ser coberto nesta atividade e o que pode fazer em vez disso.
- **Main Action (one button)**: «Escolher outra atividade»
- **Secondary Actions**: «Alguma dúvida?» (abre TRIAGEM), «Enganei-me, não compito em [atividade]» (volta a PAGAR com «Não» selecionado).
- **Must-Have Content**: título «Não te podemos cobrir no [atividade]», explicação em linguagem simples, base legal («Base: Decreto-Lei 10/2009.»), «Nada foi cobrado.», bloco «O que podes fazer» (confirmar com a federação; cobrir outra atividade em que não compete).
- **Comes From**: PAGAR
- **Goes Next To**: ATIVAR (via «Escolher outra atividade»); TRIAGEM (via «Alguma dúvida?»); PAGAR (via «Enganei-me…»)
- **Back Goes To**: PAGAR
- **Risky Actions Needing Confirmation**: None

### Screen: Ainda não estás coberto (ERROPAG)

- **User's Goal**: Perceber que o pagamento falhou, que nada foi cobrado, e tentar de novo.
- **Main Action (one button)**: «Tentar outra vez»
- **Secondary Actions**: «Mudar a forma de pagar»
- **Must-Have Content**: ícone de erro, título «Ainda não estás coberto», o que falhou («O pagamento por MB WAY não foi concluído.»), «Nada foi cobrado e a cobertura não está ativa.», validade da proposta («A proposta fica guardada durante [N] minutos, com o mesmo preço.»)
- **Comes From**: PAGAR
- **Goes Next To**: PAGAR (nas duas ações)
- **Back Goes To**: PAGAR
- **Risky Actions Needing Confirmation**: None (repetir o pagamento passa de novo pela confirmação em PAGAR)

### Screen: Sessão ativa (ATIVA)

- **User's Goal**: Saber que está coberto e até quando, prolongar se precisar, e pedir ajuda se se magoar.
- **Main Action (one button)**: «Aconteceu alguma coisa?»
- **Secondary Actions**: prolongar («+30 min», «+1 h», «+1 h 30», abre PROLONGAR), parar a sessão (abre PARAR, ver §6), abrir o assistente (ícone de conversa), tabs.
- **Must-Have Content**: título «Sessão ativa», cartão com «Estás coberto», atividade e local, hora de fim e tempo restante («Até às 11:15 · faltam 58 min»), barra de progresso, «Avisamos 15 min antes do fim.», rótulo «Prolongar (pagas só se confirmares)».
- **Comes From**: PAGAR (pagamento concluído); tab `Ativar` enquanto há sessão ativa; SESSOES
- **Goes Next To**: SEGURANCA (via «Aconteceu alguma coisa?»); PROLONGAR (popup); PARAR (popup); TRIAGEM (via ícone de conversa)
- **Back Goes To**: nenhum (ecrã raiz da tab enquanto a sessão dura)
- **Risky Actions Needing Confirmation**: prolongar (cobra mais), parar (termina a cobertura)

### Screen: Confirmar prolongamento (PROLONGAR) (popup)

- **User's Goal**: Confirmar o tempo extra e o seu custo.
- **Main Action (one button)**: «Confirmar · + [PREÇO]»
- **Secondary Actions**: «Cancelar»
- **Must-Have Content**: tempo extra escolhido, nova hora de fim, preço adicional, meio de pagamento.
- **Comes From**: ATIVA
- **Goes Next To**: ATIVA (com a nova hora de fim)
- **Back Goes To**: ATIVA (sem alterações)
- **Risky Actions Needing Confirmation**: o próprio popup é a confirmação do pagamento adicional.

### Screen: Confirmar fim da sessão (PARAR) (popup)

- **User's Goal**: Terminar a cobertura antes do fim, sabendo o que isso implica.
- **Main Action (one button)**: «Sim, parar agora»
- **Secondary Actions**: «Cancelar»
- **Must-Have Content**: aviso de que a cobertura termina nesse momento; política de reembolso do tempo não usado (por definir, ver §6).
- **Comes From**: ATIVA
- **Goes Next To**: ATIVAR (sessão terminada)
- **Back Goes To**: ATIVA (sessão continua)
- **Risky Actions Needing Confirmation**: o próprio popup é a confirmação.

### Screen: Assistente Pulso (TRIAGEM)

- **User's Goal**: Dizer ao assistente que tipo de ajuda precisa.
- **Main Action (one button)**: escolher um dos 3 temas («Tenho uma dúvida sobre a cobertura», «Aconteceu um acidente», «Outro assunto»)
- **Secondary Actions**: escrever ou ditar uma mensagem livre (campo + microfone + enviar), menu «···».
- **Must-Have Content**: cabeçalho «Assistente Pulso · Automático · não é uma pessoa», mensagem de apresentação que diz o que o assistente faz e que pode passar a conversa a uma pessoa, «Em que posso ajudar?», chips dos 3 temas.
- **Comes From**: ícone de conversa em ATIVAR ou ATIVA; EXCLUSAO («Alguma dúvida?»)
- **Goes Next To**: DUVIDA (dúvida); SEGURANCA (acidente)
- **Back Goes To**: ecrã de origem
- **Risky Actions Needing Confirmation**: None

### Screen: Sobre que sessão é a dúvida? (DUVIDA)

- **User's Goal**: Confirmar ao assistente o tema e a sessão da dúvida.
- **Main Action (one button)**: escolher a sessão (chip com a sessão atual)
- **Secondary Actions**: «Outra sessão», «Dúvida geral, antes de contratar», «Não é isso, voltar ao início», campo livre.
- **Must-Have Content**: confirmação do tema («Percebi que é sobre a cobertura. Certo?» com resposta do utilizador), pergunta «Sobre que sessão é a dúvida?», chips das sessões.
- **Comes From**: TRIAGEM
- **Goes Next To**: RESPOSTA (depois de escrever a dúvida)
- **Back Goes To**: TRIAGEM (também via «Não é isso, voltar ao início»)
- **Risky Actions Needing Confirmation**: None

### Screen: Resposta automática (RESPOSTA)

- **User's Goal**: Ter uma resposta clara à dúvida, com a fonte.
- **Main Action (one button)**: responder «Respondeu à tua dúvida?» (Sim / Não)
- **Secondary Actions**: «Abrir as condições», campo livre.
- **Must-Have Content**: badge «Resposta automática», resposta curta que começa por «Sim» ou «Não», explicação, fonte com o ponto das condições («Fonte: Condições da sessão, ponto [5.1]»), pergunta de verificação.
- **Comes From**: DUVIDA
- **Goes Next To**: EQUIPA (se «Não» ou se a confiança for baixa); TRIAGEM (se «Sim»)
- **Back Goes To**: DUVIDA
- **Risky Actions Needing Confirmation**: None

### Screen: Dúvida passada à equipa (EQUIPA)

- **User's Goal**: Ter a dúvida resolvida por uma pessoa, sem repetir o que já escreveu.
- **Main Action (one button)**: escrever à pessoa (campo «Escreve ao Rui»)
- **Secondary Actions**: ligar (ícone de telefone).
- **Must-Have Content**: aviso de passagem («Esta dúvida precisa de uma pessoa. Vou passar a conversa à equipa Pulso. Tempo estimado: 5 min. A pessoa vai ver o que já escreveste.»), marcador de entrada da pessoa com hora, cabeçalho com nome e «Pessoa», primeira mensagem da pessoa a dizer que é uma pessoa e que já leu a conversa.
- **Comes From**: RESPOSTA
- **Goes Next To**: nenhum (conversa termina aqui)
- **Back Goes To**: TRIAGEM
- **Risky Actions Needing Confirmation**: None

### Screen: Precisas de socorro agora? (SEGURANCA)

- **User's Goal**: Dizer se precisa de socorro imediato.
- **Main Action (one button)**: «Sim, preciso»
- **Secondary Actions**: «Não, estou em segurança», «Não sei», barra fixa «Falar já com uma pessoa».
- **Must-Have Content**: barra «Falar já com uma pessoa» no topo, «Lamento o que aconteceu. Antes de tudo: precisas de socorro agora?», nota «O 112 funciona mesmo sem dados móveis.»
- **Comes From**: ATIVA («Aconteceu alguma coisa?»); TRIAGEM («Aconteceu um acidente»)
- **Goes Next To**: URGENCIA («Sim, preciso» e «Não sei»); QUESTIONARIO («Não, estou em segurança»); PEDIDO («Falar já com uma pessoa»)
- **Back Goes To**: ecrã de origem
- **Risky Actions Needing Confirmation**: None

### Screen: Pedir ajuda (URGENCIA)

- **User's Goal**: Ligar para o socorro e ter alguém da equipa com ele.
- **Main Action (one button)**: «Ligar 112»
- **Secondary Actions**: «Partilhar a minha localização» (com local e precisão), escrever à pessoa da equipa.
- **Must-Have Content**: cabeçalho «Pedir ajuda · [NOME], da equipa Pulso, está contigo», botão 112 em destaque, localização atual, entrada de uma pessoa na conversa com hora, mensagem da pessoa.
- **Comes From**: SEGURANCA
- **Goes Next To**: chamada para o 112 (fora da app); partilha de localização (sistema)
- **Back Goes To**: SEGURANCA
- **Risky Actions Needing Confirmation**: partilhar a localização (pedido de permissão do sistema)

### Screen: 4 perguntas rápidas (QUESTIONARIO)

- **User's Goal**: Descrever o que aconteceu para preparar o pedido de ajuda.
- **Main Action (one button)**: responder à pergunta atual (chips ou texto)
- **Secondary Actions**: «Saltar», barra fixa «Falar já com uma pessoa», campo livre e ditado.
- **Must-Have Content**: aviso inicial («Vou fazer-te 4 perguntas rápidas… Demora cerca de 2 minutos. Podes saltar qualquer pergunta ou passar já para uma pessoa.»), contador «N de 4», as 4 perguntas (sessão, o que aconteceu, onde se magoou, se já foi visto por um médico).
- **Comes From**: SEGURANCA
- **Goes Next To**: RESUMO (depois da pergunta 4); PEDIDO («Falar já com uma pessoa»)
- **Back Goes To**: SEGURANCA
- **Risky Actions Needing Confirmation**: None

### Screen: É isto que vou passar à equipa? (RESUMO)

- **User's Goal**: Verificar o resumo que a IA preparou antes de o enviar a uma pessoa.
- **Main Action (one button)**: «Confirmar e enviar»
- **Secondary Actions**: «Corrigir», barra fixa «Falar já com uma pessoa».
- **Must-Have Content**: título «É isto que vou passar à equipa. Está correto?», campos Sessão / O que aconteceu / Onde se magoou / Médico, «Fotos e documentos: podes enviar depois.», microcopy «Nada é enviado sem confirmares.»
- **Comes From**: QUESTIONARIO
- **Goes Next To**: PEDIDO (via «Confirmar e enviar»); QUESTIONARIO (via «Corrigir»)
- **Back Goes To**: QUESTIONARIO
- **Risky Actions Needing Confirmation**: envio do pedido de ajuda. O botão «Confirmar e enviar» é a confirmação.

### Screen: Pedido com uma pessoa (PEDIDO)

- **User's Goal**: Ser acompanhado por uma pessoa da equipa no pedido.
- **Main Action (one button)**: escolher como quer ser contactado («Falar agora no chat»)
- **Secondary Actions**: «Ligar-me», «Mais tarde», ligar (ícone), enviar foto ou documento (câmara).
- **Must-Have Content**: cabeçalho com nome, «Pessoa · pedido n.º [REF]», aviso de passagem («A partir de agora vais falar com uma pessoa… Ela já tem o teu resumo, não precisas de repetir.»), marcador de entrada com hora, mensagem da pessoa com o próximo passo concreto (ex.: urgência mais próxima).
- **Comes From**: RESUMO; barra «Falar já com uma pessoa» em SEGURANCA, QUESTIONARIO e RESUMO
- **Goes Next To**: SEMPESSOAS (se ninguém estiver disponível)
- **Back Goes To**: TRIAGEM
- **Risky Actions Needing Confirmation**: None

### Screen: Ninguém livre no chat (SEMPESSOAS)

- **User's Goal**: Continuar a ter ajuda humana mesmo sem ninguém disponível no chat.
- **Main Action (one button)**: «Ligar-me nos próximos 15 min»
- **Secondary Actions**: «Ligar já para a linha 24h»
- **Must-Have Content**: aviso «Ninguém livre no chat agora», «O teu pedido já está registado (n.º [REF]).», tempo de espera da linha 24h, «Se for grave, liga 112.»
- **Comes From**: PEDIDO
- **Goes Next To**: chamada (fora da app) ou confirmação de pedido de chamada
- **Back Goes To**: PEDIDO
- **Risky Actions Needing Confirmation**: None

### Screen: Sessões (SESSOES)

- **User's Goal**: Ver a sessão ativa e as sessões anteriores.
- **Main Action (one button)**: abrir uma sessão
- **Secondary Actions**: tabs.
- **Must-Have Content**: sessão ativa no topo (se existir), lista de sessões passadas com atividade, local, data, duração e valor pago.
- **Comes From**: tab `Sessões`
- **Goes Next To**: ATIVA (sessão ativa)
- **Back Goes To**: nenhum (ecrã raiz da tab)
- **Risky Actions Needing Confirmation**: None
- *Ecrã sem wireframe. Fora do happy path.*

### Screen: Perfil (PERFIL)

- **User's Goal**: Gerir os dados pessoais e os meios de pagamento.
- **Main Action (one button)**: editar dados
- **Secondary Actions**: gerir meios de pagamento, ver condições gerais, tabs.
- **Must-Have Content**: nome, meios de pagamento guardados, acesso às condições.
- **Comes From**: tab `Perfil`
- **Goes Next To**: nenhum
- **Back Goes To**: nenhum (ecrã raiz da tab)
- **Risky Actions Needing Confirmation**: remover meio de pagamento
- *Ecrã sem wireframe. Fora do happy path.*

---

## 3. Layout of Key Screens

Plataforma: telemóvel (390 pt de largura de referência). Todos os ecrãs são de coluna única.

### Layout: Ativar uma sessão (ATIVAR)

| Area | Position | Size | Contents |
| --- | --- | --- | --- |
| Top bar | Top | Full width | Saudação («Bom dia,» + nome) à esquerda, ícone de conversa à direita |
| Main area | Centro | ~70% | Atividade (dropdown + chips), Onde (dropdown), Duração (dropdown + chips), hora de início e fim, opção «Proteger o equipamento» |
| Action area | Acima da barra inferior | Full width | «Ver proposta» + «Ainda não pagas nada.» |
| Bottom bar | Bottom | Full width | Tabs Sessões / Ativar / Perfil |

- **Behavior on Mobile**: é o layout de base. Com texto grande (200%), a área principal faz scroll e a área de ação fica fixa.
- **Main Action Visible Without Scrolling**: Yes

### Layout: Proposta explicada (PROPOSTA)

| Area | Position | Size | Contents |
| --- | --- | --- | --- |
| Top bar | Top | Full width | Voltar |
| Header | Abaixo da top bar | Full width | Badge «IA · proposta», título com atividade, local e horário |
| Main area | Centro (scroll) | ~75% | Cartões por esta ordem: Estás coberto para · Não estás coberto para · Quanto custa e porquê · Se te magoares · link para o PDF |
| Action area | Bottom, fixa | Full width | «Continuar para pagar [PREÇO]» + ação secundária |

- **Behavior on Mobile**: os cartões fazem scroll por baixo da área de ação fixa. A ordem dos cartões não muda.
- **Main Action Visible Without Scrolling**: Yes (área de ação fixa)

### Layout: Sessão ativa (ATIVA)

| Area | Position | Size | Contents |
| --- | --- | --- | --- |
| Top bar | Top | Full width | «Sessão ativa» + ícone de conversa |
| Main area | Topo | ~35% | Cartão de cobertura (estado, atividade, local, fim, tempo restante, progresso, aviso dos 15 min) |
| Secondary area | Meio | ~20% | «Prolongar (pagas só se confirmares)» + chips |
| Action area | Acima da barra inferior | Full width | «Aconteceu alguma coisa?» |
| Bottom bar | Bottom | Full width | Tabs |

- **Behavior on Mobile**: é o layout de base. A área de ação nunca sai do ecrã.
- **Main Action Visible Without Scrolling**: Yes

### Layout: Ecrãs do assistente (TRIAGEM, DUVIDA, RESPOSTA, SEGURANCA, QUESTIONARIO, RESUMO, EQUIPA, PEDIDO)

| Area | Position | Size | Contents |
| --- | --- | --- | --- |
| Top bar | Top | Full width | Voltar, nome do interlocutor e linha de identidade («Automático · não é uma pessoa» ou «Pessoa»), menu ou telefone |
| Human bar | Abaixo da top bar | Full width | «Falar já com uma pessoa» (só nos ecrãs de acidente: SEGURANCA, QUESTIONARIO, RESUMO) |
| Main area | Centro (scroll) | ~70% | Mensagens: assistente à esquerda com rótulo «Assistente automático», utilizador à direita com rótulo «Tu», pessoa à esquerda com rótulo «[NOME] (pessoa)» e contorno forte; avisos de sistema centrados |
| Bottom bar | Bottom | Full width | Campo de texto + microfone (ou câmara) + enviar; em RESUMO, «Corrigir» + «Confirmar e enviar» |

- **Behavior on Mobile**: as mensagens novas entram por baixo e a lista acompanha. O teclado empurra a barra inferior para cima.
- **Main Action Visible Without Scrolling**: Yes

---

## 4. States

### ATIVAR

| State | What the User Sees |
| --- | --- |
| Normal | Campos preenchidos com a última atividade, local atual e 1 h; hora de início e fim calculada; «Ver proposta» ativo. |
| Empty / First use | Saudação sem atividade recente; dropdown de atividade vazio com chips das atividades mais comuns de cada nível (caminhada, corrida, ciclismo, surf, handbike); «Ver proposta» desativado até haver atividade («Escolhe uma atividade»). |
| Loading | Localização a ser obtida: campo «Onde» com indicador e texto «A procurar onde estás…»; o resto do formulário já é editável. |
| Error | Sem localização: «Não conseguimos saber onde estás. Escolhe o local na lista.» Atividade não coberta pelo catálogo: mensagem inline no campo com alternativa. |

### PREPARAR

| State | What the User Sees |
| --- | --- |
| Normal | Badge «IA · a preparar»; os 3 fatores aparecem um a um com visto; bloco «Contexto». |
| Empty / First use | Igual ao normal (não depende de histórico). |
| Loading | É o próprio estado de loading: fatores a aparecer, botão desativado. |
| Error | Fallback: «Não conseguimos preparar a proposta agora. As tuas escolhas ficam guardadas.» + «Tentar outra vez» + «Falar com uma pessoa». |

### PROPOSTA

| State | What the User Sees |
| --- | --- |
| Normal | Os 4 cartões e o preço completos. |
| Empty / First use | Igual ao normal; o cartão «Se te magoares» é obrigatório também para quem nunca usou. |
| Loading | Skeleton dos 4 cartões com o título já visível; botão desativado. |
| Error | Proposta expirada ou preço alterado: banner «Esta proposta já não é válida. Vamos preparar outra com as mesmas escolhas.» + «Atualizar proposta». |

### PAGAR

| State | What the User Sees |
| --- | --- |
| Normal | Resumo, pergunta da federação com «Não», meio de pagamento escolhido, botão com o preço. |
| Empty / First use | Sem meio de pagamento guardado: «Pagar com» mostra «Adicionar MB WAY» e «Adicionar cartão»; botão desativado até haver um. |
| Loading | Depois de tocar: botão em estado ocupado «A confirmar pagamento…», resto bloqueado; para MB WAY, «Confirma no teu telemóvel». |
| Error | Vai para ERROPAG. Resposta «Sim» à federação vai para EXCLUSAO. |

### ATIVA

| State | What the User Sees |
| --- | --- |
| Normal | Cartão «Estás coberto» com tempo restante e progresso. |
| Empty / First use | Não aplicável: só existe com sessão paga. Sem sessão, a tab `Ativar` mostra ATIVAR. |
| Loading | A confirmar prolongamento: cartão com «A prolongar…» e chips desativados. |
| Error | Prolongamento falhou: banner «Não foi possível prolongar. A tua sessão continua até às [HH:MM].» Aviso aos 15 min do fim. Sessão terminada: cartão muda para «A tua sessão terminou às [HH:MM]» + «Nova atividade». |

### Ecrãs do assistente (TRIAGEM a SEMPESSOAS)

| State | What the User Sees |
| --- | --- |
| Normal | Conversa com rótulos de identidade em todas as mensagens. |
| Empty / First use | TRIAGEM: mensagem de apresentação e os 3 chips de tema. |
| Loading | Assistente a escrever (indicador de 3 pontos com rótulo «Assistente automático»); passagem a pessoa: aviso de sistema com tempo estimado. |
| Error | Sem rede: banner «Sem ligação. A tua mensagem fica guardada e é enviada quando voltares a ter rede. Se for grave, liga 112.» Sem pessoas: SEMPESSOAS. Baixa confiança na resposta: passagem a pessoa (EQUIPA). |

---

## 5. Non-Negotiable Rules

Things that must stay true in any design of this product.

- **IA-01, Três perguntas antes de pagar**: PROPOSTA mostra sempre, sem toque extra, os blocos «Estás coberto para», «Não estás coberto para», «Quanto custa e porquê» e «Se te magoares».
- **IA-02, Preço com porquê**: o preço nunca aparece em PROPOSTA sem os fatores que o explicam, e PREPARAR e PROPOSTA dizem explicitamente que a idade e a condição física não contam.
- **IA-03, Nada cobrado sem confirmação**: só os botões «Ativar e pagar [PREÇO]» (PAGAR) e «Confirmar · + [PREÇO]» (PROLONGAR) cobram, e mostram o valor no próprio rótulo. «Ainda não pagas nada.» aparece em ATIVAR.
- **IA-04, Sem renovação**: PAGAR diz «Não há renovação.» Nenhum ecrã oferece renovação automática ou anuidade.
- **IA-05, Exclusões visíveis**: a exclusão de federados aparece em PROPOSTA (lista do que não cobre) e é perguntada em PAGAR antes do pagamento, sempre limitada à modalidade escolhida.
- **IA-06, Ajuda sempre à mão na sessão**: «Aconteceu alguma coisa?» é a ação principal de ATIVA e está sempre visível sem scroll.
- **IA-07, Pessoa a 1 toque no sinistro**: SEGURANCA, QUESTIONARIO e RESUMO têm a barra «Falar já com uma pessoa» fixa no topo.
- **IA-08, Identidade sempre clara**: cada mensagem do assistente tem o rótulo «Assistente automático» e o cabeçalho diz «Automático · não é uma pessoa»; cada mensagem de uma pessoa tem o rótulo «[NOME] (pessoa)» e é visualmente distinta.
- **IA-09, 112 primeiro**: no fluxo de acidente, a pergunta «precisas de socorro agora?» vem antes de qualquer pergunta sobre o seguro, e «Ligar 112» é a ação principal de URGENCIA.
- **IA-10, Respostas com fonte**: cada resposta automática em RESPOSTA cita o ponto das condições e tem «Abrir as condições».
- **IA-11, Linguagem simples**: nenhum ecrã usa jargão securitário (franquia, capital, tomador, sinistro, apólice). Usa «sessão», «estás coberto», «se te magoares», «pedido de ajuda».
- **IA-12, Inclusivo por omissão**: as atividades sugeridas incluem os 4 níveis de intensidade e desporto adaptado; nenhum texto ou imagem usa «radical», «extremo» ou só pessoas jovens.

---

## 6. Open Questions

- **Botão «Parar»**: o breadboard e o POC-final têm «Parar», mas o wireframe A05 não. Fica o popup PARAR como hipótese. Se o grupo decidir que não existe, apagar PARAR e a ação secundária de ATIVA. E há reembolso do tempo não usado?
- **Ação secundária de PROPOSTA**: o wireframe A03 está cortado abaixo de «Continuar para pagar». Assumimos uma ação de «alterar» que volta a ATIVAR. Confirmar o rótulo.
- **PREPARAR avança sozinho ou com botão?** O breadboard diz automático; o wireframe A02 tem «Ver proposta». Assumimos botão (mais controlo, princípio "a IA propõe, a pessoa decide").
- **«Não sei» em SEGURANCA**: assumimos que vai para URGENCIA (pela segurança). Confirmar.
- **Validade da proposta em ERROPAG**: [N] minutos por definir.
- **Atividade sem local**: atividades em casa ou sem GPS (ex.: canoagem adaptada num clube) precisam de outro tipo de local?
- **SESSOES e PERFIL** não têm wireframe. Ficam fora do happy path até serem desenhados.
- **Onboarding** (primeira utilização, criação de conta, meio de pagamento) não está nesta IA. O fluxo `Fluxo Onboarding/` ainda é uma cópia do StartInsurance.

---

## 7. Checklist

- [x] Every screen in the sitemap has a card
- [x] Every screen has one main action
- [x] Every screen has a back target (ou "nenhum" nos ecrãs raiz de tab)
- [x] The entry point is named
- [x] Key screens have all four states
