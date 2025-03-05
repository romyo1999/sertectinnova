import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Services from '../pages/Services'
import Portfolio from '../pages/Portfolio'
import Research from '../pages/Research'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import UserLayout from '../layout/UserLayout'
import ClientReviews from '../pages/ClientReviews'
import Products from '../pages/Products'
import Search from '../pages/Search'

const UserRoutes = () => {
  return (
    <div>
      <UserLayout>
      <>
      <Routes>

        {/* home route  */}
        <Route path='/' element={<Home/>}/>
        {/* home route  */}

        {/* about us  route  */}
        <Route path='/about-us' element={<AboutUs/>}/>
        {/* about us  route  */}

        
        {/* contact us route  */}
        <Route path='/contact-us' element={<ContactUs/>}/>
        {/* contact us route  */}

        {/* services route  */}
        <Route path='/services' element={<Services/>}/>
        {/* services route  */}

        {/* portfolio route  */}
        <Route path='/portfolio' element={<Portfolio/>}/>
        {/* portfolio route  */}

        {/* Research route  */}
        <Route path='/research' element={<Research/>}/>
        {/* Research route  */}

        {/* Login route  */}
        <Route path='/login' element={<Login/>}/>
        {/* Login route  */}

        {/* client reviews route  */}
        <Route path='/client-review/:id/:name' element={<ClientReviews/>}/>
        {/* client reviews route  */}

        {/* products reviews route  */}
        <Route path='/products' element={<Products/>}/>
        {/* products reviews route  */}

        {/* search reviews route  */}
        <Route path='/search/:term' element={<Search/>}/>
        {/* search reviews route  */}

        {/* not found routes  */}
        <Route path='/*' element={<NotFound/>} />
        {/* not found routes  */}

      </Routes>
    </>
      </UserLayout>
         
    </div>
  )
}

export default UserRoutes
