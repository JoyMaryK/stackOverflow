import { AnswersState, CommentsState, QuestionState, TagsState, UserState, VotesState } from "./Interfaces";

export interface AppState{
    users:UserState
    questions: QuestionState
    tags:TagsState
    answers:AnswersState
    comments:CommentsState
    votes:VotesState
}