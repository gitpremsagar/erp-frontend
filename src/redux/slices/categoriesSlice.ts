import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { categoryServices } from "@/lib/services";
import { Category } from "@/lib/types/categories/Category.type";

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryServices.getCategories({ limit: 1000 }); // Fetch all categories
      return response.categories;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      return rejectWithValue(errorMessage);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetCategories: (state) => {
      state.categories = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setCategories, 
  addCategory, 
  updateCategory, 
  removeCategory, 
  setLoading, 
  setError, 
  resetCategories 
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
