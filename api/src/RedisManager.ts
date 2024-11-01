import {RedisClientType, createClient } from 'redis';
import { MessageFromOrderbook } from './types';
import { MessageToEngine } from './types/to';
import { MessageToDb_processor } from './types/toDb';
import { MessageFromDb_processor } from './types/fromDb';

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager;

  private constructor() {
    this.client = createClient();
    this.client.connect();
    this.publisher = createClient();
    this.publisher.connect();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public sendAndAwait(message: MessageToEngine) {
    return new Promise<MessageFromOrderbook>((resolve) => {
      const id = this.getRandomClientId();
      this.client.subscribe(id, (message) => {
        this.client.unsubscribe(id);
        resolve(JSON.parse(message));
      });
      this.publisher.lPush("messages", JSON.stringify({ clientId: id, message}));
    });
  }

  public sendToDb_processor(message:MessageToDb_processor) {
    return new Promise<MessageFromDb_processor>((resolve) => {
      const id = this.getRandomClientId();
      this.client.subscribe(id, (message) => {
        this.client.unsubscribe(id);
        resolve(JSON.parse(message));
      });
      this.publisher.lPush("MessageToDb_processor", JSON.stringify({clientId: id, message}));
    });
  }

  public getRandomClientId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
