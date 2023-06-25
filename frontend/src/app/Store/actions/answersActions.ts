import { createAction, props } from "@ngrx/store"
import { Answer} from "src/app/Interfaces"


export const addAnswer= createAction('[Answers] Add New Answers', props<{newAnswer:Answer, qid:string}>())
export const addAnswerSuccess= createAction('[Answers API] Add New Answer Success', 
props<{message:string}>())
export const addAnswerFailure= createAction('[Answers API] Add New Answer Failure', 
props<{error:string}>())

export const getAllAnswers= createAction('[Answers] Get All Answers',props<{qid:string}>())
export const getAnswersSuccess= createAction('[Answers API] Answers Load Success', 
props<{answers:Answer[]}>())
export const getAnswersFailure= createAction('[Answers API] Answers Load Failure', 
props<{error:string}>())