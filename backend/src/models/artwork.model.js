import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available"
    },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    image: [{ type: String, required: true }],
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number }
    },
    price: { type: Number, required: true },
    paid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const ArtWork = mongoose.model("ArtWork", artworkSchema);

export default ArtWork;
