import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/userActions'
import {  UserState,  } from "src/app/Interfaces";
const initialState: UserState={
    users:[],
    loaded: false,
    error:  null

}
export const userReducers = createReducer(
    initialState, 
    on(actions.getAllUsers,(state)=>{
        return{
        ...state,
        loaded: true}}
    ),
    on(actions.getUsersSuccess,(state, {users})=>({
        ...state,
        users:users,
        loaded:false,
        error:null,
    })),
    on(actions.getUsersFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    on(actions.addUserSuccess,(state, action)=>{
      
        
        
        return{
            ...state,
           
            loaded:false,
        }
        
        
       
    }),
    on(actions.addUserFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    on(actions.deleteUser,(state, action)=>({
        ...state,
        
        loaded:false,
        error:null,
    })),
    
    on(actions.deleteUserSuccess,(state, action)=>({
        ...state,
        users:state.users.filter(user => user.uid !== action.uid),
        loaded:false,
        error:null,
    })),
    on(actions.deleteUserFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    
    
    )