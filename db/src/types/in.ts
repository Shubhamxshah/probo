export const CREATE_USER = "CREATE_USER";
export const CREATE_SYMBOL = "CREATE_SYMBOL";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS"; 
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";

export type MessageToDb_processor = {
  type : typeof CREATE_USER,
  data: {
    userId: string,
  }          
} | {
  type: typeof CREATE_SYMBOL,
  data: {
    stockSymbol: string,
  }
} | {
  type: typeof GET_TRANSACTIONS,
  data: {
    userId: string,
  }
} | {
  type: typeof CREATE_TRANSACTION,
  data: {
    userId: string,
    stockSymbol: string,
    orderType: 'buy' | 'sell',
    stockType: 'yes' | 'no',
    price: number,
    quantity: number,
    executedQuantity: number,
  }
}

