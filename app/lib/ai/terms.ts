/**
 * Mock session terms the assistant answers from and cites. Prototype copy based on screens 06.2 / 06.4 and
 * Vault/Design/Baseline/ProductRequirementsSpec.md. Amounts stay as [AMOUNT] placeholders on purpose.
 */
export const SESSION_TERMS: { clause: string; title: string; text: string }[] = [
  { clause: "1.1", title: "What PULSE is", text: "Accident insurance for one outdoor activity session. Cover runs only between the start and end time of the session the person turned on and paid for." },
  { clause: "1.2", title: "When cover starts and ends", text: "Cover starts when the person confirms and pays. It ends at the chosen end time, or earlier if they tap Stop. Anything before or after that slot is not covered." },
  { clause: "1.3", title: "Extending", text: "The person can extend a running session. Extra time is only covered after they confirm the new price." },
  { clause: "2.1", title: "Treatment", text: "Medical treatment after an accident during the activity: appointments, tests and treatment, up to [AMOUNT]." },
  { clause: "2.2", title: "Disability", text: "A lump sum if the accident leaves lasting effects, up to [AMOUNT]." },
  { clause: "3.1", title: "Who can use it", text: "People aged 18 to 40 living in or visiting Portugal. Age, gender, fitness, health condition or disability never change the price and are never a reason to refuse cover. Adapted sport is covered like any other activity." },
  { clause: "4.1", title: "Federation", text: "Not covered: federation events and training. People who are federated in the sport are already insured by their federation for those." },
  { clause: "4.2", title: "High-risk sports", text: "Not covered: extreme or high-risk sports such as downhill, mountaineering and skydiving." },
  { clause: "4.3", title: "Third-party liability", text: "Damage you cause to other people is to be confirmed [V]. Do not promise it is covered." },
  { clause: "5.1", title: "Gear", text: "Damage to or theft of gear during the activity is covered only if the person added gear cover to that session, up to [AMOUNT]. Without gear cover, gear is not included." },
  { clause: "6.1", title: "Price", text: "The price depends on four things only: the activity, the duration, the place and whether gear cover is added." },
  { clause: "7.1", title: "If you get hurt", text: "If it is serious, call 112 first. Then open Get help in the app: the assistant asks 4 short questions, prepares a summary and a person from the PULSE team takes the claim. The assistant never decides a claim." },
  { clause: "7.2", title: "Talking to a person", text: "A person from the PULSE team is available by chat or call. The 24h line is always available." },
  { clause: "8.1", title: "Cancelling", text: "Cancellations and refunds are to be confirmed [V]. Nothing is charged without the person tapping to pay." },
]

export function termsAsText() {
  return SESSION_TERMS.map((t) => `[${t.clause}] ${t.title}: ${t.text}`).join("\n")
}
