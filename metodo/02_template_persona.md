# 02 · Template de persona (NN/g + consumo)

Copiar para `personas/<nome>/persona.md`. Todos os campos marcados **[E]** são essenciais. Cada linha de conteúdo termina com uma etiqueta de evidência (`[H]`, `[F##]`, `[D-P##]`, `[I-P##]`, `[S]`).

O script `scripts/gerar_chat_prompts.py` lê este ficheiro inteiro, por isso **não mudar os títulos das secções** sem atualizar o script.

```markdown
# <Nome>, <idade> · <tagline curta e modesta>

| Metadado | Valor |
|---|---|
| Tipo | Proto-persona sintética / Qualitativa / Estatística |
| Versão | v0.1 |
| Última revisão | dd/mm/aaaa · autor |
| Nível de atividade (catálogo) | 1 Leve / 2 Moderada / 3 Intensa / 4 Muito intensa |
| Hipóteses que testa | H1 a H5 (doc 00, §7) |
| Evidência | n atributos E0 · n E1 · n E2 · n E3 · n E4 |

> "<citação representativa>" [etiqueta]

## 1. Identidade [E]
Idade, local, ocupação, com quem vive (só o que muda a decisão).

## 2. Contexto de uso [E]
Atividades, frequência, onde, com quem, sazonalidade, dispositivos, experiência com seguros e apps.

## 3. Objetivos [E]
- Life goals
- Experience goals
- End goals

## 4. Comportamentos atuais [E]
O que faz hoje antes, durante e depois da atividade.

## 5. Hábitos de consumo [E]
| Dimensão | Comportamento | Fonte |
|---|---|---|
| Gasto com a atividade | | |
| Equipamento (compra, aluguer, onde) | | |
| Como decide compras | | |
| Antecedência da decisão | | |
| Meios de pagamento | | |
| Canais de informação | | |
| Apps que usa | | |
| Seguros que tem | | |

## 6. Risco e proteção [E]
| | Julga que... | Na realidade... | Fonte |
|---|---|---|---|
| Probabilidade de se magoar | | | |
| Quem paga se se magoar | | | |
| Coberturas que tem | | | |

## 7. Frustrações e medos [E]

## 8. Gatilhos de proteção
Momentos em que pensa "devia estar protegido para isto".

## 9. Tecnologia, IA e confiança [E]
Como decide se confia numa recomendação automática.

## 10. Necessidades funcionais e acessibilidade
Necessidades funcionais e tecnologias de apoio (nunca diagnóstico).

## 11. Implicações para o design do Pulso
Formato observação → impacto → sugestão.

## 12. Perguntas em aberto para a Fase 1
O que esta persona assume e que a research tem de confirmar.

## 13. Verificação anti-estereótipo
Checklist da metodologia, §3.4.

## 14. Fontes
```
