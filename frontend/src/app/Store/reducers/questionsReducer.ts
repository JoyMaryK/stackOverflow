import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/questionActions'
import { Question, QuestionState } from "src/app/Interfaces";
const initialState: QuestionState={
    questions:[],
    loaded: false,
    error:  null
}
export const questionsReducers = createReducer(
    initialState, 
    on(actions.getAllQuestions,(state)=>{
        return{
        ...state,
        loaded: true}}
    ),
    on(actions.getQuestionsSuccess,(state, {questions})=>({
        ...state,
        questions:questions,
        loaded:false,
        error:null,
    })),
    on(actions.getQuestionsFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    on(actions.addQuestion,(state, action)=>({
        ...state,
        questions:[...state.questions, action.newQuestion ],
        loaded:false,
        error:null,
    })),
    
    on(actions.addQuestionSuccess,(state, action)=>({
        ...state,
        loaded:false,
        error:null,
    })),
    on(actions.addQuestionFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    on(actions.getOneQuestion,(state, action)=>{
        return{
        ...state,
        loaded: true}}
    ),
    on(actions.getOneQuestionSuccess,(state, action)=>({
        ...state,
        questions:action.questions,
        loaded:false,
        error:null,
    })),
    on(actions.getQuestionsFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    
    )

