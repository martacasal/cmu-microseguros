# PULSE - Exercise 1: System Mechanics Spec (`StructureIdea.md`)

## 1. Problem Statement

- **User Friction**: Amateur athletes in Portugal who practice sport informally (outside gyms and clubs) do not know that per-hour insurance exists, what the law asks of them or what is actually covered. Insurance sign-ups usually feel long, full of legal jargon and untrustworthy, so people give up before they are ever protected.
- **Target Outcome**: Understand the value of the app, create an account and build a sports profile in a short, guided flow (12 steps with a progress bar), learn in plain language what is covered and what the law says, give consent, and reach the Home ready to activate their first protection.

## 2. Low-Fidelity Interaction Breadboard
![[Breadboard · Onboarding.jpg]]

*Legend: screens 2.3 to 4.3 show a **Back** button and a **progress bar (1 to 12)** at the top.*

### Part 1 · Welcome and value proposition

- **Step 1.1 (Welcome / Boas-vindas)**:
  - User sees the app logo and name, and the ASF seal (partner insurer).
  - User can **tap Start (Começar)**, which opens Step 1.2.
  - User can **tap I already have an account (Já tenho conta)**, which opens Login (outside this flow).

- **Step 1.2 (Value · Per hour)**:
  - User sees an illustration and pagination (1 of 3).
  - User can **tap Next (Próximo)**, which opens Step 1.3.
  - User can **tap Skip (Pular)**, which opens Step 2.1 (Create account).

- **Step 1.3 (Value · The law)**:
  - User sees an illustration, pagination (2 of 3) and a Decreto-Lei 10/2009 card; tapping the card opens a summary.
  - User can **tap Next (Próximo)**, which opens Step 1.4.
  - User can **tap Skip (Pular)**, which opens Step 2.1.

- **Step 1.4 (Value · Equipment)**:
  - User sees an illustration and pagination (3 of 3).
  - User can **tap Create account (Criar conta)**, which opens Step 2.1.
  - User can **tap I already have an account (Já tenho conta)**, which opens Login (outside this flow).

### Part 2 · Account and personal details

- **Step 2.1 (Create account)**:
  - User sees Continue with Apple, Continue with Google, an email field, Continue with email and a link to terms and privacy.
  - User can **tap Continue with email**, which opens Step 2.2.
  - User can **tap Continue with Apple / Google**, which skips the code and opens Step 2.3.

- **Step 2.2 (Confirm email)**:
  - User sees a 6-digit code field and Resend code (with a 0:30 timer).
  - User can **tap Confirm**, which opens Step 2.3.

- **Step 2.3 (Name · 1/12)**:
  - User sees a full name field and an optional nickname field.
  - User can **tap Continue**, which opens Step 2.4.

- **Step 2.4 (Age · 2/12)**:
  - User sees day / month / year fields and a "Why do we ask this?" card.
  - User can **tap Continue**, which opens Step 2.5.
  - If the age is outside the accepted range, the system opens Step 7.1 (exception).

- **Step 7.1 (Age out of range · exception)**:
  - User sees the message "we can't protect you yet".
  - User can **tap Notify me when available (Avise-me quando houver)**.
  - User can **tap Back (Voltar)**, which returns to Step 2.4.

- **Step 2.5 (Location · 3/12)**:
  - User sees a map with nearby spots.
  - User can **tap Allow location** or **choose the municipality (concelho) manually**; either opens Step 2.6.

- **Step 2.6 (Emergency contact · 4/12)**:
  - User sees name and mobile fields, relationship chips and a checkbox "notify them when I ask for help".
  - User can **tap Continue** or **Add later (Adicionar depois)**; both open Step 3.1.

### Part 3 · Activities and sports profile

- **Step 3.1 (What you practise · 5/12)**:
  - User sees activity chips (multiple choice) and a "+ other" chip.
  - User can **tap Continue (n)**, showing how many were picked, which opens Step 3.2.

- **Step 3.2 (Level · 6/12)**:
  - User sees a beginner / intermediate / advanced selector for each activity, with a description of the level.
  - User can **tap Continue**, which opens Step 3.3.

- **Step 3.3 (How you practise · 7/12)**:
  - User sees frequency chips and where chips (park, street, beach...).
  - User can **tap Continue**, which opens Step 3.4.

- **Step 3.4 (Want to try · 8/12)**:
  - User sees chips with new activities.
  - User can **tap Continue** or **Not now (Agora não)**; both open Step 3.5.

- **Step 3.5 (Insurance you already have · 9/12)**:
  - User sees checkboxes for health, life / accidents and bank / card insurance, plus "I don't have any / I don't know".
  - User can **tap Continue**, which opens Step 4.1.

### Part 4 · Laws, cover and consent

- **Step 4.1 (What is covered · 10/12)**:
  - User sees cover cards:
    - Treatment
    - Death / disability
    - Civil liability
    - Equipment
  - User can **tap See what is not covered**.
  - User sees the ASF seal.
  - User can **tap Got it (Entendi)**, which opens Step 4.2.

- **Step 4.2 (What you need to know · 11/12)**:
  - User sees accordions with 6 questions written without legal jargon.
  - User can **tap Read full document**.
  - User can **tap Continue**, which opens Step 4.3.

- **Step 4.3 (Consents · 12/12)**:
  - User sees mandatory checkboxes (terms, pre-contractual information, location) and an optional checkbox (news).
  - User can **tap Accept and continue**, enabled only when every mandatory box is ticked, which opens Step 5.1.

### Part 5 · All set

- **Step 5.1 (Your profile)**:
  - User sees a profile summary and an example price (euros per hour).
  - User can **tap Continue**, which opens Step 5.2.
  - User can **tap Edit profile**, which goes back to the questions.

- **Step 5.2 (Reminders)**:
  - User sees a notification illustration.
  - User can **tap Turn on reminders** or **Not now**; both open Step 5.3.

- **Step 5.3 (Home · first access)**:
  - User sees the status "no protection now", activity chips, "how it works" cards and a tab bar (home, activities, cover, profile).
  - User can **tap Activate protection**, which opens Step 6.

- **Step 6 (First guided activation)**:
  - Leads into the "Start insurance" breadboard (next flow, see `Fluxo StartInsurance`).

## 3. Non-Negotiable System Mechanics

- From Step 2.3 to Step 4.3 every screen shows a progress bar (1 to 12) and a Back button, so the user always knows where they are and can go back without losing their answers.
- The user cannot finish onboarding without ticking every mandatory consent (terms, pre-contractual information, location); optional items (nickname, emergency contact, new activities, reminders, news) can always be skipped or added later.
- Cover, exclusions and the law are explained in plain language before consent, with the full legal document always one tap away, and users outside the accepted age range are stopped with a clear message instead of being allowed to continue.
