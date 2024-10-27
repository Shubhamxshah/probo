import {Router} from 'express';
import { RedisManager } from '../RedisManager';
import { CREATE_USER } from '../types';

export const userCreateRouter = Router();

userCreateRouter.post("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const response = await RedisManager.getInstance().sendAndAwait({
    type: CREATE_USER,
    data: {
      userId,
    },
  });

  await RedisManager.getInstance().sendToDb_processor({
    type: CREATE_USER,
    data: {
      userId,
    }
  })
  res.json(response.payload);
 
})



