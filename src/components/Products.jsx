import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/product/productSlice';
import { statuses } from '../features/product/productSlice';
// import { useLoaderData } from 'react-router-dom';

function Products() {

    // const products = useLoaderData();

    // console.log(products);

    const dispatch = useDispatch();

    const { data: products, status } = useSelector(state => state.product);

    // const [products, setProducts] = useState([]);

    // const fetchProducts = async () => {

    // const res = await fetch('https://fakestoreapi.com/products');
    // const data = await res.json();
    // console.log("Products are :", data);
    // setProducts(data);
    // }

    useEffect(() => {
        dispatch(fetchProducts());
        // fetchProducts();
    }, [])

    const handleAdd = (product) => {
        dispatch(addToCart(product));

        // Get cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('products')) || [];

        // Check if product already exists in cart
        const existingProduct = cartItems.find(item => item.id === product.id);

        if (existingProduct) {
            // Update quantity if product exists
            existingProduct.quantity += 1;
        } else {
            // Add new product with quantity 1
            cartItems.push({ ...product, quantity: 1 });
        }

        // Save updated cart back to local storage
        localStorage.setItem('products', JSON.stringify(cartItems));
    }

    if (status === statuses.LOADING) return <h2 className='text-3xl text-center m-4'>Loading...</h2>
    if (status === statuses.ERROR) return <h2 className='text-3xl text-center m-4'>Something Went Wrong!</h2>

    return (
        <main>
            <h2 className='text-3xl text-center m-4'>Welcome to the Redux Toolkit Store</h2>
            <section>
                <h3 className='text-2xl text-center'>Products</h3>
                <div className='flex flex-wrap justify-center'>
                    {products.map((product) => (
                        <div key={product.id} className='max-w-sm rounded overflow-hidden shadow-lg bg-white m-4'>
                            <img className='w-full' src={product.image} alt={product.title} />
                            <div className='px-6 py-4'>
                                <div className='font-bold text-xl mb-2'>{product.title}</div>
                                <p className='text-gray-700 text-base'>
                                    {product.description}
                                </p>
                            </div>
                            <div className='px-6 pt-4 pb-2'>
                                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>Price : ${product.price}</span>
                                <div className='flex items-center mb-4'>
                                    {[...Array(5)].map((star, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.round(product.rating.rate) ? 'text-yellow-500' : 'text-gray-300'}`}
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                        >
                                            <path d='M10 15l-3.89 2.05 1-4.28L4 9.27l4.38-.38L10 5l1.62 3.89L16 9.27l-3.11 3.5 1 4.28L10 15z' />
                                        </svg>
                                    ))}
                                    <span className='text-gray-600 ml-2'>{product.rating.rate}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        Buy Now
                                    </button>
                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => handleAdd(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Products

// export const fetchProducts = async () => {
//     const res = await fetch('https://fakestoreapi.com/products');
//     return res.json();
// }