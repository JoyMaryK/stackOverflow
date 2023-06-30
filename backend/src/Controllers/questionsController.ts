import { Request, RequestHandler, Response } from "express";
import { v4 as uuid } from "uuid";
import { ExtendedRequest,Questions,User } from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";


// inserting question

export const addQuestion = async (req: ExtendedRequest, res: Response) => {
  try {
    let qid = uuid();
    const { title, body ,tags} = req.body;
    const  uid  = req.info?.uid as string;             
    await DatabaseHelper.exec('addQuestion',{qid,uid,title,body})
     tags.forEach(async (tag:string) => {
      let tid= uuid()
        await DatabaseHelper.exec('addTag',{tid,tagname:tag})
        await DatabaseHelper.exec('addQuestionTags',{tid:tid, qid})

     });
    return res.status(201).json({ message: "question submitted" });
  } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

export const getAllQuestions = async (req: Request<{pgNo:string}>, res: Response) => {
    try {
      const {pgNo} = req.params
     let  pageNumber= +pgNo
        let questions: Questions[] =  (await DatabaseHelper.exec('GetQuestionsWithPagination', {PageNumber:pageNumber})).recordset;
        return res.status(200).json(questions);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };

  export const getAllQuestionsByUser = async (req: Request<{uid:string}>, res: Response) => {
    try {
        const {uid} =req.params 
        let questions: Questions[] =  (await DatabaseHelper.exec('getQuestionsByUserId',{uid, pageNumber:1})).recordset;
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


  export const updateQuestion = async (req: ExtendedRequest, res: Response) => {
    try {
    
        const { title, body ,tags} = req.body;
        const { id } = req.params; 
        const uid_ = req.info?.uid as string
        let question: Questions =  (await DatabaseHelper.exec('getOneQuestion',{qid:id})).recordset[0];
        if (!question) {
            return res.status(404).json({ message: "Question Not Found" });
          } else {
            
            
            if (question.uid === uid_ ){             
        
        await DatabaseHelper.exec('updateQuestion',{qid:id,uid:uid_,title,body})
         tags.forEach(async (tag:string) => {
            await DatabaseHelper.exec('updateQuestionTags',{qid:id}) 
            let tid= uuid()
            await DatabaseHelper.exec('addTag',{tid,tagname:tag})
            await DatabaseHelper.exec('addQuestionTags',{tid:tid, qid:id})
         }); 
        } else{
            return res.status(401).json({ message: "Not your Question" });
        }
        return res.status(201).json({ message: "question updated" });
      } }
      catch (error: any) {
        return res.status(500).json({message:error.message});
      }
  };

  
  export const getAllQuestionsByTags = async (req: Request<{tid:string}>, res: Response) => {
    try {
        const {tid} =req.params 
        let questions: Questions[] =  (await DatabaseHelper.exec('getQuestionsByTag',{tagname:tid})).recordset;
        return res.status(200).json(questions);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };

  export const searchQuestion = async (req: Request<{searchStr:string}>, res: Response) => {
    try {
        const {searchStr} =req.params 
        let questions: Questions[] =  (await DatabaseHelper.exec('searchQuestion',{searchStr})).recordset;
        return res.status(200).json(questions);
    } catch (error: any) {
      return res.status(500).json({message:error.message});
    }
  };