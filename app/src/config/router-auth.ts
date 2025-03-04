import express, { Router } from "express";
import Login from "../handlers/Login";
import Logout from "../handlers/LogOut";
import Register from "../handlers/Register";
import subValidation from "../middleware/subValidation";
import validation from "../middleware/validation";
import compareIp from "../middleware/compareIp";
import roleController from "../middleware/roleControllet";

export const    auth:  Router = express.Router();

// auth handlers
auth.post("/register", Register),
auth.post("/login", Login),
auth.post("/logout", validation, subValidation, compareIp, Logout);
