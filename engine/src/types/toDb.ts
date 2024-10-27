export const CREATE_TRANSACTION = "CREATE_TRANSACTION";

export type messageToDb_processor = {
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

