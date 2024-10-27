export type MessageFromDb_processor = {
  type: "simpleresfromdb",
  payload: {
    simpleres: string, 
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
