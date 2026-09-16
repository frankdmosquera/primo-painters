import BookNowTrigger from "./BookNowTrigger";

/**
 * The blue pill with the arrow, used for the booking calls to action in the
 * services section. Same look as before; it opens the Calendly modal instead
 * of navigating to /booking, and it renders one element instead of a <button>
 * nested inside a <Link>.
 */
export default function ButtonBlue({ linkText }: { linkText: string }) {
  return (
    <BookNowTrigger className="z-30 flex w-fit cursor-pointer items-center gap-2 rounded-full bg-blue-900 py-1 pr-1.5 pl-4 text-white transition-colors hover:bg-[#0a2c72]">
      {linkText}
      <svg
        width="31"
        height="30"
        viewBox="0 0 31 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="31" height="30" rx="15" fill="white" />
        <path
          d="M22.5 9C22.5 8.44771 22.0523 8 21.5 8L12.5 8C11.9477 8 11.5 8.44771 11.5 9C11.5 9.55228 11.9477 10 12.5 10L20.5 10L20.5 18C20.5 18.5523 20.9477 19 21.5 19C22.0523 19 22.5 18.5523 22.5 18L22.5 9ZM10.2071 21.7071L22.2071 9.70711L20.7929 8.29289L8.79289 20.2929L10.2071 21.7071Z"
          fill="#0D378D"
        />
      </svg>
    </BookNowTrigger>
  );
}
