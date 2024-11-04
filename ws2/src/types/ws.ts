export interface Users {
  [key: string]: {
    eventId: string;
    userId: string;
    ws: any;
  }
}

export interface Events {
  [key: string]: {
    users: string[]; host?: string; 
  }
}
