import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Artwork from "../models/artwork.model.js";
import mongoose from "mongoose";

const createArtwork = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      location,
      width,
      height,
      depth
    } = req.body;
    const image = req.file?.path;


    if (!name || !description || !category || !price || !location || !width || !height) {
      return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    if (price <= 0 || price >= 1000000) {
      return res.status(400).json(new ApiResponse(400, "Price must be between 1 and 10 lakh"));
    }

    // Handle multiple image uploads
    const imgUrlCloudinary = await uploadOnCloudinary(image);
    // console.log("Cloudinary response:", imgUrlCloudinary);

    if (!imgUrlCloudinary) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error uploading image"));
    }

    const artwork = await Artwork.create({
      name,
      description,
      category,
      seller: req.user._id,
      location,
      image: imgUrlCloudinary.url,
      width,
      height,
      depth,
      price,
      status: "available",
    });

    return res.status(201).json(new ApiResponse(201, "Artwork created successfully", artwork));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

const getAllArtworks = asyncHandler(async (req, res) => {
  try {
    const artworks = await Artwork.find()
      .populate("category", "name")
      .populate("seller", "fullName email")
      .populate("location", "name");

    if (!artworks || artworks.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: artworks });
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server error, unable to fetch artworks."));
  }
});

const getSingleArtworkById = asyncHandler(async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id)
      .populate("category", "name")
      .populate("seller", "fullName email")
      .populate("location", "name");

    if (!artwork) {
      return res.status(404).json(new ApiResponse(404, "Artwork not found"));
    }

    return res.json(new ApiResponse(200, "Artwork retrieved successfully", artwork));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
  }
});

const deleteArtworkById = asyncHandler(async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json(new ApiResponse(404, "Artwork not found"));
    }

    // if (artwork.seller.toString() !== req.user._id.toString()) {
    //   return res.status(403).json(new ApiResponse(403, "Unauthorized to delete this artwork"));
    // }

    const deletedArtwork = await Artwork.deleteOne({ _id: req.params.id });

    return res.json(new ApiResponse(200, "Artwork deleted successfully", deletedArtwork));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
  }
});

const purchaseArtwork = asyncHandler(async (req, res) => {
  try {
    const { paymentId, userId } = req.body;

    if (!paymentId) {
      return res.status(400).json(new ApiResponse(400, "Payment ID is required"));
    }

    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json(new ApiResponse(404, "Artwork not found"));
    }

    if (artwork.status === "sold") {
      return res.status(400).json(new ApiResponse(400, "Artwork is already sold"));
    }

    // Update artwork status
    artwork.status = "sold";
    artwork.paid = true;
    artwork.buyer = userId;
    await artwork.save();

    return res.json(new ApiResponse(200, "Artwork purchased successfully", { artwork }));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
  }
});



export {
  createArtwork,
  getAllArtworks,
  getSingleArtworkById,
  deleteArtworkById,
  purchaseArtwork,
};
