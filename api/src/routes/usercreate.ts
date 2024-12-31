import {Router} from 'express';
import { RedisManager } from '../RedisManager';
import { CREATE_USER } from '../types';

export const userCreateRouter = Router();

userCreateRouter.post("/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(`creating ${userId}`);
  const response = await RedisManager.getInstance().sendAndAwait({
    type: CREATE_USER,
    data: {
      userId,
    },
  });
  console.log(`created in memory`);
  RedisManager.getInstance().sendToDb_processor({
    type: CREATE_USER,
    data: {
      userId,
    }
  })
  console.log(`created entry in db`); 
  res.json(response.payload);
})


