import { createReducer, on } from "@ngrx/store";

import * as actions from '../actions/userActions';
import {  UserState,  } from "src/app/Interfaces";
const initialState: UserState={
    users:[],
    loaded: false,
    error:  null,
    user: null,
    success:null,
    updateSuccess:null
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
            users: state.users,
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
    on(actions.userLoginSuccess,(state, action)=>({
        ...state,
        loaded:false,
        error:null,
        success:action.response
    })),
    on(actions.userLoginFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
        success:null
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
    
    on(actions.updateUserSuccess,(state, action)=>({
        ...state,
        users:state.users,
        loaded:false,
        error:null,
        updateSuccess:action.message
    })),
    on(actions.updateUserFailure,(state, {error})=>({
        ...state,
        loaded:false,
        updateSuccess:null,
        success:null,
        error:error,
    })),
    on(actions.getUserSuccess,(state, action)=>({
        ...state,
        user:action.user,
        loaded:false,
        error:null,
    })),
    on(actions.getUserFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    on(actions.getUserByIdSuccess,(state, action)=>({
        ...state,
        user:action.user,
        loaded:false,
        error:null,
    })),
    on(actions.getUserByIdFailure,(state, {error})=>({
        ...state,
        loaded:false,
        error:error,
    })),
    )