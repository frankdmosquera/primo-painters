"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { faqItems } from "@/data/faqData";
import BookNowTrigger from "../BookNowTrigger";

const FaqSection = () => {
  return (
    <div className=" max-w-7xl container mx-auto py-11 max-sm:py-0 px-5 max-sm:px-5 flex-grow max-sm:mb-10">
      <div className="grid xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1  items-center">
        <h2 className="text-[18px] text-black font-medium lg:text-[22px]">
          Frequently Asked Questions
        </h2>
        <p className="text-black">
          Have questions? We've answered the ones homeowners ask most about
          interior painting, from pricing and preparation to timelines, repairs,
          and booking.
        </p>
        <div className="grid xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 gap-5 items-start justify-center mt-12 max-sm:mt-5">
          <div
            style={{ boxShadow: "0px 7px 45px 0px rgba(0, 15, 44, 0.12)" }}
            className="bg-white  p-6"
          >
            <Accordion variant="splitted" className="">
              {faqItems.map((item, index) => (
                <AccordionItem
                  indicator={({ isOpen }) =>
                    isOpen ? (
                      <Minus className="w-8 h-8 p-1  text-[#0D378D] border-2 border-[#0D378D66] rounded-full text-2xl" />
                    ) : (
                      <Plus className="w-8 h-8 p-1 text-[#0D378D] border-2 border-[#0D378D66] rounded-full text-2xl" />
                    )
                  }
                  key={index}
                  aria-label={`Accordion ${index}`}
                  title={
                    <span
                      className={`mb-3 font-normal max-sm:text-[16px] text-[16px] 
                         text-black`}
                    >
                      {item.title}
                    </span>
                  }
                  className="bg-[#F2F2F2] font-normal mt-3 py-3 max-sm:py-0 rounded-none"
                >
                  <p className="text-[16px] font-normal  max-sm:text-[16px]  text-[#2c2323]">
                    {item?.content}
                  </p>
                  {item?.bookOption && (
                    <div className="mt-4">
                      <BookNowTrigger
                        className="inline-block bg-[#0D378D] text-white py-2 px-4 rounded-full hover:bg-[#0A2A6B] transition-colors"
                      >
                        Book Your Estimate
                      </BookNowTrigger>
                    </div>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
