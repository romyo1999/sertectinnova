import { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../index.css"
import Navigation from "./sidebar/Navigation.tsx";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilSquareIcon, PhotoIcon,
  TrashIcon
} from "@heroicons/react/16/solid/index.js";
import { motion, useAnimation } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { MdClose, MdSearch } from "react-icons/md";
import {AnimatedTooltip} from "./ui/animated-tooltip.tsx";

const ImageUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [type, setType] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [again, setAgain] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setType(option);
    setIsOpen(false);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(
       type ==""
    ){
      toast.error("please fill up all information's")
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Product uploaded successfully!');
      setTimeout(()=>{
        window.location.reload()
      },3000)

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred while uploading the product.');
      }
    }
  };

  const imageURL = "http://localhost:8000/storage/images/";
  const [raph, setRaph] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products?page=${currentPage}`);
        setProducts(response.data.data);
        setRaph(false)
        setAgain(response.data.data)
        setTotalPages(response.data.meta.last_page);
        setErrorMessage('');

      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        }
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const DeleteProduct = async (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
              setProducts(products.filter(product => product.id !== id));
              console.log("Product deleted successfully!");
              toast.success("Product deleted successfully!")
            } catch (error) {
              if (error.response) {
                setErrorMessage(error.response.data.error);
              } else {
                setErrorMessage('An error occurred while deleting the product.');
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

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);

    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [successMessage, errorMessage]);

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
    setProducts(again);
  };

  const handleSearch = () => {
    const query = searchValue;
    const filteredResults = products.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filteredResults);
  };

  const [editingProduct, setEditingProduct] = useState(null);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateType, setUpdateType] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    console.log(updateTitle, updateType, updateDescription)
    const formData = new FormData();
    formData.append('title', updateTitle);
    formData.append('type', updateType);
    formData.append('description', updateDescription);

    try {
      const response = await axios.put(`http://localhost:8000/api/products/${editingProduct.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },

      });
      console.log(response.data);
      setTimeout(()=>{
        window.location.reload()
      },3000)
      setEditingProduct(false)
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setUpdateTitle(product.title);
    setUpdateType(product.type);
    setUpdateDescription(product.description);
  };
  const action = [
      {
        id: 1,
        name: "Update Image",
        designation: "",
        icon:<PhotoIcon className={'size-10 text-blue-500 border-black'}/>,
        className:"text-blue-500 size-5"
      }]
  const action1 = [
      {
        id: 1,
        name: " Update Information",
        designation: "",
        icon:<PencilSquareIcon className="size-10 text-green-500 border-black mb-1"/>
        ,
        className:"text-blue-500 size-5"
      }]
  const action2 = [
      {
        id: 1,
        name: "Delete This Row",
        designation: "",
        icon:<TrashIcon className="size-10 text-red-500 border-black mb-2"/>,
        className:"text-blue-500 size-5"
      }]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (productId) => {
    setSelectedImage(null); // Reset selected image
    setIsModalOpen(true);
    setProductId(productId); // Set the productId in state
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [help, setHelp] = useState();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setHelp(file)
    setSelectedImage(imageUrl);
  };
  const [productId, setProductId] = useState('');
  const handleUploadImage = async (productId) => {
    try {
      if (!selectedImage) {
        console.error("No image selected.");
        return;
      }

      const formData = new FormData();
      formData.append("image", help);

      const response = await axios.post(`http://127.0.0.1:8000/api/products/image/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",

        },
      });

      console.log("Image uploaded successfully:", response.data);
      handleCloseModal();
      setTimeout(()=>{
        window.location.reload()
      },3000)
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  return (
    <div>
      <Navigation/>
      <div className="flex flex-row space-x-8 h-screen p-1">
        <div className="flex-grow p-2  border rounded-lg shadow-lg ml-28 mb-8">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          {
            raph ? (<div className="flex justify-center items-center mt-[200px]">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>) : (
              <table className="w-full border border-black border-collapse">
                <thead className="px-4">
                <tr>
                  <th className="text-xl text-black font-tech capitalize px-4 py-2 text-center border border-black">Type
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize px-4 py-2 text-center border border-black">title
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize px-4 py-2 text-center border border-black">description
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize px-4 py-2 text-center border border-black">image
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize px-4 py-2 text-center border border-black">action
                  </th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                  <tr key={product.id} className="p-2 border border-black">
                    <td className="text-xl text-black font-tech capitalize px-4 text-center">{product.type}</td>
                    <td
                      className="text-xl text-black font-tech capitalize border border-black px-4 text-center">{product.title}</td>
                    <td
                      className="text-sm text-black font-tech capitalize border border-black  text-center max-w-[200px]  overflow-hidden object-cover">
                      <textarea className='border-none p-6 h-full w-full over'>{product.description}</textarea>
                    </td>
                    <td className="border border-black">
                      <img src={imageURL + product.image} className='w-[130px] h-[95px] rounded-lg ml-6' alt={'pic'}/>
                    </td>
                    <td
                      className="text-xl text-black font-tech capitalize px-4 py-2 text-center flex justify-evenly items-center justify-items-center mt-5">
                      <div className={`grid md:grid-cols-3 gap-5 p-1`}>
                        <motion.button onClick={() => DeleteProduct(product.id)} whileHover={{scale: 1.115}}>
                          <AnimatedTooltip items={action2}/>
                        </motion.button>
                        <motion.button onClick={() => openEditModal(product)} whileHover={{scale: 1.15}}>
                          <AnimatedTooltip items={action1}/>
                        </motion.button>
                        <div>
                          <motion.button
                            whileHover={{scale: 1.15}}
                            id="updateImage"
                            onClick={() => handleOpenModal(product.id)}
                          >
                            <AnimatedTooltip items={action}/>
                          </motion.button>

                          {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 ">
                              <div
                                className="bg-white p-8 rounded-lg shadow-md w-[800px] flex flex-col justify-center items-center ">
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
                                    onClick={() => handleUploadImage(productId)}
                                    className={` ${help ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded mr-2 `}
                                  >
                                    Update Image
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
                      <td colSpan="3" className="flex justify-end mt-2">
                        <form className="relative">
                          <div
                            className={`flex items-center border-2 rounded-xl py-1 px-2  focus:border-2 focus:border-blue-600  transition-all duration-200 ${isTyping ? 'border-green-500 shadow-green' : 'border-gray-300 shadow-gray'}`}
                          >
                            <input
                              type="text"
                              value={searchValue}
                              onChange={handleInputChange}
                              placeholder="Search by title..."
                              className="bg-white focus:outline-none focus:ring-0  focus:border-transparent rounded-md text-lg py-2 px-4 block w-full transition duration-500 ease-in-out  placeholder-gray-500 text-gray-900"
                            />
                            {searchValue && (
                              <motion.button
                                type="button"
                                onClick={handleClearInput}
                                whileTap={{scale: 0.9}}
                                className="flex items-center justify-center  text-neutral-500 hover:text-neutral-700  "
                              >
                                <MdClose/>
                              </motion.button>
                            )}
                            <motion.button
                              type="button"
                              onClick={handleSearch}
                              whileTap={{scale: 0.9}}
                              className={`ml-2 flex items-center justify-center rounded-full p-2 ${isTyping ? 'bg-green-500' : 'bg-gray-600'} text-white`}
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
        <div className="ml-28">
          <div className="p-4 border rounded-lg shadow-lg">
            <div className="max-w-lg ">
              <h2 className="text-xl font-bold mb-4">Upload Product</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-900 text-xl font-serif">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={title}
                    required
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="type" className="block text-gray-900 text-xl font-serif">type</label>
                  {/*<select*/}
                  {/*  name="options"*/}
                  {/*  id="optionsSelect"*/}
                  {/*  className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"*/}
                  {/*  required*/}
                  {/*  onChange={e => setType(e.target.value)}*/}
                  {/*>*/}
                  {/*  <option value="option1">Option 1</option>*/}
                  {/*  <option value="option2">Option 2</option>*/}
                  {/*  <option value="option3">Option 3</option>*/}
                  {/*</select>*/}
                  <div className="relative">
                    <div
                      className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900 cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      {selectedOption || 'Select an option'}
                    </div>
                    {isOpen && (
                      <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg">
                        <li
                          className="cursor-pointer select-none py-2 pl-4 pr-8 hover:bg-gray-100"
                          onClick={() => handleOptionClick('Option 1')}
                        >
                          Option 1
                        </li>
                        <li
                          className="cursor-pointer select-none py-2 pl-4 pr-8 hover:bg-gray-100"
                          onClick={() => handleOptionClick('Option 2')}
                        >
                          Option 2
                        </li>
                        <li
                          className="cursor-pointer select-none py-2 pl-4 pr-8 hover:bg-gray-100"
                          onClick={() => handleOptionClick('Option 3')}
                        >
                          Option 3
                        </li>
                        <li
                          className="cursor-pointer select-none py-2 pl-4 pr-8 hover:bg-gray-100"
                          onClick={() => handleOptionClick('Option 4')}
                        >
                          Option 4
                        </li>
                        <li
                          className="cursor-pointer select-none py-2 pl-4 pr-8 hover:bg-gray-100"
                          onClick={() => handleOptionClick('Option 5')}
                        >
                          Option 5
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-900 text-xl font-serif">Description</label>
                  <textarea
                    id="description"
                    required
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    rows="3"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  ></textarea>
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
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleUpdateFormSubmit}>
              <div className="mb-4">
                <label htmlFor="updateTitle" className="block text-gray-900 text-xl font-serif">Title</label>
                <input
                  type="text"
                  id="updateTitle"
                  className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                  value={updateTitle}
                  required
                  onChange={e => setUpdateTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="updateType" className="block text-gray-900 text-xl font-serif">Type</label>
                <select
                  name="updateOptions"
                  id="updateOptionsSelect"
                  className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                  required
                  value={updateType}
                  onChange={e => setUpdateType(e.target.value)}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="updateDescription"
                       className="block text-gray-900 text-xl font-serif">Description</label>
                <textarea
                  id="updateDescription"
                  required
                  className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                  rows="3"
                  value={updateDescription}
                  onChange={e => setUpdateDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-4 flex justify-evenly">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button onClick={() => openEditModal(false)}
                        className="bg-green-500 p-3 rounded-lg text-white font-bold hover:bg-green-600">Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default ImageUpload;
