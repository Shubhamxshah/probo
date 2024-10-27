
export const CREATE_USER = "CREATE_USER";
export const CREATE_SYMBOL = "CREATE_SYMBOL";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS"; 


export type MessageToDb_processor = {
  type : typeof CREATE_USER,
  data: {
    userId: string,
  }          
} | {
  type: typeof CREATE_SYMBOL,
  data: {
    stockSymbol: string,
    endTime: Date,
    category: string,
  }
} | {
  type: typeof GET_TRANSACTIONS,
  data: {
    userId: string,
  }
}
