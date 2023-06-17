import express, { json } from "express";
import cors from 'cors'
import userRoutes from "./Routes/userRoutes";

const app = express();
app.use(json());
app.use(cors())

app.use("/users", userRoutes);

app.listen(4000,'', () => {
  console.log("Server Running...");
});
