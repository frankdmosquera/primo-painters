// import ServiceSection from "./service-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { services } from "@/data/serviceData";
import GallerySection from "./gallery/GallerySection";
import ButtonBlue from "./ButtonBlue";

export default function OurServices() {
  return (
    // An opaque background here is required, not decoration. The home hero image is
    // sticky with the page as its parent, so it never stops pinning and sits
    // behind the entire document. Any section left transparent shows the hero
    // photo through it, which made this heading unreadable over a kitchen.
    //
    // bg-background rather than bg-services-bg since 2026-09-16. The tint was
    // already the faint end of a decision made once before, when it replaced
    // a much stronger #E2E7F1. Next to the warm cream of Why Choose Us it
    // still read as a cooler, darker panel rather than the same surface:
    // lightness 96.5 against 98.3, and cool against warm. One ground now.
    <section className="w-full overflow-visible bg-background py-16 text-foreground md:py-24">
      {/* Was py-8 against py-16 md:py-24 everywhere else, and five competing
          horizontal paddings (sm:px-10 md:px-20 xl:px-5 2xl:px-20 2xl:px-40)
          with no max-width, so this section sat tighter than its neighbours
          and started at a different left edge. One container, same token and
          same gutter as the header, the hero and Why Choose Us. */}
      <div className="mx-auto flex w-full max-w-[var(--site-max)] flex-col gap-10 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:gap-14">
        {/* left side */}
        <div className="w-full xl:w-2/5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              House Painting Services
            </h2>

            {/* Was uppercase, bold and blue at body size, which gave it the
                same visual weight as the h2 above it. Kept blue, dropped the
                caps and the bold, so it reads as a standfirst. */}
            <p className="mt-4 max-w-[42ch] text-lg text-primary">
              Beautiful interior painting with meticulous workmanship and
              premium finishes.
            </p>
            <div className="mt-8 hidden lg:block">
              <ButtonBlue linkText="Book Your Free Estimate!" />
            </div>
          </div>
        </div>
        {/* right side */}
        <Tabs defaultValue={services[0].type} className="w-full xl:w-3/5">
        {/* Cards */}
        {services.map((cat) => (
          <TabsContent
            key={cat.type}
            value={cat.type}
            // Renders all six panels instead of only the active one, so every
            // service title and description is in the HTML. The inactive ones
            // are display:none, and a lazy image inside a display:none panel
            // is never fetched, so the extra five tabs cost markup but no
            // image downloads until someone opens them. Measured: 123 img tags
            // in the HTML, 4 actually downloaded.
            //
            // This was forceMount, which is Radix's name for it. Base UI calls
            // it keepMounted and silently ignored the unknown prop, so after
            // the Base UI move only one panel rendered and five service titles
            // and descriptions quietly left the page.
            keepMounted
            // data-hidden is Base UI's attribute. The old data-[state=inactive]
            // was Radix's and matched nothing; the panels only hide because
            // Base UI sets hidden itself.
            className="w-full border-none shadow-none data-hidden:hidden"
          >
            <div className="w-full">
              {services
                .filter((s) => s.type === cat.type)
                .map((service) => (
                  <Card
                    key={service.id}
                    // ring-0, not border-none. shadcn's Card draws its outline
                    // with ring-1 ring-foreground/10, not a border, so
                    // border-none removed nothing and the box stayed.
                    //
                    // The box is gone on purpose: it wrapped the copy, the
                    // photo and the controls in one outlined container, which
                    // is what made this read as dated. The photo has its own
                    // edge and does not need a frame around the whole thing.
                    className="w-full gap-0 rounded-none border-none bg-transparent py-0 shadow-none ring-0"
                  >
                    {/* p-0 now the border is gone: with no box to sit inside,
                        padding just pushed the content off the tab strip's
                        left edge. */}
                    <CardContent className="w-full p-0">
                      <CardTitle>
                        {/* text-primary, matching Why Choose Us. Both are the
                            h3 inside a card in a section whose h2 is black, so
                            they should not be different colours. */}
                        <h3 className="text-xl font-semibold tracking-tight text-primary">
                          {service.title}
                        </h3>
                      </CardTitle>
                      {/* 17px, matching the body size <main> sets and the same
                          as Why Choose Us's card copy.
                          It has to be stated rather than inherited: shadcn's
                          TabsContent puts text-sm on the panel, so anything
                          inside it lands on 14px unless told otherwise.
                          Previously text-[0.95rem], 15.2px, which matched
                          nothing. */}
                      <p className="mt-2 mb-5 text-[17px] leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <GallerySection GalleryImages={service.images} />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
        {/* The strip sits below the panels, where it started.

            bg-transparent and p-0 because shadcn's TabsList defaults to
            bg-muted, which drew a grey bar wider than the card. h-auto! because
            it also carries a fixed h-8 that cannot grow to a second row. */}
        <TabsList className="mt-3 flex h-auto! w-full flex-wrap items-start justify-center gap-2 bg-transparent p-0">
          {services.map((cat) => (
            <TabsTrigger
              key={cat.type}
              value={cat.type}
              className="h-auto flex-none cursor-pointer rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground transition-colors after:hidden hover:border-primary/40 hover:text-foreground data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
            >
              {cat.type.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* The mobile CTA, below the tab strip. The one in the left column is
            hidden below lg. Was a CardFooter, which is a card part used
            outside a card, carrying a dead `lg:w-` class. */}
        <div className="mt-8 flex justify-center lg:hidden">
          <ButtonBlue linkText="Book Your Free Estimate" />
        </div>
        </Tabs>
      </div>
    </section>
  );
}
