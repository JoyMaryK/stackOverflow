import { Request, Response } from "express";
import { ExtendedRequest, Tag} from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";



//get all tags
export const getAllTags = async (req: ExtendedRequest, res: Response) => {
    try {
        let tags: Tag[] =  (await DatabaseHelper.exec('getTags')).recordset;
        return res.status(200).json(tags);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };