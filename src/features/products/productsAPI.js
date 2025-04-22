import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("/api/all/product/get", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // Add proxy configuration to avoid CORS in development
        proxy: {
          host: "localhost",
          port: 5173,
        },
        timeout: 10000,
      });

      console.log("API Response Structure:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      // Handle various response structures
      return response.data?.data || response.data?.products || response.data;
    } catch (error) {
      console.error("API Error Details:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      throw error;
    }
  }
);
