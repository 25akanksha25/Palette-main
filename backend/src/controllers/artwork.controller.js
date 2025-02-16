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
      dimensions,
    } = req.body;

    if (!name || !description || !category || !price || !location || !dimensions) {
      return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    if (price <= 0 || price >= 1000000) {
      return res.status(400).json(new ApiResponse(400, "Price must be between 1 and 10 lakh"));
    }

    // Parse dimensions
    const parsedDimensions = JSON.parse(dimensions);
    if (!parsedDimensions.width || !parsedDimensions.height) {
      return res.status(400).json(new ApiResponse(400, "Width and Height are required in dimensions"));
    }

    // Handle multiple image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const uploadedImage = await uploadOnCloudinary(file.path);
        if (uploadedImage) {
          imageUrls.push(uploadedImage.url);
        }
      }
    }

    if (imageUrls.length === 0) {
      return res.status(400).json(new ApiResponse(400, "At least one image is required"));
    }

    const artwork = await Artwork.create({
      name,
      description,
      category,
      seller: req.user._id,
      location,
      image: imageUrls,
      dimensions: parsedDimensions,
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

    if (artwork.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json(new ApiResponse(403, "Unauthorized to delete this artwork"));
    }

    await Artwork.deleteOne({ _id: req.params.id });

    return res.json(new ApiResponse(200, "Artwork deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
  }
});

const purchaseArtwork = asyncHandler(async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) {
      return res.status(404).json(new ApiResponse(404, "Artwork not found"));
    }

    if (artwork.status === "sold") {
      return res.status(400).json(new ApiResponse(400, "Artwork is already sold"));
    }

    // Mark as sold
    artwork.status = "sold";
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
