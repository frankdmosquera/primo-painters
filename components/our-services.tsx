// import ServiceSection from "./service-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { services } from "@/data/serviceData";
import GallerySection from "./gallery/GallerySection";
import ButtonBlue from "./ButtonBlue";

export default function OurServices() {
  return (
    <section className="w-full  text-black overflow-visible py-8  flex flex-col xl:flex-row   items-center lg:justify-center  sm:px-10 md:px-20 xl:px-5 2xl:px-20  3xl:px-40 4xl:px-50 gap-0 ">
      {/* left side  */}
      {/* left side  */}
      {/* left side  */}
      <div className=" w-full   xl:w-9/20">
        <div className="text-xl container max-w-7xl mx-auto px-4">
          <h2 className=" xsm:text-2xl text-black font-medium ">
            House Painting Services
          </h2>

          <p className="lg:w-4/5 text-[#0D378D]  font-semibold  uppercase  ">
            Beautiful interior painting with meticulous workmanship and premium
            finishes.
          </p>
          <div className="hidden lg:block mt-8">
            <ButtonBlue linkText="Book Your Free Estimate!" />
          </div>
        </div>
      </div>
      {/* right side  */}
      {/* right side  */}
      {/* right side  */}
      <Tabs
        defaultValue={services[0].type}
        className="w-full   xl:w-11/20 pt-4 "
      >
        {/* Cards */}
        {services.map((cat) => (
          <TabsContent
            key={cat.type}
            value={cat.type}
            // Renders all six panels instead of only the active one, so every
            // service title and description is in the HTML. Radix hides the
            // inactive ones with display:none, and a lazy image inside a
            // display:none panel is never fetched, so the extra five tabs cost
            // markup but no image downloads until someone opens them.
            forceMount
            className="w-full border-none shadow-none data-[state=inactive]:hidden"
          >
            <div className=" pb-2 mb-0 w-full flex justify-center border-none shadow-none">
              {services
                .filter((s) => s.type === cat.type)
                .map((service) => (
                  <Card
                    key={service.id}
                    className="py-0    w-full  lg:w-full   border-none shadow-none rounded-lg "
                  >
                    <CardContent className="px-4  w-full">
                      <CardTitle className="text-2xl">
                        <h3> {service.title}</h3>
                      </CardTitle>
                      <p className=" text-muted-foreground leading-relaxed py-2">
                        {service.description}
                      </p>
                      <GallerySection GalleryImages={service.images} />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
        <TabsList
          className=" flex  flex-wrap gap-2 px-2 mb-10 md:mb-14 lg:mb-6
           w-full justify-center whitespace-nowrap"
          style={{ scrollBehavior: "smooth", scrollSnapType: "none" }}
        >
          {services.map((cat) => (
            <TabsTrigger
              key={cat.type}
              value={cat.type}
              className="
        flex-shrink-0
        px-3 py-1
        text-sm text-black
        rounded-md
        cursor-pointer
        bg-white
        data-[state=active]:bg-[#0D378D]
        data-[state=active]:text-white
      "
            >
              {cat.type.toUpperCase()}
              {/* {cat.type.charAt(0).toUpperCase() + cat.type.slice(1)} */}
            </TabsTrigger>
          ))}
        </TabsList>
        <CardFooter className="pt-12  lg:w- lg:flex lg:justify-center lg:hidden">
          <ButtonBlue linkText="Book Your Free Estimate" />
        </CardFooter>
      </Tabs>
    </section>
  );
}
