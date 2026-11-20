# Microseguros - C2:06: Design Reference (`DesignReference.md`)

## 🧭 How to Read This File (Explanation for LLMs)

This file records the **design decisions** the group took from its style proposal: which colors, typography and patterns the product uses, where each one goes, and why. The Figma file is the source of truth for values; this file explains the decisions behind them.

**How an LLM should use this file**

1. The decisions in §1 Colors, §2 Typography and §3 Patterns are the **only allowed styling vocabulary**.
2. The **anchor screen** linked in §0 is the worked example of these decisions applied: when this file and the anchor disagree, follow the anchor.
3. Every decision has a **Where** (when to use it) and a **Why** (the reason behind it). When a new screen meets a situation no decision covers, choose the option that best serves the Why column, and flag it.
4. The checks in §4 are how a finished screen is judged.

> [!info] Who fills what
> 1. **Group:** fill §0 by hand (links to your style proposal and your anchor screen).
> 2. **AI:** ask your AI to analyse the style proposal and the anchor screen in §0 (`get_design_context`, `get_variable_defs`, `get_screenshot`) and draft §1–3: every color, text style and recurring pattern it finds, with where it's used. The rows below are examples: replace them.
> 3. **Group:** go through every row together and decide: keep it, change it or remove it. Then write the **Why** column yourselves, using your feelings from [[Baseline/C2-05/AestheticsEmotionalSpec]]: the AI can read what's there, only you know why you chose it.

---

## 0. Source

| What | Figma link | Notes |
| --- | --- | --- |
| **Style proposal** (your design system / visual direction) | [cores e tipografia](https://www.figma.com/design/warsHXGqZvbd8FkGduFS7l/Wireframes?node-id=0-1) · [cores](https://www.figma.com/design/warsHXGqZvbd8FkGduFS7l/Wireframes?node-id=12-352) | Pages `cores e tipografia` and `cores` |
| **Anchor screens** (reworked by hand in E1) | [telas](https://www.figma.com/design/warsHXGqZvbd8FkGduFS7l/Wireframes?node-id=71-883) | Page `telas`: frames `Ativation` ([71:1070](https://www.figma.com/design/warsHXGqZvbd8FkGduFS7l/Wireframes?node-id=71-1070)) and `Feedback value` ([71:894](https://www.figma.com/design/warsHXGqZvbd8FkGduFS7l/Wireframes?node-id=71-894)) |
| **As-is screens** (C2:05 POC-final) | [POC-final](https://www.figma.com/design/warsHXGqZvbd8FkGduFS7l/Wireframes?node-id=50-711) | Page `POC-final` |

> [!warning] Drafted by AI from the `telas` page (2026-11-07)
> The anchor screens use **hard-coded hex values and local text formatting**: the only Figma variable bound is `M3/sys/light/outline` (`#79747E`, from the M3 icon kit). The variable names in §1 and the text style names in §2 are **proposals**: create them in Figma and bind them, or rename them here. The **Why** column is left for the group (see the box above).

---

## 1. Colors

| Role | Figma Variable | Value | Where | Why |
| --- | --- | --- | --- | --- |
| **Background** | `color/bg/surface` *(proposed)* | `#FFFFFF` | Every screen background, activity tiles | |
| **Surface muted** | `color/bg/muted` *(proposed)* | `#F3F4F6` | Header strip of the "Porquê este preço" card | |
| **Primary action / brand** | `color/action/primary` *(proposed)* | `#C94710` | Primary button, active step in the step navigator, duration dial arc, biggest slice of the price split | |
| **Accent light** | `color/accent/300` *(proposed)* | `#FF966A` | Price split slice + legend dot (Tempo) | |
| **Accent subtle** | `color/accent/100` *(proposed)* | `#FFDBCB` | Completed steps in the step navigator, price split slice + legend dot (Equipamento) | |
| **Accent tint** | `color/accent/50` *(proposed)* | `#FFF7F7` | Track behind the price split bar | |
| **Border / disabled** | `color/border/default` *(proposed)* | `#D8DCE0` | Tile and card borders, row dividers, upcoming steps, disabled button fill | |
| **Text primary** | `color/text/primary` *(proposed)* | `#1C1F23` | Titles, price, list labels and values, tile labels | |
| **Text secondary** | `color/text/secondary` *(proposed)* | `#555C64` | Context line, supporting copy, detail text, secondary button | |
| **Text tertiary** | `color/text/tertiary` *(proposed)* | `#8A9097` | Step label, captions, card header label, disabled button text | |
| **Greeting text** | — *(to merge)* | `#5C6B66` / `#14201C` | "Good morning" / user name in the header | Greenish greys that differ from the rest of the text scale: decide whether to fold them into text secondary / primary |
| **Device frame** | — | `#2A2D31` | 10px border around the mock phone | Presentation only, not part of the UI |
| **Icon outline** | `M3/sys/light/outline` | `#79747E` | Material icons (chat bubble, chevrons) | Comes from the M3 kit |

**Color decisions** (one sentence each):
- *One warm accent, `#C94710`, carries every "this is the active / next step" signal: primary button, current step, dial progress.*
- *The accent ramp (`#FF966A` → `#FFDBCB` → `#FFF7F7`) is used for data (price breakdown, past steps), never for actions.*
- *A disabled primary action is grey (`#D8DCE0` fill, `#8A9097` text) until the user has made a choice.*
- *No gradients and no error/success colors on these screens yet: still to be decided.*

---

## 2. Typography

All text is **Inter**; line height is `normal` unless noted.

| Style | Figma Text Style | Font / Size / Weight | Where | Why |
| --- | --- | --- | --- | --- |
| **Display** | `display/price` *(proposed)* | Inter / 52 / Bold, tracking −1.04 | The price on the value screen | |
| **Dial value** | `display/dial` *(proposed)* | Inter / 40 / Bold | Big number inside the duration dial | |
| **Greeting name** | `heading/greeting` *(proposed)* | Inter / 22 / Semi Bold / 30 lh | User name in the header | |
| **Section title** | `heading/h1` *(proposed)* | Inter / 20 / Bold | Questions / section headers ("What activity will you do?", "Duration") | |
| **Button** | `label/button` *(proposed)* | Inter / 16 / Semi Bold (primary) · Medium (secondary) | Full-width buttons | |
| **Body large** | `body/large` *(proposed)* | Inter / 15 / Regular (Semi Bold for amounts) | Greeting line, list rows, toggle label | |
| **Body** | `body/default` *(proposed)* | Inter / 14 / Regular | Context line and supporting copy under the price | |
| **Small** | `body/small` *(proposed)* | Inter / 13 / Regular | Step label, detail text, notes, dial sub-label | |
| **Caption** | `body/caption` *(proposed)* | Inter / 12 / Regular | Tile labels, toggle helper text | |
| **Overline** | `label/overline` *(proposed)* | Inter / 12 / Semi Bold, uppercase, tracking 0.6 | Card header ("PORQUÊ ESTE PREÇO") | |
| **Micro** | `body/micro` *(proposed)* | Inter / 11 / Regular | Dial hint ("drag · max. 4 h") | |

**Typography decisions** (one sentence each):
- *One typeface (Inter) for the whole product; hierarchy comes from size and weight.*
- *The single most important number on a screen (price, duration) gets a display size; everything else stays at 20 or below.*
- *Sentence case everywhere, except the uppercase overline on card headers.*
- *To fix: the "Skateboard" tile uses 11.68px; it should be 12 like the other tiles.*
- *To fix: language is mixed (`Ativation` is in English, `Feedback value` in Portuguese).*

---

## 3. Patterns

How colors, typography and components combine on a screen, read from the anchor screens on `telas`. One row per pattern; add as many as you find.

| Pattern | How it's built | Where | Why |
| --- | --- | --- | --- |
| **Screen frame** | 375×780, vertical auto-layout, white background; content padding 8 top / 22 sides / 22 bottom | Every screen | |
| **Header** | Greeting (15 Regular) + name (22 Semi Bold), 4 gap, 20 padding; 56px round avatar/chat button on the right | Top of every screen | |
| **Top bar / progress** | "N de 4 · <step>" in Small tertiary on the left; step navigator on the right: 7px dots, 6 gap, current step a 20×7 pill in primary, past steps accent subtle, upcoming steps border grey | Under the header on every flow step | |
| **Choice tiles** | 3-column grid, 6 gap; each tile white, 1.5 border `#D8DCE0`, radius 12, 8 vertical padding, Caption label centred | Picking one option from a short list (activity) | |
| **Duration dial** | 224px circular dial; grey track, primary arc with a draggable handle; Dial value + "until HH:MM" (Small secondary) + hint (Micro tertiary) in the centre | Choosing a duration | |
| **Toggle row** | Label (15 Regular) + helper (12 tertiary) on the left, 48×28 toggle on the right, radius 14, 14/11 padding | Optional add-ons (equipment) | |
| **Price hero** | Context line (14 secondary) → Display price → one-line explanation (14 secondary) → 12px price split bar (radius 6, accent ramp slices) | Showing the price | |
| **Expandable breakdown card** | 1px border, radius 14; muted header with Overline label; rows with 10px colour dot (matches split bar), label, spacer, amount Semi Bold, chevron; 1px dividers; expanded row shows detail text indented 36 | Explaining how a value is built | |
| **Reassurance note** | 14px check icon + Small secondary text, 8 gap | Right before a commitment ("Nada é cobrado até tocares em Aceitar.") | |
| **Primary action** | Full width, 16 padding, radius 14, primary fill, white Button text; disabled = grey fill + tertiary text | Bottom of the screen, pushed down by a flexible spacer | |
| **Secondary action** | Same size as primary, no fill, Medium 16 text secondary | Directly under the primary action, 10 gap (Cancelar) | |

---

## 4. Checks

Each check is a yes/no question to ask of a finished screen.

| ID | Check | Severity |
| --- | --- | --- |
| DR-01 | Is every color one of the §1 roles, bound to its Figma variable and used where §1 says? | high |
| DR-02 | Does every text layer use a §2 text style, used where §2 says? | medium |
| DR-03 | Does the screen use the §3 patterns for its layout, hierarchy and actions? | medium |
| DR-04 | Could the screen sit next to the anchor screen as part of the same product? | medium |
