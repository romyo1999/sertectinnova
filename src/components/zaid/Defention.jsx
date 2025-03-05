"use client";

import {Cloud, Clouds} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { TypewriterEffectSmooth } from "../compants/ui/typewriter-effect.tsx";

import {
    useMotionTemplate,
    useMotionValue,
    motion,
    animate,
} from "framer-motion";
import * as THREE from "three";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";


const COLORS_TOP = ["#03071e", "#370617", "#6a040f", "#9d0208", "#d00000", "#dc2f02", "#e85d04" ,"#f48c06", "#faa307", "#ffba08","#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

const Defention = () => {
    const color = useMotionValue(COLORS_TOP[0]);
    const { t } = useTranslation();


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
    const words = [
        {
            text: "SERTECT",
            className: "max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
        },
        {
            text: "INNOV",
            className: "max-w-3xl bg-gradient-to-br from-blue-900 to-blue-300 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
        },
    ];
    const desc = t("companyInformation.desc");
    function Spl(words){
        const res=words.split(' ')
        return res;
    }
    return (
        <div>
            <motion.section
                style={{
                    backgroundImage,
                }}
                className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200 "
            >

                <div className="relative z-9 flex flex-col items-center">
                    <h1 id='one'>
                        <TypewriterEffectSmooth words={words}/>
                    </h1>
                    <p>

                    </p>
                    <Link to='/services'>
                        <motion.button
                            id='one'
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
                            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                        >
                            Let's explore

                            <FiArrowRight
                                className="transition-transform group-hover:-rotate-45 group-active:-rotate-12"/>
                        </motion.button>
                    </Link>
                </div>
                <div className="absolute inset-0 z-0">
                    <Canvas>
                        {/*<Stars radius={50} count={2500} factor={4} fade speed={2} />*/}
                        <Clouds material={THREE.MeshBasicMaterial}>
                            <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color={COLORS_TOP}/>
                            <Cloud seed={8} scale={0.5} volume={3} color={COLORS_TOP} fade={100}/>
                        </Clouds>
                    </Canvas>
                </div>
            </motion.section>
        </div>
    );
};
export default Defention;
