import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
    status: {
      type: String,
      enum: ["available", "paid", "sold"],
      default: "available"
    },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    image: [{ type: String, required: true }],
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number},
    additionalInfo: { type: String },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

const ArtWork = mongoose.model("ArtWork", artworkSchema);

export default ArtWork;
