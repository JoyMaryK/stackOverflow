export interface Question{
    id:string
    title:string
    description:string
    user_id:string
    answersNo:number
    date:string

}

export interface QuestionState {
    questions: Question[];
    loaded: boolean;
    error?: string | null;
  }

export interface User{
    id:string
    username:string
    email:string
    password:string
}

export interface UserSignup{
    username:string
    email:string
    password:string
}

export interface UserLogin{
    email:string
    password:string
}