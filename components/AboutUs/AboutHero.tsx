import { AboutUsImg } from "@/data/images";
import Image from "next/image";
import HeroCallToAction from "../heros/HeroCallToAction";
import { HeroHomeButtons } from "../heros/HeroHomeButtons";

export default function AboutHero() {
  return (
    <section className="relative h-[30rem] min-[22rem]:h-[32rem] min-[25rem]:h-[24rem] lg:h-[28rem]  ">
      <Image
        src={AboutUsImg.src}
        alt={AboutUsImg.alt}
        fill
        className="object-cover brightness-70 w-full h-auto "
        priority
        // sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/50"></div>
      {/* here center the content */}
      <div className=" absolute px-3 min-[22rem]:px-6 md:px-12 gap-20  xl:gap-24  bottom-4 inset-0 flex  flex-col items-center justify-center text-center ">
        <div className="">
          <h1 className="  text-3xl min-[25rem]:text-4xl  md:text-5xl lg:text-6xl font-bold text-white ">
            About
            <span className="bg-reveal ml-2">Primo Painters</span>{" "}
          </h1>
          <p className="block mt-3  text-white   font-medium   min-[25rem]:text-lg ">
            Primo Painters is a locally owned Calgary interior painting company
            dedicated to meticulous workmanship, honest pricing, and respect for
            every home we paint.
          </p>
        </div>
        <HeroHomeButtons />
      </div>
    </section>
  );
}
