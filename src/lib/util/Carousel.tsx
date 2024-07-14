import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselData } from "./CarouselData";

export function CarouselDemo() {
  return (
    <Carousel className="w-1/2 mx-auto ">
      <CarouselContent className=" mt-4">
        {carouselData.map((post) => (
          <CarouselItem key={post.id} className="">
            <div className="">
              <p className="">{post.Content}</p>
              <div className="">
                <h3 className=" font-[700]">-{post.AuthorName}</h3>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
