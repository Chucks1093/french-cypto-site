import Hero from "../Hero/Hero";
import Navbar from "../NavBar/Navbar";
import WhyChoose from "../Why-choose/WhyChoose";
import HowItWorks from "../HowItWorks/HowItWorks";
import Testimonial from "../Testimonial/Testimonial";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div className=" bg-[#020407] flex flex-col text-white h-full">
      <Navbar />
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <Testimonial />
      <Footer/>
    </div>
  );
}
