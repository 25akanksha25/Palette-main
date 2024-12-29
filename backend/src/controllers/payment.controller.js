import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import PaymentMethod from "../models/userPaymentMethod.model.js";
import razorpay from "razorpay";
import User from "../models/user.model.js";

// Initialize Razorpay instance with the provided keys
const razorpayInstance = new razorpay({
  key_id: "rzp_test_HA0dblFvRuSZ2X",   // Your Razorpay key ID
  key_secret: "WnueYlnYvG1GD7pVoQZv9OzE", // Your Razorpay key secret
});

// @desc Add payment method to customer
// @route POST /api/v1/payments/add-payment-method
// @access Private
// const addPaymentMethodToCustomer = asyncHandler(async (req, res) => {
//   try {
//     const { paymentMethodId } = req.body;
//     if (!paymentMethodId) {
//       return res.status(400).json(new ApiResponse(400, "Payment Method is required"));
//     }

//     const getUserId = req.user._id.toString();
//     const razorpayCustomer = await PaymentMethod.findOne({ userId: getUserId });

//     if (!razorpayCustomer) {
//       return res.status(404).json(new ApiResponse(404, "Customer not found"));
//     }

//     // Attach payment method
//     const paymentMethod = await razorpayInstance.paymentMethods.attach(paymentMethodId, {
//       customer_id: razorpayCustomer?.razorpayCustomerId,
//     });

//     if (!paymentMethod) {
//       return res.status(404).json(new ApiResponse(404, "Payment method not added."));
//     }

//     razorpayCustomer.paymentMethodId = paymentMethodId;
//     await razorpayCustomer.save();

//     // Update user payment verification
//     const user = await User.findById(getUserId);
//     if (!user) {
//       return res.status(404).json(new ApiResponse(404, "User not found"));
//     }
//     user.paymentVerified = true;
//     await user.save();

//     return res.status(200).json(new ApiResponse(200, "Payment method added successfully"));
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
//   }
// });

// @desc Update payment method
// @route POST /api/v1/payments/update-payment-method
// @access Private
// const updatePaymentMethod = asyncHandler(async (req, res) => {
//   const { paymentMethodId } = req.body;
//   try {
//     const getUserId = req.user._id.toString();

//     const razorpayCustomer = await PaymentMethod.findOne({ userId: getUserId });

//     if (!razorpayCustomer) {
//       return res.status(404).json(new ApiResponse(404, "Customer not found"));
//     }

//     await razorpayInstance.paymentMethods.attach(paymentMethodId, {
//       customer_id: razorpayCustomer?.razorpayCustomerId,
//     });

//     await razorpayInstance.paymentMethods.detach(razorpayCustomer?.paymentMethodId);
//     razorpayCustomer.paymentMethodId = paymentMethodId;
//     await razorpayCustomer.save();

//     // Update user payment verification
//     const user = await User.findById(getUserId);
//     if (!user) {
//       return res.status(404).json(new ApiResponse(404, "User not found"));
//     }
//     user.paymentVerified = true;
//     await user.save();

//     res.status(200).json({ message: "Payment method updated successfully" });
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
//   }
// });

// @desc Checkout
// @route POST /api/v1/payments/checkout
// @access Private
// const paymentCheckout = asyncHandler(async (req, res) => {
//   try {
//     const getUserId = req.user._id.toString();

//     if (!getUserId) {
//       return res.status(400).json(new ApiResponse(400, "User not found"));
//     }

//     const razorpayCustomer = await PaymentMethod.findOne({ userId: getUserId });

//     if (!razorpayCustomer) {
//       return res.status(400).json(new ApiResponse(400, "Customer not found"));
//     }

//     // Ensure you are passing the correct amount in the request body
//     const { amount } = req.body;
//     if (!amount || amount <= 0) {
//       return res.status(400).json(new ApiResponse(400, "Invalid amount"));
//     }

//     const order = await razorpayInstance.orders.create({
//       amount: amount * 100, // Razorpay amount is in paise, so multiply by 100
//       currency: "INR",
//       receipt: `receipt#${Date.now()}`,
//       payment_capture: 1,
//     });

//     if (!order) {
//       return res.status(400).json(new ApiResponse(400, "Order creation failed"));
//     }

//     return res.status(201).json({
//       id: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       receipt: order.receipt,
//       status: order.status,
//     });
//   } catch (error) {
//     return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
//   }
// });

// @desc Create Razorpay order
// @route POST /api/v1/payments/razorpay-order
// @access Private
const razorpayOrderHandler = asyncHandler(async (req, res) => {
  try {
    const { amount, productId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json(new ApiResponse(400, "Invalid amount"));
    }

    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${productId}`,
      payment_capture: 1,
    });

    if (!order) {
      return res.status(400).json(new ApiResponse(400, "Order creation failed"));
    }

    return res.status(201).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    });
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

// @desc Handle successful payment and update status
// @route POST /api/v1/payments/payment-status
// @access Private
// Handle successful payment and update status
const updatePaymentStatus = asyncHandler(async (req, res) => {
  try {
    const { paymentId, orderId, signature, amount } = req.body;
    const getUserId = req.user._id.toString();

    if (!paymentId || !orderId || !signature || !amount) {
      return res.status(400).json(new ApiResponse(400, "Payment details are missing"));
    }

    // Verify the payment signature
    const generatedSignature = razorpayInstance.crypto
      .createHmac("sha256", razorpayInstance.key_secret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json(new ApiResponse(400, "Invalid signature"));
    }

    // Find the user
    const user = await User.findById(getUserId);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found"));
    }

    // Update the user's payment status to 'paid'
    user.paymentStatus = "paid"; // Update payment status to "paid"
    await user.save();

    // Store the payment details in the PaymentMethod collection
    const paymentDetails = {
      paymentId,
      orderId,
      status: "success", // Mark the payment as successful
      amount,
      userId: getUserId,
    };

    const newPayment = new PaymentMethod(paymentDetails);
    await newPayment.save();

    return res.status(200).json(new ApiResponse(200, "Payment successful, status updated"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});



export {
  // addPaymentMethodToCustomer,
  // updatePaymentMethod,
  // paymentCheckout,
  razorpayOrderHandler,
  updatePaymentStatus,
};
