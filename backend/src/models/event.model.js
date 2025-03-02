import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }, 
    eventImage: { type: String, required: true }, 
    galleryAddress: { type: String, required: true },
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },    
    eventType: { type: String, enum: ["workshop", "exhibition", "competition", "auction"], required: true },
    ageRestriction: { type: String, enum: ["All Ages", "18+", "13+"], default: "All Ages" }, // Age restrictions

    pricing: {type: Number, required: true }, 
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
