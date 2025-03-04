import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "../assets/contact_background.png";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const formObject = Object.fromEntries(formData.entries());

    try {
      await axios.post("http://localhost:8000/contact/send-email", formObject);
      toast.success("Email sent successfully.", { autoClose: 1000 });
      form.current.reset();
    } catch (error) {
      console.error(error);
      toast.error("Error sending email. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-end pr-10">
      {/* Background Image */}
      <img
        src={background}
        alt="Contact Us"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Content Container */}
      <div className="relative bg-gray-900 bg-opacity-80 p-6 rounded-2xl w-full max-w-[500px] text-white max-h-[500px] overflow-auto">
        {/* Contact Details */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white text-black rounded-full p-2">
              <IoLocationOutline size={32} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Address</h2>
              <p className="text-sm text-gray-300">Chitkara University, Rajpura India</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white text-black rounded-full p-2">
              <IoCallOutline size={32} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Call Us</h2>
              <p className="text-sm text-gray-300">+91 9999888877</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white text-black rounded-full p-2">
              <IoMailOutline size={32} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Email Us</h2>
              <p className="text-sm text-gray-300">Palette@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <h2 className="text-white font-bold text-2xl mb-4">Contact Form</h2>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-3">
          <input
            type="text"
            name="from_name"
            placeholder="Full Name"
            required
            className="px-3 py-2 rounded-lg bg-gray-200 text-black placeholder-black"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            required
            className="px-3 py-2 rounded-lg bg-gray-200 text-black placeholder-black"
          />
          <textarea
            name="message"
            placeholder="Write your Message"
            required
            className="px-3 py-2 rounded-lg bg-gray-200 text-black placeholder-black min-h-[100px]"
          />
          <button
            type="submit"
            className="text-black bg-[#c97064] hover:bg-black hover:text-white font-bold py-2 rounded-lg w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
