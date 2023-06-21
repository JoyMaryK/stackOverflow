import { Router } from "express";
import { addComment, getCommentsToAnswer } from "../Controllers/commentsController";
import { verifyToken } from "../middleware/verifyToken";


const commentsRoutes = Router()
commentsRoutes.post("/:id",verifyToken,addComment)
commentsRoutes.get("/:aid",verifyToken,getCommentsToAnswer)

export default commentsRoutes