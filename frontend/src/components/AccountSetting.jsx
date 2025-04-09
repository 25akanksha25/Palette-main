import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, reset, updateProfile } from "../store/auth/authSlice";
import Loading from "./Loading";
import { toast } from "react-toastify";
import header from "../assets/headerpro.jpg";

const AccountSetting = () => {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

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

  // return (
  //     <div className="px-7 py-4 w-full bg-gray-100 rounded-2xl border border-gray-600">
  //       <h2 className=" text-black font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
  //         Account Settings
  //       </h2>

  //       <form onSubmit={handleFormSubmit}>
  //         <div
  //           className="relative overflow-hidden w-fit h-fit rounded-lg cursor-pointer mb-10"
  //           onClick={() => imgRef.current.click()}
  //         >
  //           <img
  //             src={imgUrl ? imgUrl : user?.profilePicture}
  //             alt="upload img"
  //             className="w-full md:w-[200px] object-contain"
  //           />
  //           <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
  //             <p className="text-black font-bold ">Change Profile Picture</p>
  //           </div>
  //         </div>
  //         {/* INPUTS*/}
  //         <div className="flex flex-col gap-4 inputs:outline-none inputs:px-3 inputs:py-4 inputs:rounded-xl inputs:bg-gray-300 [&_input[type=submit]]:bg-black [&_input:hover[type=submit]]:bg-gray-400 inputs:border inputs:border-border-gray-600 select:border select:border-border-info-color inputs:placeholder-body-text-color  [&*]:transition-all">
  //           <input
  //             type="file"
  //             className="hidden"
  //             onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
  //             ref={imgRef}
  //           />
  //           <div className="grid lg:grid-cols-3 gap-4 text-gray-700">
  //             <input
  //               type="text"
  //               placeholder="FullName "
  //               value={formData.fullName}
  //               name="fullName"
  //               required
  //               onChange={(e) =>
  //                 setFormData({ ...formData, fullName: e.target.value })
  //               }
  //             />
  //             <input
  //               required
  //               type="email"
  //               placeholder="Email"
  //               value={formData.email}
  //               name="email"
  //               onChange={(e) =>
  //                 setFormData({ ...formData, email: e.target.value })
  //               }
  //             />{" "}
  //             <select
  //               className="outline-none bg-gray-300 rounded-xl px-3 py-4 cursor-pointer text-gray-700"
  //               value={formData.gender}
  //               name="gender"
  //               onChange={(e) =>
  //                 setFormData({ ...formData, gender: e.target.value })
  //               }
  //             >
  //               <option value="male">Male</option>
  //               <option value="female">Female</option>
  //             </select>
  //           </div>
  //           <div className="grid lg:grid-cols-2 gap-4">
  //             <input
  //               type="text"
  //               placeholder="Address"
  //               value={formData.address}
  //               name="address"
  //               onChange={(e) =>
  //                 setFormData({ ...formData, address: e.target.value })
  //               }
  //             />
  //             <input
  //               type="text"
  //               placeholder="City"
  //               value={formData.city}
  //               name="city"
  //               onChange={(e) =>
  //                 setFormData({ ...formData, city: e.target.value })
  //               }
  //             />
  //           </div>
  //           <input
  //             type="number"
  //             placeholder="Phone Number"
  //             value={formData.phone}
  //             name="phone"
  //             onChange={(e) =>
  //               setFormData({ ...formData, phone: e.target.value })
  //             }
  //           />
  //           <select
  //             className="outline-none bg-gray-300 rounded-xl px-3 py-4 cursor-pointer  text-gray-700"
  //             value={formData.userType}
  //             name="userType"
  //             onChange={(e) =>
  //               setFormData({ ...formData, userType: e.target.value })
  //             }
  //           >
  //             <option value="user">User</option>
  //             <option value="seller">Seller</option>
  //           </select>
  //           <textarea
  //             className="outline-none bg-gray-300 rounded-xl px-3 py-4 border border-border-info-color placeholder-body-text-color"
  //             cols="30"
  //             rows="10"
  //             placeholder="Description"
  //             value={formData.description}
  //             name="description"
  //             onChange={(e) =>
  //               setFormData({ ...formData, description: e.target.value })
  //             }
  //           ></textarea>{" "}
  //           <input
  //             className="text-white cursor-pointer font-bold tracking-wide border-2 border-black hover:bg-gray-300 hover:text-black"
  //             type="submit"
  //             value={`${isLoading ? "Loaign" : "Update"}`}
  //           />
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  return (
    // <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden bg-gray-100 text-white border border-gray-700">
    //   {/* <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-32 relative">
    //    */}
    //   <div
    //     className="relative h-40 bg-cover bg-center"
    //     style={{ backgroundImage: `url(${header})` }}
    //   >
    //     <button
    //       onClick={() => imgRef.current.click()}
    //       className="absolute bottom-4 left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer"
    //     >
    //       <img
    //         src={imgUrl ? imgUrl : user?.profilePicture}
    //         alt="Profile"
    //         className="w-full h-full object-cover"
    //       />
    //     </button>
    //   </div>

    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-gray-100 text-white border border-gray-700">
  {/* Header image with increased height */}
  <div
    className="relative h-[220px] bg-cover bg-center" // h-60 gives more height
    style={{ backgroundImage: `url(${header})` }} // Fixed missing backticks
  >
    {/* Profile image positioned to overlap the bottom of the header */}
    <button
      onClick={() => imgRef.current.click()}
      className="absolute -bottom-16 left-6 w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer"
    >
      <img
        src={imgUrl ? imgUrl : user?.profilePicture}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </button>
  </div>

      <div className="pt-16 px-6 pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-black">
              {formData.fullName}
            </h2>
            <p className="text-lg text-gray-800">{formData.email}</p>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
            ref={imgRef}
          />

          {/* Full Name, Email, Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg cursor-pointer"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Address & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={(e) =>
                setFormData({ ...formData, userType: e.target.value })
              }
              className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg cursor-pointer"
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="5"
              className="w-full bg-gray-200 text-black border border-gray-600 px-4 py-2 rounded-lg"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/user-profile/profile')}
              className="px-5 py-2 font-bold text-black border bg-gray-200 border-gray-700 rounded-md hover:bg-black hover:text-white"
            >
              Cancel
            </button>
            <input
              type="submit"
              value={isLoading ? "Loading..." : "Save changes"}
              className="px-5 py-2 bg-black text-white font-bold rounded-md hover:bg-gray-300 hover:text-black hover:border hover:border-gray-700 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetting;
