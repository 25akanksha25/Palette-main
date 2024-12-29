import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../store/cart/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const Cart = () => {
  const [paidProducts, setPaidProducts] = useState({}); // Track payment status for each product
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Dispatch getCartItems when component mounts
  useEffect(() => {
    dispatch(getCartItems());
    
    // Check if the payment success state is stored in localStorage
    const storedPaidStatus = localStorage.getItem("paidProducts");
    if (storedPaidStatus) {
      setPaidProducts(JSON.parse(storedPaidStatus)); // Load the saved payment status from localStorage
    }
  }, [dispatch]);

  // Function to handle the checkout process and payment
  const redirectToCheckout = async (product) => {
    try {
      // Send a POST request to your backend to create an order
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/payments/razorpay-order",
        {
          amount: product.startingPrice, // Razorpay requires amount in paise (1 INR = 100 paise)
          productId: product._id,
        },
        { withCredentials: true }
      );

      const { id, amount, currency, notes, receipt } = data;

      // Prepare Razorpay options
      const options = {
        key: "rzp_test_HA0dblFvRuSZ2X", // Replace with your Razorpay Key ID
        amount: amount, // Amount in paise
        currency: currency,
        name: product.name,
        description: `Purchase of ${product.name}`,
        image: product.image,
        order_id: id,
        handler: function (response) {
          toast.success("Payment Successful"); // Toastify success message
          
          // Update the payment status for this product
          setPaidProducts((prev) => {
            const newPaidProducts = { ...prev, [product._id]: true }; // Mark this product as paid
            localStorage.setItem("paidProducts", JSON.stringify(newPaidProducts)); // Store the updated payment status
            return newPaidProducts;
          });
          
          console.log("Payment response:", response); // Handle successful payment
        },
        prefill: {
          name: "Your Name",
          email: "your_email@example.com",
          contact: "your_phone_number",
        },
        notes: notes,
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open(); // Open Razorpay checkout form

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("Error processing payment"); // Toastify error message
    }
  };

  // Reset payment state when a new item is added to the cart
  useEffect(() => {
    if (cartItems.length > 0) {
      // Reset payment status when cart items change
      setPaidProducts((prev) => {
        const newPaidProducts = { ...prev };
        cartItems.forEach(item => {
          item.products.forEach(product => {
            if (!newPaidProducts[product._id]) {
              newPaidProducts[product._id] = false; // Initialize payment status for new products
            }
          });
        });
        return newPaidProducts;
      });
    }
  }, [cartItems]);

  return (
    <div className="px-7 py-4 w-full bg-gray-300 border border-gray-500 text-slate-300 rounded-2xl">
      <h2 className="text-black font-bold text-3xl border-b border-black pb-3 mb-5">
        Your Cart
      </h2>
      {cartItems?.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col gap-2 border rounded-md p-4 border-gray-600 bg-gray-200"
          >
            {item.products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col justify-between gap-5 p-4 md:flex-row items-start md:items-center border-b border-gray-700"
              >
                <div className="flex gap-4">
                  <img
                    className="w-[85px] h-[85px] rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-black text-2xl font-bold">{product.name}</h3>
                    <p className="text-black">{product.startingPrice}₹</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link
                    to={`/single-auction-detail/${product._id}`}
                    className="text-black font-bold p-3 hover:bg-black hover:text-white border border-gray-600 rounded-lg"
                  >
                    View Product
                  </Link>
                  <button
                    className={`bg-black p-3 rounded-lg text-white font-bold ${paidProducts[product._id] ? "bg-gray-400 cursor-not-allowed" : "hover:bg-black cursor-pointer"}`}
                    onClick={() => redirectToCheckout(product)}
                    disabled={paidProducts[product._id]} // Disable the button if payment is successful for this product
                  >
                    Go to Checkout
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-black font-semibold">Your cart is empty!</p>
      )}
    </div>
  );
};

export default Cart;
