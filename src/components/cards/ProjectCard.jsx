import React from 'react'
import "./ProjectCard.css"
import ImageSpinner from '../ImageSpinner'
const ProjectCard = ({data}) => {
  const imageURL = import.meta.env.VITE_IMAGE_URL;

  return (
<div class="card-projects">
  <h1 className='text-start font-bold fs-2 ms-2  mt-3 text-slate-700 ps-2 pt-2 pe-2	'>{data.title}</h1>
  <h1 className=' font-bold fs-4 mt-3  ms-2 me-2 justify-center text-sky-900 ps-2 pe-2 pt-2	 overflow-x-auto  border-solid border-2 border-slate-400 rounded-lg  ' style={{minHeight:"140px"}}>{data.description}</h1>
  <div class="image-projects rounded rounded-4 w-full h-full " >
   <ImageSpinner  src={imageURL+data.image}  width={244} height={200} alt={data.image} />
  </div>
  <div class="text">
  {/* Details */}
  <div class="p-4 w-[300px] rounded-lg">
  <h1 class="text-2xl text-slate-700 font-bold">Details</h1>
  <div class="grid gap-4 mt-2 p-1 " style={{borderLeft:'4px solid #af40ff'}}>
    <div class="flex gap-2 items-center">
      <div class="  p-2 rounded bg-violet-800  rounded-full items-center text-indigo-100 leading-none font-bold" style={{minWidth:"80px"}}>CLient</div>
      <div class="grid gap-1 text-sm flex-1">
        <h2 class="font-semibold leading-none line-clamp-2  text-base">
          {data.client}
        </h2>

      </div>
    </div>
    <div class="flex gap-2 items-center">
      <div  class="  p-2 rounded bg-indigo-800  rounded-full items-center text-indigo-100 leading-none font-bold" style={{minWidth:"80px"}}>Type</div>
      <div class="grid gap-1 text-sm flex-1">
        <h2 class="font-semibold leading-none line-clamp-2 text-base">
        {data.type}
        </h2>

      </div>
    </div>
    <div class="flex gap-2 items-center">
      <div class=" p-2 rounded bg-blue-900 rounded-full items-center text-indigo-100 leading-none font-bold" style={{minWidth:"80px"}}>Budget</div>
      <div class="grid gap-1 text-sm flex-1">
        <h2 class="font-semibold leading-none line-clamp-2 text-base">
        {data.budget}
        </h2>
      </div>
    </div>

    <div class="flex gap-2 items-center">
      <div class=" p-2 rounded bg-sky-900 rounded-full items-center text-indigo-100 leading-none font-bold" style={{minWidth:"80px"}}>Duration</div>
      <div class="grid gap-1 text-sm flex-1">
        <h2 class="font-semibold leading-none line-clamp-2 text-base">
        {data.duration}
        </h2>
      </div>
    </div>
  </div>
</div>
  {/* Details */}
  </div>
</div>
  )
}

export default ProjectCard
