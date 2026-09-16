import { Dot } from "lucide-react";
import Image from "next/image";
import service2 from "@/public/general/service2.webp";

export default function CommitmentQualitySection() {
  return (
    <div className="relative grid md:grid-cols-2 gap-8 mb-16 items-center my-3.5 lg:mt-20">
      <div className="relative w-full  lg:w-[80%] mr-auto aspect-square md:aspect-auto md:h-[600px] overflow-hidden">
        <Image
          src={service2}
          alt="Modern living room with wooden floors and fireplace"
          fill
          className="object-cover "
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-[22px] font-medium text-black">
            Commitment to Quality
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#0D378D]">
            Eco-Friendly Painting for a Cleaner and Greener Home
          </h2>
        </div>

        <div className="space-y-4 text-black ">
          <p>
            At Primo Painters, we're committed to making a positive impact on
            the environment. That's why we use zero to low-VOC paints, creating
            healthier spaces for our clients, painters, and the planet!
          </p>
          <p>
            Got leftover paint? We've got you covered! We'll collect any unused
            paint and take it to our shop, ensuring it gets properly recycled
            instead of wasted. Plus, all materials from our projects, like
            garbage, cardboard, and plastics,
          </p>
          <p>
            Our interior painters in Calgary focuses on making a clean and green
            impact on the environment while ensuring perfection in every project
            that we undertake.
          </p>
        </div>
      </div>
    </div>
  );
}
