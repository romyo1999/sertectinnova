import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import ClassicLoader from '../components/Loaders/ClassicLoader'
import { axiosClient2 } from '../api/axios'
import NotFoundAdmin from '../admin/NotFoundAdmin'
import Dashborad from '../admin/Dashborad'
import { Tasks } from '../admin/tasks'
import ImageUpload from '../admin/upload'
import Projects from '../admin/Projects'
import TeamMember from '../admin/TeamMember'
import Clients from '../admin/Clients'
import Messages from '../admin/Messages'
import Orders from '../admin/Orders'
import AdminReviews from '../admin/AdminReviews'
import Setting from '../admin/Setting'
import { Notlog } from '../components/notLogged'

const AdminRoutes = () => {

  const [name ,setName]=useState('')
  const [loading ,setLoading]=useState(true)
  const [login ,setLogin]=useState(false)

  useEffect(()=>{
    fetchuser()
  },[])

   const fetchuser=async()=>{
    try {
      setLoading(true)
      const response =await axiosClient2.get('/api/user');
      if(response.status==401){
      setLoading(false)
      }else{
        setName(response.data.first_name+" "+response.data.last_name)
        setLogin(true)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setLogin(false)
    }
  }



  return (
<>
{
      loading?(
        <div className='w-100 min-h-[1000px] d-flex align-items-center justify-content-center bg-black'>
        <div className='w-100 h-100 d-flex align-items-center justify-content-center mt-[40%]' >
        <ClassicLoader/>
        </div>
      </div>
        
      ):(
        <>
        {
          login?(
            <AdminLayout name={name}>
            <Routes>
        {/* dashboard route  */}
        <Route path='/dashboard'  element={<Dashborad/>}/>
        {/* dashboard route  */}

        {/* tasks route  */}
        <Route path='/tasks'  element={<Tasks/>}/>
        {/* tasks route  */}

        {/* tasks route  */}
        <Route path='/products'  element={<ImageUpload/>}/>
        {/* tasks route  */}

        {/* projects route  */}
        <Route path='/projects'  element={<Projects/>}/>
        {/* projects route  */}

        {/* teamMember route  */}
        <Route path='/team-member'  element={<TeamMember/>}/>
        {/* teamMember route  */}

        {/* clients route  */}
        <Route path='/clients'  element={<Clients/>}/>
        {/* clients route  */}

        {/* messages route  */}
        <Route path='/messages'  element={<Messages/>}/>
        {/* messages route  */}

        
        {/* orders route  */}
        <Route path='/orders'  element={<Orders/>}/>
        {/* orders route  */}

        {/* reviews route  */}
        <Route path='/reviews'  element={<AdminReviews/>}/>
        {/* reviews route  */}

        {/* setting route  */}
        <Route path='/setting'  element={<Setting/>}/>
        {/* setting route  */}

        {/* Not Found route  */}
        <Route path='/*'  element={<NotFoundAdmin/>}/>
        {/* Note found route  */}
          </Routes>
            </AdminLayout>

          ):(
            <Notlog/>
            // <></>
          )
        }

        </>  
              )
        }
        </>
   
  )
}

export default AdminRoutes
