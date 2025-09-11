import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { subCategoryServices } from "@/lib/services";
import { SubCategory } from "@/lib/types/subCategories/SubCategory.type";

interface SubCategoriesState {
  subCategories: SubCategory[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SubCategoriesState = {
  subCategories: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching all sub-categories
export const fetchSubCategories = createAsyncThunk(
  'subCategories/fetchSubCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await subCategoryServices.getSubCategories({ limit: 1000 }); // Fetch all sub-categories
      return response.subCategories;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch sub-categories');
    }
  }
);

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    setSubCategories: (state, action: PayloadAction<SubCategory[]>) => {
      state.subCategories = action.payload;
    },
    addSubCategory: (state, action: PayloadAction<SubCategory>) => {
      state.subCategories.push(action.payload);
    },
    updateSubCategory: (state, action: PayloadAction<SubCategory>) => {
      const index = state.subCategories.findIndex(subCat => subCat.id === action.payload.id);
      if (index !== -1) {
        state.subCategories[index] = action.payload;
      }
    },
    removeSubCategory: (state, action: PayloadAction<string>) => {
      state.subCategories = state.subCategories.filter(subCat => subCat.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetSubCategories: (state) => {
      state.subCategories = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategories = action.payload;
        state.error = null;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setSubCategories, 
  addSubCategory, 
  updateSubCategory, 
  removeSubCategory, 
  setLoading, 
  setError, 
  resetSubCategories 
} = subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;
