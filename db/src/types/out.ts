export type MessageFromDb_processor = {
  type: "allTransactions",
  payload: {
      userId: string,
      stockSymbol: string,
      orderType: string,
      stockType: string,
      price: number,
      quantity: number,
      executedQuantity: number,
  }[]
} | {
type: "simpleresfromdb",
  payload: {
  simpleresfromdb: string, 
}
} | {
  type: "transactions",
  payload: {
    userId: string,
    stockSymbol: string,
    orderType: 'sell' | 'buy',
    stockType: 'yes' | 'no',
    price: number,
    quantity: number,
    executedQuantity: number,
  }
}
