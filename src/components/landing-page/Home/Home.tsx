import Hero from "../Hero/Hero";
import Navbar from "../NavBar/Navbar";
import WhyChoose from "../Why-choose/WhyChoose";
import HowItWorks from "../HowItWorks/HowItWorks";
import Testimonial from "../Testimonial/Testimonial";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        { pageLanguage: 'french' },
        'google_translate_element'
      );
    }
    googleTranslateElementInit()
    const languageSelect = document.querySelector(".goog-te-combo");
    console.log(languageSelect)
  }, [])
  return (
    <div className=" bg-[#020407] flex flex-col text-white h-full">
      {/* <div className="google_translate_element" id="google_translate_element"></div> */}
      <Navbar />
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <Testimonial />
      <Footer />
    </div>
  );
}
