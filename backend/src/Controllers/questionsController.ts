import { Request, RequestHandler, Response } from "express";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { ExtendedRequest,Questions,User } from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";


dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// inserting question

export const addQuestion = async (req: Request<{uid:string}>, res: Response) => {
  try {
    let qid = uuid();
    const { title, body ,tags} = req.body;
    const { uid } = req.params;               //look into the possibility of confirming this with the token
    await DatabaseHelper.exec('addQuestion',{qid,uid,title,body})
     tags.forEach(async (tag: { tid: string; }) => {
        await DatabaseHelper.exec('addQuestionTags',{tid:tag.tid, qid})
     });
    return res.status(201).json({ message: "question submitted" });
  } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        let questions: Questions[] =  (await DatabaseHelper.exec('getAllQuestions')).recordset;
        return res.status(200).json(questions);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };

  export const getAllQuestionsByUser = async (req: Request<{uid:string}>, res: Response) => {
    try {
        const{uid} =req.params
        let questions: Questions[] =  (await DatabaseHelper.exec('getQuestionsByUserId',{uid})).recordset;
        return res.status(200).json(questions);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };

  export const getOneQuestion = async (req: Request<{qid:string}>, res: Response) => {
    try {
        const{ qid } =req.params;
        let question: Questions =  (await DatabaseHelper.exec('getOneQuestion',{qid})).recordset[0];
        if (question) {
            return res.status(200).json(question);
          } else {
          return res.status(404).json({ message: "Question Not Found" }); }
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  }

  export const deleteQuestion = async (req: ExtendedRequest, res: Response) => {
    try {
        const{ id } =req.params;
        const uid_ = req.info?.uid as string
        const role = req.info?.role as string
        let question: Questions =  (await DatabaseHelper.exec('getOneQuestion',{qid:id})).recordset[0];
        if (!question) {
            return res.status(404).json({ message: "Question Not Found" });
          } else {
            
            
            if (question.uid === uid_ || role ==="admin"){
              await DatabaseHelper.exec('deleteQuestion',{qid:id})
              return res.status(200).json({message:"Deleted successfully"});
            } else {return res.status(401).json({ message: "Unauthorized" });}
           }
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  }


  export const updateQuestion = async (req: Request<{qid:string, uid:string}>, res: Response) => {
    try {
    
        const { title, body ,tags} = req.body;
        const { qid, uid } = req.params;               //qid
        
        await DatabaseHelper.exec('updateQuestion',{qid,uid,title,body})
         tags.forEach(async (tag: { tid: string; }) => {
            await DatabaseHelper.exec('updateQuestionTags',{tid:tag.tid, qid})
         });
        return res.status(201).json({ message: "question updated" });
      } catch (error: any) {
        return res.status(500).json({message:error.message});
      }
  };