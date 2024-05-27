import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const statuses = Object.freeze({
    IDLE: 'success',
    ERROR: 'error',
    LOADING: 'loading'
});

const initialState = {
    data: [],
    status: statuses.IDLE,
};

export const productSlice = createSlice({
    name: "product",
    initialState,

    // This is for method-2 : 
    reducers: {
        // We can not call apis like this in reducers because reducers can not perform asynchronus tasks.For that we will use thunks. 
        // const res = await fetch('https://fakestoreapi.com/products');

        // setProducts: (state, action) => {
        //     state.data = action.payload;
        // },
        // setStatus: (state, action) => {
        //     state.status = action.payload;
        // },
    },

    // This is for method-1 : 
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = statuses.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = statuses.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = statuses.ERROR;
            })
    }
});

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;

// Thunks : Thunk means nothing but it's a funcion and it always returns a new function and the function which we are returning is always an async function and that async function has always have two parameters : 1. dispatch 2. getState. The word "thunk" in a programming term that means "a piece of code that does some delayed work". Rather than executes some logic now, we can write a function body or code that can be used to perform the work later. Two methods to create thunks.

// Method-1 : It takes two parameters : 1. Identifier 2. async function
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
});

// Method-2 :
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(statuses.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             console.log(data);
//             dispatch(setProducts(data));
//             dispatch(setStatus(statuses.IDLE));
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(statuses.ERROR));
//         }
//     }
// }