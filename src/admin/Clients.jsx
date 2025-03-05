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

const fakeReviews=[
  {
    "stars": 5,
    "comment": "Working with Setrect Innova has been an exceptional experience. Their team's expertise in IT solutions is unmatched, and they consistently deliver high-quality results."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova truly understands our business needs and goes above and beyond to provide innovative IT solutions tailored to our requirements. Their dedication to client satisfaction is evident in every project they undertake."
  },
  {
    "stars": 4,
    "comment": "We've been collaborating with Setrect Innova for several years now, and they continue to impress us with their professionalism and technical proficiency. Their proactive approach to problem-solving has been instrumental in the success of our projects."
  },
  {
    "stars": 5,
    "comment": "Choosing Setrect Innova as our IT partner was one of the best decisions we made. Their team is reliable, responsive, and always willing to go the extra mile to ensure our projects are completed on time and within budget."
  },
  {
    "stars": 4,
    "comment": "Setrect Innova's commitment to excellence sets them apart from other IT companies. They consistently exceed our expectations with their innovative solutions and personalized approach to client service."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova has been instrumental in streamlining our IT infrastructure. Their team's attention to detail and commitment to delivering seamless solutions have significantly improved our operational efficiency."
  },
  {
    "stars": 5,
    "comment": "We've been impressed by Setrect Innova's ability to adapt to our changing needs and provide innovative IT solutions that drive our business forward. Their proactive approach and technical expertise make them a valuable partner."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova's team of experts has been a pleasure to work with. They communicate effectively, understand our requirements thoroughly, and consistently deliver top-notch results."
  },
  {
    "stars": 5,
    "comment": "Working with Setrect Innova has been a game-changer for our organization. Their solutions are cutting-edge, and their support is unparalleled. We highly recommend them to anyone looking for IT services."
  },
  {
    "stars": 4,
    "comment": "Setrect Innova's dedication to excellence is evident in every aspect of their work. From project planning to execution, they demonstrate professionalism and expertise that inspire confidence."
  },
  {
    "stars": 5,
    "comment": "We've partnered with Setrect Innova on multiple projects, and they continue to impress us with their innovative approach and technical prowess. Their solutions have helped us stay ahead in a competitive market."
  },
  {
    "stars": 4,
    "comment": "Setrect Innova is more than just an IT vendor; they are a trusted partner invested in our success. Their collaborative approach and proactive problem-solving have made a significant impact on our business."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova's commitment to delivering results is unmatched. They consistently meet deadlines, exceed expectations, and provide exceptional customer service every step of the way."
  },
  {
    "stars": 5,
    "comment": "We've received nothing but positive feedback from our team since implementing Setrect Innova's solutions. Their user-friendly interfaces and reliable performance have greatly improved our workflow."
  },
  {
    "stars": 4,
    "comment": "Setrect Innova's proactive support and quick response times have been invaluable to our organization. They are always available to address our concerns and provide timely solutions."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova's team is comprised of true professionals who are passionate about what they do. Their expertise and attention to detail have made them a trusted partner in our IT initiatives."
  },
  {
    "stars": 5,
    "comment": "Choosing Setrect Innova was one of the best decisions we made for our company. Their comprehensive IT solutions have helped us stay ahead of the curve and achieve our business goals."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova's commitment to innovation and excellence is unmatched. Their forward-thinking approach has enabled us to stay competitive in a rapidly evolving market."
  },
  {
    "stars": 5,
    "comment": "We've been consistently impressed by Setrect Innova's ability to deliver high-quality solutions on time and within budget. Their transparent communication and reliability make them a pleasure to work with."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova has been an invaluable partner in our digital transformation journey. Their expertise and guidance have been instrumental in modernizing our IT infrastructure."
  },
  {
    "stars": 5,
    "comment": "We've seen a significant improvement in our efficiency and productivity since partnering with Setrect Innova. Their solutions are user-friendly and seamlessly integrate with our existing systems."
  },
  {
    "stars": 5,
    "comment": "Setrect Innova's team is comprised of skilled professionals who are dedicated to delivering results. Their proactive approach and attention to detail have made them a trusted advisor in our IT strategy."
  },
  {
    "stars": 4,
    "comment": "Service excellent et communication exceptionnelle tout au long du projet. Très satisfait des résultats."
  },
  {
    "stars": 5,
    "comment": "Expertise remarquable et professionnalisme exceptionnel. Ils ont fait le maximum pour répondre à nos exigences."
  },
  {
    "stars": 3,
    "comment": "Expérience globalement bonne, mais il y a eu quelques retards dans la livraison. La qualité du travail était satisfaisante."
  },
  {
    "stars": 4,
    "comment": "Attention impressionnante aux détails et résolution efficace des problèmes. Je recommande vivement."
  },
  {
    "stars": 5,
    "comment": "Équipe fantastique avec des compétences exceptionnelles. Ils ont livré exactement ce dont nous avions besoin dans les délais et le budget impartis."
  },
  {
    "stars": 4,
    "comment": "Très réactif et arrangeant. Le processus s'est déroulé sans accroc."
  },
  {
    "stars": 3,
    "comment": "Service correct dans l'ensemble, mais la communication aurait pu être meilleure. La qualité du travail était satisfaisante."
  },
  {
    "stars": 5,
    "comment": "Absolument ravi du résultat. Équipe hautement qualifiée et grande attention aux détails."
  },
  {
    "stars": 4,
    "comment": "Expérience globalement positive. Service efficace et professionnel. Envisagerait de travailler à nouveau avec eux."
  },
  {
    "stars": 4,
    "comment": "Impressionné par leur expertise technique et leur dévouement. Ils ont apporté des contributions précieuses à notre projet."
  },
  {
    "stars": 3,
    "comment": "Service moyen. Quelques problèmes sont survenus pendant le projet, mais ils ont finalement été résolus."
  },
  {
    "stars": 5,
    "comment": "Dépassé les attentes à tous égards. Recommande vivement leurs services pour tout projet informatique."
  },
  {
    "stars": 4,
    "comment": "Équipe professionnelle et compétente. Ont fourni des insights précieux et ont livré comme promis."
  },
  {
    "stars": 3,
    "comment": "Expérience mitigée. Certains aspects du service étaient excellents, tandis que d'autres ont été en deçà des attentes."
  },
  {
    "stars": 4,
    "comment": "Satisfait dans l'ensemble du service. Bonne communication et livraison en temps voulu des résultats."
  },
  {
    "stars": 5,
    "comment": "Service exceptionnel du début à la fin. Leur expertise et leur engagement envers la qualité sont louables."
  },
  {
    "stars": 4,
    "comment": "Équipe efficace et fiable. Ont géré notre projet avec professionnalisme et ont livré d'excellents résultats."
  },
  {
    "stars": 3,
    "comment": "Service satisfaisant, mais quelques problèmes rencontrés en cours de route. Pourrait s'améliorer dans certains domaines."
  },
  {
    "stars": 5,
    "comment": "Très impressionné par leur éthique de travail et leur attention aux détails. Travaillerai certainement avec eux à nouveau."
  },
  {
    "stars": 4,
    "comment": "Expérience globalement excellente. Équipe compétente et communication fluide tout au long du projet."
  },
  {
    "stars": 4,
    "comment": "خدمة عملاء ممتازة واستجابة استثنائية. كان العمل المنجز يتماشى تمامًا مع توقعاتنا."
  },
  {
    "stars": 5,
    "comment": "فريق متمكن ومحترف. تمت إدارة المشروع بكفاءة ونحن راضون تمامًا عن النتائج."
  },
  {
    "stars": 3,
    "comment": "تجربة جيدة بشكل عام، لكن كانت هناك بعض التأخيرات في التسليم. كانت جودة العمل مقبولة."
  },
  {
    "stars": 4,
    "comment": "انتباه مذهل للتفاصيل وحلول فعّالة للمشاكل. أنصح بشدة."
  },
  {
    "stars": 5,
    "comment": "فريق رائع بمهارات استثنائية. تم تقديم بالضبط ما نحتاجه في الوقت المناسب وداخل الميزانية المحددة."
  },
  {
    "stars": 4,
    "comment": "مستجيبون للغاية ومتعاونون. جعلوا العملية سلسة وخالية من المتاعب."
  },
  {
    "stars": 3,
    "comment": "خدمة مقبولة بشكل عام، لكن يمكن تحسين التو"
  },
  {
    "stars": 4,
    "comment": "Très bon service client et réactivité exemplaire. Le travail réalisé correspondait parfaitement à nos attentes."
  },
  {
    "stars": 5,
    "comment": "Une équipe compétente et professionnelle. Le projet a été mené avec efficacité et nous sommes pleinement satisfaits des résultats."
  },
  {
    "stars": 3,
    "comment": "Expérience globalement bonne, mais il y a eu quelques retards dans la livraison. La qualité du travail était satisfaisante."
  },
  {
    "stars": 4,
    "comment": "Attention impressionnante aux détails et résolution efficace des problèmes. Je recommande vivement."
  },
  {
    "stars": 5,
    "comment": "Équipe fantastique avec des compétences exceptionnelles. Ils ont livré exactement ce dont nous avions besoin dans les délais et le budget impartis."
  },
  {
    "stars": 4,
    "comment": "Très réactif et arrangeant. Le processus s'est déroulé sans accroc."
  },
  {
    "stars": 3,
    "comment": "Service correct dans l'ensemble, mais la communication aurait pu être meilleure. La qualité du travail était satisfaisante."
  },
  {
    "stars": 5,
    "comment": "Absolument ravi du résultat. Équipe hautement qualifiée et grande attention aux détails."
  },
  {
    "stars": 4,
    "comment": "Expérience globalement positive. Service efficace et professionnel. Envisagerait de travailler à nouveau avec eux."
  },
  {
    "stars": 4,
    "comment": "Impressionné par leur expertise technique et leur dévouement. Ils ont apporté des contributions précieuses à notre projet."
  },
  {
    "stars": 3,
    "comment": "Service moyen. Quelques problèmes sont survenus pendant le projet, mais ils ont finalement été résolus."
  },
  {
    "stars": 5,
    "comment": "Dépassé les attentes à tous égards. Recommande vivement leurs services pour tout projet informatique."
  },
  {
    "stars": 4,
    "comment": "Équipe professionnelle et compétente. Ont fourni des insights précieux et ont livré comme promis."
  }
]


const Clients = () => {
  const domin=import.meta.env.VITE_DOMIN_URL
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [type, setType] = useState('');

  const [clients, setclients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [again, setAgain] = useState([]);
  const [loadingAdd ,setLoadingAdd]=useState(false)
  const [loadingEdit ,setLoadingEdit]=useState(false)
  const [loadingReplace ,setLoadingReplace]=useState(false)
  const [reload ,setReload]=useState(0)
  const [allclients,setAllclients]=useState([])

  const {data,count ,setCount}=useUserContext()
  useEffect(()=>{
    setCount(count+1)
    },[])
  

  const [randomIndex, setRandomIndex] = useState(null);
  useEffect(()=>{
    if(type=="default"){
      setStars(fakeReviews[getRandomReview()].stars);
      setComment(fakeReviews[getRandomReview()].comment)

    }else if (type=="client") {
      setStars(5);
      setComment("client")
    } else {
      setStars("")
      setComment("")
    }
  },[type])



  useEffect(()=>{
    const fetchall=async()=>{
      const response=await axiosClient2.get('/api/clients/all');
      setAllclients(response.data)
      console.log(response.data)
    }
    fetchall()
  },[])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  

    const formData = new FormData();
    formData.append('name', name);
    formData.append('stars', stars);
    formData.append('comment', comment);
    formData.append('image', image);
    console.log(stars ,comment)
    try {
      setLoadingAdd(true)
      const response = await axios.post('http://127.0.0.1:8000/api/clients/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('client uploaded successfully!');
      setLoadingAdd(false)
      setReload(reload+1)
      setName('')
      setStars('')
      setComment('')

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      if (error.response) {
        toast.error(error.response.data.error);
        console.log(error.data)
      setLoadingAdd(false)
      } else {
        toast.error('An error occurred while uploading the client.');
      setLoadingAdd(false)
      }
    }
  };

  const imageURL = import.meta.env.VITE_IMAGE_URL;
  const [raph, setRaph] = useState(false);

  useEffect(() => {
    const fetchclients = async () => {
      try {
        setRaph(true)
        const response = await axios.get(`http://127.0.0.1:8000/api/clients?page=${currentPage}`);
        setclients(response.data.data);
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

    fetchclients();
  }, [currentPage ,reload]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const Deleteclient = async (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this client?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://127.0.0.1:8000/api/clients/${id}`);
              setclients(clients.filter(client => client.id !== id)); // Filter out the deleted client
              toast.success("client deleted successfully!");
            } catch (error) {
              if (error.response) {
                toast.error(error.response.data.error);
              } else {
                toast.error('An error occurred while deleting the client.');
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
    setclients(again);
  };

  const handleSearch = () => {
    const query = searchValue;
    console.log(allclients)
    const filteredResults = allclients.filter(item =>{
        if( item.name.toLowerCase().includes(query.toLowerCase()) )
            {
                console.log(item)
                return true
            }
    }
     
    );
    setclients(filteredResults);
  };

  const [editingClient, setEditingClient] = useState(null);
  const [UpdateName, setUpdateName] = useState('');
  const [UpdateStars, setUpdateStars] = useState('');
  const [UpdateComment, setUpdateComment] = useState('');


  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', UpdateName);
    formData.append('stars', UpdateStars);
    formData.append('comment', UpdateComment);


    try {
      setLoadingEdit(true)
      const response = await axios.put(`http://localhost:8000/api/clients/${editingClient.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },

      });
      console.log(response.data);
      setReload(reload+2)
      setLoadingEdit(false)
      setEditingClient(false)
      toast.success("Updating successfuly")
    } catch (error) {
      toast.error('Error updating client:');
      setLoadingEdit(false)
    }
  };

  const openEditModal = (client) => {
    setEditingClient(client);
    setUpdateName(client.name);
    setUpdateStars(client.stars);
    setUpdateComment(client.comment);

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

  const handleOpenModal = (clientId) => {
    setSelectedImage(null); // Reset selected image
    setIsModalOpen(true);
    setclientId(clientId); // Set the clientId in state
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
  const [clientId, setclientId] = useState('');

  const handleUploadImage = async (clientId) => {
    try {
      if (!selectedImage) {
        console.error("No image selected.");
        return;
      }      
      setLoadingReplace(true)
      const formData = new FormData();
      formData.append("image", help);

      const response = await axios.post(`http://127.0.0.1:8000/api/clients/image/${clientId}`, formData, {
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



  const getRandomReview = () => {
    return Math.floor(Math.random() * fakeReviews.length);
  };


  const CopyLinkButton = ( url ) => {
      navigator.clipboard.writeText(url);
  }

  return (
    <div style={{minWidth:"1700px"}} className=' h-100'>
            <ToastContainer/>
      <div className="flex flex-row space-x-8 h-screen p-1 w-100">
        <div className="flex-grow p-2  border rounded-lg shadow-lg overflow-x-auto ml-28 mb-8">
          <h2 className="text-xl font-bold mb-4">clients</h2>
          {
            raph ? (<div className="flex justify-center items-center mt-[200px]">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>) : (
              <table className="w-full border border-black border-collapse">
                <thead className="">
                <tr>
                  <th className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">Name
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">stars
                  </th>
                  <th
                    className="text-xl text-black font-tech capitalize  py-2 text-center border border-black">Comment
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
                {clients.map(client => (
                  <tr key={client.id} className="  border border-black max-h-[200px]">
                    <td className="text-xl text-blac kborder border-black max-w-[270px] max-h-[270px]  font-tech capitalize px-4 text-center">{client.name}</td>
                    <td
                      className="text-sm text-black font-tech capitalize max-w-[270px] max-h-[270px] k border border-black  " style={{border:"2px solid black"}}>
                        <div className='w-100 text-xl text-black font-tech capitalize   overflow-x-auto  px-4 text-center '>
                          {
                            client.comment=="client"?(
                                <span  className=''>
                                  {/* copy link  */}
                                  <div className="centralize">
                                  <div>
                                    <button className='button-copy' onClick={()=>CopyLinkButton(`${domin}/client-review/${client.id*2024}/${client.name.replace(/ /g,"+")}`)} >
                                      <span><svg className='d-inline ' viewBox="0 0 467 512.22" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" text-rendering="geometricPrecision" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" fill="#0E418F" height="12" width="12"><path d="M131.07 372.11c.37 1 .57 2.08.57 3.2 0 1.13-.2 2.21-.57 3.21v75.91c0 10.74 4.41 20.53 11.5 27.62s16.87 11.49 27.62 11.49h239.02c10.75 0 20.53-4.4 27.62-11.49s11.49-16.88 11.49-27.62V152.42c0-10.55-4.21-20.15-11.02-27.18l-.47-.43c-7.09-7.09-16.87-11.5-27.62-11.5H170.19c-10.75 0-20.53 4.41-27.62 11.5s-11.5 16.87-11.5 27.61v219.69zm-18.67 12.54H57.23c-15.82 0-30.1-6.58-40.45-17.11C6.41 356.97 0 342.4 0 326.52V57.79c0-15.86 6.5-30.3 16.97-40.78l.04-.04C27.51 6.49 41.94 0 57.79 0h243.63c15.87 0 30.3 6.51 40.77 16.98l.03.03c10.48 10.48 16.99 24.93 16.99 40.78v36.85h50c15.9 0 30.36 6.5 40.82 16.96l.54.58c10.15 10.44 16.43 24.66 16.43 40.24v302.01c0 15.9-6.5 30.36-16.96 40.82-10.47 10.47-24.93 16.97-40.83 16.97H170.19c-15.9 0-30.35-6.5-40.82-16.97-10.47-10.46-16.97-24.92-16.97-40.82v-69.78zM340.54 94.64V57.79c0-10.74-4.41-20.53-11.5-27.63-7.09-7.08-16.86-11.48-27.62-11.48H57.79c-10.78 0-20.56 4.38-27.62 11.45l-.04.04c-7.06 7.06-11.45 16.84-11.45 27.62v268.73c0 10.86 4.34 20.79 11.38 27.97 6.95 7.07 16.54 11.49 27.17 11.49h55.17V152.42c0-15.9 6.5-30.35 16.97-40.82 10.47-10.47 24.92-16.96 40.82-16.96h170.35z" fill-rule="nonzero"></path></svg> Copy </span>
                                      <span>Copied</span>
                                    </button>
                                  <div>
                                  <div className="description-copy">
                                    <p>Share Link with client</p>
                                  <div>
                                      <div></div></div></div></div></div></div>
                                  {/* copy link  */}
                                </span>
                            ):(
                            <>{client.stars}</>
                            )
                          }
                        </div>
                       </td>
                    <td
                      className=" max-w-[270px] max-h-[270px] text-sm text-black font-tech capitalize border border-black  text-center max-w-[200px]  overflow-hidden object-cover">
                      <div className='d-inline-block   border-none  max-h-[130px]  overflow-x-auto  p-6 h-full w-full'>
                      {
                            client.comment=="client"?(
                                <span className='alert alert-warning'>No Comment Available</span>
                            ):(
                            <>{client.comment}</>
                            )
                          }
                        </div>
                    </td>
                    <td className='max-w-[270px] max-h-[270px] border border-black P-0  admin-table  min-w-[200px]' >
                      <ImageSpinner  spinner="ms-2" className='mx-auto ' src={imageURL + client.image} width={200} height={100} alt={'pic'}/>
                    </td>
                    <td
                      className="max-w-[270px] max-h-[270px] text-xl text-black font-tech capitalize min-w-[200px] px-4 py-2 text-center flex justify-evenly items-center justify-items-center mt-5">
                      <div className={`grid md:grid-cols-3 gap-3 p-1`}>
                        <motion.button onClick={() => Deleteclient(client.id)} whileHover={{scale: 1.115}}>
                          <AnimatedTooltip items={action2}/>
                        </motion.button>
                        <motion.button onClick={() => openEditModal(client)} whileHover={{scale: 1.15}}>
                          <AnimatedTooltip items={action1}/>
                        </motion.button>
                        <div>
                          <motion.button
                            whileHover={{scale: 1.15}}
                            id="updateImage"
                            onClick={() => handleOpenModal(client.id)}
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
                                    onClick={() => handleUploadImage(clientId)}
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
              <h2 className="text-xl font-bold mb-4">Upload client</h2>
              <form onSubmit={handleFormSubmit}>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-900 text-xl font-serif">Company name</label>
                  <input
                    type="text"
                    id="name"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={name}
                    required
                    onChange={e => setName(e.target.value)}
                  />
                  
                </div>

                  {/* type reviews  */}
                  <div className=' max-w-[500px] '> 
                    <h2 className='text-center text-gray-900 text-xl font-serif'>Reviews Options</h2>
                  </div>
                  <div
                  className=" mb-4 max-w-[500px]  flex align-center justify-center p-4 space-x-2 border-[3px] border-gray-400 rounded-xl select-none"
                  >
                    <label
                      className=" flex-1  items-center justify-center"
                    >
                      <input
                        type="radio"
                        name="radio"
                        value="manually"
                        className="peer hidden"
                        onChange={e=>setType(e.target.value)}
                      />
                      <span
                        className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
                        >Manually</span
                      >
                    </label>
                  
                    <label
                      className=" flex-1  items-center justify-center"
                    >
                      <input
                       type="radio"
                        name="radio"
                         value="client" 
                         className="peer hidden" 
                         onChange={e=>setType(e.target.value)}
                         />
                      <span
                        className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
                        >By Client</span
                      >
                    </label>
                  
                    <label
                      className=" flex-1  items-center justify-center"
                    >
                      <input 
                      type="radio" 
                      name="radio"
                       value="default" 
                       className="peer hidden"
                       onChange={e=>setType(e.target.value)}
                       />
                      <span
                        className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
                        >By Default</span
                      >
                    </label>
                  </div>

  {/* type reviews  */}
                {
                  type==="manually"?(
                    <>
                      <div className="mb-4">
                  <label htmlFor="stars" className="block text-gray-900 text-xl font-serif">Stars</label>
                  <select 
                    name="stars"
                    id="stars"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    required
                    onChange={e => setStars(e.target.value)}
                    value={stars}
                  >
                    <option value={" "}> Select Number</option>
                    <option value={1}> 1 Star</option>
                    <option value={2}> 2 Stars</option>
                    <option value={3}> 3 Stars</option>
                    <option value={4}> 4 Stars</option>
                    <option value={5}> 5 Stars</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-900 text-xl font-serif">Comment</label>
                  <textarea
                    id="comment"
                    required
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    rows="3"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  ></textarea>
                </div>
                    </>
                  ):(
                    ""
                  )
                }
 
              

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
      {editingClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Update client</h2>
            <form onSubmit={handleUpdateFormSubmit}>
           {/* inputs updates  */}

           <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-900 text-xl font-serif">Company name</label>
                  <input
                    type="text"
                    id="name"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    value={UpdateName}
                    required
                    onChange={e => setUpdateName(e.target.value)}
                  />
                  
                </div>

 
                <div className="mb-4">
                  <label htmlFor="stars" className="block text-gray-900 text-xl font-serif">Stars</label>
                  <select 
                    name="stars"
                    id="stars"
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    required
                    onChange={e => setUpdateStars(e.target.value)}
                    value={UpdateStars}
                  >
                    <option value={1}> 1 Star</option>
                    <option value={2}> 2 Stars</option>
                    <option value={3}> 3 Stars</option>
                    <option value={4}> 4 Stars</option>
                    <option value={5}> 5 Stars</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-900 text-xl font-serif">Comment</label>
                  <textarea
                    id="comment"
                    required
                    className="bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-md shadow-lg py-2 px-4 block w-full transition duration-500 ease-in-out border border-gray-300 placeholder-gray-500 text-gray-900"
                    rows="3"
                    value={UpdateComment}
                    onChange={e => setUpdateComment(e.target.value)}
                  ></textarea>
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
    </div>
  );
};

export default Clients;
