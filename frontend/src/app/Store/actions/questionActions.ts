import { createAction, props } from "@ngrx/store"
import { Question , SuccessMessages } from "src/app/Interfaces"


export const getAllQuestions= createAction('[Questions] Get All Questions')
export const getQuestionsSuccess= createAction('[Questions API] Questions Load Success', 
props<{questions:Question[]}>())
export const getQuestionsFailure= createAction('[Questions API] Questions Load Failure', 
props<{error:string}>())

export const addQuestion= createAction('[Questions] Add New Questions', props<{newQuestion:Question}>())
export const addQuestionSuccess= createAction('[Questions API] Add New Question Success', 
props<{message:SuccessMessages}>())
export const addQuestionFailure= createAction('[Questions API] Add New Question Failure', 
props<{error:string}>())


export const getOneQuestion= createAction('[Questions] Get one Question',
props<{qid:string}>())
export const getOneQuestionSuccess= createAction('[Questions API] Question Load Success', 
props<{question:Question}>())
export const getOneQuestionFailure= createAction('[Questions API] Question Load Failure', 
props<{error:string}>())


export const getAllUserQuestions= createAction('[Questions] Get All User Questions',props<{uid:string}>())
export const getUserQuestionsSuccess= createAction('[Questions API] User Questions Load Success', 
props<{questions:Question[]}>())
export const getUserQuestionsFailure= createAction('[Questions API] User Questions Load Failure', 
props<{error:string}>())


export const deleteQuestion= createAction('[Questions] Delete one Question',
props<{qid:string}>())
export const deleteQuestionSuccess= createAction('[Questions API] Delete Question Success', 
props<{message:SuccessMessages}>())
export const deleteQuestionFailure= createAction('[Questions API] Delete Question Failure', 
props<{error:string}>())

export const deleteQuestionAdmin= createAction('[Questions] Admin Delete one Question',
props<{qid:string}>())

export const updateQuestion= createAction('[Questions] Update Questions', props<{qid:string,updatedQuestion:Question}>())
export const updateQuestionSuccess= createAction('[Questions API] Update Question Success', 
props<{message:SuccessMessages}>())
export const updateQuestionFailure= createAction('[Questions API] Update Question Failure', 
props<{error:string}>())

export const getQuestionsByTags= createAction('[Questions] Get Questions By Tags',props<{tagname:string}>())
export const getQuestionsByTagsSuccess= createAction('[Questions API] Questions By Tags Load Success', 
props<{questions:Question[]}>())
export const getQuestionsByTagsFailure= createAction('[Questions API] Questions By Tags Load Failure', 
props<{error:string}>())