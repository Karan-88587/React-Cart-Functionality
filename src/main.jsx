import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Layout from './Layout.jsx'
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx'
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    {/* <Route loader={fetchProducts} path='' element={<Products />} /> */}
    <Route path='' element={<Products />} />
    <Route path='cart' element={<Cart />} />
  </Route>
))
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
)
