export type PersonaType = "target" | "secondary" | "anti-persona";

export interface Activity {
  name: string;
  frequency: string;
  environment: string;
  riskLevel: number;
  commonInjuries: string;
}

export interface Demographics {
  education: string;
  incomeLevel: string;
  familyStatus: string;
  techComfort: "Muito Alta" | "Alta" | "Média" | "Baixa";
  primaryDevices: string[];
}

export interface ConsumptionHabits {
  decisionTrigger: string;
  decisionLeadTime: string;
  preferredPaymentMethods: string[];
  spendingAttitude: string;
  digitalServicesUsed: string[];
}

export interface InsuranceAttitude {
  currentProtection: string;
  misconceptions: string;
  perceivedRisk: string;
  barrierToTraditionalInsurance: string;
}

export interface PulsoFit {
  fitScore: "Alto" | "Médio-Alto" | "Incompatível (Anti-Persona)";
  whyTheyBuyOrReject: string;
  keyFeaturesNeeded: string[];
  rejectionRisk: string;
}

export interface ResearchFoundation {
  groundedFacts: string[];
  hypothesesToValidate: string[];
  screenerQuestions: string[];
}

export interface Persona {
  id: string;
  name: string;
  archetype: string;
  type: PersonaType;
  age: number;
  location: string;
  occupation: string;
  avatar: string;
  quote: string;
  bio: string;
  demographics: Demographics;
  consumptionHabits: ConsumptionHabits;
  activities: Activity[];
  insuranceAttitude: InsuranceAttitude;
  painPoints: string[];
  goalsAndMotivations: string[];
  pulsoFit: PulsoFit;
  researchFoundation: ResearchFoundation;
}

export interface JourneyStage {
  stageNumber: number;
  stageName: string;
  userGoal: string;
  userActions: string[];
  thoughts: string;
  emotions: string;
  touchpoints: string[];
  painPoints: string[];
  opportunities: string[];
}

export interface CustomerJourney {
  personaId: string;
  personaName: string;
  scenario: string;
  stages: JourneyStage[];
}

export interface MatrixCategory {
  categoryName: string;
  painPoints: string[];
  opportunities: string[];
  affectedPersonas: string[];
}

export interface PainPointsMatrix {
  project: string;
  generatedAt: string;
  methodology: string;
  categories: MatrixCategory[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "persona" | "analyst";
  personaId?: string;
  personaName?: string;
  text: string;
  timestamp: string;
}
