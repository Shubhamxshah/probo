import {createClient} from 'redis';
import { Engine } from './trade/engine';

async function main() {
  const engine = new Engine();
  const redisClient = createClient({url: 'redis://redis:6379'});
  await redisClient.connect();

  while(true) {
    const response = await redisClient.rPop("messages" as string)
    if (!response) { 
    } else {
      engine.process(JSON.parse(response));
    }
  }
}

main();
