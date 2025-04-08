// import { useEffect } from "react";
// import { FaUserPlus } from "react-icons/fa6";
// import { FaRegEdit } from "react-icons/fa";
// import { AiFillLike } from "react-icons/ai";
// import { BsCurrencyExchange } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getCurrentUser } from "../store/auth/authSlice";

// const ProfileComponent = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(getCurrentUser());
//     //console.log("useEffect........");
//   }, []);
//   useEffect(() => {}, [user]);
//   //console.log(user, "user............");

//   return (
//     <>
//       <div className="flex flex-col gap-4 w-full">        
//         <div className="flex min-h-[400px] flex-wrap gap-4 lg:flex-nowrap">
//           <div className="px-7 py-4 w-full bg-gray-100 text-black rounded-2xl border border-gray-600">
//             <div className="font-bold flex justify-between items-center border-b border-border-info-color pb-3 mb-5 ">
//               <h2 className="text-xl ">Personal Info</h2>
//               <Link
//                 to="/user-profile/account-settings"
//                 className=" flex items-center gap-1 px-4 py-2 bg-black text-white hover:bg-[#c97064] hover:text-black rounded-xl"
//               >
//                 <FaRegEdit size={16} /> <span>Edit</span>
//               </Link>
//             </div>
//             <ul className="flex flex-col gap-3 font-medium text-black">
//               <li>
//                 Name:{" "}
//                 <span className="float-right font-normal">
//                   {user?.fullName ? user?.fullName : "-"}
//                 </span>
//               </li>
//               {/* <li>
//                 Username:{" "}
//                 <span className="float-right font-normal">@bratten65</span>
//               </li> */}
//               <li>
//                 Email:{" "}
//                 <span className="float-right font-normal">
//                   {user?.email ? user.email : "-"}
//                 </span>
//               </li>
//               <li>
//                 Phone:{" "}
//                 <span className="float-right font-normal">
//                   {user?.phone ? user.phone : "---"}
//                 </span>
//               </li>
//               <li>
//                 Gender:{" "}
//                 <span className="float-right font-normal">
//                   {user?.gender ? user.gender : "---"}
//                 </span>
//               </li>
            
//               <li>
//                 Location:{" "}
//                 <span className="float-right font-normal">
//                   {user?.location ? user.location : "---"}
//                 </span>
//               </li>
//               <li>
//                 User Type:{" "}
//                 <span className="float-right font-normal">
//                   {user?.userType ? user?.userType : "---"}
//                 </span>
//               </li>
//               <li>
//                 Join Date:{" "}
//                 <span className="float-right font-normal">{
//                   user?.createdAt
//                     ? new Date(user.createdAt).toLocaleDateString()
//                     : "---"                
//                 }</span>
//               </li>
//             </ul>
//           </div>
//           <div className="px-7 py-4 w-full bg-gray-100 text-white rounded-2xl border border-gray-600">
//             <div className="font-bold flex justify-between items-center border-b border-border-info-color pb-3 mb-5 ">
//               <h2 className="text-xl text-black">Your Bio</h2>
//               <Link
//                 to="/user-profile/account-settings"
//                 className=" flex items-center gap-1 px-4 py-2 bg-black hover:bg-[#c97064] hover:text-black rounded-xl"
//               >
//                 <FaRegEdit size={16} /> <span>Edit</span>
//               </Link>
//             </div>
//             <p className="text-body-text-color">
//               {user?.description ? user.description : "No bio available"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileComponent;


import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../store/auth/authSlice";
import header from "../assets/headerpro.jpg"; // adjust the path as needed


const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className="w-[55%] max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Banner with background image */}
        <div
          className="relative h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${header})` }}
        >
          {/* Profile Image - overlapping */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
            <img
              src={user?.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* User Details */}
        <div className="pt-14 text-center px-6 pb-6">
          <h2 className="text-4xl font-bold pb-8">{user?.fullName}</h2>
          <p className="text-xl text-gray-600">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-xl text-gray-600">
            <strong>User Type:</strong> {user?.userType}
          </p>
          <p className="text-xl text-gray-600">
            <strong>Join Date:</strong>{" "}
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>

          <div className="flex justify-center mt-4">
            <Link
              to="/user-profile/account-settings"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-[#c97064]"
            >
              <FaRegEdit /> Edit
            </Link>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <div className="font-bold flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-xl">Your Bio</h3>
          <Link
            to="/user-profile/account-settings"
            className="flex items-center gap-1 px-4 py-2 bg-black text-white hover:bg-[#c97064] hover:text-black rounded-xl"
          >
            <FaRegEdit size={16} /> <span>Edit</span>
          </Link>
        </div>
        <p className="text-gray-700">
          {user?.description ? user.description : "No bio available"}
        </p>
      </div>
    </div>
  );
};

export default ProfileComponent;
