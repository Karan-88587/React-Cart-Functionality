import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, initializeCart } from '../features/cart/cartSlice';

function Cart() {

    const items = useSelector((state) => state.cart);
    // console.log(items)

    const dispatch = useDispatch();

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

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        // Get cart items from local storage
        let cartItems = JSON.parse(localStorage.getItem('products')) || [];

        // Check if product already exists in cart
        const existingProduct = cartItems.find(item => item.id === id);

        if (existingProduct) {
            if (existingProduct.quantity > 1) {
                // Decrease quantity if more than one
                existingProduct.quantity -= 1;
            } else {
                // Remove product from cart if quantity is 1
                cartItems = cartItems.filter(item => item.id !== id);
            }
        }

        // Save updated cart back to local storage
        localStorage.setItem('products', JSON.stringify(cartItems));
    }

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem('products')) || [];
        dispatch(initializeCart(localCart));
    }, [dispatch]);

    const grandTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log(grandTotal);

    if (items.length === 0) return <h2 className='text-2xl text-center my-28'>No Items in Cart</h2>

    return (
        <main>
            <h2 className='text-3xl text-center m-4'>Welcome to the Redux Toolkit Store</h2>
            <section>
                <div className='flex flex-wrap justify-center'>
                    {items.map((product) => (
                        <div key={product.id} className='max-w-sm rounded overflow-hidden shadow-lg bg-white m-4'>
                            <img className='w-full' src={product.image} alt={product.title} />
                            <div className='px-6 py-4'>
                                <div className='font-bold text-xl mb-2'>{product.title}</div>
                                <p className='text-gray-700 text-base'>
                                    {product.description}
                                </p>
                            </div>
                            <div className='px-6 pt-4 pb-2'>
                                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    Price: ${product.price}
                                </span>
                                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    Total: ${(product.price * product.quantity).toFixed(2)}
                                </span>
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
                                <div className='flex justify-between items-center'>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        Buy Now
                                    </button>
                                    <div className='flex items-center'>
                                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-2xl'
                                            onClick={() => handleAdd(product)}>
                                            +
                                        </button>
                                        <span className='mx-4 text-xl'>{product.quantity}</span>
                                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-2xl'
                                            onClick={() => handleRemove(product.id)}>
                                            -
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-center mt-8'>
                    <h3 className='text-2xl'>Grand Total : ${grandTotal.toFixed(2)}</h3>
                </div>
            </section>
        </main>
    )
}

export default Cart