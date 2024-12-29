import mongoose from "mongoose";

const userPaymentMethodSchema = new mongoose.Schema(
  {
    razorpayCustomerId: { type: String },
    razorpayPaymentMethodId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentId: { type: String },          // Added field to store Razorpay payment ID
    orderId: { type: String },            // Added field to store Razorpay order ID
    status: { type: String, default: "pending" }, // Added field to store the payment status (e.g., paid or failed)
    amount: { type: Number },              // Added field to store the payment amount
  },
  {
    timestamps: true,
  }
);

const PaymentMethod = mongoose.model("PaymentMethod", userPaymentMethodSchema);
export default PaymentMethod;
