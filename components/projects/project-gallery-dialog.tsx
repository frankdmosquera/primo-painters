import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ProjectImageCarousel } from "./project-image-carousel";
import type { Project } from "@/data/projectsData";

type ProjectGalleryDialogProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Which image the carousel should open on — used when opening from a
   *  click on a specific photo (e.g. the masonry grid) rather than always
   *  starting at the first image. */
  initialIndex?: number;
};

export function ProjectGalleryDialog({
  project,
  open,
  onOpenChange,
  initialIndex = 0,
}: ProjectGalleryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* 70% black backdrop — background stays faintly visible behind it.
            Overriding bg-black/50 (the shadcn default) with bg-black/70. */}
        <DialogOverlay className="bg-black/70" />

        {/*
          Calendly-popup style: a constrained, centered card, not full-bleed.
          IMPORTANT: every override below is duplicated with its sm: variant.
          DialogContent ships with `sm:max-w-lg` and positioning baked in —
          without the sm: prefix on the override too, that default silently
          wins again as soon as the viewport crosses 640px. This is what
          caused the "sidebar" bug on iPad last time.
        */}
        <DialogContent
          showCloseButton={false}
          className="left-1/2 top-1/2 w-[92vw] max-w-4xl sm:max-w-4xl -translate-x-1/2 -translate-y-1/2 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 rounded-lg sm:rounded-lg border-0 bg-background p-0 shadow-2xl"
        >
          <DialogTitle className="sr-only">
            {project?.title ?? "Project gallery"}
          </DialogTitle>

          <DialogClose className="absolute -top-10 right-0 rounded-full p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:-top-3 sm:-right-3 sm:bg-background sm:text-foreground sm:shadow-md">
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/*
            Images only mount once the dialog is open and a project is set.
            The specific streaming/loading strategy for images is still
            being finalized — this renders the full array up front as a
            placeholder behavior.
          */}
          {project && open && (
            <ProjectImageCarousel
              project={project}
              initialIndex={initialIndex}
            />
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
