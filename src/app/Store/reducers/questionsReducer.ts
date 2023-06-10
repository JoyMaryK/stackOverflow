import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/actions'
import { QuestionState } from "src/app/Interfaces";
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
    })),)

