import service1 from "@/public/general/service1.webp";
import Image from "next/image";
import { Dot } from "lucide-react";
import BgLines from "../BgLines";

export default function SkillPaintersSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center relative mt-10 my-3.5 pb-[40px]">
      <BgLines />
      <div className="relative w-full  lg:w-[80%] mr-auto aspect-square md:aspect-auto md:h-[600px] overflow-hidden">
        <Image
          src={service1}
          alt="Modern living room with wooden floors and fireplace"
          fill
          className="object-cover "
        />
      </div>
      <div className="space-y-6 ">
        <div className="space-y-2">
          <p className="text-[22px]  font-medium text-black">
            Our Skilled Painters
          </p>
          <h2 className="lg:text-[36px] text-[22px] font-bold text-[#0D378D] uppercase">
            Trained & Skilled House
            <br />
            Painters
          </h2>
        </div>

        <ul className="space-y-4 text-black list-disc ">
          <li className="flex items-start gap-2 list-disc">
            <Dot className="h-5 w-5 mt-0.5 text-black " />
            <span>
              We protect your furniture and surrounding areas before painting.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Dot className="h-5 w-5 mt-0.5 text-black flex-shrink-0" />
            <span>Our painters respect your home as if it were their own.</span>
          </li>
          <li className="flex items-start gap-2">
            <Dot className="h-5 w-5 mt-0.5 text-black flex-shrink-0" />
            <span>
              We believe in skill and attention to detail, ensuring your
              satisfaction.
            </span>
          </li>
        </ul>

        <div className="pt-4">
          <p className=" text-black">
            Our commitment to excellence means that every home we paint is
            treated with care and precision, leaving behind a space you’ll love.
          </p>
        </div>
      </div>
    </div>
  );
}
