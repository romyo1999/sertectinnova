import { useTranslation } from "react-i18next"
import pic from "../assets/one.jpg"
import pic1 from "../assets/two.jpg"
import pic2 from "../assets/three.jpg"
import pic3 from "../assets/four.jpg"
import val1 from "../assets/ex.jpg"
import val2 from "../assets/integ.jpg"
import val3 from "../assets/idea.jpg"
import val4 from "../assets/last.jpg"
import about from "../assets/abouUS.png"
import mission from "../assets/mission.png"
import { Zaid } from "../components/animiteAboutUs.tsx";
import mis from "../assets/mission1.jpg"
import {Link} from 'react-scroll'

function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <div style={{position: "relative", textAlign: "center"}}>
        <img src={mission} alt={"mission"} className="w-full" loading="lazy"/>
        <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
          <Link to="aboutus">          
           <button
            className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-lg hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 font-bold">
            {t("aboutUs.aboutUsTitle")}
          </button>
          </Link>

        </div>
      </div>
      <section className="py-16 bg-[#ececec]" id="aboutus">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Sertect Innova</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 rounded-md p-6" style={{background: '#ddeedf'}}>
              <Zaid>
                <h1
                  className="text-4xl text-gray-900 font-tech capitalize mb-5 text-center">{t("aboutUs.aboutUsTitle")}</h1>
              </Zaid>
              <Zaid>
                <p
                  className="text-xl text-black p-2 leading-relaxed hover:scale-[1.025] transition duration-300 ease-in-out capitalize font-tech backdrop-blur-2xl">
                  {t("aboutUs.parOne")}
                </p>
              </Zaid>
            </div>
            <div className="md:w-[580px] md:pl-8 ml-12">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={about} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center mt-8">
            <div className="md:w-1/2 md:pr-8">
              <Zaid>
                <div className="md:w-[580px] md:pl-8 mr-12">
                  <div className="overflow-hidden inline-block rounded-xl">
                    <img src={mis} alt="Description of the image"
                         loading="lazy"
                         style={{height:"450px",width:"450px"}}
                         className="rounded-xl hover:scale-110 duration-500 transition-transform ml-12 mb-2"/>
                  </div>
                </div>
              </Zaid>
            </div>
            <div className="md:w-1/2 bg-[#ddeedf] rounded-md p-6">
              <Zaid>
                <h1
                  className="md:text-4xl text-black font-tech capitalize mb-5 text-center">{t("aboutUs.ourMissionTitle")}</h1>
              </Zaid>
              <Zaid>
                <p
                  className="text-xl text-black p-2 leading-relaxed hover:scale-[1.030] transition duration-300 ease-in-out capitalize font-tech">
                  {t("aboutUs.ourMission")}
                </p>
              </Zaid>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 pt-8">{t("aboutUs.choice")}</h2>
        <div className="p-12">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={pic} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.word1")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.text1")}</p>
              </Zaid>
            </div>

            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={pic1} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.word2")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.text2")}</p>
              </Zaid>
            </div>

            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={pic2} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.word3")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.text3")}</p>
              </Zaid>
            </div>

            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={pic3} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.word4")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.text4")}</p>
              </Zaid>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 pt-8">{t("aboutUs.OurValuesTitle")}</h2>
        <div className="p-12">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={val1} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.val1")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.valText1")}</p>
              </Zaid>
            </div>

            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={val2} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.val2")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.valText2")}</p>
              </Zaid>
            </div>

            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={val3} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.val3")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.valText3")}</p>
              </Zaid>
            </div>

            <div className="bg-[#ddeedf] p-4 rounded-xl">
              <Zaid>
                <div className="overflow-hidden inline-block rounded-xl">
                  <img src={val4} alt="Description of the image"
                       loading="lazy"
                       className="rounded-x hover:scale-110 duration-500 transition-transform l"/>
                </div>
              </Zaid>
              <Zaid>
                <h1 className="md:text-3xl text-xl font-bold text-gray-800 mb-4">{t("aboutUs.val4")}</h1>
              </Zaid>
              <Zaid>
                <p className="text-lg text-gray-600">{t("aboutUs.valText4")}</p>
              </Zaid>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs;
