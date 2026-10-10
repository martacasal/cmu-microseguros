# Pulso · Sistema de personas sintéticas

Repositório do Grupo 1 (Nelson Delicado, Marta Casal, Ellen Dámasio, Susana Martins) para criar, manter e escalar as personas do projeto Pulso (micro seguros de acidentes pessoais por sessão), no âmbito da pós-graduação AI for UX Design (ULisboa / CMU).

> **Estado atual: proto-personas sintéticas (v0.1).** Construídas a partir das hipóteses do grupo e de desk research com fontes públicas. Ainda não há dados de participantes. Não usar para validar conceitos nem para tomar decisões finais de produto (NN/g, *Synthetic Users*, 2024).

## Para que serve

1. **Cards de persona** alinhados com a NN/g, com hábitos e jornada de consumo.
2. **Customer journeys** que ligam o ciclo da atividade (onde nasce a necessidade de proteção) aos momentos de compra.
3. **Pain points e oportunidades** por persona e cruzados entre personas.
4. **Chat com as personas** para explorar razões e decisões, com um modo que mostra de onde vem cada resposta.
5. **Escalar com research**: os dados do diary study, das entrevistas e do survey da Fase 1 substituem hipóteses atributo a atributo, sem mudar o template.

## Estrutura

```
pulso-personas/
├── README.md                     este ficheiro
├── CHANGELOG.md                  histórico de versões das personas
├── metodo/
│   ├── 01_metodologia.md         tipos de persona, níveis de evidência, regras
│   ├── 02_template_persona.md    campos do card (NN/g + consumo)
│   ├── 03_template_journey.md    journey: ciclo da atividade + momentos de compra
│   ├── 04_template_chat.md       regras do chat (modo imersão e modo /fonte)
│   └── 05_como_escalar.md        como integrar dados da Fase 1 e criar personas novas
├── fontes/
│   └── desk_research.md          fontes F01 a F29 e fontes de método M01 a M15
├── personas/
│   └── <nome>/
│       ├── persona.md            card da persona (fonte de verdade)
│       ├── journey.md            customer journey
│       ├── pains_oportunidades.md
│       └── chat_prompt.md        GERADO pelo script, não editar à mão
├── sintese/
│   └── matriz_oportunidades.md   pains e oportunidades cruzados
├── scripts/
│   └── gerar_chat_prompts.py     gera os chat_prompt.md a partir das fichas
└── dados_research/               NUNCA vai para o GitHub (ver .gitignore)
```

## Regra central: cada atributo tem fonte

Todo o atributo de uma persona leva uma etiqueta de evidência:

| Etiqueta | Nível | Significado |
|---|---|---|
| `[H]` | E0 | Hipótese do grupo, sem dados |
| `[F07]` | E1 | Desk research, fonte pública (ver `fontes/desk_research.md`) |
| `[D-P03]` | E2 | Diary study, participante P03 |
| `[I-P03]` | E3 | Entrevista, participante P03 |
| `[S]` | E4 | Survey (com n e percentagem) |

Quando chega evidência nova, troca-se a etiqueta e, se for o caso, o conteúdo. O histórico fica no `CHANGELOG.md` e no git.

## Como usar o chat

1. Correr `python3 scripts/gerar_chat_prompts.py --evidencia` (atualiza a contagem de evidência das fichas e os `chat_prompt.md`).
2. Abrir uma conversa nova no Claude (ou noutro LLM) e colar o conteúdo de `personas/<nome>/chat_prompt.md` como primeira mensagem ou como instruções do Project.
3. Conversar. Escrever `/fonte` para a persona sair de personagem e dizer em que evidência se baseou a última resposta. `/voltar` regressa ao personagem.

Usos recomendados: preparar e pilotar guiões de entrevista, gerar hipóteses, alinhar o grupo, preparar workshops. Usos proibidos: apresentar respostas do chat como dados de research, validar conceitos ou preços, substituir testes com pessoas reais.

## Princípios do Pulso que as personas respeitam

Inclusivo por omissão (a caminhada da Maria pesa o mesmo que o surf do Tiago; desporto adaptado presente); claro antes de rápido; a IA propõe, a pessoa decide; acessibilidade de raiz (WCAG 2.2 AA); zero discriminação por idade ou condição motora no preço.

## Privacidade e RGPD

A pasta `dados_research/` está no `.gitignore`. Transcrições, entradas de diário, gravações e qualquer dado de saúde de participantes **nunca** entram no repositório. Nas fichas só entram códigos (P01 a P14) e citações curtas anonimizadas.

## Fluxo de trabalho do grupo

Uma branch por alteração (`persona/maria-diary-semana1`), pull request com pelo menos um revisor do grupo, e entrada no `CHANGELOG.md`. Ver `metodo/05_como_escalar.md`.
