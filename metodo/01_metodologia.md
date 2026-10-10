# 01 · Metodologia

## 1. Contexto

O Pulso precisa de personas antes de ter dados de participantes: o diary study e as entrevistas da Fase 1 ainda não arrancaram. Este repositório resolve isso com **proto-personas sintéticas rastreáveis**: cada atributo diz de onde vem, e a evidência sobe de nível à medida que a research avança.

## 2. Problema

Personas sem research são o primeiro motivo de falha apontado pela NN/g [M04, M10]. Personas geradas por IA acrescentam três riscos [M11]:

1. **Bajulação:** respostas demasiado positivas sobre o produto.
2. **Comportamento idealizado:** a persona diz o que faria, não o que faz.
3. **Experiências inventadas** apresentadas como passado real.

No Pulso, o risco concreto é o grupo "validar" as hipóteses H1 a H5 a conversar com personas construídas a partir dessas mesmas hipóteses.

## 3. Solução

### 3.1 Tipo de persona (NN/g, M03)

| Tipo | Base | Quando no Pulso |
|---|---|---|
| Proto-persona | Hipóteses da equipa e desk research | **Agora (v0.x)** |
| Qualitativa | 5 a 30 entrevistas, codificadas por temas | Depois do diary study e das 8 entrevistas da Fase 1 (v1.x) |
| Estatística | Survey com 100+ respostas e clustering | Só se o survey atingir as 150 a 200 respostas previstas (v2.x) |

Cada ficha declara o tipo no topo. Uma persona só muda de tipo quando a maioria dos atributos essenciais tiver evidência desse nível.

### 3.2 Níveis de evidência

| Nível | Etiqueta | Fonte | Pode sustentar |
|---|---|---|---|
| E0 | `[H]` | Hipótese do grupo | Perguntas de research |
| E1 | `[F##]` | Desk research pública | Contexto e plausibilidade, nunca comportamento individual |
| E2 | `[D-P##]` | Diary study | Comportamento no momento, gatilhos |
| E3 | `[I-P##]` | Entrevista | Razões, crenças, decisões |
| E4 | `[S]` | Survey (com n) | Prevalência entre segmentos |

Regra: E1 diz que algo é **comum na população**, não que esta pessoa o faz. Um dado do Eurobarómetro torna o atributo plausível; só E2 ou E3 o tornam observado.

### 3.3 Âmbito (NN/g, M05)

Um conjunto de personas para uma decisão de design: **como pessoas ativas de forma recreativa decidem (ou não) proteger-se para uma atividade concreta, e o que as faria contratar uma cobertura por sessão.** Atributos que não influenciam esta decisão ficam de fora (signo, estado civil sem relevância, marcas preferidas).

### 3.4 Regras anti-estereótipo

1. **Comportamento antes de demografia.** A idade e o local só entram se mudarem a decisão.
2. **Deficiência descrita por necessidades funcionais e tecnologias de apoio, nunca por diagnóstico** [M01]. Sem narrativa de superação ou "inspiração".
3. **Sem imagética de "desporto radical".** O surf do Tiago e a caminhada da Maria têm o mesmo peso e o mesmo formato.
4. **Idade não é sinónimo de iliteracia digital.** 86,1% das pessoas entre 55 e 64 anos usam internet [F20]. A barreira da Maria, se existir, é de confiança e não de acesso.
5. **Sem fotos de stock nem caras reconhecíveis** [M09]. Ilustrações neutras na fase Figma.
6. **Comportamento atual, não desejado** [M06]. As fichas descrevem o que a pessoa faz hoje, sem o Pulso.
7. **Teste de troca:** se trocar a idade ou a condição motora da persona mudar o preço proposto pela IA, há um problema de design (princípio 5 do Pulso).

### 3.5 Base teórica

Os objetivos seguem a distinção de Cooper (About Face, KB aula 1) entre **life goals** (quem a pessoa quer ser), **experience goals** (como se quer sentir) e **end goals** (o que quer conseguir). Os end goals orientam o fluxo; os experience goals orientam o tom e a microcópia.

## 4. Métricas de qualidade das personas

| Métrica | Alvo v0.x | Alvo v1.x |
|---|---|---|
| Atributos essenciais com fonte | 100% | 100% |
| Atributos essenciais com E2 ou superior | 0% (esperado) | ≥ 70% |
| Atributos contraditos pela research e não corrigidos | 0 | 0 |
| Uso: decisões de design que citam uma persona | registar no `CHANGELOG.md` | idem |
| Revisão | a cada fase do roteiro | idem |
