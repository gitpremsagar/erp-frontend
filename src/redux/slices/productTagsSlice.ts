import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { productTagServices } from "@/lib/services";
import { ProductTag } from "@/lib/types/products/ProductTag.type";

interface ProductTagsState {
  productTags: ProductTag[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductTagsState = {
  productTags: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching all product tags
export const fetchProductTags = createAsyncThunk(
  'productTags/fetchProductTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productTagServices.getProductTags({ limit: 1000 }); // Fetch all product tags
      return response.productTags;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product tags');
    }
  }
);

const productTagsSlice = createSlice({
  name: "productTags",
  initialState,
  reducers: {
    setProductTags: (state, action: PayloadAction<ProductTag[]>) => {
      state.productTags = action.payload;
    },
    addProductTag: (state, action: PayloadAction<ProductTag>) => {
      state.productTags.push(action.payload);
    },
    updateProductTag: (state, action: PayloadAction<ProductTag>) => {
      const index = state.productTags.findIndex(tag => tag.id === action.payload.id);
      if (index !== -1) {
        state.productTags[index] = action.payload;
      }
    },
    removeProductTag: (state, action: PayloadAction<string>) => {
      state.productTags = state.productTags.filter(tag => tag.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetProductTags: (state) => {
      state.productTags = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTags.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productTags = action.payload;
        state.error = null;
      })
      .addCase(fetchProductTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setProductTags, 
  addProductTag, 
  updateProductTag, 
  removeProductTag, 
  setLoading, 
  setError, 
  resetProductTags 
} = productTagsSlice.actions;

export default productTagsSlice.reducer;
