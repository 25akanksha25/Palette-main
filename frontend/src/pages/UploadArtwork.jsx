import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArtwork, reset } from "../store/artwork/artworkSlice";
import { getAllCategories } from "../store/category/categorySlice";
import { getAllCities } from "../store/city/citySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloudUploadOutline } from "react-icons/io5";
// import uploadBanner from "../assets/upload-banner2.png";


const UploadArtwork = () => {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef(null);
  const { artwork, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.artwork
  );
  const { categories } = useSelector((state) => state.category);
  const { cities } = useSelector((state) => state.city);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllCities());
  }, [dispatch]);


  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    dispatch(reset());

    if ( isError) {
      toast.error(message, {
        autoClose: 500,
      });
      dispatch(reset());
    } else if (isSuccess &&  isError===undefined  ) {
      toast.success(message, {
        autoClose: 500,
      });
      dispatch(reset());
      setFormData({
        name: "",
        category: "",
        location: "",
        price: "",
        description: "",
      });
      setImgUrl("");
    }
    dispatch(reset());
  }, [isSuccess, isError, isLoading]);

  const handleProductUpload = async (e) => {
    e.preventDefault();
    //image data so use new formdata
    const data = new FormData();
    ////console.log(formData);
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("location", formData.location);
    data.append("description", formData.description);

    if (!imgRef.current.files[0]) {
      return alert("Image is required");
    } else if (imgRef.current.files[0].size > 1024 * 1024) {
      return alert("Image size should be less than 1mb");
    } else {
      data.append("image", imgRef.current.files[0]);
    }
    dispatch(createArtwork(data));
    dispatch(reset());
  };

  return (
    <div>
      {/* <div className="m-2">
        <div className="bg-white p-2">
          <img src={uploadBanner} className="w-full h-[250px]"/>
        </div>
      </div> */}
      <form
        className="flex flex-col lg:flex-row gap-8 justify-center md:w-[80%] lg:w-[100%] m-auto px-4 py-20"
        onSubmit={handleProductUpload}
      >
        <div className="text-white lg:w-[22%] lg:min-w-[350px]">
          <h1 className="text-black text-4xl italic font-bold mb-4">Upload Item</h1>

          {imgUrl ? (
            <img
              src={imgUrl}
              alt="upload img"
              onClick={() => imgRef.current.click()}
              className="w-full h-80 
                    rounded-lg border-2 border-solid p-2 object-contain cursor-pointer
                    "
            />
          ) : (
            <div
              onClick={() => imgRef.current.click()}
              className="w-full h-80
              rounded-xl border-2 border-dashed border-gray-700 
                    flex items-center justify-center bg-gray-300 text-gray-800
                    cursor-pointer
                    "
            >
              <div className="text-center flex flex-col items-center gap-2">
                <IoCloudUploadOutline size={68} className="text-gray-800" />
                <p>Click to Upload</p>
                <span className="text-gray-700 text-xl">
                  PNG,JPG,JPEG | Max Size 1MB
                </span>
              </div>
            </div>
          )}

          <input
            type="file"
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
        {/* INPUTS */}
        <div className="flex flex-col gap-4 lg:w-[50%] bg-gray-300 inputs:outline-none p-8 inputs:px-4 inputs:py-3 inputs:rounded-xl select:px-4 select:py-3 select:rounded-xl select:cursor-pointer border border-gray-700 inputs:bg-gray-200 inputs:border select:border select:border-border-info-color inputs:placeholder:text-gray-700 text-gray-700 rounded-2xl [&label]:mb-2 [&_label]:text-black [&*]:transition-all">
          <div className="grid">
            <label htmlFor="product_name">Product Name</label>
            <input
              required
              id="product_name"
              placeholder="e.g (Modern Abstract Painting)"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />{" "}
          </div>

          <div className="grid">
            <label htmlFor="category">Category</label>
            <select
              className="outline-none h-[50px] bg-gray-200 rounded-xl px-3 py-4 cursor-pointer focus:border-theme-color"
              required
              id="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="">Select Category</option>
              {categories.data &&
                categories.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mlg:grid-cols-1">
            <div className="grid">
              <label htmlFor="price">Price</label>

              <input
                required
                id="price"
                placeholder="Price"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                value={formData.price}
              />
            </div>
            <div className="grid">
              <label htmlFor="category">Area</label>
              <select
                className="outline-none h-[50px] bg-gray-200 cursor-pointer focus:border-theme-color"
                required
                id="category"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                value={formData.location}
              >
                <option value="">Select Area</option>
                {cities.data &&
                  cities.data.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="grid">
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Describe your product, art, etc."
              required
              id="description"
              rows="7"
              className="outline-none bg-gray-200 rounded-xl px-3 py-4 border border-border-info-color  placeholder:text-gray-700"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-4 rounded-xl text-white cursor-pointer font-bold tracking-wide w-full bg-black border-2 border-black hover:bg-gray-300 hover:text-black"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadArtwork;
