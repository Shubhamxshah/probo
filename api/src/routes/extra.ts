import { RedisManager } from "../RedisManager";
import { Router } from "express";
import { CREATE_SYMBOL, GET_INR_BALANCES, GET_ORDERBOOK, GET_STOCK_BALANCES, GET_STOCK_SYMBOL_ORDERBOOK, GET_USER_BALANCES } from "../types";
import { GET_TRANSACTIONS } from "../types/toDb";

export const extraRouter = Router();

extraRouter.get("/balances/inr", async (req, res) => {
  const response = await RedisManager.getInstance().sendAndAwait({
      type: GET_INR_BALANCES
  });

  res.json(response.payload);
});

extraRouter.get("/balances/stock", async (req, res) => {
  const response = await RedisManager.getInstance().sendAndAwait({
      type: GET_STOCK_BALANCES
  });

  res.json(response.payload);
});

extraRouter.get("/orderbook", async (req, res) => {
  const response = await RedisManager.getInstance().sendAndAwait({
      type: GET_ORDERBOOK
  });

  res.json(response.payload);
});

extraRouter.get("/balances/inr/:userId", async (req, res) => {
  const userId = req.params.userId;

  const response = await RedisManager.getInstance().sendAndAwait({
      type: GET_USER_BALANCES,
      data: {
      userId
    }
  });

  res.json(response.payload);
});

extraRouter.get("/orderbook/:stockSymbol", async (req, res) => {
  const stockSymbol = req.params.stockSymbol;

  const response = await RedisManager.getInstance().sendAndAwait({
      type: GET_STOCK_SYMBOL_ORDERBOOK,
      data: {
      stockSymbol,
    }
  });

  res.json(response.payload);
});

extraRouter.post("/symbol/create/:stockSymbol", async (req, res) => {
  const stockSymbol = req.params.stockSymbol;
  const endTime = req.body.endTime;
  const category = req.body.category;

  const response = await RedisManager.getInstance().sendAndAwait({
    type: CREATE_SYMBOL,
    data: {
      stockSymbol
    }
  });

  res.json(response.payload);

  await RedisManager.getInstance().sendToDb_processor({
    type: CREATE_SYMBOL,
    data: {
      stockSymbol, 
      endTime,
      category,
    }
  })


});

extraRouter.get("/transactions", async (req, res) => {
  const userId = req.body.userId;

  const response = await RedisManager.getInstance().sendToDb_processor({
    type: GET_TRANSACTIONS,
    data: {
      userId,
    }
  })

  res.json((response.payload));
})

