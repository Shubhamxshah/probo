import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { BUY_ORDER, SELL_ORDER } from "../types"; 

export const orderRouter = Router();

orderRouter.post("/sell", async (req, res) => {

  const {userId, stockSymbol, quantity, price, stockType} = req.body;

  const response = await RedisManager.getInstance().sendAndAwait({
    type: SELL_ORDER,
    data: {
      userId,
      stockSymbol,
      quantity,
      price,
      stockType
    }
  });

  res.json(response.payload);
})

orderRouter.post("/buy", async (req, res) => {

  const {userId, stockSymbol, quantity, price, stockType} = req.body;

  const response = await RedisManager.getInstance().sendAndAwait({
    type: BUY_ORDER,
    data: {
      userId,
      stockSymbol,
      quantity,
      price,
      stockType
    }
  });

  res.json(response.payload);
})

