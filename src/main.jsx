import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  Home,
  AccountPage,
  Login,
  Register,
  RecoverAccount,
  Delivery,
  About,
  PrivacyPolicy,
  Subcatagory,
  Catagories
} from './pages/index.js'
import AllProduct from './pages/allProduct/AllProducts.jsx'
import ProductPage from './pages/allProduct/ProductPage.jsx'
// import { Provider } from 'react-redux'
// import store from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />}/>
      <Route path='/account-page' element={<AccountPage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/recover-acccount' element={<RecoverAccount />}/>
      <Route path='/checkout' element={<Delivery />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/privacy' element={<PrivacyPolicy />}/>
      <Route path='/catagory/:slug' element={<Catagories />}/>
      <Route path='/subcatagory' element={<Subcatagory />}/>
      <Route path='/all-product/:slug' element={<AllProduct />}/>
      <Route path='/product-page/:productId' element={<ProductPage />}/>
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
       <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>,
)