import express, { json } from "express";
import cors from 'cors'
import userRoutes from "./Routes/userRoutes";
import questionsRoutes from "./Routes/questionsRoutes";

const app = express();
app.use(json());
app.use(cors())

app.use("/users", userRoutes);
app.use("/questions", questionsRoutes);
app.listen(4000,'', () => {
  console.log("Server Running...");
});
