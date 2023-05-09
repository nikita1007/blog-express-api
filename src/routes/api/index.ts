import {Router} from "express";
import ping from "./ping";
import auth from "./auth";
import post from "./post";


const router = Router();

router.use("/api", auth, post, ping);

export default router;