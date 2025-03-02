// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import ApiResponse from "../utils/ApiResponse.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import Event from "../models/event.model.js";

// // ✅ CREATE EVENT
// const createEvent = asyncHandler(async (req, res) => {
//   try {
//     const { title, description, category, location, startDate, endDate, startTime, endTime, pricing } = req.body;
//     const images = req.files?.map(file => file.path); // Handling multiple images

//     if (!title || !description || !category || !location || !startDate || !endDate || !startTime || !endTime || !pricing) {
//       return res.status(400).json(new ApiResponse(400, "All fields are required"));
//     }

//     // Ensure pricing object contains required fields
//     if (!pricing.adult || !pricing.group || !pricing.student) {
//       return res.status(400).json(new ApiResponse(400, "Pricing for adult, group, and student is required"));
//     }

//     if (!images || images.length === 0) {
//       return res.status(400).json(new ApiResponse(400, "At least one image is required"));
//     }

//     const uploadedImages = await Promise.all(images.map(image => uploadOnCloudinary(image)));
//     const imageUrls = uploadedImages.map(img => img.url);

//     const event = await Event.create({
//       title,
//       description,
//       category,
//       organizer: req.user._id,
//       location,
//       startDate,
//       endDate,
//       startTime,
//       endTime,
//       images: imageUrls,
//       pricing: {
//         adult: pricing.adult,
//         group: pricing.group,
//         student: pricing.student,
//       },
//       status: "upcoming",
//     });

//     return res.status(201).json(new ApiResponse(201, "Event created successfully", event));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
//   }
// });

// // ✅ GET ALL EVENTS
// const getAllEvents = asyncHandler(async (req, res) => {
//   try {
//     const events = await Event.find()
//       .populate("category", "name") // Ensure "name" exists in ProductCategory
//       .populate("organizer", "fullName email") // Ensure these fields exist in User model
//       .populate("location", "cityName"); // Ensure "cityName" exists in City model

//     return res.status(200).json(new ApiResponse(200, "Events retrieved successfully", events));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, "Server error, unable to fetch events"));
//   }
// });

// // ✅ GET SINGLE EVENT BY ID
// const getSingleEventById = asyncHandler(async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id).populate("organizer", "fullName email");

//     if (!event) {
//       return res.status(404).json(new ApiResponse(404, "Event not found"));
//     }

//     return res.json(new ApiResponse(200, "Event retrieved successfully", event));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
//   }
// });

// // ✅ DELETE EVENT
// const deleteEventById = asyncHandler(async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);

//     if (!event) {
//       return res.status(404).json(new ApiResponse(404, "Event not found"));
//     }

//     if (event.organizer.toString() !== req.user._id.toString()) {
//       return res.status(403).json(new ApiResponse(403, "Unauthorized to delete this event"));
//     }

//     await Event.deleteOne({ _id: req.params.id });

//     return res.json(new ApiResponse(200, "Event deleted successfully"));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
//   }
// });

// // ✅ UPDATE EVENT STATUS (Upcoming → Ongoing → Completed)
// const updateEventStatus = asyncHandler(async (req, res) => {
//   try {
//     const { status } = req.body;
//     const validStatuses = ["upcoming", "ongoing", "completed"];

//     if (!validStatuses.includes(status)) {
//       return res.status(400).json(new ApiResponse(400, "Invalid status"));
//     }

//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json(new ApiResponse(404, "Event not found"));
//     }

//     // Check if the user is the event organizer
//     if (event.organizer.toString() !== req.user._id.toString()) {
//       return res.status(403).json(new ApiResponse(403, "Unauthorized to update this event status"));
//     }

//     event.status = status;
//     await event.save();

//     return res.json(new ApiResponse(200, "Event status updated successfully", event));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
//   }
// });

// // ✅ GET ACTIVE EVENTS (Ongoing)
// const getActiveEvents = asyncHandler(async (req, res) => {
//   try {
//     const events = await Event.find({ status: "ongoing" });

//     return res.status(200).json(new ApiResponse(200, "Active events retrieved successfully", events));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, "Server error, unable to fetch active events"));
//   }
// });

// // ✅ GET UPCOMING EVENTS
// const getUpcomingEvents = asyncHandler(async (req, res) => {
//   try {
//     const events = await Event.find({ status: "upcoming" });

//     return res.status(200).json(new ApiResponse(200, "Upcoming events retrieved successfully", events));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, "Server error, unable to fetch upcoming events"));
//   }
// });

// // ✅ GET PREVIOUS EVENTS (Completed)
// const getPreviousEvents = asyncHandler(async (req, res) => {
//   try {
//     const events = await Event.find({ status: "completed" });

//     return res.status(200).json(new ApiResponse(200, "Previous events retrieved successfully", events));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, "Server error, unable to fetch previous events"));
//   }
// });

// export {
//   createEvent,
//   getAllEvents,
//   getSingleEventById,
//   deleteEventById,
//   updateEventStatus,
//   getActiveEvents,
//   getUpcomingEvents,
//   getPreviousEvents,
// };

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Event from "../models/event.model.js";
import mongoose from "mongoose";

const createEvent = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      galleryAddress,
      eventType,
      ageRestriction,
      pricing,
    } = req.body;
    const eventImage = req.file?.path;

    if (!title || !description || !category || !location || !startDate || !endDate || !startTime || !endTime || !galleryAddress || !eventType || !pricing) {
      return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    const imgUrlCloudinary = await uploadOnCloudinary(eventImage);

    if (!imgUrlCloudinary) {
      return res.status(500).json(new ApiResponse(500, "Error uploading image"));
    }

    const event = await Event.create({
      title,
      description,
      category,
      seller: req.user._id,
      location,
      startDate,
      endDate,
      startTime,
      endTime,
      eventImage: imgUrlCloudinary.url,
      galleryAddress,
      eventType,
      ageRestriction,
      pricing,
      status: "upcoming",
    });

    return res.status(201).json(new ApiResponse(201, "Event created successfully", event));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find()
      .populate("category", "name")
      .populate("seller", "fullName email")
      .populate("location", "name");

    if (!events || events.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server error, unable to fetch events."));
  }
});

const getSingleEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("category", "name")
      .populate("seller", "fullName email")
      .populate("location", "name");

    if (!event) {
      return res.status(404).json(new ApiResponse(404, "Event not found"));
    }

    return res.json(new ApiResponse(200, "Event retrieved successfully", event));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
  }
});

const deleteEventById = asyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json(new ApiResponse(404, "Event not found"));
    }

    const deletedEvent = await Event.deleteOne({ _id: req.params.id });

    return res.json(new ApiResponse(200, "Event deleted successfully", deletedEvent));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
  }
});

const updateEventStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["upcoming", "ongoing", "completed"].includes(status)) {
      return res.status(400).json(new ApiResponse(400, "Invalid status"));
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json(new ApiResponse(404, "Event not found"));
    }

    event.status = status;
    await event.save();

    return res.json(new ApiResponse(200, "Event status updated successfully", { event }));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message || "Internal server error"));
  }
});

export {
  createEvent,
  getAllEvents,
  getSingleEventById,
  deleteEventById,
  updateEventStatus,
};
