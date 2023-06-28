import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/votesActions'
import {  VotesState,  } from "src/app/Interfaces";
const initialState: VotesState={
    
    loaded: false,
    error:  null

}
export const votesReducers = createReducer(
    initialState, 
    on(actions.upvote,(state)=>{
        return{
        ...state,
        loaded: true}}
    ),
    on(actions.upvoteSuccess,(state, action)=>({
        ...state,
        loaded:false,
        error:null,
    })),
    on(actions.upvoteFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
 
    )