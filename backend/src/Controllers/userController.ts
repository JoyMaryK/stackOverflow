import { Request, RequestHandler, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { userRegistrationSchema } from "../Helpers/userValidation";
import jwt from "jsonwebtoken";
import { ExtendedRequest,User } from "../Interfaces/index";
import { DatabaseHelper } from "../DatabaseHelper";



// inserting users

export const addUser = async (req: ExtendedRequest, res: Response) => {
  try {
    let uid = uuid();
    const { username, email, password } = req.body;

    const { error } = userRegistrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({message:error.message});
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    await DatabaseHelper.exec('addUser',{uid,username,email,password:hashedPassword})
    return res.status(201).json({ message: "user registered!!" });
  } catch (error: any) {
    return res.status(500).json({message:error.message});
  }
};

// getting all users

export const getallUsers = async (req: Request, res: Response) => {
  try {
    
    let users: User[] =  (await DatabaseHelper.exec("getAllUsers",{pageNumber:1}))
      .recordset;
    res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// // getting users by id

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    let user:User = await (await DatabaseHelper.exec('getUserById', {uid:id})).recordset[0]
    

    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: "User Not Found" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// // getting user by email

export const getUserByEmail: RequestHandler<{ email: string }> = async (
  req,
  res
) => {
  try {
    const { email } = req.params;


    let user: User = (await DatabaseHelper.exec("getUserByEmail",{email})).recordset[0];
    console.log(user)
    if(!user){
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// // update users

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { username, email, location, about } = req.body;
    const  id  = req.info?.uid as string;
    let user: User = await (await DatabaseHelper.exec("getUserById",{uid:id})).recordset[0];

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else if(user.uid === req.info?.uid){
      await DatabaseHelper.exec("updateUserDetails",{uid:id,username,email,location,about});
      return res.status(200).json({ message: "User Updated" });
    }return res.status(200).json({ message: "Not Your Details" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// // delete users

export const deleteUser = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const role = req.info?.role as string
   
    
    if (role !='admin'){
      return res.status(401).json({ message: "Admin Operation" })
    }
    let user: User = (
      await ( await DatabaseHelper.exec("getUserById",{uid:id}))).recordset[0];

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await DatabaseHelper.exec("deleteUser",{uid:id});
    return res.status(200).json({ message: "User Deleted" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

//login

export const loginUser = async (req: Request, res: Response) => {
  try {
    
    const { email, password } = req.body;
    let user: User[] = (await (await DatabaseHelper.exec("getUserByEmail",{email})
    )).recordset;
    if (!user[0] || user[0].isDeleted===1) {
      return res.status(404).json({ message: "User not found" });
    }

    let valiUser = await bcrypt.compare(password, user[0].password);
    if (!valiUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = user.map((user1) => {
      const { password, isDeleted, emailSent, ...rest } = user1;
      return rest;
    });

    const token = jwt.sign(payload[0], process.env.SECRET_KEY as string, {
      expiresIn: "360000s",
    });
   const role =user[0].role
   const uid = user[0].uid
    return res.json({ message: "Log in successfull", token, role, uid});
  } catch (error: any) {
    return res.status(404).json({message:error.message});
  }
};

