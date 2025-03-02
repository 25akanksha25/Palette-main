

import axios from "axios";

const API_URL = "http://localhost:8010/api/v1";

const createEvent = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/event/create-event`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getAllEvents = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/event`,data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const getSingleEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/event/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const deleteEventById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/event/admin-delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    return { message, isError: true };
  }
};

const updateEventStatus = async ({ id, status }) => {
  try {
    const response = await axios.post(
      `${API_URL}/event/update-status/${id}`,
      { status },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || error.message, isError: true };
  }
};

const eventService = {
  createEvent,
  getAllEvents,
  getSingleEventById,
  deleteEventById,
  updateEventStatus,
};

export default eventService;






