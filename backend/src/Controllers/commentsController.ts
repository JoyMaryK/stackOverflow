import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import {Comment, ExtendedRequest} from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";


// inserting comment

export const addComment = async (req: ExtendedRequest, res: Response) => {
  try {
    let cid = uuid();
    const { comment} = req.body;
    const { id } = req.params; 
    const uid = req.info?.uid as string
    await DatabaseHelper.exec('addComment',{cid,aid:id,uid,comment})
        return res.status(201).json({ message: "Comment submitted" });          
 
  } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

//get all Comments to an answer
export const getCommentsToAnswer = async (req: Request<{aid:string}>, res: Response) => {
    try {
        const{aid} =req.params
        let comments: Comment[] =  (await DatabaseHelper.exec('getCommentsByAID',{aid, pageNumber:1})).recordset;
        return res.status(200).json(comments);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };
