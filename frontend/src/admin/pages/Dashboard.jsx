import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProfileComponent from "../components/ProfileComponent";
import AllUsers from "../components/AllUsers";
import EditUser from "../components/EditUser";
import AllAuctions from "../components/AllAuctions";
import ErrorPage from "./ErrorPage";
import AllCategories from "../components/AllCategories";
import EditCategory from "../components/EditCategory";
import CreateCategory from "../components/CreateCategory";
import SingleAuctionDetail from "../../pages/SingleAuctionDetail"
import AllArtworks from "../components/AllArtworks";
// import ArtworkDetails from "../../pages/ArtWorkDetails";
import SingleArtworkDetail from "../../pages/SingleArtworkDetail";

const Dashboard = () => {
  return (
    <div className=" ">
      <div className="flex gap-4 px-5 py-10 flex-wrap lg:flex-nowrap">
        <Sidebar />

        <div className=" w-full overflow-hidden">
          <Routes>
            <Route path="/users/*" element={<AllUsers />} />
            <Route path="/users/profile/:id" element={<ProfileComponent />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/auctions/*" element={<AllAuctions />} />
            <Route path="/artworks/*" element={<AllArtworks />} />
            <Route path="/auctions/view/:id" element={<SingleAuctionDetail noPadding />} />
            <Route path="/artwork/view/:id" element={<SingleArtworkDetail noPadding/>} />
            <Route path="/categories/*" element={<AllCategories />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route
              path="/categories/create-category"
              element={<CreateCategory />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
