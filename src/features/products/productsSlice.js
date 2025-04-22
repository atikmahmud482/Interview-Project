import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAPI";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null; // Reset error on new request
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Use mock data if API returns empty
        state.products = action.payload?.length
          ? action.payload
          : [
              {
                id: 1,
                name: "Sample Product",
                price: 19.99,
                image: "sample.jpg",
                description: "Fallback product data",
              },
            ];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.products = []; // Clear existing data on error
      });
  },
});

export const { setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
