import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/answersActions'
import { AnswersState} from "src/app/Interfaces";
const initialState: AnswersState={
    answers:[],
    loaded: false,
    error:  null

}
export const answersReducers = createReducer(
    initialState, 

    on(actions.addAnswer,(state, action)=>({
        ...state,
        answers:[...state.answers, action.newAnswer ],
        loaded:false,
        error:null,
    })),
    
    on(actions.addAnswerSuccess,(state, action)=>({
        ...state,
        loaded:false,
        error:null,
    })),
    on(actions.addAnswerFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    on(actions.getAllAnswers,(state)=>{
        return{
        ...state,
        loaded: true}}
    ),
    on(actions.getAnswersSuccess,(state, {answers})=>({
        ...state,
        answers:answers,
        loaded:false,
        error:null,
    })),
    on(actions.getAnswersFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    
    )

