export const CREATE_USER = "CREATE_USER";
export const ONRAMP_INR = "ONRAMP_INR";
export const RESET = "RESET";
export const CREATE_SYMBOL = "CREATE_SYMBOL";
export const MINT_STOCKS = "MINT_STOCKS";
export const SELL_ORDER = "SELL_ORDER";
export const BUY_ORDER = "BUY_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const GET_INR_BALANCES = "GET_INR_BALANCES";
export const GET_STOCK_BALANCES = "GET_STOCK_BALANCES";
export const GET_ORDERBOOK = "GET_ORDERBOOK"
export const GET_USER_BALANCES = "GET_USER_BALANCES";
export const GET_STOCK_SYMBOL_ORDERBOOK = "GET_STOCK_SYMBOL_ORDERBOOK";

export type MessageFromOrderbook = {
  type: "simpleres",
  payload: {
    simpleres : string, 
  }
} | {
  type: "ORDER_PLACED",
  payload: {
    orderId: string,
    executedQty: string,
    fills : [
      {
        price: string,
        qty: string,
        tradeId: number
    } 
  ]
  }
} | {
  type: "GET_INR_BALANCES",
  payload: {
    [userId: string] : {
      balance: number,
      locked: number,
    }
  }
} | {
  type: "GET_USER_BALANCES",
  payload: {
    [userId: string] : {
      balance: number,
      locked: number,
    }
  }

} | {
  type: "GET_STOCK_BALANCES",
  payload: {
    [userId : string]: {
      [stockSymbol : string] : {
        yes: {
          quantity: number,
          locked: number,
        },
        no: {
          quantity: number,
          locked: number,
        }
      }
    } 
  }
} | {
  type: "GET_ORDERBOOK",
  payload: {
    [symbol: string] : {
      yes: {
        [price: string] : {
          total: number,
          orders: {
            quantity: number,
            userId: string,
            type: "buy" | "sell"
          }[]; 
        };
      };
      no: {
        [price: string] : {
          total: number,
          orders: {
            quantity: number,
            userId: string,
            type: "buy" | "sell"
          }[]; 
        };
      };
    }
  }
} | {
  type: "GET_STOCK_SYMBOL_ORDERBOOK",
  payload: {
      [symbol: string] : {
      yes: {
        [price: string] : {
          total: number,
          orders: {
            quantity: number,
            userId: string,
            type: "buy" | "sell"
          }[]; 
        };
      };
      no: {
        [price: string] : {
          total: number,
          orders: {
            quantity: number,
            userId: string,
            type: "buy" | "sell"
          }[]; 
        };
      };
    }
  }
}
