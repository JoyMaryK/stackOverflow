import { createAction, props } from "@ngrx/store"
import { SuccessMessages, User, UserLogin, UserSignup } from "src/app/Interfaces"

export const getAllUsers= createAction('[Users] Get All Users')
export const getUsersSuccess= createAction('[Users API] Users Load Success', 
props<{users:User[]}>())
export const getUsersFailure= createAction('[Users API] Users Load Failure', 
props<{error:string}>())



// will be edited during api calls
export const addUser= createAction('[User] Add User',
props<{user:User}>())  // will be edited during api calls
export const addUserSuccess= createAction('[User API] Add User Success', 
props<{message:string}>())
export const addUserFailure= createAction('[User API] Add User Failure', 
props<{error:string}>())


export const userLogin= createAction('[User] Login User',
props<{user:UserLogin}>())  // will be edited during api calls
export const userLoginSuccess= createAction('[User API] Login User Success', 
props<{message:SuccessMessages}>())
export const userLoginFailure= createAction('[User API] Login User Failure', 
props<{error:string}>())

export const deleteUser= createAction('[Users] Delete one User',
props<{uid:string}>())
export const deleteUserSuccess= createAction('[Users API] Delete User Success', 
props<{uid:string,message:SuccessMessages}>())
export const deleteUserFailure= createAction('[Users API] Delete User Failure', 
props<{error:string}>())
