export type WsMessage = {
  stream: string,
  data: {
        [symbol: string] : {
      yes: {
        [price: string] : {
          total: number,
        };
      };
      no: {
        [price: string] : {
          total: number,
        };
      };
    }
  }
}
