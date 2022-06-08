import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://628bd696667aea3a3e371c78.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    // console.log(thunkApi.getState());
    return data;
  },
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza ",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading";
      state.items = [];
      // console.log("Идет отправка");
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succes";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
      // console.log("Была ошибка");
    },
  },
});

export const selectPizzaData = state => state.pizza

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
