import express from 'express';
import cors from "cors";
import { userCreateRouter } from './routes/usercreate';
import { onrampRouter } from './routes/onramp';
import { resetRouter } from './routes/reset'; 
import { mintRouter } from './routes/mint';
import { orderRouter } from './routes/order';
import { extraRouter } from './routes/extra';

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user/create", userCreateRouter);
app.use("/onramp", onrampRouter);
app.use("/reset", resetRouter);
app.use("/trade", mintRouter);
app.use("/order", orderRouter);
app.use("/", extraRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
