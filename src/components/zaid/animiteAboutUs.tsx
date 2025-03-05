import {useEffect,useRef} from "react";
import {motion,useInView,useAnimation} from "framer-motion";

interface Props{
  children:JSX.Element,
  width?:'fit-content' | '100%'
}

export  const Zaid =({children,width='fit-content'}:Props)=>{

    const ref=useRef(null);
    const isView=useInView(ref,{once:true});
    const mainControls=useAnimation()
    const slideControls=useAnimation()

    useEffect(() => {
        if (isView){
            mainControls.start('visble')
            slideControls.start('visble')
        }
    }, [isView]);
  return(
      <div
          ref={ref}
          style={{position: "relative", width, overflow: "hidden"}}>
          <motion.div
              variants={{
                  hidden: {opacity: 0, y: 75},
                  visble: {opacity: 1, y: 0},
              }}
              initial='hidden'
              animate={mainControls}
              transition={{
                  duration: 1,
                  delay: 0.8,
                  ease: "easeInOut"
              }}
          >
              {children}
          </motion.div>


          <motion.div
              variants={{
                  hidden: {left:0},
                  visble: {left:"100%"},
              }}
              initial='hidden'
              animate={slideControls}
              transition={{
                  duration: 0.5,
                  delay: 0.25,
                  ease: "easeInOut"
              }}
              style={{
                  position:"absolute",
                  top:4,
                  bottom:4,
                  left:0,
                  right:0,
                  zIndex:20,
                  background:"#b6cdbd",
                  padding:"10px",
                  borderRadius:"10px"

              }}
          />
      </div>
  )
}
