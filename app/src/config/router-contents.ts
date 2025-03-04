import express, { Router } from "express";
import subValidation from "../middleware/subValidation";
import validation from "../middleware/validation";
import Dashboard from "../handlers/Dashboard";
import UpdateProfile from "../handlers/UpdateProfile";
import AdminAction from "../handlers/AdminAction";
import roleController from "../middleware/roleControllet";
import compareIp from "../middleware/compareIp";

export const content:  Router = express.Router();

// content handlers
content.get("/dashboard",validation, subValidation, compareIp, Dashboard);
content.put("/update-profile",validation, subValidation, compareIp, UpdateProfile);
content.delete("/delete-user",validation, subValidation, compareIp, roleController, AdminAction);
content.get("/metrics",validation, subValidation, compareIp, roleController, AdminAction);

