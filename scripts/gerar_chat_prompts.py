#!/usr/bin/env python3
"""Gera personas/<nome>/chat_prompt.md a partir das fichas e de metodo/04_template_chat.md.

Uso: python3 scripts/gerar_chat_prompts.py            (todas as personas)
     python3 scripts/gerar_chat_prompts.py maria      (só uma)

A fonte de verdade são persona.md, journey.md e pains_oportunidades.md.
Nunca editar chat_prompt.md à mão: é reescrito sempre que o script corre.
"""
import re
import sys
from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
TEMPLATE = RAIZ / "metodo" / "04_template_chat.md"
PERSONAS = RAIZ / "personas"
FICHEIROS = {"PERSONA": "persona.md", "JOURNEY": "journey.md", "PAINS": "pains_oportunidades.md"}


def bloco_prompt() -> str:
    texto = TEMPLATE.read_text(encoding="utf-8")
    m = re.search(r"<!-- INICIO_PROMPT -->(.*?)<!-- FIM_PROMPT -->", texto, re.S)
    if not m:
        sys.exit("Erro: marcadores INICIO_PROMPT/FIM_PROMPT não encontrados no template.")
    return m.group(1).strip()


def nome_da_persona(ficha: str, pasta: str) -> str:
    m = re.search(r"^#\s+([^,·\n]+)", ficha, re.M)
    return m.group(1).strip() if m else pasta.capitalize()


def baixar_titulos(texto: str) -> str:
    """Desce dois níveis os títulos para não competirem com os do prompt."""
    return re.sub(r"^(#{1,4}) ", lambda m: "#" * min(len(m.group(1)) + 2, 6) + " ", texto, flags=re.M)


def gerar(pasta: Path, prompt: str) -> None:
    partes = {}
    for chave, nome in FICHEIROS.items():
        f = pasta / nome
        if not f.exists():
            print(f"  ! {pasta.name}: falta {nome}, persona ignorada")
            return
        partes[chave] = f.read_text(encoding="utf-8")
    nome = nome_da_persona(partes["PERSONA"], pasta.name)
    saida = prompt.replace("{{NOME}}", nome)
    for chave, conteudo in partes.items():
        saida = saida.replace("{{" + chave + "}}", baixar_titulos(conteudo.strip()))
    cabecalho = (
        f"<!-- GERADO por scripts/gerar_chat_prompts.py em {date.today():%d/%m/%Y}. "
        "Não editar à mão: alterar persona.md, journey.md, pains_oportunidades.md "
        "ou metodo/04_template_chat.md e voltar a correr o script. -->\n\n"
        "> **Como usar:** copiar tudo o que está abaixo desta caixa para uma conversa nova "
        "(ou para as instruções de um Project). Comandos: `/fonte`, `/voltar`, `/ficha`.\n\n---\n\n"
    )
    (pasta / "chat_prompt.md").write_text(cabecalho + saida + "\n", encoding="utf-8")
    print(f"  ok {pasta.name}: chat_prompt.md ({len(saida.split())} palavras)")


def main() -> None:
    prompt = bloco_prompt()
    alvo = sys.argv[1:] or sorted(p.name for p in PERSONAS.iterdir() if p.is_dir())
    for nome in alvo:
        gerar(PERSONAS / nome, prompt)


if __name__ == "__main__":
    main()
