import express, { json } from "express";
import cors from 'cors'
import userRoutes from "./Routes/userRoutes";
import questionsRoutes from "./Routes/questionsRoutes";
import answersRoutes from "./Routes/answersRoutes";
import commentsRoutes from "./Routes/commentsRoutes";
import votesRoutes from "./Routes/votesRoutes";

const app = express();
app.use(json());
app.use(cors())

app.use("/users", userRoutes);
app.use("/questions", questionsRoutes);
app.use("/answers", answersRoutes);
app.use("/comments",commentsRoutes);
app.use("/votes",votesRoutes);
app.listen(4000,'', () => {
  console.log("Server Running...");
});
