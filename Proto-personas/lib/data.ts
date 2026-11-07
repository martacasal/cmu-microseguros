import tiagoData from "@/data/personas/tiago.json";
import ritaData from "@/data/personas/rita.json";
import joanaData from "@/data/personas/joana.json";
import mariaData from "@/data/personas/maria.json";

import tiagoJourney from "@/data/journeys/tiago-journey.json";
import ritaJourney from "@/data/journeys/rita-journey.json";
import joanaJourney from "@/data/journeys/joana-journey.json";
import mariaJourney from "@/data/journeys/maria-journey.json";

import matrixData from "@/data/pain_points_opportunities/matrix.json";

import { Persona, CustomerJourney, PainPointsMatrix } from "@/types";

export const personas: Persona[] = [
  tiagoData as Persona,
  ritaData as Persona,
  joanaData as Persona,
  mariaData as Persona,
];

export const journeys: Record<string, CustomerJourney> = {
  tiago: tiagoJourney as CustomerJourney,
  rita: ritaJourney as CustomerJourney,
  joana: joanaJourney as CustomerJourney,
  maria: mariaJourney as CustomerJourney,
};

export const painPointsMatrix: PainPointsMatrix = matrixData as PainPointsMatrix;

export function getPersonaById(id: string): Persona | undefined {
  return personas.find((p) => p.id === id);
}

export function getJourneyByPersonaId(id: string): CustomerJourney | undefined {
  return journeys[id];
}
