import { Router } from "express";
import { addAnswer, getAnswersToQuestion, markAsPreferred } from "../Controllers/answersController";


const answersRoutes = Router()

answersRoutes.post('/:qid',addAnswer)
answersRoutes.get("/:qid",getAnswersToQuestion)
answersRoutes.post('/prefer/:aid',markAsPreferred)

export default answersRoutes