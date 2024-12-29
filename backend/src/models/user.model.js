import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Define the "environment" variables at the top
const JWT_SECRET = "Hello123@";
const JWT_EXPIRES_IN = "27d"; // Default expiration for JWT tokens
const RESET_TOKEN_SECRET = "Reset123@"; // Secret for reset tokens
const RESET_TOKEN_EXPIRATION = "10m"; // Expiration time for reset tokens

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    location: { type: String },
    userType: {
      type: String,
      default: "user",
    },
    resetToken: { type: String },
    resetTokenExpire: { type: Date },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dnsxaor2k/image/upload/v1721403078/r4s3ingo0ysqq5hzsqal.jpg",
    },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    gender: { type: String },
    description: { type: String },
    paymentVerified: { type: Boolean, default: false },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    auctions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Auction" }],
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
    ],
  },
  {
    timestamps: true,
  }
);

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT token generation method
userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      location: this.location,
      userType: this.userType,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

// Use JWT to create a reset token for the forget password route
userSchema.methods.generateResetToken = function () {
  const resetToken = jwt.sign({ _id: this._id }, RESET_TOKEN_SECRET, {
    expiresIn: RESET_TOKEN_EXPIRATION,
  });
  this.resetToken = resetToken;

  // Set expiration time for the reset token
  this.resetTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  return resetToken;
};

userSchema.methods.compareTwoToken = (token) =>
  jwt.verify(token, RESET_TOKEN_SECRET);

// Hash password before saving the user model into the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;

