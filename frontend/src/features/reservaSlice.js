import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/api/getReservas"; // Ajusta la URL según tu backend

// 🔹 Acción asíncrona para obtener reservas
export const fetchReservas = createAsyncThunk("reservas/fetchReservas", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Error al obtener reservas");
  }
});

// 🔹 Slice de Redux
const reservaSlice = createSlice({
  name: "reservas",
  initialState: {
    list: [], // Lista de reservas
    loading: false,
    error: null, // Manejo de errores
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservas.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || []; // Evita que `list` sea undefined
      })
      .addCase(fetchReservas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reservaSlice.reducer;
