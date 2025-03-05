import { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../index.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilSquareIcon, PhotoIcon,
  TrashIcon
} from "@heroicons/react/16/solid/index.js";
import { motion, useAnimation } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { MdClose, MdSearch } from "react-icons/md";
import {AnimatedTooltip} from "../ui/animated-tooltip"; 
import { FaEdit } from 'react-icons/fa';
import ClassicSpinner from '../components/Loaders/ClassicSpinner';
import { axiosClient2 } from '../api/axios';
import ImageSpinner from '../components/ImageSpinner';
import { useUserContext } from '../providers/UserProvider';

const TeamMember = () => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [image, setImage] = useState(null);
  const [role, setRole] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [members, setmembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [again, setAgain] = useState([]);
  const [loadingAdd ,setLoadingAdd]=useState(false)
  const [loadingEdit ,setLoadingEdit]=useState(false)
  const [loadingReplace ,setLoadingReplace]=useState(false)
  const [reload ,setReload]=useState(0)
  const [allmembers,setAllmembers]=useState([])
  const {count ,setCount}=useUserContext()
  useEffect(()=>{
    setCount(count+1)
    },[])
  

  useEffect(()=>{
    const fetchall=async()=>{
      const response=await axiosClient2.get('/api/members/all');
      setAllmembers(response.data)
      console.log(response.data)
    }
    fetchall()
  },[])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('role', role);
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('linkedin', linkedin);
    formData.append('image', image);

    try {
      setLoadingAdd(true)
      const response = await axios.post('http://127.0.0.1:8000/api/members/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('member uploaded successfully!');
      setLoadingAdd(false)
      setReload(reload+1)
      setFirst_name('')
      setLast_name('')
      setRole('')
      setTwitter('')
      setFacebook('')
      setLinkedin('')
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        setLoadingAdd(false)
      } else {
        toast.error('An error occurred while uploading the member.');
      setLoadingAdd(false)
      }
    }
    setLoadingAdd(false)
  };

  const imageURL = import.meta.env.VITE_IMAGE_URL;
  const [raph, setRaph] = useState(false);

  useEffect(() => {
    const fetchmembers = async () => {
      try {
        setRaph(true)
        const response = await axios.get(`http://127.0.0.1:8000/api/members?page=${currentPage}`);
        setmembers(response.data.data);
        setRaph(false)
        setAgain(response.data.data)
        setTotalPages(response.data.meta.last_page);

      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        setRaph(false)
        }
      }
    };

    fetchmembers();
  }, [currentPage ,reload]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const Deletemember = async (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this member?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://127.0.0.1:8000/api/members/${id}`);
              setmembers(members.filter(member => member.id !== id)); // Filter out the deleted member
              toast.success("member deleted successfully!");
            } catch (error) {
              if (error.response) {
                toast.error(error.response.data.error);
              } else {
                toast.error('An error occurred while deleting the member.');
              }
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
          }
        }
      ]
    });
  };



  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({rotate: 360, transition: {duration: 1.3, ease: "easeInOut"}});
  };

  const handleHoverEnd = () => {
    controls.start({rotate: 0, transition: {duration: 1.3}});
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setIsTyping(event.target.value !== '');

  };

  const handleClearInput = () => {
    setSearchValue('');
    setIsTyping(false);
    setmembers(again);
  };

  const handleSearch = () => {
    const query = searchValue;
    console.log(allmembers)
    const filteredResults = allmembers.filter(item =>{
        if( item.first_name.toLowerCase().includes(query.toLowerCase()) || item.last_name.toLowerCase().includes(query.toLowerCase()))
            {
                console.log(item)
                return true
            }
    }
     
    );
    setmembers(filteredResults);
  };

  const [editingMember, setEditingMember] = useState(null);
  const [Updatefirst_name, setUpdateFirst_name] = useState('');
  const [Updatelast_name, setUpdateLast_name] = useState('');
  const [Updaterole, setUpdateRole] = useState('');
  const [Updatefacebook, setUpdateFacebook] = useState('');
  const [Updatetwitter, setUpdateTwitter] = useState('');
  const [Updatelinkedin, setUpdateLinkedin] = useState('');

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', Updatefirst_name);
    formData.append('last_name', Updatelast_name);
    formData.append('role', Updaterole);
    formData.append('facebook', Updatefacebook);
    formData.append('twitter', Updatetwitter);
    formData.append('linkedin', Updatelinkedin);

    try {
      setLoadingEdit(true)
      const response = await axios.put(`http://localhost:8000/api/members/${editingMember.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },

      });
      console.log(response.data);
      setReload(reload+2)
      setLoadingEdit(false)
      setEditingMember(false)
      toast.success("Updating successfuly")
    } catch (error) {
      toast.error('Error updating member:');
      setLoadingEdit(false)
    }
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setUpdateFirst_name(member.first_name);
    setUpdateLast_name(member.last_name);
    setUpdateRole(member.role);
    setUpdateFacebook(member.facebook);
    setUpdateTwitter(member.twitter);
    setUpdateLinkedin(member.linkedin);
  };
  const action = [
      {
        id: 1,
        name: "Update Image",
        designation: "",
        image:"https://tse3.mm.bing.net/th?id=OIP.8j3H2mrlHngB0Wm1AaJQRwHaHa&pid=Api&P=0&h=180",
        className:"text-blue-500 size-1 p-4"
      }]
  const action1 = [
      {
        id: 1,
        name:"Update",
        designation: "",
        image:"https://static.vecteezy.com/system/resources/previews/000/426/006/original/edit-icon-vector-illustration.jpg",
        className:"text-blue-500 size-5"
      }]
  const action2 = [
      {
        id: 1,
        name: "Delete",
        designation: "",
        image:"https://cdn-icons-png.flaticon.com/512/3807/3807871.png",
        className:"text-blue-500 size-5"
      }]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (memberId) => {
    setSelectedImage(null); // Reset selected image
    setIsModalOpen(true);
    setmemberId(memberId); // Set the memberId in state
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [help, setHelp] = useState();
// updating image 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setHelp(file)
    setSelectedImage(imageUrl);
  };
  const [memberId, setmemberId] = useState('');

  const handleUploadImage = async (memberId) => {
    try {
      if (!selectedImage) {
        console.error("No image selected.");
        return;
      }      
      setLoadingReplace(true)
      const formData = new FormData();
      formData.append("image", help);

      const response = await axios.post(`http://127.0.0.1:8000/api/members/image/${memberId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        },
      });
      setLoadingReplace(false)
      toast.success("Image uploaded successfully:");
      handleCloseModal();
      setReload(reload+3)
    } catch (error) {
      toast.error("Error uploading image:");
      setLoadingReplace(false)

    }
  };


  return (
    <div style={{minWidth:"1300px"}} className='overflow-x-auto  mb-[100px] '>
      <ToastContainer/>
      <div className="flex flex-row space-x-8 h-screen p-1">
        <div className="flex-grow p-2  border rounded-lg shadow-lg ml-28 mb-8">
          <h2 className="text-xl font-bold mb-4">members</h2>
          {
            raph ? (<div className="flex justify-center items-center mt-[200px]">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>) : (
              <table className="w-full border border-black border-collapse">
                <thead className="">
                <tr>
                  <th className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">id
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">Full Name
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">Role
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize  text-center border border-black">image
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize text-center border border-black " >action
                  </th>
                </tr>
                </thead>
                <tbody>
                {members.map(member => (
                  <tr key={member.id} className=" border border-black">
                    <td className="text-xl text-blac kborder border-black   font-tech capitalize px-4 text-center">{member.id}</td>
                    <td
                      className="text-sm text-black font-tech capitalize max-w-[270px]  k border border-black  " style={{border:"2px solid black"}}>
                        <div className='w-100 text-xl text-black font-tech capitalize   overflow-x-auto  px-4 text-center '>
                          {member.first_name+' '+member.last_name}
                        </div>
                       </td>
                    <td
                      className="text-sm text-black font-tech capitalize border border-black  text-center max-w-[200px]  overflow-hidden object-cover">
                      <div className='border-none  overflow-x-auto  p-6 h-full w-full'>{member.role}</div>
                    </td>
                    <td className='border border-black P-0  admin-table  min-w-[200px]' >
                      <ImageSpinner spinner="ms-2" className='mx-auto ' src={imageURL + member.image} width={200} height={100} alt={'pic'}/>
                    </td>
                    <td
                      className="text-xl text-black font-tech capitalize min-w-[200px] px-4 py-2 text-center flex justify-evenly items-center justify-items-center mt-5">
                      <div className={`grid md:grid-cols-3 gap-3 p-1`}>
                        <motion.button onClick={() => Deletemember(member.id)} whileHover={{scale: 1.115}}>
                          <AnimatedTooltip items={action2}/>
                        </motion.button>
                        <motion.button onClick={() => openEditModal(member)} whileHover={{scale: 1.15}}>
                          <AnimatedTooltip items={action1}/>
                        </motion.button>
                        <div>
                          <motion.button
                            whileHover={{scale: 1.15}}
                            id="updateImage"
                            onClick={() => handleOpenModal(member.id)}
                          >
                            <AnimatedTooltip items={action}/>
                          </motion.button>

                          {isModalOpen && (
                            <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 ">
                              <div
                                className="w-75 mx-auto bg-white p-8 rounded-lg shadow-md w-[800px] flex flex-col justify-center items-center ">
                                {selectedImage && (
                                  <img
                                    src={selectedImage}
                                    alt="Selected Image"
                                    className="mb-4 rounded-lg"
                                    style={{maxWidth: "300px", maxHeight: "300px"}}
                                  />
                                )}
                                {/*<input*/}
                                {/*  type="file"*/}
                                {/*  onChange={handleImageChange}*/}
                                {/*  className="mb-4 block"*/}
                                {/*/>*/}

                                <label
                                  htmlFor="dropzone-file"
                                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">Click Here</span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
                                  </div>
                                  <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    required
                                    onChange={handleImageChange}
                                  />
                                </label>


                                <div className="flex justify-between mt-5">
                                  <button
                                    onClick={() => handleUploadImage(memberId)}
                                    className={` ${help ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded mr-2 `}
                                  >
                                    {
                                      loadingReplace?(
                                        <ClassicSpinner className="w-[30px] h-[20px] pt-1 ps-2"/>
                                      ):(
                                        <>Update Image</>
                                      )
                                    }
                                    
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
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" className="border-black">
                    <div className="flex justify-start mb-2 gap-4">
                      <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        <motion.div initial={{x: 0, y: 0}} animate={controls} onMouseEnter={handleHoverStart}
                                    onMouseLeave={handleHoverEnd}>
                          <ArrowLeftIcon
                            className='text-black size-10 bg-gradient-to-r from-blue-600 to-blue-300  p-1 rounded-xl m-2 hover:bg-blue-400'/>
                        </motion.div>
                      </button>
                      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <motion.div initial={{x: 0, y: 0}} animate={controls} onMouseEnter={handleHoverStart}
                                    onMouseLeave={handleHoverEnd} whileTap={{x: 0, y: 0}}>
                          <ArrowRightIcon
                            className='text-black size-10 bg-gradient-to-r from-blue-600 to-blue-300 p-1 rounded-xl m-2 hover:bg-blue-400'/>
                        </motion.div>
                      </button>
                    </div>
                  </td>
                  {
                    !isModalOpen && (
                      <td colSpan={3} style={{width:"100%"}} className="">
                        <form className="w-100  me-2   relative">
                          <div
                            className={`flex items-center border-2 rounded-xl py-1 px-2  focus:border-2 focus:border-blue-600  transition-all duration-200 ${isTyping ? 'border-green-500 shadow-green' : 'border-gray-300 shadow-gray'}`}
                          >
                            <input
                            
                              type="text"
                              value={searchValue}
                              onChange={handleInputChange}
                              placeholder="Search by Name ..."
                              className="flex-2 bg-white focus:outline-none focus:ring-0  focus:border-transparent rounded-md text-lg py-2 px-4 block w-full transition duration-500 ease-in-out  placeholder-gray-500 text-gray-900"
                            />
                            {searchValue && (
                              <motion.button
                                type="button"
                                onClick={handleClearInput}
                                whileTap={{scale: 0.9}}
                                className=" flex-1  flex items-center justify-center  text-neutral-500 hover:text-neutral-700  "
                              >
                                <MdClose/>
                              </motion.button>
                            )}
                            <motion.button
                              type="button"
                              onClick={handleSearch}
                              whileTap={{scale: 0.9}}
                              className={`ml-2 flex-1  flex items-center justify-center rounded-full p-2 ${isTyping ? 'bg-green-500' : 'bg-gray-600'} text-white`}
                            >
                              <MdSearch/>
                            </motion.button>
                          </div>
                        </form>
                      </td>
                    )
                  }
                </tr>
                </tbody>
              </table>
            )
          }
        </div>
        <div className="ml-28 min-w-[500px] me-3">
          <div className="p-4 border rounded-lg shadow-lg">
            <div className="max-w-lg ">
              <h2 className="text-xl font-bold mb-4">Upload member</h2>
              <form onSubmit={handleFormSubmit}>

                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-gray-900 text-xl font-serif">First name</label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={first_name}
                    required
                    onChange={e => setFirst_name(e.target.value)}
                  />
                  
                </div>

                <div className="mb-4">
                <label htmlFor="last_name" className="block text-gray-900 text-xl font-serif">Last name</label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={last_name}
                    required
                    onChange={e => setLast_name(e.target.value)}
                  />
                  
                </div>
 
                <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-900 text-xl font-serif">Role</label>
                  <input
                    type="text"
                    id="role"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={role}
                    required
                    onChange={e => setRole(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="facebook" className="block text-gray-900 text-xl font-serif">Facebook</label>
                  <input
                    type="text"
                    id="facebook"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={facebook}
                    required
                    onChange={e => setFacebook(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="twitter" className="block text-gray-900 text-xl font-serif">twitter</label>
                  <input
                    type="text"
                    id="twitter"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={twitter}
                    required
                    onChange={e => setTwitter(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="linkedin" className="block text-gray-900 text-xl font-serif">linkedin</label>
                  <input
                    type="text"
                    id="linkedin"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={linkedin}
                    required
                    onChange={e => setLinkedin(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-center w-[400px]">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click Here</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        required
                        onChange={e => setImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  {/* seting loading  */}
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {
                      loadingAdd?(
                        <ClassicSpinner className="w-[30px] h-[20px] pt-1 ps-2"/>
                      ):(
                        <>Upload</>
                      )
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {editingMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Update member</h2>
            <form onSubmit={handleUpdateFormSubmit}>
           {/* inputs updates  */}

           
           <div className="mb-4">
                  <label htmlFor="first_name" className="block text-gray-900 text-xl font-serif">First name</label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={Updatefirst_name}
                    required
                    onChange={e => setUpdateFirst_name(e.target.value)}
                  />
                  
                </div>

                <div className="mb-4">
                <label htmlFor="last_name" className="block text-gray-900 text-xl font-serif">Last name</label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={Updatelast_name}
                    required
                    onChange={e => setUpdateLast_name(e.target.value)}
                  />
                  
                </div>
 
                <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-900 text-xl font-serif">Role</label>
                  <input
                    type="text"
                    id="role"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={Updaterole}
                    required
                    onChange={e => setUpdateRole(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="facebook" className="block text-gray-900 text-xl font-serif">Facebook</label>
                  <input
                    type="text"
                    id="facebook"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={Updatefacebook}
                    required
                    onChange={e => setUpdateFacebook(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="twitter" className="block text-gray-900 text-xl font-serif">twitter</label>
                  <input
                    type="text"
                    id="twitter"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={Updatetwitter}
                    required
                    onChange={e => setUpdateTwitter(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="linkedin" className="block text-gray-900 text-xl font-serif">linkedin</label>
                  <input
                    type="text"
                    id="linkedin"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={Updatelinkedin}
                    required
                    onChange={e => setUpdateLinkedin(e.target.value)}
                  />
                </div>
           {/* inputs updates  */}

              <div className="mt-4 flex justify-evenly">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {
                    loadingEdit?(
                      <ClassicSpinner className="w-[30px] h-[20px] pt-1 ps-2"/>
                    ):(
                      <>Update</>
                    )
                  }
                  
                </button>
                <button onClick={() => openEditModal(false)}
                        className="bg-green-500 p-3 rounded-lg text-white font-bold hover:bg-green-600">Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* <ToastContainer/> */}
    </div>
  );
};

export default TeamMember;
