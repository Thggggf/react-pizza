import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, FetchPizzasArgs } from "./types";
export const fetchPizzas = createAsyncThunk<Pizza[],FetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async ({
    currentPage,
    categoryId,
    order,
    sortType,
    search
  }) => {
    const { data } = await axios.get(
      `https://629f31168b939d3dc291db2d.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}${search}&sortBy=${sortType}&order=${order}`,
    );
    return data;
  }
)