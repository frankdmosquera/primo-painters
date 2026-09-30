"use client";
import EmailLogo from "../../public/icons/Email-Logo.webp";
import PhoneLogo from "../../public/icons/Call-Phone.png";
import DirectionLogo from "../../public/icons/Direction-logo.webp";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

const { email } = siteConfig.business;

const DiscussSection = () => {
  return (
    <section className="container max-w-5xl mx-auto py-12 px-6">
      <h2 className="text-center  lg:text-[36px] text-[26px]  font-medium text-[#0D378D] mb-8">
        Let’s Discuss Your Project Today!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-10 justify-center items-center">
        <div className="text-center sm:mb-4 mb-6">
          {" "}
          {/* Margin for small screens */}
          <div className="icon mb-4">
            <Link href="tel:+14039037517">
              <Image
                src={PhoneLogo}
                alt="Call Us"
                style={{ margin: "auto" }}
                className="w-24 h-24 sm:w-20 sm:h-20 md:w-20 md:h-20 cursor-pointer" // Adjust size for different screens
              />
            </Link>
          </div>
          <h3 className="text-[#000000] md:text-4xl sm:text-[20px] font-medium cursor-pointer">
            <Link
              aria-label={`Call ${siteConfig.business.name} at 403-903-7517`}
              href="tel:+14039037517"
            >
              CALL US
            </Link>
          </h3>
        </div>

        <div className="text-center sm:mb-4 mb-6">
          {" "}
          {/* Margin for small screens */}
          <div className="icon mb-4">
            <Link href={`mailto:${email}`}>
              <Image
                src={EmailLogo}
                alt="Email Us"
                style={{ margin: "auto" }}
                className="w-24 h-24 sm:w-20 sm:h-20 md:w-20 md:h-20 cursor-pointer" // Adjust size for different screens
              />
            </Link>
          </div>
          <h3 className="text-[#000000] md:text-4xl sm:text-[20px] font-medium cursor-pointer">
            <Link
              href={`mailto:${email}`}
              aria-label={`Email ${siteConfig.business.name} at ${email}`}
            >
              EMAIL US
            </Link>
          </h3>
        </div>

        <div className="text-center sm:mb-4 mb-6">
          {" "}
          <Link target="_blank" href="https://g.co/kgs/Wm9YRbr">
            {/* Margin for small screens */}
            <div className="icon mb-4">
              <Image
                src={DirectionLogo}
                alt="Get Directions"
                style={{ margin: "auto" }}
                className="w-24 h-24 sm:w-20 sm:h-20 md:w-20 md:h-20 cursor-pointer" // Adjust size for different screens
              />
            </div>
            <h3 className="text-[#000000] md:text-4xl sm:text-[20px] font-medium cursor-pointer ">
              GET DIRECTIONS
            </h3>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscussSection;
