import { RedisClientType, createClient } from "redis";
import { MessagetoApi } from "./types/toApi";
import { WsMessage } from "./types/toWs";
import { messageToDb_processor } from "./types/toDb";

export class RedisManager {
  private client: RedisClientType;
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

  public sendToApi(clientId: string, message: MessagetoApi) {
    console.log("2");
    this.client.publish(clientId, JSON.stringify(message));
  }

  public sendToDb(message: messageToDb_processor) {
    console.log(`pushed message ${JSON.stringify(message)}`);
    this.client.lPush("MessageToDb_processor", JSON.stringify({clientId:123 ,message}));
  }

  public publishMessage(channel: string, message: WsMessage) {
    this.client.publish(channel, JSON.stringify(message));
  }

}
