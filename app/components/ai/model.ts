/** The local Ollama model picked in the viewport shell toolbar (shared with the screen iframe, same origin). */
export const MODEL_KEY = "pulse:ai-model"

export function getChosenModel(): string | undefined {
  try {
    return window.localStorage.getItem(MODEL_KEY) || undefined
  } catch {
    return undefined
  }
}

export function setChosenModel(model: string) {
  try {
    window.localStorage.setItem(MODEL_KEY, model)
  } catch {
    // storage blocked: the server default is used
  }
}
