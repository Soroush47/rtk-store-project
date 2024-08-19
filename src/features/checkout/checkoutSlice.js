import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        chosenProducts: {},
        totalCost: 0,
        totalItems: 0,
        checkout: false,
    },
    reducers: {
        change: (state, action) => {
            const { product, number } = action.payload;
            console.log({ product, number });

            const newProduct = {
                ...product,
                count: state.chosenProducts[product.id]
                    ? state.chosenProducts[product.id].count + number
                    : product.count + number,
            };

            let chosenProducts;

            if (!newProduct.count) {
                // remove product that has 0 count
                let {
                    [product.id]: { ...a },
                    ...newChosenProducts
                } = { ...state.chosenProducts };
                chosenProducts = newChosenProducts;
            } else {
                chosenProducts = {
                    ...state.chosenProducts,
                    [product.id]: newProduct,
                };
            }

            let totalCost = state.totalCost + product.price * number;
            if (!Number.isInteger(totalCost)) {
                totalCost = Math.round(totalCost * 100) / 100;
            }
            console.log({
                chosenProducts,
                totalItems: state.totalItems + number,
                totalCost,
            });

            state.chosenProducts = chosenProducts;
            state.totalItems += number;
            state.totalCost = totalCost;
            state.checkout = false;
        },
        checkout: state => {
            state.chosenProducts = {};
            state.totalCost = 0;
            state.totalItems = 0;
            state.checkout = true;
        },
    },
});

export default checkoutSlice.reducer;

export const { change, checkout } = checkoutSlice.actions;
