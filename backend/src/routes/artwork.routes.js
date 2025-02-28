import { Router } from "express";
import { 
    createArtwork,
    getAllArtworks,
    getSingleArtworkById,
    deleteArtworkById,
    purchaseArtwork,
    } from "../controllers/artwork.controller.js";
import { verifyAdmin,verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";




const router = Router();

router.route("/").get(getAllArtworks);
router.route("/admin-delete/:id").delete(verifyUser, verifyAdmin, deleteArtworkById);
router.route("/purchase/:id").post(verifyUser, purchaseArtwork);
router.route("/create-artwork").post(verifyUser,verifySeller,upload.single("image"), createArtwork);
router.route("/:id").get(getSingleArtworkById);

export default router;
