import { Request } from "express";

export interface DecodedData {
    id: string;
    username: string;
    email: string;
    role: string;
  }
  export interface ExtendedRequest extends Request {
    info?: DecodedData;
    params: {
      id:string
      email:string 
    };
  }

  export interface User {
    uid: string;
    username: string;
    email: string;
    role: string;
    isDeleted: number;
    password: string;
    emailSent: string;
    location?:string;
    about?:string
  }