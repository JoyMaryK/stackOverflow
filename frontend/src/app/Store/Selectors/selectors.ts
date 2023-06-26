import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.state"
import { AnswersState, QuestionState, TagsState, UserState } from "src/app/Interfaces";
export const selectQuestions = (state:AppState)=> state.questions
export const selectQuestionsState =createFeatureSelector<QuestionState>('questions')

export const selectUsersState =createFeatureSelector<UserState>('users')
export const selectTagsState =createFeatureSelector<TagsState>('tags')
export const selectAnswersState =createFeatureSelector<AnswersState>('answers')

export const selectAllQuestions = createSelector(
    selectQuestions,
    (state: QuestionState) => {
      return state.questions.map((question) => {
        return {
          ...question,
          tags: question.tag_names ? question.tag_names.split(",") : []
        };
      });
    }
  );

export const selectQuestionById =(qid:string) =>createSelector(
    selectQuestions,
    (state:QuestionState)=> state.question
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

export const selectAnswers = (state:AppState)=> state.answers
export const selectAllAnswers = createSelector(
    selectAnswers,
    (state:AnswersState)=> state.answers
)

