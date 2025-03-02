import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, reset } from "../store/event/eventSlice";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { getAllCategories } from "../store/category/categorySlice"; // ✅ Import here
import { getAllCities } from "../store/city/citySlice";

const UploadEvent = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef(null);

  const { event, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.event
  );
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    galleryAddress: "",
    eventType: "",
    ageRestriction: "All Ages",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    pricing: "",
  });

  useEffect(() => {
    dispatch(reset());

    // console.log("isSuccess:", isSuccess);
    // console.log("isError:", isError);
    // console.log("Message:", message);

    if (isError) {
      toast.error(message, { autoClose: 500 });
      dispatch(reset());
    } else if (isSuccess && isError === undefined) {
      toast.success(message, { autoClose: 500 });
      dispatch(reset());
    
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        galleryAddress: "",
        eventType: "",
        ageRestriction: "All Ages",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        pricing: "",
      });
      setImgUrl("");
    }
    dispatch(reset());
  }, [isSuccess, isError, isLoading]);

  
  

  // Handle form submission
  const handleEventUpload = (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.title)) {
      toast.error("Invalid title! Only alphabets and spaces are allowed.");
      return;
    }

    // if (new Date(formData.endDate) < new Date(formData.startDate)) {
    //   toast.error("End date cannot be before start date!");
    //   return;
    // }

    // if (!imgRef.current.files[0]) {
    //   toast.error("Image is required");
    //   return;
    // }

    // if (!imgRef.current.files[0]) {
    //   toast.error("Image is required!");
    //   return;
    // } else if (imgRef.current.files[0].size > 1024 * 1024) {
    //   toast.error("Image size should be less than 1MB!");
    //   return;
    // }
  

    const data = new FormData();
    console.log(formData);

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category); // Fix for schema
    data.append("location", formData.location);
    data.append("galleryAddress", formData.galleryAddress);
    data.append("eventType", formData.eventType);
    data.append("ageRestriction", formData.ageRestriction);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("pricing", Number(formData.pricing)); // Ensure it's a number
    // data.append("eventImage", imgRef.current.files[0]);

    
    if (!imgRef.current.files[0]) {
      return alert("Image is required");
    } else if (imgRef.current.files[0].size > 1024 * 1024) {
      return alert("Image size should be less than 1mb");
    } else {
      data.append("eventImage", imgRef.current.files[0]);
    }
    dispatch(createEvent(data));
    dispatch(reset());
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center md:w-[80%] lg:w-[100%] m-auto px-4 py-20">
      {/* Image Upload Section */}
      <div className="text-white lg:w-[22%] lg:min-w-[350px]">
        <h1 className="text-black text-4xl italic font-bold mb-4">
          Upload Event
        </h1>

        <label
          htmlFor="imageUpload"
          className="w-full h-80 rounded-xl border-2 border-dashed flex items-center justify-center bg-gray-300 text-gray-800 cursor-pointer"
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="Preview"
              onClick={() => imgRef.current.click()}
              className="h-full w-full object-cover rounded-xl"
            />
          ) : (
            <div
            onClick={() => imgRef.current.click()}
             className="text-center flex flex-col items-center gap-2">
              <IoCloudUploadOutline size={68} className="text-gray-800" />
              <p>Click to Upload</p>
              <span className="text-gray-700 text-xl">
                PNG, JPG, JPEG | Max Size 1MB
              </span>
            </div>
          )}
        </label>
        <input
          type="file"
          id="imageUpload"
          ref={imgRef}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

                // Check if file type is valid
                if (!allowedTypes.includes(file.type)) {
                  toast.error("Only PNG, JPG, and JPEG files are allowed!", {
                  });
                  e.target.value = ""; 
                  return;
                }

                // Set the image URL to preview
                const reader = new FileReader();
                reader.onload = (event) => {
                  setImgUrl(event.target.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
      </div>

      {/* Form Fields */}
      <form
        onSubmit={handleEventUpload}
        className="flex flex-col gap-4 lg:w-[50%] bg-gray-300 p-8 border border-gray-700 rounded-2xl"
      >
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
          className="p-3 rounded-xl"
          required
        />

        <label>Event Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
          className="p-3 rounded-xl"
          rows="5"
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
          className="p-3 rounded-xl"
          required
        >
          <option value="">Select Category</option>
          {categories?.data?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label>Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
          className="p-3 rounded-xl"
          required
        >
          <option value="">Select Location</option>
          {cities?.data?.map((city) => (
            <option key={city._id} value={city._id}>
              {city.name}
            </option>
          ))}
        </select>

        <label>Gallery Address</label>
        <input
          type="text"
          name="galleryAddress"
          value={formData.galleryAddress}
          onChange={(e) =>
                setFormData({ ...formData, galleryAddress: e.target.value })
              }
          className="p-3 rounded-xl"
          required
        />

        {/* Start Date & End Date in One Line */}
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="p-3 rounded-xl w-full"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="p-3 rounded-xl w-full"
              required
            />
          </div>
        </div>

        {/* Start Time & End Time in One Line */}
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              className="p-3 rounded-xl w-full"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label>End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              className="p-3 rounded-xl w-full"
              required
            />
          </div>
        </div>

        <label>Event Type</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={(e) =>
                setFormData({ ...formData, eventType: e.target.value })
              }
          className="p-3 rounded-xl"
          required
        >
          <option value="">Select Event Type</option>
          <option value="workshop">Workshop</option>
          <option value="exhibition">Exhibition</option>
          <option value="competition">Competition</option>
          <option value="auction">Auction</option>
        </select>

        <label>Pricing (in ₹)</label>
        <input
          type="number"
          name="pricing"
          placeholder="Enter Price"
          value={formData.pricing}
          onChange={(e) =>
                setFormData({ ...formData, pricing: e.target.value })
              }
          className="p-3 rounded-xl"
          required
        />

        <button
          type="submit"
          className="px-3 py-4 rounded-xl text-white bg-black border-2 border-black hover:bg-gray-300 hover:text-black"
        >
          {isLoading ? "Uploading..." : "Upload Event"}
        </button>
      </form>
    </div>
  );
};

export default UploadEvent;



