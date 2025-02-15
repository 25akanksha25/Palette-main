import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import artworkService from "./artworkService";

export const createArtwork = createAsyncThunk(
  "artwork/createArtwork",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      return await artworkService.createArtwork(payload);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

export const getAllArtworks = createAsyncThunk(
  "artwork/getAllArtworks",
  async (payload, thunkAPI) => {
    try {
      return await artworkService.getAllArtworks(payload);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

export const getSingleArtworkById = createAsyncThunk(
  "artwork/getSingleArtworkById",
  async (id, thunkAPI) => {
    try {
      return await artworkService.getSingleArtworkById(id);
    } catch (error) {
      const message =
        `${id} - ` + (error.response && error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);


export const deleteArtworkById = createAsyncThunk(
  "artwork/deleteArtworkById",
  async (id, thunkAPI) => {
    try {
      return await artworkService.deleteArtworkById(id);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);


export const purchaseArtwork = createAsyncThunk(
  "artwork/purchaseArtwork",
  async (payload, thunkAPI) => {
    try {
      return await artworkService.purchaseArtwork(payload);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);


const initialState = {
  artwork: [],
  singleartwork: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
const artworkSlice = createSlice({
  name: "artwork",
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
    builder.addCase(createArtwork.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(createArtwork.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.isError;
      state.isSuccess = action.payload.success;
      state.message = action.payload.message;
    });
    builder.addCase(createArtwork.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(getAllArtworks.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getAllArtworks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.artwork = action.payload.data;
    });
    builder.addCase(getAllArtworks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(getSingleArtworkById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getSingleArtworkById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.singleartwork = action.payload.data;
    });
    builder.addCase(getSingleArtworkById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteArtworkById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(deleteArtworkById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(deleteArtworkById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(purchaseArtwork.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(purchaseArtwork.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload.isError;
      state.isSuccess = action.payload.isSuccess;
      state.message = action.payload.message;
    });
    builder.addCase(purchaseArtwork.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });

  },
});

export const { reset } = artworkSlice.actions;
export default artworkSlice.reducer;
