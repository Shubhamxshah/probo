import Router from 'express';
import { RedisManager } from '../RedisManager';
import { MINT_STOCKS } from '../types';

export const mintRouter = Router();

mintRouter.post("/mint" , async (req, res) => {
  const {userId, stockSymbol, quantity, price} = req.body;

  const response = await RedisManager.getInstance().sendAndAwait({
    type: MINT_STOCKS,
    data: {
      userId,
      stockSymbol,
      quantity, 
      price,
    }
  });

  res.json(response.payload);
})

