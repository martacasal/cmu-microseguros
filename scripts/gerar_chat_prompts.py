#!/usr/bin/env python3
"""Gera personas/<nome>/chat_prompt.md a partir das fichas e de metodo/04_template_chat.md.

Uso:
  python3 scripts/gerar_chat_prompts.py               todas as personas
  python3 scripts/gerar_chat_prompts.py maria rita    só algumas
  python3 scripts/gerar_chat_prompts.py --evidencia   também atualiza a linha "Evidência" das fichas

A fonte de verdade são persona.md, journey.md e pains_oportunidades.md.
Nunca editar chat_prompt.md à mão: é reescrito sempre que o script corre.

O que a persona NÃO recebe (para não "saber" o raciocínio do grupo):
  persona.md            metadados, notas de versão, coluna "Na realidade" da secção 6, secções 11 a 14
  journey.md            linhas "Momento de compra", "Pain points", "Oportunidades", secções "Leitura" e "Evidência"
  pains_oportunidades   tudo a partir de "## Oportunidades"
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
TEMPLATE = RAIZ / "metodo" / "04_template_chat.md"
PERSONAS = RAIZ / "personas"
NIVEIS = [("E0", r"\[H\]"), ("E1", r"\[F\d+\]"), ("E2", r"\[D-P\d+\]"), ("E3", r"\[I-P\d+\]"), ("E4", r"\[S\]")]


def ler(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def escrever(p: Path, texto: str) -> None:
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(texto)


def bloco_prompt() -> str:
    m = re.search(r"^<!-- INICIO_PROMPT -->$(.*?)^<!-- FIM_PROMPT -->$", ler(TEMPLATE), re.S | re.M)
    if not m:
        sys.exit("Erro: marcadores INICIO_PROMPT/FIM_PROMPT não encontrados no template.")
    return m.group(1).strip()


def cortar_seccoes(texto: str, titulos_regex: str) -> str:
    """Remove secções '## ...' cujo título casa com o regex, até à secção seguinte do mesmo nível."""
    partes = re.split(r"(?m)^(?=## )", texto)
    return "".join(p for p in partes if not re.match(titulos_regex, p))


def filtrar_persona(texto: str) -> str:
    linhas = texto.splitlines()
    titulo = linhas[0]
    resto = "\n".join(linhas[1:])
    # metadados: tudo até à citação
    i = resto.find("\n> ")
    resto = resto[i + 1:] if i >= 0 else resto
    resto = re.sub(r"(?m)^\*\*Nota de [^*]+:\*\*.*\n?", "", resto)
    resto = cortar_seccoes(resto, r"## (11|12|13|14)\.")
    # secção 6: tirar a coluna "Na realidade" (3.ª coluna)
    def sem_realidade(sec: re.Match) -> str:
        out = []
        for l in sec.group(0).splitlines():
            if l.startswith("|"):
                c = l.split("|")
                if len(c) >= 6:
                    l = "|".join(c[:3] + c[4:])
            out.append(l)
        return "\n".join(out) + "\n"
    resto = re.sub(r"(?ms)^## 6\..*?(?=^## |\Z)", sem_realidade, resto)
    return titulo + "\n\n" + resto.strip()


def filtrar_journey(texto: str) -> str:
    texto = re.sub(r"(?m)^\| (Momento de compra|Pain points|Oportunidades) \|.*\n?", "", texto)
    texto = re.sub(r"(?m)^\*\*Estado:\*\*.*\n?", "", texto)
    return cortar_seccoes(texto, r"## (Leitura|Evidência)").strip()


def filtrar_pains(texto: str) -> str:
    texto = texto.split("## Oportunidades", 1)[0]
    texto = re.sub(r"(?m)^Formato:.*\n?", "", texto)
    texto = re.sub(r"(?m)^# .*\n?", "", texto)
    return texto.strip()


def baixar_titulos(texto: str, niveis: int = 2) -> str:
    """Desce os títulos para não competirem com os do prompt; ignora blocos de código."""
    out, em_codigo = [], False
    for l in texto.splitlines():
        if l.startswith("```"):
            em_codigo = not em_codigo
        elif not em_codigo:
            m = re.match(r"^(#+) ", l)
            if m:
                l = "#" * min(len(m.group(1)) + niveis, 6) + l[len(m.group(1)):]
        out.append(l)
    return "\n".join(out)


def atualizar_evidencia(p: Path) -> str:
    texto = ler(p)
    if "\n## 1." not in texto:
        print(f"  ! {p.parent.name}: secção '## 1.' não encontrada; evidência não atualizada")
        return "?"
    corpo = texto.split("\n## 1.", 1)[1]
    cont = {n: len(re.findall(rx, corpo)) for n, rx in NIVEIS}
    total = sum(cont.values()) or 1
    pct = round(100 * (cont["E2"] + cont["E3"] + cont["E4"]) / total)
    resumo = " · ".join(f"{n}: {c}" for n, c in cont.items())
    linha = f"| Evidência | {resumo} ({pct}% das etiquetas com dados de participantes) |"
    novo = re.sub(r"(?m)^\| Evidência \|.*\|$", linha, texto, count=1)
    if novo != texto:
        escrever(p, novo)
    return resumo


def nome_da_persona(ficha: str, pasta: str) -> str:
    m = re.search(r"^#\s+([^,·\n]+)", ficha, re.M)
    return m.group(1).strip() if m else pasta.capitalize()


def gerar(pasta: Path, prompt: str, evidencia: bool) -> None:
    ficheiros = {"PERSONA": "persona.md", "JOURNEY": "journey.md", "PAINS": "pains_oportunidades.md"}
    for nome in ficheiros.values():
        if not (pasta / nome).exists():
            print(f"  ! {pasta.name}: falta {nome}, persona ignorada")
            return
    if evidencia:
        print(f"  evidência {pasta.name}: {atualizar_evidencia(pasta / 'persona.md')}")
    ficha = ler(pasta / "persona.md")
    partes = {
        "PERSONA": filtrar_persona(ficha),
        "JOURNEY": filtrar_journey(ler(pasta / "journey.md")),
        "PAINS": filtrar_pains(ler(pasta / "pains_oportunidades.md")),
    }
    saida = prompt.replace("{{NOME}}", nome_da_persona(ficha, pasta.name))
    for chave, conteudo in partes.items():
        saida = saida.replace("{{" + chave + "}}", baixar_titulos(conteudo))
    cabecalho = (
        "<!-- GERADO por scripts/gerar_chat_prompts.py. Não editar à mão: alterar persona.md, journey.md, "
        "pains_oportunidades.md ou metodo/04_template_chat.md e voltar a correr o script. -->\n\n"
        "> **Como usar:** copiar tudo o que está abaixo da linha para uma conversa nova "
        "(ou para as instruções de um Project). Comandos: `/fonte`, `/voltar`, `/ficha`.\n\n---\n\n"
    )
    escrever(pasta / "chat_prompt.md", cabecalho + saida + "\n")
    print(f"  ok {pasta.name}: chat_prompt.md ({len(saida.split())} palavras)")


def main() -> None:
    args = sys.argv[1:]
    evidencia = "--evidencia" in args
    nomes = [a for a in args if not a.startswith("--")]
    existentes = sorted(p.name for p in PERSONAS.iterdir() if p.is_dir())
    for n in nomes:
        if n not in existentes:
            sys.exit(f"Erro: persona '{n}' não existe. Disponíveis: {', '.join(existentes)}")
    prompt = bloco_prompt()
    for nome in nomes or existentes:
        gerar(PERSONAS / nome, prompt, evidencia)


if __name__ == "__main__":
    main()
