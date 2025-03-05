import React, { useState } from 'react'
import ClassicSpinner from './Loaders/ClassicSpinner'

const ImageSpinner = ({width ,height , className ,style,alt ,src ,loading,circel ,spinner}) => {
    const [loaded ,setLoaded]=useState(true)
  return (
    <div >
        {
            loaded&&(
                <div className={`${spinner} d-inline-block ${circel?"rounded-full":""}  bg-slate-400 animate-pulse ${className}   ` } style={{minHeight:height ,minWidth:width}}> 
                    <div className=' d-flex  align-items-center justify-content-center' style={{minHeight:height}}>
                   <ClassicSpinner/>
                    </div>  
                </div>
            )
        }
    <img className={`${className}  ${loaded?"hidden":"block"} `}  loading={loading} src={src} width={width} height={height} onLoad={()=>setLoaded(false)} style={style} alt={alt} />
    </div>
  )

}

export default ImageSpinner
