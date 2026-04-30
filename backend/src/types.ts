export type Intent =
  | "transport"
  | "news"
  | "youtube"
  | "schedule"
  | "email"
  | "unknown";

export interface UserInputRequest {
  input: string;
}

export interface UserInputResponse {
  originalInput: string;
  preprocessedInput: string;
  intent: Intent;
  result: unknown;
}
