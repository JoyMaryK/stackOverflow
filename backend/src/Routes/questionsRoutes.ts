import { Router } from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getAllQuestionsByTags, getAllQuestionsByUser, getOneQuestion, searchQuestion, updateQuestion } from "../Controllers/questionsController";
  import { verifyToken } from "../middleware/verifyToken";
const questionsRoutes = Router()

questionsRoutes.post('',verifyToken,addQuestion)
questionsRoutes.get('/:pgNo',verifyToken,getAllQuestions)
questionsRoutes.get('/user/:uid',verifyToken,getAllQuestionsByUser)
questionsRoutes.get('/search/:searchStr',verifyToken,searchQuestion)
questionsRoutes.get('/question/:qid',verifyToken,getOneQuestion)
questionsRoutes.put('/question/:id',verifyToken,updateQuestion)
questionsRoutes.delete('/delete/:id',verifyToken,deleteQuestion)
questionsRoutes.get('/tag/:tid',verifyToken,getAllQuestionsByTags)
export default questionsRoutes