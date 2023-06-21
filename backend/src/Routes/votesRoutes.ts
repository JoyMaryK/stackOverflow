import { Router } from "express";
import { downvote, upvote } from "../Controllers/votesController";
import { verifyToken } from "../middleware/verifyToken";

const votesRoutes = Router()
votesRoutes.post('/upvote/:id',verifyToken,upvote)
votesRoutes.post('/downvote/:id',verifyToken,downvote)
export default votesRoutes