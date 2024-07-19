import Intro from "../../../lib/util/Intro";
import { CarouselDemo } from "@/lib/util/Carousel";
import TestimonialImg from "./TestimonialImg";

export default function Testimonial() {
  return (
    <div className=" max-w-[1140px] md:mx-auto text-center" id="testimonial">
      <Intro contentIntro="What Our Customers Say" />

      <div className=" ">
        <h1 className=" text-[2rem]">Testimonial</h1>
        <div className=" ">
          <TestimonialImg />
        </div>
        <div className=" ">
          <CarouselDemo />
        </div>
      </div>
    </div>
  );
}
