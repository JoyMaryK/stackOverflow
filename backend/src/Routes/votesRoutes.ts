import { Router } from "express";
import { downvote, upvote } from "../Controllers/votesController";

const votesRoutes = Router()
votesRoutes.post('/upvote/:aid',upvote)
votesRoutes.post('/downvote/:aid',downvote)
export default votesRoutes