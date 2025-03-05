import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DirectionAwareHover } from './ui/direction-aware-hover.tsx';
import '../index.css';

const Image = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [justTitle, setJustTitle] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
        }, 3000);
    }, []);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/all`);
                console.log("Response Data:", response.data);
                setAllProducts(response.data);
                setJustTitle(response.data);
            } catch (error) {
                console.error("Error fetching products:", error); // Log any errors
                if (error.response) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage("An error occurred while fetching products.");
                }
            }
        };
        fetchAllProducts();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/main?page=${currentPage}`);
                setProducts(response.data.data);
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

    const imageURL = "http://localhost:8000/storage/images/";
    const [Imageslides, setImageslides] = useState([]);
    useEffect(() => {
        const urls = allProducts.map((product) => product);
        setImageslides(urls);
    }, [allProducts, imageURL]);

    useEffect(() => {
        console.log('this array:', Imageslides);
    }, [Imageslides]);

    const [randomItems, setRandomItems] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        if (Imageslides.length > 0) {
            const randomIndexes = [];
            while (randomIndexes.length < 5  ) {
                const randomIndex = Math.floor(Math.random() * Imageslides.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            const randomItemsArray = randomIndexes.map(index => Imageslides[index]);
            setRandomItems(randomItemsArray);
        }
    }, [Imageslides]);

    // Automatic slideshow
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % 5);
        }, 5000); // Change slide every five seconds
        return () => clearInterval(intervalId);
    }, []);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };
    const uniqueTypes = [...new Set(allProducts.map(product => product.type))];


    const filteredProducts = selectedType ? allProducts.filter(product => product.type === selectedType) : products;

    return (
      <>
          <div className="mainBg">
              <div className='h-[400px] w-full md:relative group sm:relative md:mt-0 sm:mt-0 '>
                  {loading &&
                    <div>
                        <div className="skeleton w-full h-[400px]"></div>
                    </div>
                  }
                  <div className="w-full h-full flex justify-center items-center ">
                      <div className="w-full max-w-xl">
                          {randomItems.map((item, index) => (
                            <div
                              key={item.id}
                              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                              }`}
                            >
                                <div className="rounded-sm p-4 md:flex md:justify-evenly h-auto sm:mt-[0px] md:mt-0" id="randomSlide">
                                    <div className="">
                                        <h2 className="text-3xl font-bold capitalize mb-5 text-center">{item.title}</h2>
                                        <div
                                          className="overflow-y-auto max-h-[400px] max-w-3xl border border-gray-300 p-2 z-10 font-bold">{item.description}
                                    </div>

                                </div>
                                <div>
                                        <img src={imageURL + item.image} className={"w-[400px] h-[400px] rounded-xl"} />
                                    </div>
                                </div>
                            </div>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="md:ml-12 md:p-[100px] flex justify-center gap-12 md:mt-0 sm:mt-[450px]">
                  <h1 className="text-4xl font-tech capitalize text-black">filter by type</h1>
                  <select
                    onChange={handleTypeChange}
                    className="text-lg font-tech capitalize border border-gray-300 rounded-md p-2 bg-white text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value="" // Set value to an empty string to make "All Types" the default
                  >
                      <option value="" className="text-lg font-tech capitalize rounded-xl">All Types</option>
                      {uniqueTypes.map((type, index) => (
                        <option key={index} value={type} className="text-grey text-lg font-tech capitalize rounded-xl">
                            {type}
                        </option>
                      ))}
                  </select>
                  
              </div>
              <div className="md:mx-auto md:px-[100px] md:mt-[0px] sm:mt-[200px] p-8">
                  <h2 className="text-5xl font-tech text-center mb-12 ">Products</h2>
                  {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-6 md:gap-6">
                      {filteredProducts.map((product, index) => (
                        <div key={product.id}>
                            <div>
                                {
                                    loading ? (
                                      <div>
                                          <div className="skeleton w-[300px] h-[300px]"></div>
                                      </div>
                                    ) : (
                                      <DirectionAwareHover imageUrl={imageURL + product.image}>
                                          <p className="font-tech text-3xl capitalize p-2">{product.title}</p>
                                          <button
                                            className="btn bg-neutral-900 text-white text-lg font-tech hover:text-black hover:bg-white transition duration-500 ease-in-out border-none"
                                            onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>For
                                              Product
                                              Description
                                          </button>
                                          <dialog id={`my_modal_${index}`} className="modal">
                                              <div className="modal-box w-11/12 max-w-2xl max-h-3xl">
                                                      <h1
                                                        className="text-black font-tech text-center text-3xl capitalize">{product.title}</h1>
                                                  <div className="flex justify-evenly items-center mt-12 p-2 gap-5">
                                                      <div className="overflow-hidden inline-block rounded-xl">

                                                          <img src={imageURL + product.image} alt='pic'
                                                               className="rounded-xl h-[350px] w-[350px] hover:scale-110 duration-500 transition-transform"/>
                                                      </div>
                                                      <textarea
                                                        readOnly
                                                        className="h-[350px] w-[300px] px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 text-xl font-tech"
                                                        rows="4">
                                                          {product.description}
                                                      </textarea>
                                                  </div>
                                                  <div className="modal-action">
                                                  <form method="dialog">
                                                          <button className="btn bg-green-500 text-bold text-lg">Close
                                                          </button>
                                                      </form>
                                                  </div>
                                              </div>
                                          </dialog>
                                      </DirectionAwareHover>
                                    )
                                }
                            </div>
                        </div>
                  ))}
                  </div>
                  <div className="flex justify-end mt-4 gap-4">
                      <button onClick={handlePrevPage} disabled={currentPage === 1}
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 ">Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        className={`px-6 py-2 bg-green-600 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 ${
                          filteredProducts.length < 12 ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={currentPage === totalPages || filteredProducts.length < 12}
                      >
                          Next
                      </button>

                  </div>
              </div>
          </div>
      </>
    );
};

export default Image;
