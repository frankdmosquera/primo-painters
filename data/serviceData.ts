import {
  cabinetPaintingImages,
  ceilingPaintingImages,
  GalleryInteriorImages,
  garagePaintingImages,
  trimAndDoorPaintingImages,
  wallPaintingImages,
} from "./images/services-images";

export const services = [
  {
    id: "5",
    type: "interiors",
    title: "Interior Painting",
    description:
      "Repaint your room or your entire home—we deliver smooth finishes, crisp lines, and meticulous attention to detail from preparation to final coat.",
    images: GalleryInteriorImages,
  },
  {
    id: "1",
    type: "walls",
    title: "Wall Painting",
    description:
      "Professional wall painting in Calgary for living rooms, bedrooms, hallways, and more. We deliver smooth finishes, clean lines, and long-lasting results.",
    images: wallPaintingImages,
  },
  {
    id: "2",
    type: "ceilings",
    title: "Ceiling Painting",
    description:
      "Brighten your home with expert ceiling painting in Calgary. We eliminate roller marks, cover stains, and create smooth, even finishes.",
    images: ceilingPaintingImages,
  },
  {
    id: "3",
    type: "trim & doors",
    title: "Trim & Doors Painting",
    description:
      "Professional trim and door painting in Calgary. We create crisp lines and durable finishes that enhance the look of your interior spaces.",
    images: trimAndDoorPaintingImages,
  },
  {
    id: "4",
    type: "garages",
    title: "Garage Painting",
    description:
      "Refresh your garage with professional painting in Calgary. We paint walls, ceilings, and trim to create a cleaner, brighter, and more durable space.",
    images: garagePaintingImages,
  },

  {
    id: "6",
    type: "cabinets",
    title: "Cabinet Painting",
    description:
      "Transform your kitchen or bathroom with cabinet painting in Calgary. Get a modern, factory-like finish without the cost of replacing your cabinets.",
    images: cabinetPaintingImages,
  },
];
