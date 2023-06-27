import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/commentsActions'
import { CommentsState} from "src/app/Interfaces";
const initialState: CommentsState={
    comments:[],
    loaded: false,
    error:  null

}
export const commentsReducers = createReducer(
    initialState, 

    on(actions.addComment,(state, action)=>({
        ...state,
        loaded:false,
        error:null,
    })),
    
    on(actions.addCommentSuccess,(state, action)=>({
        ...state,
        comments: state.comments,
        loaded:false,
        error:null,
    })),
    on(actions.addCommentFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    on(actions.getAllComments,(state, action)=>{
        return{
        ...state,

        loaded: true}}
    ),
    on(actions.getCommentsSuccess,(state, {comments})=>({
        ...state,
        comments:comments,
        loaded:false,
        error:null,
    })),
    on(actions.getCommentsFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    
    )

