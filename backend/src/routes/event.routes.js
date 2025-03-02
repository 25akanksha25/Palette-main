
import { Router } from "express";
import { 
    createEvent,
    getAllEvents,
    getSingleEventById,
    deleteEventById,
    updateEventStatus,
} from "../controllers/event.controller.js";
import { verifyAdmin, verifyUser, verifySeller } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getAllEvents);
router.route("/admin-delete/:id").delete(verifyUser, verifyAdmin, deleteEventById);
router.route("/update-status/:id").post(verifyUser, updateEventStatus);
router.route("/create-event").post(verifyUser, verifySeller, upload.single("eventImage"), createEvent);
router.route("/:id").get(getSingleEventById);

export default router;
