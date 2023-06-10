import { createAction, props } from "@ngrx/store"
import { Question } from "src/app/Interfaces"


export const getAllQuestions= createAction('[Questions] Get All Questions')
export const getQuestionsSuccess= createAction('[Questions API] Questions Load Success', 
props<{questions:Question[]}>())
export const getQuestionsFailure= createAction('[Questions API] Questions Load Failure', 
props<{error:string}>())