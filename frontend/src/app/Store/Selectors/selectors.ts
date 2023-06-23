import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state"
import { QuestionState, TagsState, UserState } from "src/app/Interfaces";
export const selectQuestions = (state:AppState)=> state.questions
export const selectQuestionsState =createFeatureSelector<QuestionState>('questions')

export const selectUsersState =createFeatureSelector<UserState>('users')
export const selectTagsState =createFeatureSelector<TagsState>('tags')

export const selectAllQuestions = createSelector(
    selectQuestions,
    (state:QuestionState)=> state.questions
)

export const selectUsers = (state:AppState)=> state.users
export const selectAllUsers = createSelector(
    selectUsers,
    (state:UserState)=> state.users
)

export const selectTags = (state:AppState)=> state.tags
export const selectAllTags = createSelector(
    selectTags,
    (state:TagsState)=> state.tags
)


