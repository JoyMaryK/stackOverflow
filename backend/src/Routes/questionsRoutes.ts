import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getAllQuestionsByUser, getOneQuestion, updateQuestion } from "../Controllers/questionsController";
  import { verifyToken } from "../middleware/verifyToken";
const questionsRoutes = Router()

questionsRoutes.post('/:uid',addQuestion)
questionsRoutes.get('',getAllQuestions)
questionsRoutes.get('/:uid',getAllQuestionsByUser)
questionsRoutes.get('/question/:qid',getOneQuestion)
questionsRoutes.put('/question/:qid/:uid',updateQuestion)
questionsRoutes.delete('/delete/:qid',verifyToken,deleteQuestion)
export default questionsRoutes