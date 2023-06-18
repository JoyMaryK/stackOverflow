import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import {Comment} from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";


dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// inserting comment

export const addComment = async (req: Request<{aid:string}>, res: Response) => {
  try {
    let cid = uuid();
    const { comment, uid} = req.body;
    const { aid } = req.params; 
    await DatabaseHelper.exec('addComment',{cid,aid,uid,comment})
        return res.status(201).json({ message: "Comment submitted" });          
 
  } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

//get all Comments to an answer

export const getCommentsToAnswer = async (req: Request<{aid:string}>, res: Response) => {
    try {
        const{aid} =req.params
        let comments: Comment[] =  (await DatabaseHelper.exec('getCommentsByAID',{aid})).recordset;
        return res.status(200).json(comments);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };
