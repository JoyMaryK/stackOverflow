import { createAction, props } from "@ngrx/store"
import { Question } from "src/app/Interfaces"


export const getAllQuestions= createAction('[Questions] Get All Questions')
export const getQuestionsSuccess= createAction('[Questions API] Questions Load Success', 
props<{questions:Question[]}>())
export const getQuestionsFailure= createAction('[Questions API] Questions Load Failure', 
props<{error:string}>())

export const addQuestion= createAction('[Questions] Add New Questions', props<{newQuestion:Question}>())
export const addQuestionSuccess= createAction('[Questions API] Add New Question Success', 
props<{message:string}>())
export const addQuestionFailure= createAction('[Questions API] Add New Question Failure', 
props<{error:string}>())


export const getOneQuestion= createAction('[Questions] Get one Question',
props<{qid:string}>())
export const getOneQuestionSuccess= createAction('[Questions API] Question Load Success', 
props<{questions:Question[]}>())
export const getOneQuestionFailure= createAction('[Questions API] Question Load Failure', 
props<{error:string}>())