import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { RESET } from "../types"; 

export const resetRouter = Router();

resetRouter.post("/reset", async (req, res) => {

  const response = await RedisManager.getInstance().sendAndAwait({
    type: RESET,
  });

  res.json(response.payload);
})

