import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
import { MessageFromDb_processor } from "./types/out";

export class RedisManager {
  private client : RedisClientType;
  private static instance: RedisManager;

  constructor() {
    this.client = createClient();
    this.client.connect();  
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }

    return this.instance;
  }

  public sendToApi(clientId: string, message: MessageFromDb_processor) {
    this.client.publish(clientId, JSON.stringify(message))
  }
}
