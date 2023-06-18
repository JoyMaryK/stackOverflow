import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { DatabaseHelper } from "../DatabaseHelper";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });


export const upvote = async (req: Request<{aid:string}>, res: Response) => {
  try {
    let vid = uuid();
    const { uid} = req.body;
    const { aid } = req.params; 
    await DatabaseHelper.exec('upvote',{vid,aid,uid})
        return res.status(201).json({ message: "upvoted" });          
 } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

export const downvote = async (req: Request<{aid:string}>, res: Response) => {
  try {
    let vid = uuid();
    const {uid} = req.body;
    const { aid } = req.params; 
    await DatabaseHelper.exec('downvote',{vid,aid,uid})
        return res.status(201).json({ message: "downvoted" });          
 } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};