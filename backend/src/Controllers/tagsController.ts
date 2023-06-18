import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { Answer,Questions, Tag} from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";


dotenv.config({ path: path.resolve(__dirname, "../../.env") });


//get all tags
export const getAllTags = async (req: Request, res: Response) => {
    try {
        let tags: Tag[] =  (await DatabaseHelper.exec('getTags')).recordset;
        return res.status(200).json(tags);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };