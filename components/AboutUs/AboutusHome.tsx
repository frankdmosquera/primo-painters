import Image from "next/image";
import WorkmanshipIcon from "./WorkmanshipIcon";
import TeamIcon from "./TeamIcon";
import FivestarIcon from "./FivestarIcon";
import LicensedIcon from "./LicensedIcon";
import ButtonBlueWithBorder from "../ButtonBlueWithBorder";
import { AboutUsImg } from "@/data/images/general-images";
import BgBackground from "../BgBackground";

export default function AboutusHome() {
  return (
    <div className=" w-full mb-0 lg:mt-24 my-10 relative">
      <div className="absolute top-[-390px] z-[-1]">
        <BgBackground />
      </div>
      <div className=" flex flex-col lg:flex-row  lg:h-[38rem]">
        {/* Left side with image */}
        <div className="relative w-full lg:w-[50%]">
          <div className="absolute bottom-4 left-0 z-50 bg-blue-900 text-white py-3 px-4">
            <p className="text-[16px] font-semibold">
              Over 10 Years of Experience
            </p>
          </div>
          <Image
            src={AboutUsImg.src}
            alt={AboutUsImg.alt}
            width={600}
            height={600}
            className="w-full h-[400px] lg:h-[650px] max-sm:pr-[20px] object-cover lg:absolute z-10"
          />
        </div>
        {/* Right side with text */}
        <div className="w-full xl:max-w-2xl   bg-white lg:px-16 px-4 py-8 flex flex-col justify-center ">
          <p className="text-black text-[22px]  font-semibold mb-2">About Us</p>
          <p className="lg:text-[36px] text-[26px] font-bold text-[#0D378D] mb-4">
            EXPERTS IN COLOURING
            <br />
            YOUR WORLD
          </p>
          <p className="text-black mb-6 text-[14px] lg:text-[16px]">
            Anyone can paint walls, but only the finest painters understand that
            every single stroke of colour matters. At Primo Painting, thats
            exactly what we do. With years of expertise in creating stunning
            spaces, we are your trusted partners for professional interior and
            exterior painting services. Our team has the finest painters in
            Calgary, who ensure that every brushstroke makes your space look
            fresh, stylish, and downright amazing.
          </p>

          <p className="text-black mb-6 text-[14px] lg:text-[16px]">
            Whether you need an expert paint job for your home or a full-service
            team for elevating your commercial space, we've got you covered. Our
            Calgary painting company is all about bringing your style to life
            and making a bold statement. `
          </p>
          <ButtonBlueWithBorder href={"/about"} linkText={"Learn More"} />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-[#E2E7F1] py-20 lg:px-4 px-10 relative">
        <div className="absolute top-[-490px]">
          <BgBackground />
        </div>
        <div className="max-w-6xl mx-auto">
          <h2 className="lg:text-[36px] text-[25px] font-bold text-[#0D378D] text-center mb-12">
            WHY CHOOSE US?
          </h2>
          <p className="lg:text-[24px] text-[20px] font-bold text-[#0D378D] text-center mb-12">
            What Makes Us One of the Best Painting Companies in Calgary?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 xl:gap-24">
            {/*  Workmanship */}
            <div className="flex flex-col  text-start">
              <div className="text-[#0D378D] mb-4">
                <div className="flex text-start">
                  <WorkmanshipIcon />
                </div>
              </div>
              <h3 className=" lg:text-[24px]  text-[20px] font-semibold text-[#0D378D] mb-3 ">
                Quality Workmanship
              </h3>
              <p className=" lg:text-[16px] text-[14px] text-black">
                Cutting corners? Not our style. Our Calgary painters are all
                about the best quality with zero compromises.
              </p>
            </div>

            {/* Materials */}
            <div className="flex flex-col ">
              <div className="text-[#0D378D] mb-4">
                <LicensedIcon />
              </div>
              <h3 className="lg:text-[24px]  text-[20px]  font-semibold text-[#0D378D] mb-3">
                Premium Materials
              </h3>
              <p className="lg:text-[16px] text-[14px] text-black">
                Cheap paints and flimsy finishes? Not here. We use only
                high-quality materials that keep your walls looking fresh for
                years because an excellent paint job ensures a finish that
                actually lasts.
              </p>
            </div>

            {/* Experienced Team */}
            <div className="flex flex-col ">
              <div className="text-[#0D378D] mb-4">
                <TeamIcon />
              </div>
              <h3 className="lg:text-[24px]  text-[20px]  font-semibold text-[#0D378D] mb-3">
                Experienced Team
              </h3>
              <p className="lg:text-[16px] text-[14px] text-black">
                When it comes to experience, we don't just talk. Our Calgary
                painters have mastered the art of flawless finishes, handling
                projects of all sizes with precision and a sharp eye for detail.
              </p>
            </div>

            {/* Customer Satisfaction */}
            <div className="flex flex-col ">
              <div className="text-blue mb-4">
                <FivestarIcon />
              </div>
              <h3 className="lg:text-[24px]  text-[20px]  font-semibold text-[#0D378D] mb-3">
                5-Star Rated Service
              </h3>
              <p className="lg:text-[16px] text-[14px] text-black">
                Our commitment to quality has earned us a spot among the best
                painting companies in Calgary, backed by countless 5-star
                reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Background decorative element */}
      </div>
    </div>
  );
}
