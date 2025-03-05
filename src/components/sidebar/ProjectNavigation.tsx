import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";

import {
  AdjustmentsHorizontalIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  CurrencyBangladeshiIcon,
  CursorArrowRaysIcon,
  PencilIcon,
  TableCellsIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import NavigationLink from "./NavigationLink"
import { ArrowLeftStartOnRectangleIcon, ClipboardIcon, GlobeAmericasIcon, PlusIcon, RssIcon } from "@heroicons/react/16/solid"
import { MdCleaningServices, MdDashboardCustomize, MdNetworkCell, MdOutlineInsertEmoticon } from "react-icons/md"
import { FaSignOutAlt } from "react-icons/fa"
import { axiosClient2 } from "../../api/axios"
import Loader from "../loader";
import { useNavigate } from "react-router-dom";

const variants = {
  close: {
    x: -300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
}

interface Props {
  selectedProject: string
  isOpen: boolean
  setSelectedProject: (project: string | null) => void
}


const ProjectNavigation = ({
  selectedProject,
  isOpen,
  setSelectedProject,
  // users ,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [account, setAccount] = useState(null)
  const [users ,setUsers]=useState([])
  const [Errors ,setErrors]=useState("")

  useEffect(()=>{
    fetchusers()
  },[])
  const fetchusers=async()=>{
    try {
      const response=await axiosClient2.get('/api/users');
      setUsers(response.data.accounts)
    } catch (error) {
      console.error(error)
    }
  }
  ;

const handleDelete =  async(id)=>{
  const a=confirm('Are you sure  you want to delete this account');
  if(a){
    const response =await axiosClient2.delete(`/api/users/${id}`);
    console.log(response)
    toast.success("Account deleted successfilly")
    handleCloseModal()
    fetchusers()
  }else{
    console.log("noo")
  }
}

const [first_name ,setFirst_name]=useState('');
const [last_name ,setLast_name]=useState('');
const [email ,setEmail]=useState('');
const [password ,setPassword]=useState('');
const [loading ,setLoading]=useState(false);

const handleAdd=async(e)=>{
    e.preventDefault()
    const data={
      "first_name":first_name,
      "last_name":last_name,
      "email":email,
      "password":password,
    }

    setLoading(true)
    try {
      const response = await axiosClient2.post("/api/register",data);
      setLoading(false)
      setErrors("")
      toast.success("New Account Created successfilly.")
      fetchusers();
      setEmail("")
      setFirst_name("")
      setLast_name("")
      setPassword("")

    
    } catch (error) {
        if(error.response){
          console.error("Response Error",error.response.data)
          setErrors(error.response.data.message)
         toast.error("Failed to create account. Please try again later.")
          setLoading(false)
          console.error("Status Error",error.response.status)
          console.error("Headers",error.response.headers)
        }else if(error.request){
            console.error("Request Error" ,error.request)
        }else{
            console.error("general Error" ,error.message)
    }
    
    }
    setLoading(false)
}

  const handleOpenModal = (user) => {
    setIsModalOpen(true);
    setAccount(user); // Set the productId in state
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
  };


  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  const navigate=useNavigate()

  const logout= async()=>{
    await axiosClient2.delete('/api/logout');
    console.log("loged out successfuly")
    navigate('/login')
  }



  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate="open"
      exit="close"
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      style={{maxWidth:"330px"}}
      className={`h-full flex flex-col  z-10  absolute bg-neutral-900 ml-0 ${
        isOpen ? "left-64" : "left-20"
      } border-r border-neutral-800 p-5`}
    >
      <div className="flex flex-row w-full justify-between place-items-center">
        <h1 className="tracking-wide text-neutral-100 text-lg">
          {selectedProject}
        </h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
   
      <div className="flex flex-col gap-3">
        <NavigationLink  to="/admin/reviews" name="Reviews">
          <ArrowTrendingUpIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavigationLink>
        <NavigationLink to="/admin/team-member" name="Team Members">
          <UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavigationLink>
        <NavigationLink to="/admin/clients" name="Clients">
          <BuildingOffice2Icon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavigationLink>

        <NavigationLink to="/admin/setting" name="General Settings">
          <AdjustmentsHorizontalIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavigationLink>

        <button onClick={logout}>
          <NavigationLink  to="#" name="Logout">
          <ArrowLeftStartOnRectangleIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </NavigationLink>
          </button> 

      </div>
      <div className="flex flex-col gap-5 mt-4">

        <h1 className="tracking-wide text-neutral-300">Admin Accounts</h1>
        {
          users.map(e =>(
            <button key={e.id} onClick={() => handleOpenModal(e)} className="flex flex-row gap-3 place-items-center">
            <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-rose-800 bg-rose-200/70" />
            <p className="tracking-wide text-neutral-400">{e.first_name +" "+e.last_name}</p>
          </button>
          ))
        }



        {isModalOpen && (
                            <div className=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 ">
                              <div
                                className=" mx-auto bg-white p-8 rounded-lg shadow-md w-50 flex flex-col justify-center items-center ">
                                    <table className="table w-100 table-bordered mx-auto w-75 ">
                                      <tr >
                                        <th className="fs-3 ">First Name :</th>
                                        <td  className="fs-3">{account.first_name}</td>
                                      </tr>
                                      <tr>
                                        <th  className="fs-3">Last Name :</th>
                                        <td  className="fs-3">{account.last_name}</td>
                                      </tr>
                                      <tr>
                                        <th  className="fs-3">Email :</th>
                                        <td  className="fs-3">{account.email}</td>
                                      </tr>
                                    </table>

                                <div className="flex justify-start mt-5">
                                  <button  onClick={()=>handleDelete(account.id)} className="btn btn-danger ">
                                    Delete
                                  </button>
                                  <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}



                          {isModalOpen2 && (
                            <div className=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 ">
                              <div
                                className=" mx-auto bg-white p-8 rounded-lg shadow-md w-50 flex flex-col justify-center items-center ">
                                 {/* form  */}
                                          <form className="form w-100" onSubmit={handleAdd} >
                                          <p className="form-title w-100 mb-3">Add New Admin </p>
                                          {
                                          Errors?(
                                            <>
                                            <div className="alert alert-danger text-danger mt-4">{Errors} </div>
                                            </>
                                          ):(
                                            <div className="mt-4"></div>
                                          )
                                        }
                                      <div className="flex mb-4 mt-2">
                                      <label className='w-50'>
                                          <input required placeholder="" name="first_name" value={first_name} onChange={e=>setFirst_name(e.target.value)} type="text" className="input"/>
                                          <span>Firstname :</span>
                                      </label>

                                      <label className='w-50'>
                                          <input required placeholder=""  name="last_name" value={last_name} onChange={e=>setLast_name(e.target.value)} type="text" className="input"/>
                                          <span>Lastname :</span>
                                      </label>
                                  </div>  
                                          
                                  <label className='mb-4'>
                                      <input required placeholder="" name="email" value={email} onChange={e=>setEmail(e.target.value)} type="text" className="input " />
                                      <span>Email :</span>
                                  </label> 

                                  <label className='mb-4'>
                                      <input required placeholder="" name="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" className="input " />
                                      <span>Password :</span>
                                  </label> 

                                      
                                      


                                  <button type="submit" className="submit mt-4">
                                    {
                                      loading?(
                                        <>
                                        <Loader/>
                                        </>
                                      ):(
                                    <>
                                    <b className="text-white fs-4 me-2">Submit</b> 
                                    <svg className="d-inline  " width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.2017 22.7911L35.4652 3.5347M16.7493 23.657L21.1173 32.3932C22.1729 34.5043 22.7006 35.5599 23.3656 35.843C23.9426 36.0887 24.6022 36.044 25.1411 35.7233C25.762 35.3536 26.1433 34.2366 26.9061 32.0029L35.1592 7.83296C35.8239 5.88669 36.1561 4.91354 35.9287 4.26978C35.7307 3.70974 35.2903 3.26921 34.7303 3.07135C34.0865 2.84391 33.1134 3.17621 31.167 3.84078L6.99702 12.094C4.76331 12.8567 3.64645 13.2381 3.27673 13.859C2.95587 14.3978 2.91141 15.0574 3.15705 15.6343C3.44012 16.2992 4.4957 16.8271 6.60686 17.8826L15.343 22.2508C15.6909 22.4247 15.8648 22.5116 16.0154 22.6277C16.1492 22.7309 16.2691 22.8508 16.3721 22.9845C16.4885 23.1352 16.5753 23.3092 16.7493 23.657Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    </>
                                      )
                                    }

                                  </button>
                              </form>
                                {/* form  */}
                                <div className="flex justify-start mt-5">
                                  <button
                                    onClick={handleCloseModal2}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}


        <button onClick={handleOpenModal2}  className="flex flex-row gap-3 place-items-center">
          <PlusIcon className="w-8 p-1 rounded-full stroke-2 stroke-emerald-800 bg-emerald-200/70" />
          <p className="tracking-wide text-neutral-400">Add Admin</p>
        </button>



      </div>
      <ToastContainer/>
    </motion.nav>
  )
}

export default ProjectNavigation
