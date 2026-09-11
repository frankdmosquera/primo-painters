"use client";
import { useState } from "react";
import { ClipboardList, MessageCircleQuestion, PhoneCall } from "lucide-react";
import { buttonVariants } from "../ui/button";
// import { HeroForm } from "../HeroForm";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/siteConfig";
import { HeroCalendarImage } from "./HeroCalendarImage";
import { HeroForm } from "./HeroForm";
// import { HeroCalendarImage } from "./HeroCalendarImage";
// import { HeroCalendarImage } from "./HeroCalendarImage";

export function HeroHomeButtons() {
  const [showFormCallWrapper, setShowFormCallWrapper] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center">
        <HeroCalendarImage />
        {!showFormCallWrapper && (
          <div
            className={cn(buttonVariants({ variant: "secondary" }), "mt-4 ")}
            onClick={() => {
              setShowFormCallWrapper(true);
            }}
          >
            <MessageCircleQuestion />
            <span>Questions?</span>
          </div>
        )}
        {showFormCallWrapper && (
          <div className="flex  justify-center gap-4 mt-4">
            <div
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "gap-2 px-4",
              )}
            >
              <PhoneCall />
              <a href={`tel:${siteConfig.business.phone}`}>Call</a>
            </div>
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "gap-2 px-4",
                )}
              >
                <ClipboardList />
                <span>Form</span>
              </SheetTrigger>
              <SheetContent side="left">
                <HeroForm />
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </>
  );
}
