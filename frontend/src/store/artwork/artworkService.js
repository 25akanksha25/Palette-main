import axios from "axios";

const API_URL = "http://localhost:8010/api/v1";

const createArtwork = async (data) => {
  //console.log("data..... create auction ........", data);
  try {
    const response = await axios.post(
      `${API_URL}/artwork/create-artwork`,
      data,
      { withCredentials: true }
    );
    //console.log("response createArtwork", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with createArtwork", error);
    return { message, isError: true };
  }
};

const getAllArtworks = async (data) => {
  try {
    //console.log(data, "data");
    const response = await axios.get(`${API_URL}/artwork`,data);
    //console.log("response getAllArtworks", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    // //console.error("Error with getAllArtworks", error);
    return { message, isError: true };
  }
};

const getSingleArtworkById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/artwork/${id}`);
    //console.log("res.data", res.data);
    return res.data;
  } catch (err) {
    //console.error("Error in getSingleArtworkById", err);
    return null;
  }
};


const deleteArtworkById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/artwork/admin-delete/${id}`, {
      withCredentials: true,
    });
    //console.log("response deleteSingleAuctionById", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with deleteSingleAuctionById", error);
    return { message, isError: true };
  }
};

const purchaseArtwork = async ({ id, paymentData }) => {
  try {
    const response = await axios.put(
      `${API_URL}/artwork/purchase/${id}`,
      paymentData, // Ensure this is correctly structured
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};



const artworkService = {
  createArtwork,
  getAllArtworks,
  getSingleArtworkById,
  deleteArtworkById,
  purchaseArtwork,
};

export default artworkService;
