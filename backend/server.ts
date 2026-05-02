import express from "express";
import cors from "cors";
import { handleUserInput } from "./src/handlers/handleUserInput";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/jarvis", async (req, res) => {
  const { text } = req.body as { text?: string };

  if (!text || typeof text !== "string") {
    return res.status(400).json({ message: "text is required" });
  }

  const data = await handleUserInput(text);
  return res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
