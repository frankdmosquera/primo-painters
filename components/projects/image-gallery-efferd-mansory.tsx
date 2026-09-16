import type { ProjectImage } from "@/data/projectsData";
import { GalleryTile } from "./gallery-tile-efferd-mansory";

const COLUMN_COUNT = 4;

type ImageGalleryProps = {
  images: ProjectImage[];
  /** Called with the image's index in the full array — used to open the
   *  gallery dialog on the exact photo that was clicked. */
  onImageClick?: (index: number) => void;
};

export function ImageGalleryEfferdMansory({
  images,
  onImageClick,
}: ImageGalleryProps) {
  // Distribute round-robin into columns, keeping each image's original
  // index so we can report the right one back on click.
  const columns: { image: ProjectImage; index: number }[][] = Array.from(
    { length: COLUMN_COUNT },
    () => [],
  );

  images.forEach((image, index) => {
    columns[index % COLUMN_COUNT].push({ image, index });
  });

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {columns.map((column, col) => (
          <div className="grid gap-4" key={col}>
            {column.map(({ image, index }) => {
              // Deterministic (index-based) instead of the original
              // Math.random() — that ran at render time and produced a
              // different value on the server vs. the client, causing a
              // Next.js hydration mismatch. Same visual variety, no bug.
              const isPortrait = (col + index) % 3 === 0;

              return (
                <GalleryTile
                  key={image.src}
                  image={image}
                  index={index}
                  isPortrait={isPortrait}
                  totalCount={images.length}
                  onImageClick={onImageClick}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
