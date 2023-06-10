import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state"
import { QuestionState } from "src/app/Interfaces";
export const selectQuestions = (state:AppState)=> state.questions
export const selectQuestionsState =createFeatureSelector<QuestionState>('questions')

export const selectAllQuestions = createSelector(
    selectQuestions,
    (state:QuestionState)=> state.questions
)



