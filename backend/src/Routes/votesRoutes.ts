import { Router } from "express";
import { downvote, upvote } from "../Controllers/votesController";
import { verifyToken } from "../middleware/verifyToken";

const votesRoutes = Router()
votesRoutes.post('/upvote/:aid',verifyToken,upvote)
votesRoutes.post('/downvote/:aid',verifyToken,downvote)
export default votesRoutes