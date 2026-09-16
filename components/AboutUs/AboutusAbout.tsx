import Image from "next/image";

import { AboutUsImg } from "@/data/images/general-images";

import HeroPhoneMobileBlue from "../heros/HeroPhoneMobileBlue";
import BgBackground from "../BgBackground";
import WhyChooseUs from "../whyChooseUs";

export default function AboutusHome() {
  return (
    <div className="w-full  mb-10 lg:my-12 relative">
      <div className="absolute top-[-390px] z-[-1]">
        <BgBackground />
      </div>
      <div className=" flex flex-col xl:flex-row xl:items-center xl:justify-center lg:gap-8 lg:px-4 w-full  mx-auto">
        {/* Left side with image */}
        <div className="relative w-full h-60 md:h-70  xl:w-2/5 bg-black">
          <div className="lg:hidden absolute top-4 right-4 z-20">
            <HeroPhoneMobileBlue />
          </div>
          <div className="absolute bottom-8 left-0 z-20 bg-blue-900 text-white py-3 px-4">
            <p className=" font-semibold">Over 10 Years of Experience</p>
          </div>
          <Image
            src={AboutUsImg.src}
            alt={AboutUsImg.alt}
            fill
            className="absoloute object-cover  z-10"
          />
        </div>

        {/* Right side with text */}
        <div className="w-full xl:max-w-2xl   bg-white xl:w-4/5 px-4 py-8 flex flex-col justify-center ">
          <p className="text-black text-[22px]  font-semibold mb-2">
            About Primo Painters
          </p>
          <p className="lg:text-[36px] text-[26px] font-bold text-[#0D378D] mb-4">
            INTERIOR PAINTING SPECIALISTS
            <br />
            TRUSTED BY LOCALS
          </p>
          <p className="text-black mb-6">
            Primo Painters is a locally owned painting company specializing
            exclusively in interior residential painting throughout Calgary. By
            focusing on one thing and doing it well, we're able to deliver
            consistent results, cleaner workmanship, and a smoother experience
            from start to finish.
          </p>

          <p className="text-black mb-6">
            As a small team, we keep our overhead low and our standards high.
            That means competitive pricing, clear communication, efficient
            scheduling, and careful attention to every room we paint. Whether
            you're refreshing a single bedroom or repainting your entire home,
            our goal is simple: quality work that's done right the first time.
          </p>

          {/* <button className="learn-more-button">Learn More</button> */}
        </div>
      </div>
    </div>
  );
}
