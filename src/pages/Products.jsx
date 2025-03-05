import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DirectionAwareHover } from '../ui/direction-aware-hover';
import '../index.css';
import ImageSpinner from '../components/ImageSpinner';
import ClassicLoader from '../components/Loaders/ClassicLoader';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [justTitle, setJustTitle] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [product_modal ,setPtroduct_modal]=useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)


    const handleOpenModal = (product) => {
        setIsModalOpen(true);
        setPtroduct_modal(product); // Set the productId in state
      };

      const handleCloseModal = () => {
        setIsModalOpen(false);
      };



    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://127.0.0.1:8000/api/products/all`);
                console.log("Response Data:", response.data);
                setAllProducts(response.data);
                setJustTitle(response.data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching products:", error); // Log any errors
                if (error.response) {
                    setErrorMessage(error.response.data.error);
                    setLoading(false)
                } else {
                    setErrorMessage("An error occurred while fetching products.");
                    setLoading(false)

                }
                setLoading(false)

            }
        };
        fetchAllProducts();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading2(true)
                const response = await axios.get(`http://127.0.0.1:8000/api/products/main?page=${currentPage}`);
                setProducts(response.data.data);
                setTotalPages(response.data.meta.last_page);
                setErrorMessage('');
                setLoading2(false)
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.error);
                setLoading2(false)

                }
                setLoading2(false)
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

    const imageURL = import.meta.env.VITE_IMAGE_URL;
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
      {
        loading==true&&loading2==true?(
            <>
                      <div className='w-100'  style={{position:"absolute" ,top:0 ,left:0 ,background:"black" ,minHeight:"1000px" ,minWidth:"100%" ,zIndex:2009999999991}}>
                      <div className='w-100 d-flex align-items-center justify-content-center'>
                      <ClassicLoader/>
                      </div>
                    </div>
            </>
        ):(
            <div className="mainBg">
            <div className='h-[430px] w-full md:relative group sm:relative md:mt-0 sm:mt-0 '>

                <div className="w-full h-full flex justify-center items-center hero-products ">
                    <div className="w-full max-w-xl">
                        {randomItems.map((item, index) => (
                          <div
                            key={item.id}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 row ${
                              index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                              <div className="-md-10 rounded-sm p-4 md:flex md:justify-evenly h-auto sm:mt-[0px] md:mt-0" >
                                  <div className="col-lg-6 col mb-2">
                                      <h2 className="text-3xl  text-slate-300 font-serif	capitalize mb-2 mt-3 text-center">{item.title}</h2>
                                      <div
                                        className="text-start ms-4 -md-10 overflow-y-auto overflow-x-auto max-h-[400px]  text-gray-400 max-w-3xl p-2 z-10 font-bold hero-products-description">{item.description}
                                  </div>

                              </div>
                              <div className='col-lg-6 col d-flex align-items-center justify-content-center'>
                                      <img src={imageURL + item.image} className={"min-w-[500px] max-h-[380px] shadow-2xl bg-white rounded-xl"} />
                                  </div>
                              </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className=" md:mt-[40px] mb-5 pb-2 flex flex-column justify-center gap-12 md:mt-0 sm:mt-[450px]" style={{borderBottom:"2px solid silver"}}>
            <h2 className="text-5xl w-100 font-tech text-center font-sans font-bold text-dark  ">Products</h2>

                
            {/* filtrage  */}
            <div className="radio-container">
                  <div className="radio-tile-group">
                  {uniqueTypes.map((type, index) => (
                     <div className="input-radio-container" key={index}>
                     <input id="walk" className="radio-button" onChange={e=>handleTypeChange(e)} value={type} type="radio" name="radio"/>
                     <div className="radio-tile">
                         <div className=" ">

                         </div>
                         <label for="walk" className="radio-tile-label">{type}</label>
                     </div>
                     </div>
                    ))}

                      <div className="input-radio-container" style={{cursor:"pointer"}}>
                      <input id="walk" className="radio-button" value=""  onChange={e=>handleTypeChange(e)}  style={{cursor:"pointer"}}  type="radio" name="radio"/>
                      <div className="radio-tile" style={{cursor:"pointer"}}>
                          <div className=" ">

                          </div>
                          <label for="walk" style={{cursor:"pointer"}}  className="radio-tile-label">ALL</label>
                      </div>
                      </div>

                     
                  </div>
                  </div>

{/* filtrage  */}
                
            </div>
            <div className="w-100 container">

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <div className="row">
                    {filteredProducts.map((product, index) => (
                      <div className='col-lg-3 col-md-6 mb-3'  key={product.id}>
                          <div className='rounded-4 w-100  d-flex items-center justify-center  shadow-slate-900	' style={{border:"2px solid silver"}}>
                              {
                                  loading ? (
                                    <div>
                                        <div className="skeleton w-[300px] h-[300px]"></div>
                                    </div>
                                  ) : (
                                    <DirectionAwareHover imageUrl={imageURL + product.image} className='w-100'>
                                        <p className="font-sans text-3xl font-bold text-white capitalize p-2">{product.title}</p>
                                        <button
                                          className="btn bg-neutral-900 text-white text-lg font-tech  hover:border hover:border-2  border-dark font-bold  transition duration-500 ease-in-out "
                                          onClick={()=>handleOpenModal(product)}>
                                            Show Details
                                        </button>

                                         
                                    </DirectionAwareHover>
                                  )
                              }
                          </div>
                      </div>
                ))}
                </div>

              {

              isModalOpen?(

              <div  className=" min-w-[90%] fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 " style={{zIndex:900000000000000000000}}>
              <div
                  className=" mx-auto bg-products-show p-8 rounded-lg shadow-md w-full h-full flex flex-col justify-center items-center ">
                  {/* display  */}

                  <div className=" hero-products rounded-4 p-4   sm:w-[100%] md:w-[75%] max-h-3xl" style={{boxShadow:"0px 0px 15px gray "}}>
                      <h1
                          className="text-white font-sans font-bold font-tech text-center text-3xl capitalize">{product_modal.title}</h1>
                  <div className="flex flex-wrap justify-evenly items-center mt-12 p-2 gap-5">
                  <textarea
                          readOnly
                          className="h-[350px] flex-1 px-3 py-2 text-gray-300 font-sans bg-black focus:outline-none focus:border-blue-500 text-xl font-tech"
                          rows="4"
                          style={{borderLeft:"2px solid orangered" ,borderRadius:"25px"} }
                          >
                          {product_modal.description}
                      </textarea>

                      <div className="flex-1 overflow-hidden inline-block rounded-xl">

                          <ImageSpinner src={imageURL + product_modal.image} alt='pic'
                              className="rounded-xl h-[350px]   w-[350px] hover:scale-110 duration-500 transition-transform"/>
                      </div>


                  </div>
                  <button
                      onClick={handleCloseModal}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                      Close
                  </button>
              </div>
                  {/* display  */}
              </div>
              </div>
              ):(
                  ""
              )
              }
                <div className="flex justify-end mt-4 gap-4 pb-4">
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
        )
      }
        
      </>
    );
};

export default Products;
