import { Router } from "express";
import { 
    createArtwork,
    getAllArtworks,
    getSingleArtworkById,
    deleteArtworkById,
    purchaseArtwork,
    } from "../controllers/artwork.controller.js";
import { verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";




const router = Router();

router.route("/").get(getAllArtworks);
router.route("/delete/:id").delete(verifyUser, verifySeller, deleteArtworkById);
router.route("/purchase/:id").post(verifyUser, purchaseArtwork)
router.route("/create-artwork").post(verifyUser,verifySeller,upload.single("image"), createArtwork);
router.route("/:id").get(getSingleArtworkById);

export default router;
