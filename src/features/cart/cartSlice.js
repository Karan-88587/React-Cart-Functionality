import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingProduct = state.find(item => item.id === id);
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            } else {
                return state.filter(item => item.id !== id);
            }
        },
        initializeCart: (state, action) => {
            return action.payload;
        }
    }
});

export const { addToCart, removeFromCart, initializeCart } = cartSlice.actions;

export default cartSlice.reducer;