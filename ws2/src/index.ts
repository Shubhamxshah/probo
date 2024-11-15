import { WebSocketServer } from "ws";
import WebSocket from "ws";
import { Events, Users } from "./types/ws";
import { createClient } from "redis";

const wss = new WebSocketServer({ port: 3002 });

const users: Users = {};
const event: Events = {};

const client = createClient();

let counter = 0;

const startServer = async () => {
  await client.connect();
  client.on('error', (err) => console.log('redis client error', err));

  try {
    await client.subscribe('publishes', (message) => {
      const { EventId, EventData } = JSON.parse(message);
      broadCastToEvent(EventId, {EventId, EventData});
    })
  } catch (error) {
    console.error('error publishing orders', error);
  }
};

wss.on('connection', async function connection(ws: WebSocket, client: any) {
  const userWsId = counter++;
  
  ws.on('error', console.error);
  
  ws.on('message', function message(message: string) {
    try {
      const data = JSON.parse(message);
      const type: string = data.type;
      const params = data.params;

      switch(type) {
        case 'subscribe': 
          subscribeToEvent(ws, params, userWsId);
          break;
        case 'leave': 
          unsubscribeToEvent(userWsId, ws);
      }
    } catch (e) {
      console.error(e);
    }
  });

  ws.send("connected");
  ws.on('close', () => {
    unsubscribeToEvent(userWsId, ws);
  })
})

const subscribeToEvent = (ws: WebSocket, params: {userId: string; eventId: string}, userWsId: number) => {
  if (!event[params.eventId]) {
    event[params.eventId] = {users: []};
  }

  event[params.eventId].users.push(params.userId) 

  users[userWsId] = {
    eventId: params.eventId,
    userId: params.userId,
    ws,
  }
}

const unsubscribeToEvent = (wsId: number, ws: WebSocket) =>  {
  const user = users[wsId];
  if (user) {
  const {eventId, userId} = user;

  event[eventId].users = event[eventId].users.filter(
    (user) => user !== userId
  );

  delete users[wsId];
}
}

function broadCastToEvent(EventId: string, message: any) {
  Object.values(users).forEach(({ eventId, ws}) => {
    if(eventId === EventId){
      ws.send(JSON.stringify(message));
    }
  });
}

startServer();
console.log('Websocket server started at port 3002');

