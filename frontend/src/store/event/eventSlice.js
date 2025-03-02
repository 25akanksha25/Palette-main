

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (payload, thunkAPI) => {
    try {
      return await eventService.createEvent(payload);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (payload, thunkAPI) => {
    try {
      return await eventService.getAllEvents(payload);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

export const getSingleEventById = createAsyncThunk(
  "event/getSingleEventById",
  async (id, thunkAPI) => {
    try {
      return await eventService.getSingleEventById(id);
    } catch (error) {
      const message =
        `${id} - ` + (error.response && error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

export const deleteEventById = createAsyncThunk(
  "event/deleteEventById",
  async (id, thunkAPI) => {
    try {
      return await eventService.deleteEventById(id);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

export const updateEventStatus = createAsyncThunk(
  "event/updateEventStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await eventService.updateEventStatus({ id, status });
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

const initialState = {
  events: [],
  singleEvent: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.isError;
      state.isSuccess = action.payload.success;
      state.message = action.payload.message;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(getAllEvents.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.events = action.payload.data;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(getSingleEventById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getSingleEventById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.singleEvent = action.payload.data;
    });
    builder.addCase(getSingleEventById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteEventById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(deleteEventById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(deleteEventById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateEventStatus.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    })
    builder.addCase(updateEventStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = action.payload.message;
    })
    builder.addCase(updateEventStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;








