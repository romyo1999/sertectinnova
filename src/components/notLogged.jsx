// import {Cloud, Clouds} from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
import React , { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
    useMotionTemplate,
    useMotionValue,
    motion,
    animate,
} from "framer-motion";
import {Link} from "react-router-dom";

const COLORS_TOP = ["#590d22","#800f2f","#a4133c","#c9184a","#ff4d6d","#ff758f","#ff8fa3","#ffb3c1","#fff0f3","#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef","#ade8f4","#caf0f8"];

export const Notlog = () => {
    const color = useMotionValue(COLORS_TOP[0]);
    if (window.WebGLRenderingContext) {
        // WebGL is supported
        console.log("WebGL is supported in this browser.");
    } else {
        // WebGL is not supported
        console.error("WebGL is not supported in this browser.");
    }

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    return (
        <motion.section
            style={{
                backgroundImage,
            }}
            className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
        >
            <div className="relative z-10 flex flex-col items-center">

                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight mb-12">
                    Unauthorized Access: This area is restricted for security reasons.<br/> Ensure you are logged in with the correct account or review our access policies!
                </h1>

                <div className="flex justify-center items-center">
                    <motion.button
                        style={{
                            border,
                            boxShadow,
                        }}
                        whileHover={{
                            scale: 1.015,
                        }}
                        whileTap={{
                            scale: 0.985,
                        }}
                        className="text-lg  text-pretty group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 mr-5"
                    >
                        <Link to={'/login'} className="group">Login</Link>
                        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 bg-white rounded-full"/>
                    </motion.button>
                    <motion.button
                        style={{
                            border,
                            boxShadow,
                        }}
                        whileHover={{
                            scale: 1.015,
                        }}
                        whileTap={{
                            scale: 0.985,
                        }}
                        className="text-lg group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                    >
                        <Link  to={'/'}>Home</Link>
                        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12 bg-white rounded-full"/>
                    </motion.button>
                </div>
            </div>

            {/*<div className="absolute inset-0 z-0">*/}
            {/*     <Canvas>*/}
            {/*        <Clouds >*/}
            {/*            <Cloud segments={40} bounds={[10, 2, 2]} volume={5} color="orange" />*/}
            {/*            <Cloud seed={5} scale={2} volume={4}  fade={100} />*/}
            {/*        </Clouds>*/}
            {/*    </Canvas>*/}
            {/*</div>*/}
        </motion.section>
    );
};
