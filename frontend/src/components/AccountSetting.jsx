import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, reset, updateProfile } from "../store/auth/authSlice";
import Loading from "./Loading";
import { toast } from "react-toastify";

const AccountSetting = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  //console.log(user, "user.......");
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email,
    gender: user?.gender || "",
    address: user?.address || "",
    city: user?.city || "",
    userType: user?.userType || "",
    description: user?.description || "",
    phone: user?.phone || "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log("useEffect........");
    dispatch(getCurrentUser());
  }, []);
  useEffect(() => {}, [user]);

  const [imgUrl, setImgUrl] = useState(user?.profilePicture);
  const imgRef = useRef(null);
  //console.log(imgUrl, "imgUrl......");
  //console.log(user?.profilePicture, "user?.profilePicture........");

  const validateForm = () => {
    const errors = [];
  
    // Check if address is invalid (e.g., no special characters allowed)
    if (!/^[a-zA-Z0-9\s,.-]*$/.test(formData.address)) {
      errors.push("Address contains invalid characters.");
    }
  
    // Check if city is invalid (e.g., no special characters allowed)
    if (!/^[a-zA-Z\s]*$/.test(formData.city)) {
      errors.push("City name contains invalid characters.");
    }
  
    // Check if phone is a valid number (10 digits, for example)
    if (formData.phone !== undefined && formData.phone !== "") {
      if (!/^\d{10}$/.test(formData.phone)) {
        errors.push("Phone number must be exactly 10 digits.");
      }
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
  e.preventDefault();
  dispatch(reset());

  // Perform validation
  const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast.error(error, { autoClose: 500 });
      });
      return; // Stop form submission if validation fails
    }

    // Proceed with form submission
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("gender", formData.gender);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("userType", formData.userType);
    data.append("description", formData.description);
    data.append("phone", formData.phone);

    if (imgRef.current.files[0]) {
      data.append("profilePicture", imgRef.current.files[0]);
    } else {
      data.append("profilePicture", imgUrl);
    }
  
    dispatch(updateProfile(data)).then(() => {
      if (isSuccess) {
        toast.success(message || "User profile updated successfully.", {
          autoClose: 500,
        });
      }
      if (isError) {
        toast.error(message, {
          autoClose: 500,
        });
      }
    });
  
    setImgUrl(null);
    dispatch(getCurrentUser());
    dispatch(reset());
  };

  return (
    <div className="px-7 py-4 w-full bg-gray-100 rounded-2xl border border-gray-600">
      <h2 className=" text-black font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
        Account Settings
      </h2>

      <form onSubmit={handleFormSubmit}>
        <div
          className="relative overflow-hidden w-fit h-fit rounded-lg cursor-pointer mb-10"
          onClick={() => imgRef.current.click()}
        >
          <img
            src={imgUrl ? imgUrl : user?.profilePicture}
            alt="upload img"
            className="w-full md:w-[200px] object-contain"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-black font-bold ">Change Profile Picture</p>
          </div>
        </div>
        {/* INPUTS*/}
        <div className="flex flex-col gap-4 inputs:outline-none inputs:px-3 inputs:py-4 inputs:rounded-xl inputs:bg-gray-300 [&_input[type=submit]]:bg-black [&_input:hover[type=submit]]:bg-gray-400 inputs:border inputs:border-border-gray-600 select:border select:border-border-info-color inputs:placeholder-body-text-color  [&*]:transition-all">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
            ref={imgRef}
          />
          <div className="grid lg:grid-cols-3 gap-4 text-gray-700">
            <input
              type="text"
              placeholder="FullName "
              value={formData.fullName}
              name="fullName"
              required
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />{" "}
            <select
              className="outline-none bg-gray-300 rounded-xl px-3 py-4 cursor-pointer text-gray-700"
              value={formData.gender}
              name="gender"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              name="address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              name="city"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>
          <input
            type="number"
            placeholder="Phone Number"
            value={formData.phone}
            name="phone"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <select
            className="outline-none bg-gray-300 rounded-xl px-3 py-4 cursor-pointer  text-gray-700"
            value={formData.userType}
            name="userType"
            onChange={(e) =>
              setFormData({ ...formData, userType: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
          <textarea
            className="outline-none bg-gray-300 rounded-xl px-3 py-4 border border-border-info-color placeholder-body-text-color"
            cols="30"
            rows="10"
            placeholder="Description"
            value={formData.description}
            name="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>{" "}
          <input
            className="text-white cursor-pointer font-bold tracking-wide border-2 border-black hover:bg-gray-300 hover:text-black"
            type="submit"
            value={`${isLoading ? "Loaign" : "Update"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;
