import { AboutUsImg } from "@/data/images/general-images";
import Image from "next/image";
import HeroCallToAction from "../heros/HeroCallToAction";
import { HeroHomeButtons } from "../heros/HeroHomeButtons";

export default function AboutHero() {
  return (
    // Heights are minimums, not fixed. They were fixed, with the content in an
    // absolutely positioned inset-0 box, so any content taller than the box
    // overflowed it in both directions - justify-center splits the overflow -
    // and the top half slid underneath the sticky header. It measured 34px of
    // the h1 hidden at 1280 and 20px at 768. Content in normal flow inside a
    // min-height section cannot do that, at any width or font size.
    <section className="relative flex min-h-[30rem] min-[22rem]:min-h-[32rem] min-[25rem]:min-h-[24rem] lg:min-h-[28rem]">
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
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 px-3 py-14 text-center min-[22rem]:px-6 md:px-12 xl:gap-10">
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
