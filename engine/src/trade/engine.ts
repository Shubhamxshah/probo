import fs from "fs";
import { RedisManager } from "../RedisManager";
import { OrderBook, StockBalances, INRBalances } from "../types/types";
import { MessageFromApi } from "../types/fromApi";
import {
  CREATE_USER,
  ONRAMP_INR,
  SELL_ORDER,
  BUY_ORDER,
  MINT_STOCKS,
  CREATE_SYMBOL,
  RESET,
  GET_INR_BALANCES,
  GET_STOCK_BALANCES,
  GET_ORDERBOOK,
  GET_USER_BALANCES,
  GET_STOCK_SYMBOL_ORDERBOOK,
} from "../types/toApi";
import { PriceLevel } from "../types/types";
import { CREATE_TRANSACTION } from "../types/toDb";

export class Engine {
  private ORDERBOOK: OrderBook = {};
  private STOCK_BALANCES: StockBalances = {};
  private INR_BALANCES: INRBalances = {};

  // add snapshot logic
  constructor() {}

  process({
    message,
    clientId,
  }: {
    message: MessageFromApi;
    clientId: string;
  }) {
    switch (message.type) {
      case CREATE_USER:
        try {
          const userId = message.data.userId;
          const simpleres = this.createUser(userId);
          RedisManager.getInstance().sendToApi(clientId, {
            type: "simpleres",
            payload: {
              simpleres,
            },
          });
        } catch (e) {
          console.log(e);
        }
      break;
      case ONRAMP_INR:
        try {
          const userId = message.data.userId;
  
          const amount = Number(message.data.amount);

          const simpleres = this.onramp_inr(userId, amount);
          RedisManager.getInstance().sendToApi(clientId, {
            type: "simpleres",
            payload: {
              simpleres,
            },
          });
        } catch (e) {
          console.log(e);
        }
      break;
      case RESET:
        try {
          this.resetBalances();
          const simpleres = `reset done`;
          RedisManager.getInstance().sendToApi(clientId, {
            type: "simpleres",
            payload: {
              simpleres,
            },
          });
        } catch (e) {
          console.log(e);
        }
      break;
      case CREATE_SYMBOL:
        try {
          const symbol = message.data.stockSymbol;
          this.createSymbol(symbol);
          console.log("1")
          const simpleres = `symbol ${symbol} created`;
          RedisManager.getInstance().sendToApi(clientId, {
            type: "simpleres",
            payload: {
              simpleres,
            },
          });
        } catch (e) {
          console.log(e);
        }
      break;
      case MINT_STOCKS:
        try {
          const userId = message.data.userId;
          const price = Number(message.data.price);
          const quantity = Number(message.data.quantity);
          const stockSymbol = message.data.stockSymbol;

          const simpleres = this.mintStocks(
            userId,
            price,
            quantity,
            stockSymbol,
          );
          RedisManager.getInstance().sendToApi(clientId, {
            type: "simpleres",
            payload: {
              simpleres,
            },
          });
        } catch (e) {
          console.log(e);
        }
      break;
      case SELL_ORDER:
        try {
          const userId = message.data.userId;
          const price = Number(message.data.price);
          const quantity = Number(message.data.quantity);
          const stockSymbol = message.data.stockSymbol;
          const stockType = message.data.stockType;

          console.log("here1")
          const res = this.sellOrder(
            userId,
            price,
            quantity,
            stockType,
            stockSymbol,
          );
          console.log("here2");
          RedisManager.getInstance().sendToApi(clientId, {
            type: "ORDER_PLACED",
            payload: res,
          });
          RedisManager.getInstance().sendToDb({
            type: CREATE_TRANSACTION,
            data: res,
          })
        } catch (e) {
          console.log(e);
        }
      break;
      case BUY_ORDER:
        try {
          const userId = message.data.userId;
          const price = Number(message.data.price);
          const quantity =Number(message.data.quantity);
          const stockSymbol = message.data.stockSymbol;
          const stockType = message.data.stockType;

          const res = this.buyOrder(
            userId,
            price,
            quantity,
            stockType,
            stockSymbol,
          );
          RedisManager.getInstance().sendToApi(clientId, {
            type: "ORDER_PLACED",
            payload: res,
          });
          RedisManager.getInstance().sendToDb({
            type: CREATE_TRANSACTION,
            data: res,
          })
        } catch (e) {
          console.log(e);
        }
      break;
      case GET_INR_BALANCES:
        try {
          RedisManager.getInstance().sendToApi(clientId, {
            type: "GET_INR_BALANCES",
            payload: this.INR_BALANCES
          });
          
        } catch (e) {
          console.log(e)
        }
      break;
      case GET_STOCK_BALANCES:
        try {
          RedisManager.getInstance().sendToApi(clientId, {
            type: "GET_STOCK_BALANCES",
            payload: this.STOCK_BALANCES
          });
          
        } catch (e) {
          console.log(e)
        }
      break;
      case GET_ORDERBOOK:
        try {
          RedisManager.getInstance().sendToApi(clientId, {
            type: "GET_ORDERBOOK",
            payload: this.ORDERBOOK
          });
          
        } catch (e) {
          console.log(e)
        }
      break;
      case GET_USER_BALANCES:
        try {
          const userId = message.data.userId;

          RedisManager.getInstance().sendToApi(clientId, {
            type: "GET_USER_BALANCES",
            payload: this.INR_BALANCES[userId]
          });
          
        } catch (e) {
          console.log(e)
        }
      break;
      case GET_STOCK_SYMBOL_ORDERBOOK:
        try {
          const stockSymbol = message.data.stockSymbol

          RedisManager.getInstance().sendToApi(clientId, {
            type: "GET_STOCK_SYMBOL_ORDERBOOK",
            payload: this.ORDERBOOK[stockSymbol]
          })
        } catch (e) {
          console.log(e)
        }
      break;
    }
  }

  createUser(userId: string) {
    if (userId in this.INR_BALANCES) {
      throw new Error(`User ${userId} already exists`);
    }

    this.INR_BALANCES[userId] = { balance: 0, locked: 0 };
    const simpleres = `User ${userId} created`;
    return simpleres;

  }

  onramp_inr(userId: string, amount: number) {
    if (!(userId in this.INR_BALANCES)) {
      throw new Error(`user ${userId} doesnt exist`);
    }

    this.INR_BALANCES[userId].balance += amount;
    const simpleres = `Onramped ${userId} with amount ${amount}`;
    return simpleres;
  }

  resetBalances() {
    Object.keys(this.INR_BALANCES).forEach(
      (key) => delete this.INR_BALANCES[key],
    );
    Object.keys(this.STOCK_BALANCES).forEach(
      (key) => delete this.STOCK_BALANCES[key],
    );
    Object.keys(this.ORDERBOOK).forEach((key) => delete this.ORDERBOOK[key]);
  }

  createSymbol(symbol: string) {
    const yesOrderValues: Record<string, PriceLevel> = {};
    for (let i = 50; i <= 950; i += 50) {
      yesOrderValues[i] = { total: 0, orders: [] };
    }

    const noOrderValues: Record<string, PriceLevel> = {};
    for (let i = 50; i <= 950; i += 50) {
      noOrderValues[i] = { total: 0, orders: [] };
    }

    if (!this.ORDERBOOK[symbol]) {
      this.ORDERBOOK[symbol] = { yes: yesOrderValues, no: noOrderValues };
    }

    const simpleres = `stockSymbol ${symbol} created`;
    return simpleres;
  }

  mintStocks(
    userId: string,
    price: number,
    quantity: number,
    stockSymbol: string,
  ) {
    if (
      !userId ||
      !stockSymbol ||
      typeof quantity !== "number" ||
      typeof price !== "number"
    ) {
      throw new Error(`Incorrect input body parameters`);
    }

    const userBalance = this.INR_BALANCES[userId]?.balance;

    if (userBalance === undefined) {
      throw new Error(`No such userId exists yet. Please create one`);
    }

    const totalCost = price * quantity;

    if (userBalance < totalCost) {
      throw new Error(`User balance insufficient`);
    }

    if (!this.STOCK_BALANCES[userId]) {
      this.STOCK_BALANCES[userId] = {};
    }

    if (!this.STOCK_BALANCES[userId][stockSymbol]) {
      this.STOCK_BALANCES[userId][stockSymbol] = {
        yes: { quantity: 0, locked: 0 },
        no: { quantity: 0, locked: 0 },
      };
    }

    this.INR_BALANCES[userId].balance -= totalCost;
    this.STOCK_BALANCES[userId][stockSymbol].yes.quantity += quantity;
    this.STOCK_BALANCES[userId][stockSymbol].no.quantity += quantity;

    const simpleres = `mint completed`;
    return simpleres;
  }

  sellOrder(
    userId: string,
    price: number,
    quantity: number,
    stockType: "yes" | "no",
    stockSymbol: string,
  ) {
    if (!userId || !stockSymbol || !quantity || !price || !stockType) {
      throw new Error(`Missing required params`);
    }

    if (price < 50 || price > 950 || price % 50 !== 0) {
      throw new Error(
        `Price is not valid, should be between 0.5 and 9.5 and in 0.5 increments`,
      );
    }

    const userPosition = this.STOCK_BALANCES[userId]?.[stockSymbol];
    if (!userPosition) {
      throw new Error(`user doesnt have this token`);
    }

    const stockQuantity = userPosition[stockType];

    if (stockQuantity.quantity < quantity) {
      throw new Error(`user doesnt have enough tokens to sell`);
    }

    stockQuantity.quantity -= quantity;
    stockQuantity.locked += quantity;

    this.ORDERBOOK[stockSymbol][stockType][price].total += quantity;
    this.ORDERBOOK[stockSymbol][stockType][price].orders.push({
      quantity: quantity,
      userId: userId,
      type: "sell",
    });

    RedisManager.getInstance().publishMessage('publishes', {
      EventId : stockSymbol,
      EventData: this.ORDERBOOK[stockSymbol],
    })

    const executedQuantity = 0;
    const sell: 'sell' = "sell";

    const payload = {
      userId,
      stockSymbol,
      orderType: sell,
      stockType,
      price, 
      quantity, 
      executedQuantity
    }
    return payload;
  }

  buyOrder(
    userId: string,
    price: number,
    quantity: number,
    stockType: "yes" | "no",
    stockSymbol: string,
  ) {
    if (!userId || !stockSymbol || !quantity || !price || !stockType) {
      throw new Error(`Missing required params`);
    }

    if (price < 50 || price > 950 || price % 50 !== 0) {
      throw new Error(
        `Price is not valid, should be between 0.5 and 9.5 and in 0.5 increments`,
      );
    }

    if (!this.ORDERBOOK[stockSymbol]) {
      throw new Error(
        `The stockSymbol is missing in orderbook. Please create one`,
      );
    }
    const totalCost = price * quantity;
    const userBalance = this.INR_BALANCES[userId]?.balance;

    if (userBalance === undefined) {
      throw new Error(`No such userId exists yet. Please create one`);
    }

    if (userBalance < totalCost) {
      throw new Error(`User balance insufficient`);
    }

    let remainingQuantity = quantity;
    let totalSpent = 0;
    const oppositeSide = stockType === "yes" ? "no" : "yes";
    const oppositePrice = 1000 - price;

    // Deduct total cost from user's balance and lock it
    this.INR_BALANCES[userId].balance -= totalCost;
    this.INR_BALANCES[userId].locked += totalCost;

    // Check for matching sell orders
    for (let i = 50; i <= price && remainingQuantity > 0; i += 50) {
      const priceLevel = this.ORDERBOOK[stockSymbol][stockType][i];
      if (priceLevel.total > 0) {
        const executedQuantity = Math.min(remainingQuantity, priceLevel.total);
        remainingQuantity -= executedQuantity;
        const executionCost = executedQuantity * i;
        totalSpent += executionCost;

        // Update orderbook
        priceLevel.total -= executedQuantity;

        const indexesToDelete: number[] = [];

        for (let index = 0; index < priceLevel.orders.length; index++) {
          const sellOrder = priceLevel.orders[index];
          const numSellOrderQuantity = sellOrder.quantity;
          const sellerUserId = sellOrder.userId;
          const orderType = sellOrder.type;

          this.initializeStockBalance(sellerUserId, stockSymbol);

          if (numSellOrderQuantity <= executedQuantity) {
            indexesToDelete.push(index);

            // Update seller's balance and stock
            if (this.INR_BALANCES[sellerUserId]) {
              if (orderType === "sell") {
                this.INR_BALANCES[sellerUserId].balance +=
                  numSellOrderQuantity * i;
                this.STOCK_BALANCES[sellerUserId][stockSymbol][
                  stockType
                ].locked -= numSellOrderQuantity;
              } else {
                // If it was originally a buy order, unlock the funds and update stock
                const originalBuyPrice = 1000 - i;
                this.INR_BALANCES[sellerUserId].locked -=
                  numSellOrderQuantity * originalBuyPrice;
                this.STOCK_BALANCES[sellerUserId][stockSymbol][
                  oppositeSide
                ].quantity += numSellOrderQuantity;
              }
            }
          } else {
            const remainingSellOrderQuantity =
              numSellOrderQuantity - executedQuantity;
            priceLevel.orders[index].quantity = remainingSellOrderQuantity;

            // Update seller's balance and stock
            if (this.INR_BALANCES[sellerUserId]) {
              if (orderType === "sell") {
                this.INR_BALANCES[sellerUserId].balance += executedQuantity * i;
                this.STOCK_BALANCES[sellerUserId][stockSymbol][
                  stockType
                ].locked -= executedQuantity;
              } else {
                // If it was originally a buy order, unlock the funds and update stock
                const originalBuyPrice = 1000 - i;
                this.INR_BALANCES[sellerUserId].locked -=
                  executedQuantity * originalBuyPrice;
                this.STOCK_BALANCES[sellerUserId][stockSymbol][
                  oppositeSide
                ].quantity += executedQuantity;
              }
            }
            break;
          }
        }

        for (let i = indexesToDelete.length - 1; i >= 0; i--) {
          priceLevel.orders.splice(indexesToDelete[i], 1);
        }

        // Update buyer's stock balance
        if (!this.STOCK_BALANCES[userId]) this.STOCK_BALANCES[userId] = {};
        if (!this.STOCK_BALANCES[userId][stockSymbol])
          this.STOCK_BALANCES[userId][stockSymbol] = {
            yes: { quantity: 0, locked: 0 },
            no: { quantity: 0, locked: 0 },
          };
        this.STOCK_BALANCES[userId][stockSymbol][stockType].quantity +=
          executedQuantity;

        // Unlock the spent amount
        this.INR_BALANCES[userId].locked -= executionCost;
      }
    }

    // If there's remaining quantity, create a new order
    if (remainingQuantity > 0) {
      const priceString = oppositePrice;

      this.ORDERBOOK[stockSymbol][oppositeSide][priceString].total +=
        remainingQuantity;
      this.ORDERBOOK[stockSymbol][oppositeSide][priceString].orders.push({
        quantity: quantity,
        userId: userId,
        type: "buy",
      });

      // The funds for the remaining quantity are already locked, so no need to lock again
    }
    RedisManager.getInstance().publishMessage('publishes', {
      EventId : stockSymbol,
      EventData: this.ORDERBOOK[stockSymbol],
    })

    const executedQuantity = quantity - remainingQuantity;
    const buy: 'buy' = 'buy';

    const payload = {
      userId,
      stockSymbol,
      orderType: buy,
      stockType,
      price,
      quantity,
      executedQuantity
    }
    return payload;
  }

private initializeStockBalance(userId: string, stockSymbol: string) {
  if(!this.STOCK_BALANCES[userId]) {
  this.STOCK_BALANCES[userId] = {};
}

  if (!this.STOCK_BALANCES[userId][stockSymbol]) {
  this.STOCK_BALANCES[userId][stockSymbol] = {
    yes: {quantity: 0, locked: 0},
    no: {quantity: 0, locked: 0},
  };
}
}
}
