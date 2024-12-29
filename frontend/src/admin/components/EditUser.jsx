import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById,updateUserById, reset } from "../../store/user/userSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


const EditUser = () => {
  //id
  const { id } = useParams();
  const { singleUser } = useSelector((state) => state.user);
  //console.log(singleUser, "user.......");
  const [formData, setFormData] = useState({
    fullName: singleUser?.fullName || "",
    email: singleUser?.email || "",
    gender: singleUser?.gender || "",
    address: singleUser?.address || "",
    city: singleUser?.city || "",
    userType: singleUser?.userType || "",
    description: singleUser?.description || "",
    phone: singleUser?.phone || "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log("useEffect........");
    dispatch(getUserById(id));
  }, []);
  useEffect(()=>{},[id])

  useEffect(() => {
    if (singleUser) {
      setFormData({
        fullName: singleUser?.fullName || "",
        email: singleUser?.email || "",
        gender: singleUser?.gender || "",

        address: singleUser.address || "",
        city: singleUser.city || "",
        userType: singleUser.userType || "",
        description: singleUser.description || "",
        phone: singleUser.phone || "",
      });
      setImgUrl(singleUser.profilePicture);
    }
  }, [singleUser,dispatch]);

  const [imgUrl, setImgUrl] = useState(singleUser?.profilePicture);
  const imgRef = useRef(null);
  //console.log(imgUrl, "imgUrl......");
  //console.log(singleUser?.profilePicture, "singleUser?.profilePicture........");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log(imgUrl, "imgUrl");
    //image data so use new formdata
    const data = new FormData();
    //console.log(formData);

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
    //console.log(imgUrl);
    dispatch(updateUserById({data,id}))
    .then(() => {
      toast.success("User information updated sucessfully!");
    })
    .catch((error) => {
      toast.error("Error updating user information");
    });
    setImgUrl(null);
    dispatch(getUserById(id));

    dispatch(reset());
  };

  return (
    <div className=" px-7 py-4 w-full bg-gray-300 rounded-2xl ">
      <h2 className=" text-black font-bold text-xl border-b border-black pb-3 mb-5 ">
        Account Settings
      </h2>

      <form onSubmit={handleFormSubmit}>
        <img
          src={imgUrl ? imgUrl : singleUser?.profilePicture}
          alt="upload img"
          onClick={() => imgRef.current.click()}
          className="w-full md:w-[200px] mb-4 rounded-lg border-2 border-gray-200 object-contain cursor-pointer"
        />
        {/* INPUTS*/}
        <div className="flex flex-col gap-4 inputs:outline-none inputs:px-3 inputs:py-4 inputs:rounded-xl inputs:bg-gray-100 [&_input[type=submit]]:bg-black [&_input:hover[type=submit]]:bg-gray-400 inputs:border select:border inputs:placeholder-gray-600  [&*]:transition-all">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setImgUrl(URL.createObjectURL(e.target.files[0]))}
            ref={imgRef}
          />
          <div className="grid lg:grid-cols-3 gap-4">
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
            {/* {select field} */}
            <select
              className="outline-none bg-gray-100 rounded-xl px-3 py-4 cursor-pointer"
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
            className="outline-none bg-gray-100 rounded-xl px-3 py-4 cursor-pointer "
            value={formData.userType}
            name="userType"
            onChange={(e) =>
              setFormData({ ...formData, userType: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <textarea
            className="outline-none bg-gray-100 rounded-xl px-3 py-4 border border-border-info-color placeholder-text-200"
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
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
