import { Router } from "express";
import { chatWithAgent } from "./service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await chatWithAgent(message);

    res.json(result);
  } catch (error) {
    console.error(error);

   console.error(error);

res.status(500).json({
  success: false,
  error: error instanceof Error ? error.message : String(error),
});
  }
});

export default router;