import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import React ,  { useState, useEffect } from "react"
import NavigationLink from "./NavigationLink"
import {
  ChartBarIcon,
  ChartPieIcon,
  ArchiveBoxArrowDownIcon,
  Square2StackIcon,
  UsersIcon,
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  ChartBarSquareIcon,
  CloudIcon,
  ServerIcon,
  InboxIcon,
  InboxStackIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShoppingCartIcon,
  HomeIcon,
} from "@heroicons/react/24/outline"
import ProjectLink from "./ProjectLink"
import ProjectNavigation from "./ProjectNavigation"
import { axiosClient2 } from "../../api/axios"
import { useUserContext } from "../../providers/UserProvider"

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
}

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
}

const Navigation = ({name}) => {
  const {data} = useUserContext()


  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const containerControls = useAnimationControls()
  const svgControls = useAnimationControls()

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open")
      svgControls.start("open")
    } else {
      containerControls.start("close")
      svgControls.start("close")
    }
  }, [isOpen])

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
    setSelectedProject(null)
  }




  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-neutral-900 flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-screen shadow shadow-neutral-600"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
          <button
            className=" p-2 w-10 h-10  bg-primary pt-2 d-flex items-center  rounded-full flex"
            onClick={() => handleOpenClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-neutral-200"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <NavigationLink to="/admin/dashboard" name="Dashboard">
            <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink  to="/admin/projects" name="Projects">
            <Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>
          <NavigationLink name="Products" to="/admin/products">
            <ServerIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />

          </NavigationLink>


          <NavigationLink to="/admin/messages" name="Messages" >
              <div>
              {
                data.length>0?
                  data[1].count>0?(
                    <div className="w-6 h-6 rounded-full  bg-danger text-white fonrt-bold  flex items-center ms-2 font-sans justify-center">{data[1].count}</div>
                  ):(
                    <></>
                  )
                :
                  ""
                }
            <ChatBubbleOvalLeftEllipsisIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </div>
          </NavigationLink>

          <NavigationLink to="/admin/orders" name="Orders" >
              <div>

              {
                data.length>0?
                  data[0].count>0?(
                    <div className="w-6 h-6 rounded-full  bg-danger text-white fonrt-bold  flex items-center ms-2 font-sans justify-center">{data[0].count}</div>
                  ):(
                    <></>
                  )
                :
                  ""
                }
            <ShoppingCartIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
              </div>
          </NavigationLink>


          <NavigationLink name="Back Home" to='/'>
            <HomeIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </NavigationLink>


        </div>
        <div className="flex flex-col gap-3 text-white">
          <ProjectLink
            name={name}
            setSelectedProject={setSelectedProject}
          >
            <div className="min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
          </ProjectLink>
        </div>



      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          />
        )}

      </AnimatePresence>

    </>
  )
}

export default Navigation
