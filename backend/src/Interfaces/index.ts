import { Request } from "express";

export interface DecodedData {
    uid: string;
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


  export interface Tag{
    tid:string
    tagname:string
    description:string
  }

  export interface Questions{
      qid:string
      uid:string
      title:string
      body:string
  }


  export interface Answer{
    aid:string
    uid:string
    qid:string
    answer:string
    isPreffered:string
  }

  export interface Comment{
    cid:string
    uid:string
    aid:string
    comment:string
  }