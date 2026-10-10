# 05 · Como escalar

## 1. Contexto
O sistema foi desenhado para crescer em duas direções: **profundidade** (as 4 personas ganham evidência) e **largura** (mais personas, por exemplo um turista ou um pai que leva os filhos ao surf).

## 2. Escalar em profundidade: integrar a research da Fase 1

### Passo a passo, por cada sessão de research
1. Guardar os dados brutos em `dados_research/` (local, nunca no git).
2. Fazer a síntese no formato do projeto: **Dados brutos → Constatações → Perceções acionáveis.**
3. Para cada constatação, encontrar o atributo correspondente nas fichas:
   - **Confirma:** trocar a etiqueta (`[H]` → `[I-P03]`).
   - **Contradiz:** reescrever o atributo, trocar a etiqueta, registar no `CHANGELOG.md` o que mudou e porquê.
   - **É novo:** acrescentar na secção certa com a etiqueta.
4. Atualizar a linha "Evidência" nos metadados da ficha.
5. Correr `python3 scripts/gerar_chat_prompts.py --evidencia`.
6. Branch + pull request com um revisor do grupo.

### Mapeamento método → secções da ficha

| Método (doc 03) | Alimenta sobretudo |
|---|---|
| Diary study (gatilhos, antecedência, o que fez para se proteger) | §4 Comportamentos, §5 Antecedência, §8 Gatilhos, journey fases 1 a 4 |
| Entrevistas (risco, proteção, decidir e confiar) | §3 Objetivos, §6 Risco e proteção, §7 Frustrações, §9 Confiança, journey fases 5 e 6 |
| Survey (D1 a D4, E1 a E4, F1 e F2) | Prevalência: quantas pessoas de cada segmento se parecem com cada persona |

### Quando uma persona muda de tipo
De proto para qualitativa quando **≥ 70% dos atributos essenciais** tiverem E2 ou E3, vindos de pelo menos 2 participantes diferentes (para não basear a persona numa só pessoa, M08).

### Quando uma persona deve morrer ou fundir-se
Se a research não encontrar ninguém com o padrão de comportamento da persona, ela sai. Se duas personas tomarem as mesmas decisões pelas mesmas razões, fundem-se. A idade e a atividade, por si só, não justificam personas separadas.

## 3. Escalar em largura: criar uma persona nova

1. Justificar no `CHANGELOG.md`: que decisão de design esta persona muda que as outras não mudam?
2. `mkdir personas/<nome>` e copiar o template de `metodo/02_template_persona.md`, `03_template_journey.md` e criar `pains_oportunidades.md`.
3. Preencher com etiquetas. Começar pelo comportamento, só depois a identidade.
4. Correr o script dos prompts. O novo `chat_prompt.md` é criado automaticamente.
5. Atualizar `sintese/matriz_oportunidades.md`.

Limite recomendado: 3 a 6 personas no total (M03, M09). Mais do que isso dispersa o grupo.

## 4. Fase Figma (mais tarde)
O repo é a fonte de verdade. Os cards e journeys em Figma/FigJam são gerados a partir das fichas e indicam no rodapé a versão da ficha (ex.: "Maria v0.1"). Quando a ficha muda, o card é atualizado, nunca o contrário.

## 5. Métricas
Ver `01_metodologia.md`, §4.
