import { createClient } from "redis";
import { Db_processor } from "./db_processor";

async function main() {
  const db_processor = new Db_processor();
  const redisClient = createClient({url: 'redis://redis:6379'});
  await redisClient.connect();

  while(true) {
    const response = await redisClient.rPop("MessageToDb_processor" as string);
    if (!response) {

    } else {
      console.log(`popped a response from engine ${JSON.stringify(JSON.parse(response))}`);
      db_processor.process(JSON.parse(response));
    }
  }
}

main();
