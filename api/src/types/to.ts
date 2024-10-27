import {CREATE_USER, ONRAMP_INR, RESET, CREATE_SYMBOL, MINT_STOCKS, SELL_ORDER, BUY_ORDER, CANCEL_ORDER, GET_INR_BALANCES, GET_STOCK_BALANCES, GET_ORDERBOOK,  GET_USER_BALANCES,GET_STOCK_SYMBOL_ORDERBOOK} from ".";

export type MessageToEngine = {
  type: typeof CREATE_USER,
  data: {
    userId: string,
  }
} | {
  type: typeof ONRAMP_INR,
  data: {
    userId: string,
    amount: number,
  }
} | {
  type: typeof SELL_ORDER,
  data: {
    userId: string,
    stockSymbol: string,
    quantity: string,
    price: string,
    stockType: "buy" | "sell",
  }
} | {
  type: typeof BUY_ORDER,
  data: {
    userId: string,
    stockSymbol: string,
    quantity: string,
    price: string,
    stockType: "buy" | "sell",
  }
} | {
  type: typeof MINT_STOCKS,
  data: {
    userId: string,
    stockSymbol: string,
    quantity: string,
    price: string,
  } 
} | {
  type: typeof CREATE_SYMBOL,
  data: {
    stockSymbol: string,
  }
} | {
  type: typeof RESET,
} | {
  type: typeof GET_INR_BALANCES,
} | {
  type: typeof GET_STOCK_BALANCES,
} | {
  type: typeof GET_ORDERBOOK,
} | {
  type: typeof GET_USER_BALANCES,
  data: {
    userId: string,
  }
} | {
  type: typeof GET_STOCK_SYMBOL_ORDERBOOK,
  data: {
    stockSymbol: string,
  }
} | {
  type: typeof CANCEL_ORDER,
}


