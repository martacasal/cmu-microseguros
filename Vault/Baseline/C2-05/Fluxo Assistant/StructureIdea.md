# Micro-seguro - Exercise 1: System Mechanics Spec (`StructureIdea.md`)

## 1. Problem Statement

- **User Friction**: Amateur athletes in Portugal who practise sport informally (outside gyms and clubs, e.g. running or playing ball in the park) have no insurance for those moments. Annual insurance products do not match irregular, spontaneous practice, so they end up exercising with no protection for themselves or their equipment.
- **Target Outcome**: Turn on insurance only for the duration of a single activity, in a few taps: pick the activity and how long it lasts, choose whether to cover equipment, see the price and why, and be covered until the activity ends.

## 2. Low-Fidelity Interaction Breadboard

![[IMG_8682.jpg]]

- **Step 1 (Homepage)**:
  - User sees the activity setup: activity picker, duration picker and an equipment coverage option.
  - User can **choose the activity** (e.g. running, football in the park).
  - User can **choose the duration** of the activity.
  - User can **choose to insure their equipment**.
  - User can **tap Start (Começar)**, which opens Step 2.

- **Step 2 (Loader / Calculation)**:
  - User sees a loading state while the system calculates the price and the risk of the insurance, based on the activity, duration and equipment chosen in Step 1.
  - No user action: when the calculation ends, the system automatically opens Step 3.

- **Step 3 (Feedback / Quote)**:
  - User sees the result of the calculation:
    - **How much the insurance costs** for this activity
    - **Why** (the reasons behind the price)
  - User can **tap Accept (Aceitar)**, which starts the cover and opens Step 4.
  - User can **tap Cancel (Cancelar)** to not take the insurance and go back to Step 1.

- **Step 4 (Activity)**:
  - User sees a **countdown of the activity time**: how long the cover still lasts.
  - User can **tap Stop (Parar)** to end the activity and the cover early.
  - User can **tap Extend (Prolongar)** to add more time to the activity and keep the cover running.

## 3. Non-Negotiable System Mechanics

- The cover only runs while an activity is active: it starts when the user accepts the quote and ends when the countdown reaches zero or the user taps Stop.
- The price is always shown together with why it costs that much, before the user accepts. Nothing is charged without an explicit Accept.
- The setup is linear (Homepage, Calculation, Quote, Activity), and the user can always cancel before accepting or stop or extend while the activity is running.
