// routes/emailRoutes.js

import { Router } from "express";
import { sendEmail } from "../controllers/email.controller.js";


const router = Router();

router.post('/contact/send-email', sendEmail);

export default router;
