import { createAction, props } from "@ngrx/store"
import { SuccessMessages } from "src/app/Interfaces"


export const upvote= createAction('[Votes] Add New Upvote', props<{aid:string}>())
export const upvoteSuccess= createAction('[Votes API] Add New Upvote Success', 
props<{message:SuccessMessages}>())
export const upvoteFailure= createAction('[Votes API] Add New Upvote Failure', 
props<{error:string}>())

export const downvote= createAction('[Votes] Add New Downvote', props<{aid:string}>())
export const downvoteSuccess= createAction('[Votes API] Add New Downvote Success', 
props<{message:SuccessMessages}>())
export const downvoteFailure= createAction('[Votes API] Add New Downvote Failure', 
props<{error:string}>())