import { Router } from "express";
import { handleUserInput } from "../handlers/handleUserInput";
import { UserInputRequest } from "../types";

export const jarvisRouter = Router();

jarvisRouter.post("/jarvis", async (req, res, next) => {
  try {
    const { input } = req.body as UserInputRequest;

    if (!input || typeof input !== "string") {
      return res.status(400).json({ message: "'input' (string) is required." });
    }

    const data = await handleUserInput(input);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
});
