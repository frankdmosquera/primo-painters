import Image from "next/image";
import AboutUs from "@/public/general/AboutUs.webp";

export default function ServiceArticle({
  articles,
  title1,
  title2,
}: {
  articles: string[];
  title1: string;
  title2: string;
}) {
  return (
    <div className="mt-48 mb-32 flex flex-col lg:flex-row  lg:h-[38rem]">
      {/* Left side with image */}
      <div className="relative w-full lg:w-[50%]">
        <div className="absolute top-10 left-0 z-50 bg-blue-900 text-white py-3 px-4">
          <p className="text-[16px] font-semibold">10 Years of Experience</p>
        </div>
        <Image
          src={AboutUs}
          alt="Elegant interior with staircase"
          width={600}
          height={600}
          className="w-full h-[400px] lg:h-[650px] max-sm:pr-[20px] object-cover lg:absolute z-10"
        />
      </div>

      {/* Right side with text */}
      <div className="w-full xl:max-w-2xl   bg-white lg:px-16 px-4 py-8 flex flex-col justify-center ">
        <h3 className="lg:text-[32px] text-[24px] font-bold text-[#0D378D] mb-4">
          {title1}
          <br />
          {title2}
        </h3>
        {articles.map((item, i) => (
          <p key={i} className="text-black mb-6 text-[14px] lg:text-[16px]  ">
            {item}
          </p>
        ))}

        {/* <button className="learn-more-button">Learn More</button> */}
      </div>
    </div>
  );
}
