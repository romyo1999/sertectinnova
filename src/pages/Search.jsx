import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DirectionAwareHover } from '../ui/direction-aware-hover';
import '../index.css';
import ImageSpinner from '../components/ImageSpinner';
import ClassicLoader from '../components/Loaders/ClassicLoader';
import { useParams } from 'react-router-dom';

const Search = () => {
    const [products, setProducts] = useState([]);
    const {term}=useParams()
    console.log(term)
    const [loading, setLoading] = useState(false);
    const [justTitle, setJustTitle] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [product_modal ,setPtroduct_modal]=useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [empty ,setEmpty]=useState("")


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
                const response = await axios.get(`http://127.0.0.1:8000/api/search/${term}`);
                console.log("Response Data:", response.data);
                setProducts(response.data);
                setEmpty(response.data.error)
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
    }, [term]);

  
    const imageURL = import.meta.env.VITE_IMAGE_URL;

   
  

    // Automatic slideshow
  

 
    return (
      <>
      {
        loading==true?(
            <>
                      <div className='w-100'  style={{position:"absolute" ,top:0 ,left:0 ,background:"black" ,minHeight:"1000px" ,minWidth:"100%" ,zIndex:2009999999991}}>
                      <div className='w-100 d-flex align-items-center justify-content-center'>
                      <ClassicLoader/>
                      </div>
                    </div>
            </>
        ):(
            <div className="mainBg">
           

            <div className=" pt-[50px]  mb-5 pb-2 flex flex-column justify-center gap-12 md:mt-0 " style={{borderBottom:"2px solid silver"}}>
            <h2 className="text-5xl w-100 font-tech text-center font-sans font-bold text-dark  ">Products</h2>
                
            </div>
            <div className="w-100 container">

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <div className="row">


                    {
                    products.length>0?
                    products.map((product, index) => (
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
                ))
                :
                <>
                <div className='w-full h-[400px] '>
                    <div className='fs-3 font-bold font-sans text-center mt-[50px]'>
                    {empty}
                    </div>
               </div>                
                </>
            }

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

            </div>
        </div>
        )
      }
        
      </>
    );
};

export default Search;
