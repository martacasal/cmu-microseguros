# Pulso — Personas Sintéticas & Consumer Journey (Normas NN/g)

Projeto de investigação de utilizadores e modelação de **personas sintéticas** e **jornadas do consumidor** para o produto **Pulso** (microsseguro de acidentes pessoais sob demanda para atividades desportivas ao ar livre em Portugal).

---

## 📌 Sobre o Produto Pulso

- **Conceito:** Seguro de acidentes pessoais ativado com base na atividade desportiva — desde uma corrida no parque até uma tarde de surf. Uma aplicação onde o praticante indica o que está a fazer e obtém cobertura em **menos de 1 minuto**.
- **Parâmetros:** O utilizador indica a **atividade**, o **local** e a **duração**.
- **Proposta de Valor:** Preço fixo por sessão (ex: 2€ a 4€), linguagem clara (sem letras pequenas), ativação instantânea no smartphone (Apple Pay / MB Way) e expiração automática no fim da sessão. **Zero anuidades e zero burocracia.**
- **Cobertura:** Seguro de acidentes pessoais por sessão (horas, tarde, dia ou fim de semana), incluindo despesas médicas urgentes em hospitais privados, cobertura de invalidez/morte e responsabilidade civil opcional a terceiros. Subscrito por seguradora parceira e distribuído via app.

---

## 👥 Personas Modeladas

O projeto implementa **3 Personas Alvo** e **1 Anti-Persona**, fundamentadas nas normas da **Nielsen Norman Group (NN/g)** e na desk research nacional portuguesa (Eurobarómetro 2022, Decreto-Lei n.º 10/2009, EuroSafe):

| Persona | Tipo | Idade & Local | Atividades | Foco de Investigação |
| :--- | :--- | :--- | :--- | :--- |
| **Tiago Ferreira** | **Alvo Core** | 31 anos, Lisboa | Surf na Ericeira, corrida urbana | Decisão espontânea (< 2h), ativação em 45s, aversão a fidelização anual de 25€/mês. |
| **Rita Magalhães** | **Secundária** | 42 anos, Braga | BTT e trail em serra, com o filho | Proteção familiar/dependentes, agendamento prévio, cobertura de salvamento e resgate. |
| **Joana Vasconcelos** | **Secundária** | 36 anos, Porto | Handbike e canoagem adaptada | Acessibilidade digital (WCAG AAA), não-discriminação e seguro agnóstico a lesões prévias. |
| **Maria do Carmo Santos** | **ANTI-PERSONA** | 64 anos, Sintra | Caminhadas de grupo lentas | Fora do público-alvo (18-40), recusa de pagamentos móveis, exigência de balcão e saída graciosa (*graceful off-ramp*). |

---

## 🛠️ Arquitetura e Estrutura do Repositório

```
cmu-personas/
├── data/
│   ├── schemas/                          # JSON Schemas formais (NN/g)
│   │   ├── persona.schema.json
│   │   └── journey.schema.json
│   ├── personas/                         # Dados estruturados de cada persona
│   │   ├── tiago.json
│   │   ├── rita.json
│   │   ├── joana.json
│   │   └── maria.json                    # Anti-Persona
│   ├── journeys/                         # Jornadas mapeadas em 5 fases
│   │   ├── tiago-journey.json
│   │   ├── rita-journey.json
│   │   ├── joana-journey.json
│   │   └── maria-journey.json            # Mapa de Fricção e Fronteira
│   ├── pain_points_opportunities/        # Matriz estratégica comparativa
│   │   └── matrix.json
│   └── research_basis/                   # Desk research e bibliografia
│       └── desk_research.md
├── artifacts/                            # Ficheiros Markdown prontos para partilha
│   ├── persona_cards/
│   │   ├── tiago.md
│   │   ├── rita.md
│   │   ├── joana.md
│   │   └── maria_anti_persona.md
│   ├── journey_maps/
│   │   └── todas_as_jornadas.md
│   └── pain_points_opportunities/
│       └── relatorio_estrategico.md
├── app/                                  # Aplicação Next.js 14 (App Router)
│   ├── api/chat/route.ts                 # Chat Multi-Provider (Gemini, OpenAI, Claude, Mock)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                          # Dashboard integrado com navegação
├── components/                           # Componentes React com Tailwind CSS
│   ├── Navbar.tsx
│   ├── PersonaCard.tsx                   # Cartão visual interativo com abas NN/g
│   ├── JourneyVisualizer.tsx             # Timeline visual das 5 fases da jornada
│   ├── PainPointsMatrix.tsx              # Matriz de dores e oportunidades
│   ├── AntiPersonaStudio.tsx             # Estúdio de fronteira e simulação de off-ramp
│   └── ChatInterface.tsx                 # Chat com personas e Especialista UX
└── README.md
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
- Node.js (v18+ ou v20 LTS) e npm instalados.

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Fornecedor de IA (Opcional)
O projeto inclui um **Modo Mock Inteligente** que funciona imediatamente sem qualquer chave de API.  
Se pretender ligar a modelos de IA reais (Gemini, OpenAI ou Anthropic Claude), copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o ficheiro `.env`:
```env
# Google Gemini (Recomendado)
GEMINI_API_KEY=sua_chave_aqui

# Ou OpenAI
OPENAI_API_KEY=sua_chave_aqui

# Ou Claude
ANTHROPIC_API_KEY=sua_chave_aqui

# Se deixar vazio, funciona em modo Mock Inteligente com respostas em PT-PT
LLM_PROVIDER=mock
```

### 4. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

Abra no seu navegador: [http://localhost:3000](http://localhost:3000)

---

## 💬 Chat Interativo com Personas & Analista UX

Na aba **Chat com Personas**, pode:
1. **Entrevistar o Tiago, a Rita ou a Joana** em primeira pessoa para testar argumentos de produto, receios e preços aceitáveis.
2. **Interagir com a Anti-Persona Maria** para compreender na prática a sua resistência a pagamentos digitais e o porquê de o modelo do Pulso não a servir.
3. **Conversar com o Especialista UX & Metodólogo** para inspecionar os fundamentos teóricos, fontes da desk research e decisões de design.

---

## 📚 Metodologia e Normas NN/g Adotadas

1. **Separação Rigorosa:** Distinção entre **Dados Comprovados** (estudos europeus, taxas epidemiológicas de lesão por 1.000h, DL 10/2009) e **Hipóteses a Validar** (comportamentos e intenções a testar em surveys).
2. **5 Fases da Jornada do Consumidor:** Gatilho & Decisão $\rightarrow$ Descoberta & Simulação $\rightarrow$ Micro-Ativação &lt; 60s $\rightarrow$ Durante a Sessão $\rightarrow$ Pós-Atividade & Expiração/Sinistro.
3. **Anti-Persona com Saída Graciosa:** Exclusão estratégica da Maria sem desrespeito, através de um *graceful off-ramp* que a encaminha para soluções convencionais de balcão físico.

---

## 🤝 Colaboração e Controlo de Versões

- Repositório GitHub: `git@github.com:ddmazio/cmu-personas.git` (ramo `main`)
- Backup e sincronização geridos pela equipa de trabalho.
