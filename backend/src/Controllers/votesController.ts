import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { DatabaseHelper } from "../DatabaseHelper";
import { ExtendedRequest } from "../Interfaces";



export const upvote = async (req: ExtendedRequest, res: Response) => {
  try {
    let vid = uuid();
    const uid = req.info?.uid as string;
    const { id } = req.params; 
    await DatabaseHelper.exec('upvote',{vid,aid:id,uid})
        return res.status(201).json({ message: "upvoted" });          
 } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

export const downvote = async (req: ExtendedRequest, res: Response) => {
  try {
    let vid = uuid();
    const uid = req.info?.uid as string;
    const { id } = req.params; 
    await DatabaseHelper.exec('downvote',{vid,aid:id,uid})
        return res.status(201).json({ message: "downvoted" });          
 } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};