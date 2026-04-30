import { preprocessInput } from "../utils/preprocessInput";
import { getTransportInfo } from "../services/transportService";

export type Intent = "transport" | "chat";

function classifyIntent(text: string): Intent {
  const lower = text.toLowerCase();
  if (/버스|지하철|교통|길|transport|bus|subway|train/u.test(lower)) {
    return "transport";
  }
  return "chat";
}

export async function handleUserInput(text: string) {
  const preprocessed = preprocessInput(text);
  const intent = classifyIntent(preprocessed);

  if (intent === "transport") {
    const transportMessage = await getTransportInfo();
    return {
      intent,
      reply: transportMessage,
      preprocessed,
    };
  }

  return {
    intent,
    reply: "대화를 이어갈게요. (mock)",
    preprocessed,
  };
}
