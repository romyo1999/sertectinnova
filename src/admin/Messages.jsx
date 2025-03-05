import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../index.css"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid/index.js";
import { motion, useAnimation } from "framer-motion";
import { MdClose, MdSearch } from "react-icons/md";
import {AnimatedTooltip} from "../ui/animated-tooltip";
import ClassicSpinner from '../components/Loaders/ClassicSpinner';
import { axiosClient2 } from '../api/axios';
import ImageSpinner from '../components/ImageSpinner';
import { useUserContext } from '../providers/UserProvider';

const Messages = () => {
  const {data,count ,setCount}=useUserContext()
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [again, setAgain] = useState([]);
  const [reload ,setReload] = useState(0);
  const [allmessages,setAllmessages] = useState([]);

  useEffect(()=>{
  setCount(count+1)
  },[])



  useEffect(() => {
    const fetchall = async () => {
      const response = await axiosClient2.get('/api/contact/all');
      setAllmessages(response.data.messages);
    }
    fetchall();
  }, []);


  const [raph, setRaph] = useState(false);

  useEffect(() => {
    const fetchmessages = async () => {
      try {
        setRaph(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/contact?page=${currentPage}`);
        console.log()
        setMessages(response.data.data);
        setRaph(false);

        setAgain(response.data.data);
        setTotalPages(response.data.meta.last_page);
      } catch (error) {
        if (error.response) {
          console.error(error.response.data.error);
          setRaph(false);
        }
      }
    };

    fetchmessages();
  }, [currentPage, reload]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const CopyLinkButton = ( email ) => {
    navigator.clipboard.writeText(email);
}

  const action = [
    {
      id: 1,
      name: "Delete",
      designation: "",
      image:"https://cdn-icons-png.flaticon.com/512/3807/3807871.png",
      className:"text-blue-500 size-5"
    }]

  const Deletemessage = async (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this Message?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://127.0.0.1:8000/api/contact/${id}`);
              setMessages(messages.filter(message => message.id !== id)); // Filter out the deleted message
            } catch (error) {
              if (error.response) {
                console.error(error.response.data.error);
              } else {
                console.error('An error occurred while deleting the message.');
              }
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
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
    setMessages(again);
  };

  const handleSearch = () => {
    const query = searchValue;
    const filteredResults = allmessages.filter(item =>{
        if(item.email.toLowerCase().includes(query.toLowerCase()) ||item.first_name.toLowerCase().includes(query.toLowerCase()) || item.last_name.toLowerCase().includes(query.toLowerCase())){
            return true
        }
    }

    );
    setMessages(filteredResults);
  };



useEffect(()=>{
  deleteNotification()
},[])

  const deleteNotification =async ()=>{
    console.log(count)
    await axiosClient2.delete("/api/notification/contact");
    setCount(count+20)
    console.log(count)
    console.log("clear the notification");
  }


  return (
    <div style={{minWidth:"1300px"}} className='overflow-x-auto  mb-[100px] '>
      <div className="flex flex-row space-x-8 h-screen p-1">
        <div className="flex-grow p-2   ml-28 mb-8">
            <div className='flex items-center justify-between mb-3'>
         <h2 className="text-xl font-bold mb-4">Messages</h2>
          <form className="relative">
                          <div
                            className={`flex items-center justify-caround  min-w-[600px] border-2 rounded-xl py-1 px-2  focus:border-2 focus:border-blue-600  transition-all duration-200 ${isTyping ? 'border-green-500 shadow-green' : 'border-gray-300 shadow-gray'}`}
                          >
                            <input
                              type="text"
                              value={searchValue}
                              onChange={handleInputChange}
                              placeholder="Search by email or by name..."
                              className="bg-white focus:outline-none focus:ring-0  focus:border-transparent rounded-md text-lg py-2  block w-full transition duration-500 ease-in-out  placeholder-gray-500 text-gray-900"
                            />
                            {searchValue && (
                              <motion.button
                                type="button"
                                onClick={handleClearInput}
                                whileTap={{scale: 0.9}}
                                className="flex items-center justify-end me-2  w-10  text-neutral-500 hover:text-blue-700  "
                              >
                                <MdClose className='fs-4 '/>
                              </motion.button>
                            )}
                            <motion.button
                              type="button"
                              onClick={handleSearch}
                              whileTap={{scale: 0.9}}
                              className={` w-20  p-3 flex items-center justify-center rounded-full  ${isTyping ? 'bg-green-500' : 'bg-gray-600'} text-white`}
                            >
                              <MdSearch/>
                            </motion.button>
                          </div>
                        </form>
            </div>


          {raph ? (
            <div className="flex justify-center items-center mt-[200px]">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <table className="w-full border border-black border-collapse">
              <thead className="">
              <tr>
                <th className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">Name</th>
                <th className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">Email</th>
                <th className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">Subject</th>
                <th className="text-xl text-black font-tech capitalize  text-center border border-black">Message</th>
                <th className="text-xl text-black font-tech capitalize text-center border border-black" >action</th>
              </tr>
              </thead>
              <tbody>
              {messages?.map(message => (
                <tr key={message.id} className=" border border-black">
                  <td className="text-xl text-blac kborder border-black   font-tech capitalize  text-center">{message.first_name +" "+message.last_name}</td>
                  <td className="text-sm text-black font-tech capitalize max-w-[270px]  k border border-black  " style={{border:"2px solid black"}}>
                    <div className=' relative w-100 text-xl text-black font-tech capitalize   overflow-x-auto   text-center '>

                      {message.email}
                      <button className="copy" onClick={()=>CopyLinkButton(message.email)}>
                        <span data-text-end="Copied!" data-text-initial="Copy to clipboard" className="tooltip"></span>
                        <span>
                            <svg xml:space="preserve"    viewBox="0 0 6.35 6.35" y="0" x="0" height="20" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" className="clipboard svg-for-copy">
                            <g>
                                <path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path>
                            </g>
                            </svg>
                            <svg xml:space="preserve"  viewBox="0 0 24 24" y="0" x="0" height="18" width="18" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" className="checkmark svg-for-copy">
                            <g>
                                <path data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                            </g>
                            </svg>
                        </span>
                        </button>
                    </div>
                  </td>
                  <td className=" text-black font-tech capitalize border border-black  text-center max-w-[200px]  overflow-hidden object-cover">
                    <div className='border-none  overflow-x-auto  p-6 h-full w-full'>{message.subject}</div>
                  </td>
                  <td className='border border-black   overflow-x-auto p-2  admin-table max-w-[300px] max-h-[100px] min-w-[200px]' >
                    <textarea className="w-100 max-h-[400px]">
                    {message.message}
                    </textarea>
                  </td>
                  <td className="text-xl text-black font-tech h-100 capitalize min-w-[80px]   text-center flex justify-evenly items-center justify-items-center ">
                    <div className={`grid md:grid-cols-1 gap-2 p-1 h-100 flex justify-evenly items-center justify-items-center`}>
                      <motion.button onClick={() => Deletemessage(message.id)} whileHover={{scale: 1.115}}>
                        <AnimatedTooltip items={action}/>
                      </motion.button>

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

                </tr>
                </tbody>
              </table>
                )
                }
                 </div>
                 </div>
                 </div>)

                }


export default Messages;
