import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/tagsActions'
import { TagsState } from "src/app/Interfaces";
const initialState: TagsState={
    tags:[],
    loaded: false,
    error:  null

}
export const tagsReducers = createReducer(
    initialState, 
    on(actions.getAllTags,(state)=>{
        return{
        ...state,
        loaded: true}}
    ),
    on(actions.getTagsSuccess,(state, action)=>({
        ...state,
        tags:action.Tags,
        loaded:false,
        error:null,
    })),
    on(actions.getTagsFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    
    
    )