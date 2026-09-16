import Image from "next/image";

export default function FinestPaintersSection() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 items-center relative mt-10 my-3.5">
        <div className="space-y-6 ">
          <div className="space-y-2">
            <p className="text-[22px]  font-medium text-black">
              Our Finest Painters
            </p>
            <h2 className="lg:text-[36px] text-[22px] font-bold text-[#0D378D] uppercase">
              Calgary's Finest Painters
              <br />
              at Your Service
            </h2>
          </div>
          <p className=" text-black">
            A great paint job isn't just about the colour, but it's about the
            experience. That's why we do more than just paint by protecting your
            space, respecting your home, and delivering results that truly stand
            out. From carefully covering furniture to keeping everything neat
            and tidy, we treat your home like our own.
          </p>
          <p className=" text-black z-20">
            Our skilled{" "}
            <a href="https://www.primopainters.ca/" className="text-blue">
              Calgary painters
            </a>{" "}
            bring attention to detail to every brushstroke, ensuring a smooth
            finish. When we're done, the only thing we leave behind is a
            beautifully transformed space you'll love.
          </p>
        </div>

        <div className="relative w-full lg:w-[80%] ml-auto aspect-square md:aspect-auto h-[570px] max-sm:h-[400px] lg:mb-[20px] overflow-hidden ">
          <Image
            src={"/gallery-Page-3.webp"}
            alt="Modern living room with wooden floors and fireplace"
            fill
            className="object-cover "
          />
        </div>
      </div>
    </>
  );
}
