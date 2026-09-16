"use client";

import { useState } from "react";
import { ProjectGalleryDialog } from "./project-gallery-dialog";
import type { Project } from "@/data/projectsData";
import { ImageGalleryEfferdMansory } from "./image-gallery-efferd-mansory";
type ProjectDetailViewProps = {
  project: Project;
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <ImageGalleryEfferdMansory
        images={project.images}
        onImageClick={(index) => {
          setSelectedIndex(index);
          setOpen(true);
        }}
      />

      {/*
        Same dialog/carousel/thumbnail-strip used from the homepage and
        /gallery card grids — opens on whichever image was clicked in the
        masonry layout above, not always the first.
      */}
      <ProjectGalleryDialog
        project={project}
        open={open}
        onOpenChange={setOpen}
        initialIndex={selectedIndex}
      />
    </div>
  );
}
