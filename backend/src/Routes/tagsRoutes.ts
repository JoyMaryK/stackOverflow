import { Router } from "express";
import { getAllTags } from "../Controllers/tagsController";

const tagRoutes = Router()

tagRoutes.get("",getAllTags)
export default tagRoutes