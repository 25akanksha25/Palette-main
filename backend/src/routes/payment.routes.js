import express from 'express';
import {
  // addPaymentMethodToCustomer,
  // updatePaymentMethod,
  // paymentCheckout,
  razorpayOrderHandler,
  updatePaymentStatus,
} from '../controllers/payment.controller.js';

const router = express.Router();

// Routes for payment operations
// router.post('/add-payment-method', addPaymentMethodToCustomer);
// router.post('/update-payment-method', updatePaymentMethod);
// router.post('/checkout', paymentCheckout);
router.post('/razorpay-order', razorpayOrderHandler);
router.post('/payment-status', updatePaymentStatus);

export default router;
