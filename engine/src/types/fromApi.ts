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

export type MessageFromApi = {
  type: typeof CREATE_USER,
  data: {
    userId: string,
  }
} | {
  type: typeof ONRAMP_INR,
  data: {
    userId: string,
    amount: string,
  }
} | {
  type: typeof SELL_ORDER,
  data: {
    userId: string,
    stockSymbol: string,
    quantity: string,
    price: string,
    stockType: "yes" | "no",
  }
} | {
  type: typeof BUY_ORDER,
  data: {
    userId: string,
    stockSymbol: string,
    quantity: string,
    price: string,
    stockType: "yes" | "no",
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
}



