import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  async (_, { getState }) => {
    const { breed, category, page } = getState().cats;
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
      {
        headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
        params: {
          limit: 10,
          page,
          breed_ids: breed,
          category_ids: category,
        },
      }
    );
    return response.data;
  }
);

export const fetchCatDetails = createAsyncThunk(
  "cats/fetchCatDetails",
  async (catId) => {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/${catId}`,
      {
        headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
      }
    );
    return response.data;
  }
);

export const fetchBreeds = createAsyncThunk("cats/fetchBreeds", async () => {
  const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
    headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
  });
  return response.data;
});

export const fetchCategories = createAsyncThunk(
  "cats/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/categories",
      {
        headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY },
      }
    );
    return response.data;
  }
);

const catSlice = createSlice({
  name: "cats",
  initialState: {
    cats: [],
    breeds: [],
    categories: [],
    status: "idle",
    error: null,
    page: 1,
    breed: "",
    category: "",
    hasMore: true,
    noResults: false,
    catDetails: null,
    loadingDetails: false,
  },
  reducers: {
    clearCats: (state) => {
      state.cats = [];
      state.page = 1;
      state.hasMore = true;
      state.noResults = false;
    },
    setBreed: (state, action) => {
      state.breed = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    clearCatDetails: (state) => {
      state.catDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.status = "succeeded";
        const uniqueCats = action.payload.filter(
          (cat) => !state.cats.find((c) => c.id === cat.id)
        );
        if (uniqueCats.length === 0) {
          state.hasMore = false;
        } else {
          state.cats = [...state.cats, ...uniqueCats];
        }
        state.noResults = state.cats.length === 0;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.breeds = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCatDetails.pending, (state) => {
        state.loadingDetails = true;
        state.catDetails = null;
      })
      .addCase(fetchCatDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.catDetails = action.payload;
      })
      .addCase(fetchCatDetails.rejected, (state) => {
        state.loadingDetails = false;
        state.catDetails = null;
      });
  },
});

export const {
  clearCats,
  setBreed,
  setCategory,
  incrementPage,
  clearCatDetails,
} = catSlice.actions;
export default catSlice.reducer;
