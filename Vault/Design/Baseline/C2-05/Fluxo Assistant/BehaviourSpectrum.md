# [Project Name] - Behavioral Spectrums

## 🧭 How to Read This File (Explanation for LLMs)

This file documents the **intended interaction behavior** of a digital product using **6 UX behavioral categories**. Each category has **two opposing options (Option A and Option B)**, and the product is scored on how much it leans to each.

**Scoring system**

- Each category has a budget of **5 points**, split between Option A and Option B.
- Points are whole numbers and **A + B = 5** in every category.
- The split shows **which way the product leans** in that category, and by how much:

| Split (A / B) | Meaning |
| --- | --- |
| 5 / 0 | Fully Option A. Option B must not appear. |
| 4 / 1 | Strongly leans to A, B is only a rare exception. |
| 3 / 2 | Slightly leans to A, B is still a meaningful part of the behavior. |
| 2 / 3 | Slightly leans to B, A is still a meaningful part of the behavior. |
| 1 / 4 | Strongly leans to B, A is only a rare exception. |
| 0 / 5 | Fully Option B. Option A must not appear. |

- Example: `A = 3, B = 2` means "mostly A, with a noticeable amount of B". It does **not** mean "exactly in the middle". Odd totals mean there is never a perfect tie.
- Both options are valid design choices. Neither is "better". The scores describe the intended behavior, they do not rate quality.

**How an LLM should use this file**

1. Treat the scores in section 1 as the source of truth for how the interface must behave.
2. Use the description and examples of each option to understand what it means in practice.
3. When generating or reviewing UI, flows or copy, follow the **dominant option** (higher score) in each category and keep the **minority option** (lower score) present in proportion to its points.
4. The **Non-Negotiable Behavioral Rule** of each category overrides any interpretation of the scores.

---

## 1. Parameterization Across the 6 Universal UX Spectrums

### 1. Navigational Guardrails

- **Option A: Strictly Guided Wizard** — Linear progress, single-path focus, zero distractions (e.g., **Typeform**, **TurboTax**).
  - **Points**: 5
- **Option B: Unconstrained Open Canvas** — Multi-directional spatial workspace, dockable toolbars (e.g., **Figma**, **Miro**).
  - **Points**: 0
- **Non-Negotiable Behavioral Rule**: [ 1 sentence, e.g., "The workflow guides users through a structured 3-step sequence, but allows free jumping between steps via a top breadcrumb panel." ]

### 2. Initiative & Agency Balance

- **Option A: Proactive / System-Driven** — Ambient monitoring, smart popovers, contextual nudges (e.g., **Grammarly**, **GitHub Copilot**).
  - **Points**: 3
- **Option B: Reactive / User-Driven** — Passive waiting state, zero unprompted interruptions, strict manual execution (e.g., **Notion**, **Photoshop**).
  - **Points**: 2
- **Non-Negotiable Behavioral Rule**: [ 1 sentence rule ]

### 3. Information Density

- **Option A: Progressive Disclosure / Minimal** — High whitespace, summary cards, expandable accordions (e.g., **Apple Weather**, **Medium**).
  - **Points**: 3
- **Option B: High-Density Overview / Dashboard** — Multi-column data grids, real-time telemetry panels (e.g., **Bloomberg Terminal**, **Grafana**).
  - **Points**: 2
- **Non-Negotiable Behavioral Rule**: [ 1 sentence rule ]

### 4. Interaction Modality

- **Option A: Direct Manipulation / Visual** — Tactile graphic controls, sliders, visual handles (e.g., **Canva**, **Webflow**).
  - **Points**: 4
- **Option B: Intent-Based / Conversational** — Natural language input bars, prompt feeds, command palettes (e.g., **ChatGPT**, **Raycast**).
  - **Points**: 1
- **Non-Negotiable Behavioral Rule**: [ 1 sentence rule ]

### 5. Automation & Human Control

- **Option A: Autonomous Execution / Review Mode** — Diff previews, "Approve / Reject" action cards, automated change logs (e.g., **Descript**, **Copilot Workspace**).
  - **Points**: 2
- **Option B: Direct Step-by-Step Control** — Granular manual levers, step-by-step inspector panels (e.g., **DaVinci Resolve**, **Illustrator**).
  - **Points**: 3
- **Non-Negotiable Behavioral Rule**: [ 1 sentence rule ]

### 6. Feedback Tempo & State Visibility

- **Option A: Real-Time Dynamic Preview** — Live split-screen previews, instant inline validation (e.g., **CodePen**, **Figma Color Picker**).
  - **Points**: 1
- **Option B: Staged / On-Commit Validation** — Explicit "Save / Submit" buttons, post-commit confirmation toasts (e.g., **GitHub Pull Requests**, **Banking Portals**).
  - **Points**: 4
- **Non-Negotiable Behavioral Rule**: [ 1 sentence rule ]

---

## 2. AI Behavioral Steering Directive (For Exercise 5 Prompt Stack)

> **Behavioral Directive**:
> "The interface must follow a **[Dominant option + score, e.g., Open Canvas 3/2]** navigation model with **[Dominant option + score]** initiative balance and **[Dominant option + score]** density.
> The minority option in each category (the lower score) must remain present in proportion to its points.
> It must operate strictly under the rule: **[Primary Non-Negotiable Rule]**."
