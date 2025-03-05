import Footer from "../components/zaid/footer"
import Navbar from "./TheNavbar"

const UserLayout = ({ children }) => {
  return (
    <div className=''>
        <Navbar/>
        {children}

        <Footer/>
    </div>
  )
}

export default UserLayout