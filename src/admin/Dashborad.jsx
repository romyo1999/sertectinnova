import React, { useEffect } from 'react'
import ApexChart from '../components/ReactApexChart '
import UserChart from '../components/UserChart'
import ServicesChart from '../components/ServicesChart'
import { useUserContext } from '../providers/UserProvider'

function Dashborad() {
    const {data,count ,setCount}=useUserContext()
    useEffect(()=>{
        setCount(count+1)
        },[])
      
    return (
        <main className="w-full h-screen flex flex-row relative">
            <section className="flex flex-col p-10 ml-20 w-full gap-5">
                <h1 className="text-4xl  relative text-neutral-200 ">Dashboard</h1>
                <div className="w-full h-90 pb-4 border border-neutral-500/50 relative  bg-white rounded"> <ApexChart/></div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="border-neutral-500/50 h-60 w-1/2 bg-white rounded border flex items-center justify-start">
                       <h2 className='fs-3 font-sans font-bold ms-2' >Reviews State
                       <div className='fs-5 text-secondary font-sans'>Users feedback about<br/> setrect innova</div>
                       </h2>
                        <UserChart/>
                        </div>
                    <div className="border-neutral-500/50 h-60 w-1/2 bg-white rounded border flex items-center justify-start">
                    <h2 className='fs-3 font-sans font-bold ms-2' >Services State
                        <div className='fs-5 text-secondary font-sans'>the most services ordering</div>
                    </h2>
                        <ServicesChart/>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashborad
