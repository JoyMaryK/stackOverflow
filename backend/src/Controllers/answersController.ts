import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { Answer,ExtendedRequest,Questions} from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";

// inserting answer

export const addAnswer = async (req: Request<{qid:string}>, res: Response) => {
  try {
    let aid = uuid();
    const { answer, uid} = req.body;
    const { qid } = req.params; 
    let question: Questions =  (await DatabaseHelper.exec('getOneQuestion',{qid})).recordset[0];
    if (question) {
        await DatabaseHelper.exec('addAnswer',{aid,qid,uid,answer})
        return res.status(201).json({ message: "answer submitted" });
      } else {
      return res.status(404).json({ message: "Question Not Found" }); }             
 
  } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

//get all answers to a question

export const getAnswersToQuestion = async (req: Request<{qid:string}>, res: Response) => {
    try {
        const{qid} =req.params
        let answers: Answer[] =  (await DatabaseHelper.exec('getAnswersByQID',{qid})).recordset;
        return res.status(200).json(answers);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };


  //mark answer as preferred

export const markAsPreferred = async (req: ExtendedRequest, res: Response) => {
    try {
        const{id} =req.params
        const {qid}=  req.body
        const uid = req.info?.uid 
        let question: Questions =  (await DatabaseHelper.exec('getOneQuestion',{qid})).recordset[0];
      
    if (question.uid === uid) {
      await DatabaseHelper.exec('removePreffered',{qid});     
      await DatabaseHelper.exec('markAsPreffered',{aid:id});
      return res.status(200).json({message:"marked as preferred"});
      } 
      else{return res.status(403).json({message:"Not your Question"})};
 
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };