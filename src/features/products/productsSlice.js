import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/config";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    return await api.get("/products");
});

// const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
//     return await api.get("products/categories");
// });

const productsSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        products: {},
        searchProducts: [],
        categories: ["", "electronics", "jewelery", "men's clothing", "women's clothing"],
        query: { search: "", category: "" },
        error: "",
    },
    reducers: {
        noFilter: (state, action) => {
            state.searchProducts = action.payload;
        },
        filter: (state, action) => {
            const filteredProducts = Object.values(state.products).filter(product =>
                action.payload.category === ""
                    ? product.title
                          .toLowerCase()
                          .includes(action.payload.search.toLowerCase())
                    : product.category === action.payload.category &&
                      product.title
                          .toLowerCase()
                          .includes(action.payload.search.toLowerCase())
            );
            state.searchProducts = [...filteredProducts];
            state.query = {
                search: action.payload.search,
                category: action.payload.category,
            };
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = "";
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = {};
            state.error = action.error.message;
        });
    },
});

export default productsSlice.reducer;

export const { noFilter, filter } = productsSlice.actions;

export { fetchProducts };
