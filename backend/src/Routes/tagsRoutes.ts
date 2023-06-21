import { Router } from "express";
import { getAllTags } from "../Controllers/tagsController";
import { verifyToken } from "../middleware/verifyToken";

const tagRoutes = Router()

tagRoutes.get('',verifyToken,getAllTags)
export default tagRoutes