import { RedisClientType, createClient } from "redis";

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager; 

  private constructor(){
    this.client = createClient({url: process.env.REDIS_URL || "redis://redis:6379"});
    this.client.connect();
    this.publisher = createClient({url: process.env.REDIS_URL || "redis://redis:6379"});
    this.publisher.connect();
  }

  public static getInstance(){
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public askDbForOrderBook(){
    
  }
}
