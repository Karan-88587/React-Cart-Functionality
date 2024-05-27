import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Header() {

    const items = useSelector((state) => state.cart);

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <NavLink to="/"
                                className={({ isActive }) =>
                                    `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-orange-700" : "text-gray-700"} 
                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                }
                            >
                                Products
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/cart"
                                className={({ isActive }) =>
                                    `block py-2 pr-4 pl-3 duration-200 
                                        ${isActive ? "text-orange-700" : "text-gray-700"} 
                                        border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                }
                            >
                                Cart
                            </NavLink>
                        </li>

                        <h3>Cart Item : {items.length}</h3>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header