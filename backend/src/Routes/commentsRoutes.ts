import { Router } from "express";
import { addComment, getCommentsToAnswer } from "../Controllers/commentsController";


const commentsRoutes = Router()
commentsRoutes.post("/:aid",addComment)
commentsRoutes.get("/:aid",getCommentsToAnswer)

export default commentsRoutes