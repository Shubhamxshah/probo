import Router from 'express';
import { RedisManager } from '../RedisManager';
import { ONRAMP_INR } from '../types';

export const onrampRouter = Router();

onrampRouter.post("/inr" , async (req, res) => {
  const {userId, amount} = req.body;

  const response = await RedisManager.getInstance().sendAndAwait({
    type: ONRAMP_INR,
    data: {
      userId,
      amount,
    }
  });

  res.json(response.payload);
})
