import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reset } from "../store/auth/authSlice";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";
import axios from "axios";


const SearchLocationCategory = () => {
  const [filter, setFilter] = useState({
    location: "",
    category: "",
    itemName: "",
  });

  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, []);

  // //console.log(categories, "categories")
  // //console.log(cities, "cities")

  const SearchByFilter = () => {
    //console.log(filter, "filter ssss ");

    dispatch(getAllAuctions(filter));
  };

  const [city, setCity] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
      
          try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=318f69a969db4f7599b7fbb5043e444e`);
      
            //console.log(response, " response from location,  ,,,,,,,,,,");
      
            if (response.data && response.data.results && response.data.results[0]) {
              let district = response.data.results[0].components.district;
              district = district?.slice(0, -8)?.trim();
              setCity(district);
            }
          } catch (error) {
            //console.error('Error getting city name:', error);
          }
        },
        (error) => {
          //console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true
        }
      );
    }
  }, []);
  
  
  //console.log(city);

  return (
    <div className="flex justify-center items-center my-5 min-h-[100px] mt-16">
      <div className="flex flex-wrap justify-center items-center gap-12 bg-white text-black p-4 w-[90%] mb-8">
        <select
          required
          id="location"
          className="px-16 py-3 bg-white text-black border-2 border-black rounded-lg outline-none cursor-pointer text-lg"
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        >
          <option value="">Select Location</option>
          {city && (
            <option value={city}>
              Current Location
            </option>
          )}
          {cities.data &&
            cities.data.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
        </select>
  
        <select
          required
          id="category"
          className="px-16 py-3 bg-white text-black border-2 border-black rounded-lg outline-none cursor-pointer text-lg"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.data &&
            categories.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
  
        <input
          type="text"
          placeholder="Search Name"
          className="px-32 py-3 bg-white text-black border-2 border-black rounded-lg outline-none cursor-pointer text-lg"
          value={filter.itemName}
          onChange={(e) => setFilter({ ...filter, itemName: e.target.value })}
        />
  
        <button
          className="bg-black text-white hover:bg-white hover:text-black font-bold border-black border-2 rounded-lg px-12 py-3 text-center"
          onClick={SearchByFilter}
        >
          Search
        </button>
      </div>
    </div>
  );
  
};

export default SearchLocationCategory;
