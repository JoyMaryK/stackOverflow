import { QuestionState, TagsState, UserState } from "./Interfaces";

export interface AppState{
    users:UserState
    questions: QuestionState
    tags:TagsState
}