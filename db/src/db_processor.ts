import { RedisManager } from "./RedisManager";
import { CREATE_TRANSACTION, MessageToDb_processor } from "./types/in";
import { CREATE_USER, CREATE_SYMBOL, GET_TRANSACTIONS } from "./types/in";
import prisma from "../lib/prisma";

export class Db_processor {
  async process({
    message,
    clientId,
  }: {
    message: MessageToDb_processor;
    clientId: string;
  }) {
    console.log("received message: ", message);
    switch (message.type) {
      case CREATE_USER:
        try {
          const userId = message.data.userId;
          const simpleresfromdb = await this.createUser(userId);
          RedisManager.getInstance().sendToApi(clientId, {
            type: "simpleresfromdb",
            payload: {
              simpleresfromdb,
            },
          });
        } catch (e) {
          console.log(e);
        }
        break;
      case CREATE_TRANSACTION:
        try {
          const {
            userId,
            stockSymbol,
            orderType,
            stockType,
            price,
            quantity,
            executedQuantity,
          } = message.data;
          await this.createTransaction(
            userId,
            stockSymbol,
            orderType,
            stockType,
            price,
            quantity,
            executedQuantity,
          );
        } catch (e) {
          console.log(e);
        }
        break;

      case CREATE_SYMBOL:
        try {
          const { stockSymbol } = message.data;
          await this.createSymbol(stockSymbol);
        } catch (e) {
          console.log(e);
        }
        break;

      case GET_TRANSACTIONS:
        try {
          const userId = message.data.userId;
          const payload = await this.getTransactions(userId);
          if (!payload) {
          } else {
            RedisManager.getInstance().sendToApi(clientId, {
              type: "allTransactions",
              payload: payload,
            });
          }
        } catch (e) {
          console.log(e);
        }
    }
  }

  async createUser(userId: string) {
    const userexists = await prisma.user.findUnique({
      where: { userId },
    });

    if (userexists) {
      throw new Error("user already exists in db");
    }

    try {
      await prisma.user.create({
        data: {
          userId,
        },
      });

      const simpleresfromdb = `User ${userId} created in database`;
      return simpleresfromdb;
    } catch (e) {
      const simpleresfromdb = `user ${userId} not created`;
      return simpleresfromdb;
    }
  }

  async createTransaction(
    userId: string,
    stockSymbol: string,
    orderType: any,
    stockType: any,
    price: number,
    quantity: number,
    executedQuantity: number,
  ) {
    try {
      await prisma.transactions.create({
        data: {
          userId,
          stockSymbol,
          orderType,
          stockType,
          price,
          quantity,
          executedQuantity,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async createSymbol(stockSymbol: string) {
    try {
      await prisma.stockSymbol.create({
        data: {
          stockSymbol,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getTransactions(userId: string) {
    try {
      const res = await prisma.transactions.findMany({
        where: {
          userId,
        },
      });

      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
