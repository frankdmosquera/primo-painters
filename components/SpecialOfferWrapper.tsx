import "./SpecialOffer/style.css";
import Image from "next/image";
import BgBackground from "@/public/SVGs/backgrounds/about-background-vector-line.svg";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SpecialOfferWrapper = () => {
  return (
    <section className="lg:pt-30 pt-10 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-center text-black lg:text-[22px] text-[18px] font-semibold mb-2">
          Special Offer
        </h2>

        <h3 className="text-center lg:text-[36px] text-[26px] font-semibold text-[#0D378D] uppercase mb-8">
          Top Calgary House Painting Offers and Discounts
        </h3>

        {/* Grid layout for content */}
        <div className="bg-black w-full  p-4 mt-12 flex flex-col lg:flex-row gap-4 lg:gap-10 ">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full lg:w-3/5"
          >
            {/* Slide 1 */}
            <CarouselContent className="w-full h-full pl-4">
              <CarouselItem className=" lg:basis-1/2 w-full pl-8">
                <div className="border-2 border-white relative h-[30rem] lg:h-[40rem]">
                  <Image
                    src="/slider-image-1.webp"
                    className="absolute object-cover"
                    alt="Offer 1"
                    fill
                  />
                  <div className="ribbon absolute  bg-red-500 text-white p-2">
                    <p>10% Off on Interior</p>
                  </div>
                  <div className=" absolute bottom-6 left-0 right-0 ">
                    <p className="text-white bg-[rgba(13,55,141,0.24)] backdrop-blur-[7.85px] p-4">
                      Offer Starts from May 4, 2026. You must call for this
                      offer.
                    </p>
                    <p className="text-white p-4">
                      10% OFF - Interior Painting
                    </p>
                  </div>
                </div>
              </CarouselItem>
              {/* Slide 2 */}
              <CarouselItem className=" lg:basis-1/2 w-full pl-8 ">
                <div className="border-2 border-white relative h-[30rem] lg:h-[40rem] w-full">
                  <Image
                    src="/special-Offer-2.webp"
                    className="absolute object-cover"
                    alt="Offer 2"
                    fill
                  />
                  <div className="ribbon absolute  bg-red-500 text-white p-2">
                    <p>2 for 1 Deal</p>
                  </div>
                  <div className="offer-card-content absolute bottom-0 left-0 right-0  ">
                    <p className="text-white bg-[rgba(13,55,141,0.24)] backdrop-blur-[7.85px] p-4">
                      Offer Starts from May 4, 2026. You must call for this
                      offer.
                    </p>
                    <p className="text-white">
                      Pay for one bedroom, get the second one for free!
                    </p>
                  </div>
                </div>
              </CarouselItem>
              {/* Slide 3 */}
              <CarouselItem className=" lg:basis-1/2 w-full pl-8 ">
                <div className="border-2 border-white relative h-[30rem] lg:h-[40rem] w-full">
                  <Image
                    src="/slider-image-1.webp"
                    className="absolute object-cover"
                    alt="Offer 1"
                    fill
                  />
                  <div className="ribbon absolute  bg-red-500 text-white p-2">
                    <p>15% Off on Ceiling Painting</p>
                  </div>
                  <div className=" absolute bottom-6 left-0 right-0 ">
                    <p className="text-white bg-[rgba(13,55,141,0.24)] backdrop-blur-[7.85px] p-4">
                      Offer Starts from May 4, 2026. You must call for this
                      offer.
                    </p>
                    <p className="text-white p-4">
                      15% OFF - Ceiling Painting
                    </p>
                  </div>
                </div>
              </CarouselItem>
            
           
            </CarouselContent>
            <CarouselPrevious className="absolute z-10 -left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 text-white bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition cursor-pointer" />

            <CarouselNext className="absolute z-10 -right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 text-white bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition cursor-pointer" />
          </Carousel>
          {/* Text content section */}
          <div className="w-full lg:w-2/5 pr-5 flex flex-col justify-center ">
            <p className=" lg:text-xl  text-[20px]  mb-5">
              For a limited time, Primo Painting is offering exclusive
              discounts to help you refresh your space at an unbeatable price!
            </p>
            <p className="text-[14px] lg:text-[16px] font-light">
              Discover a variety of discounts and special deals at Primo Painting, tailored to help you save on your Calgary house painting projects throughout the year. Explore ongoing promotions
              for both standard and specialty wall painting services, and ensure
              you get the best value by visiting our offers page.
            </p>

            <Link
              href="/contact"
              className="z-30 flex items-center w-45 mt-3.5 gap-4 border-2 border-white rounded-full pl-5 pr-1.5  py-2 text-sm md:text-base font-medium bg-[#0D378D]  cursor-pointer transition-colors"
            >
              contact US
              <svg
                width="32"
                height="30"
                viewBox="0 0 32 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" width="31" height="30" rx="15" fill="white" />
                <path
                  d="M23 9C23 8.44771 22.5523 8 22 8L13 8C12.4477 8 12 8.44771 12 9C12 9.55228 12.4477 10 13 10L21 10L21 18C21 18.5523 21.4477 19 22 19C22.5523 19 23 18.5523 23 18L23 9ZM10.7071 21.7071L22.7071 9.70711L21.2929 8.29289L9.29289 20.2929L10.7071 21.7071Z"
                  fill="#0D378D"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-[300px] left-[-1px]">
        <Image src={BgBackground} alt="bg-Image" />
      </div>
    </section>
  );
};

export default SpecialOfferWrapper;
