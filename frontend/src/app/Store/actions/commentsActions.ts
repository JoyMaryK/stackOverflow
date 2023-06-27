import { createAction, props } from "@ngrx/store"
import { Comment} from "src/app/Interfaces"


export const addComment= createAction('[Comments] Add New Comments', props<{newComment:Comment, aid:string}>())
export const addCommentSuccess= createAction('[Comments API] Add New Comment Success', 
props<{message:string}>())
export const addCommentFailure= createAction('[Comments API] Add New Comment Failure', 
props<{error:string}>())

export const getAllComments= createAction('[Comments] Get All Comments',props<{aid:string}>())
export const getCommentsSuccess= createAction('[Comments API] Comments Load Success', 
props<{comments:Comment[]}>())
export const getCommentsFailure= createAction('[Comments API] Comments Load Failure', 
props<{error:string}>())