
import { Link } from "react-router-dom";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contacthead from "../assets/contact-head.png"

const ContactUs = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const formObject = Object.fromEntries(formData.entries()); 

    try {
      await axios.post('http://localhost:8000/contact/send-email', formObject);
      toast.success('Email sent successfully.', {
        autoClose: 1000, 
      });
      form.current.reset(); 
    } catch (error) {
      console.error(error);
      toast.error('Error sending email. Please try again.', {
        autoClose: 3000, // Customize the error toast duration
      });
    }
  };

  return (
    <>
      <div className="relative">
        <img
          src={contacthead} 
          alt="Contactus Banner"
          className="w-full h-[350px] object-cover"
        />
      </div>
      <div className="max-w-[1000px] m-auto px-5 py-20 flex flex-col gap-20">
        <div className="grid grid-cols-1 m-auto gap-5 w-full max-w-[1000px] md:grid-cols-3">
          <div className="text-xl flex flex-col gap-4 items-center justify-start p-8 rounded-2xl bg-gray-500 text-white w-full">
            <div className="bg-white text-black rounded-full p-3">
              <IoLocationOutline size={38} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Address</h2>
              <span>Chitkara University,Rajpura India</span>
            </div>
          </div>
          <div className="text-xl flex flex-col gap-4 items-center justify-start p-8 rounded-2xl bg-gray-500 text-white w-full">
            <div className="bg-white text-black rounded-full p-3">
              <IoCallOutline size={38} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-3">Call Us</h2>
              <p>+91 9999888877</p>
            </div>
          </div>
          <div className="text-xl flex flex-col gap-4 items-center justify-start p-8 rounded-2xl bg-gray-500 text-white w-full">
            <div className="bg-white text-black rounded-full p-3">
              <IoMailOutline size={38} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-3">Email Us</h2>
              <p>Palette@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-10 bg-gray-500 text-slate-300 rounded-2xl">
          <h2 className="text-white font-bold text-5xl pb-3 mb-5">
            Contact Form
          </h2>
          <form
            ref={form}
            onSubmit={sendEmail} // Attach the sendEmail handler to form submission
            className="flex flex-col gap-4 text-black inputs:px-3 inputs:py-4 inputs:rounded-xl inputs:bg-gray-200 inputs:placeholder:text-black"
          >
            <input type="text" name="from_name" placeholder="Full Name" required />
            <input type="email" name="user_email" placeholder="Email" required />
            <textarea
              name="message"
              placeholder="Write your Message"
              className="outline-none bg-gray-300 rounded-xl px-3 py-4 border placeholder:text-black min-h-[200px]"
              required
            />
            <input
              type="submit"
              value="Send Message"
              className="text-black cursor-pointer font-bold tracking-wide bg-gray-300 hover:bg-black hover:text-white"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
