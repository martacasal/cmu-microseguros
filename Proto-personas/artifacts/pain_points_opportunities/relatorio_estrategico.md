# Relatório Estratégico: Dores e Oportunidades — Projeto Pulso

> **Enquadramento:** Metodologia de Investigação Centrada no Utilizador (NN/g)  
> **Fontes:** Desk Research Nacional (DL 10/2009, Eurobarómetro, EuroSafe) & Síntese de Personas

---

## 1. Resumo Executivo

O projeto **Pulso** resolve uma falha estrutural no mercado português de seguros: a desproteção de quem pratica exercício e desporto individual ao ar livre por conta própria. Enquanto o regime legal obrigatório (DL n.º 10/2009) apenas cobre desportistas federados e utilizadores dentro de ginásios, mais de metade dos acidentes desportivos atuais ocorrem na prática informal não organizada.

Este relatório sintetiza as cinco áreas críticas de fricção identificadas na desk research e traduz cada dor numa oportunidade concreta de produto e design para as personas prioritárias (Tiago, Rita, Joana) e para a fronteira com a anti-persona (Maria).

---

## 2. Matriz Estratégica por Eixo Temático

### Eixo 1: Confiança Radical e Linguagem Simples (Plain Language)
- **A Dor Observada:** 
  - Seguradoras convencionais utilizam apólices com dezenas de páginas de jargão jurídico ininteligível.
  - Mais de 60% dos desportistas têm a "falsa perceção" de que o seguro do ginásio, o SNS ou o cartão de crédito cobrem resgates na montanha ou acidentes de surf.
- **A Solução Pulso:**
  - Resumo de apólice em **3 linhas sem rodeios**: O que está incluído (ex: 5.000€ despesas hospitalares privadas, 2.500€ resgate) e o que NÃO está incluído (ex: danos em pranchas ou bicicletas).
  - Comprovativo imediato no Apple Wallet / Google Wallet com contacto direto 24h acessível offline.
  - Assistente de esclarecimento em linguagem natural com IA para responder a dúvidas de cobertura instantâneas.

### Eixo 2: Fricção Zero na Ativação (< 60 Segundos)
- **A Dor Observada:**
  - O desportista decide praticar por impulso (notificação de vento, tempo livre ao fim de semana).
  - Qualquer processo que demore mais de 60 segundos ou exija NIF, morada completa ou exames médicos prévios é abandonado de imediato no terreno.
- **A Solução Pulso:**
  - Fluxo de 3 toques: **Atividade** (ex: Surf) $\rightarrow$ **Duração** (ex: 3h) $\rightarrow$ **Pagamento MB Way / Apple Pay**.
  - Deteção automática do concelho/praia via geolocalização.
  - Contagem decrescente em tempo real e expiração automática no fim do horário: **Zero renovações recorrentes automáticas**.

### Eixo 3: Modelo Económico Justo (Micro-Preço vs Anuidade)
- **A Dor Observada:**
  - Cobrar 200€ a 350€ por uma apólice anual para alguém que surfa ou faz BTT apenas 2 ou 3 vezes por mês gera sentimento de desperdício.
  - Franquias tradicionais elevadas (150€ a 250€) tornam o seguro inútil para lesões leves/moderadas.
- **A Solução Pulso:**
  - Preço unitário por sessão desportiva acessível (2,50€ a 4,50€), escalonado segundo o risco da modalidade (Níveis 1 a 4).
  - Opção familiar simples: inclusão de dependente menor com taxa reduzida (ex: Rita + Filho).
  - Franquia zero para tratamentos de urgência hospitalar imediata.

### Eixo 4: Acessibilidade Universal e Ética (Não Discriminação)
- **A Dor Observada:**
  - Pessoas com deficiência motora (ex: Joana) são habitualmente rejeitadas pelas seguradoras ou submetidas a peritagens humilhantes com sobretaxas de "risco agravado".
  - Interfaces móveis com baixos contrastes ou código incompatível com leitores de ecrã (VoiceOver).
- **A Solução Pulso:**
  - O Pulso é agnóstico à condição corporal preexistente: o seguro cobre o acidente súbito daquela sessão específica de treino.
  - Interface desenhada de raiz em conformidade com as diretrizes **WCAG 2.1 nível AA/AAA**.
  - Inclusão formal de desportos adaptados no catálogo (Handbike, Paracanoagem).

### Eixo 5: Gestão de Fronteira e Anti-Persona (Defesa Operacional)
- **A Dor Observada:**
  - Utilizadores seniores (ex: Maria, 64 anos) receiam pagamentos no telemóvel e exigem atendimento humano por telefone ou presencial.
  - O custo de atender uma chamada telefónica de 10 minutos (5€–15€) destrói a margem de um microsseguro de 2,50€.
  - O perfil de risco clínico ortopédico acima dos 60 anos exige coberturas anuais com histórico médico consolidado.
- **A Solução Pulso:**
  - Screener de triagem preventivo logo no início.
  - **Saída Graciosa (Graceful Off-Ramp):** Em vez de um erro frio, uma mensagem pedagógica que explica o propósito do Pulso e encaminha para produtos de acidentes pessoais seniores anuais em seguradoras tradicionais.
  - Preservação da arquitetura digital lean sem inflacionar a estrutura de custos.

---

## 3. Próximos Passos na Investigação

1. **Validação do Screener:** Testar se as perguntas de triagem separam eficazmente o perfil do Tiago do perfil da Maria.
2. **Entrevistas Qualitativas com Protótipo:** Apresentar a tela de ativação de 45s a surfistas e praticantes de BTT e medir a hesitação no momento do pagamento.
3. **Avaliação Heurística de Acessibilidade:** Auditar o fluxo com tecnologias de apoio (VoiceOver/TalkBack).
