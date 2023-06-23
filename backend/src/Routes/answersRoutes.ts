import { Router } from "express";
import { addAnswer, getAnswersToQuestion, markAsPreferred } from "../Controllers/answersController";
import { verifyToken } from "../middleware/verifyToken";


const answersRoutes = Router()

answersRoutes.post('/:id',verifyToken,addAnswer)
answersRoutes.get("/:qid",verifyToken,getAnswersToQuestion)
answersRoutes.post('/prefer/:id',verifyToken,markAsPreferred)

export default answersRoutes