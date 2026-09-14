import React from "react";

interface ServiceSectionProps {
  title: string;
  description: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
}) => {
  const descriptionLines = description.split("<br />");

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <p className="text-xl min-[25rem]:text-2xl text-black font-medium ">{title}</p>
      <div className="flex flex-col justify-between  md:flex-row">
        <h2 className="text-[#0D378D] text-[26px] font-semibold lg:text-[36px] uppercase ">
          {descriptionLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < descriptionLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default ServiceSection;
