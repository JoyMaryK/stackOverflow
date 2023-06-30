import { Router } from "express";
import { addAnswer, getAnserById, getAnswersToQuestion, markAsPreferred } from "../Controllers/answersController";
import { verifyToken } from "../middleware/verifyToken";


const answersRoutes = Router()

answersRoutes.post('/:id',verifyToken,addAnswer)
answersRoutes.get("/:qid",verifyToken,getAnswersToQuestion)
answersRoutes.get("/answer/:id",verifyToken,getAnserById)
answersRoutes.post('/prefer/:id',verifyToken,markAsPreferred)

export default answersRoutes