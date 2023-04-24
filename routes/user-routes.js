import express from "express";
import { getalluser, signup , login} from "../controller/user-controller";

const router = express.Router();

router.get("/", getalluser);

router.post("/signup",signup);

router.post("/login",login);

export default router;