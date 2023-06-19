import { createAction, props } from "@ngrx/store"
import { Tag } from "src/app/Interfaces"


export const getAllTags= createAction('[Tags] Get All Tags')
export const getTagsSuccess= createAction('[Tags API] Tags Load Success', 
props<{Tags:Tag[]}>())
export const getTagsFailure= createAction('[Tags API] Tags Load Failure', 
props<{error:string}>())