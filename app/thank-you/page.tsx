import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },

  // Self referencing. The root layout's canonical is "/", so without this the
  // page claims to be the homepage while also asking not to be indexed, which
  // are contradictory signals. og:url likewise, so a pasted link does not
  // preview as the homepage.
  alternates: {
    canonical: "/thank-you",
  },

  openGraph: {
    url: "/thank-you",
  },
};

export default function page() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D378D] text-white px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Thank You for Reaching Out!
        </h1>
        <p className="text-lg max-w-xl text-center mb-8">
          We've received your request. One of our team members will contact you
          shortly to discuss your project and provide your free estimate.
        </p>
        <p className="text-md max-w-xl text-center mb-8">
          In the meantime, feel free to explore our gallery and customer reviews
          to see the quality of work we deliver across Calgary.
        </p>
        <a
          href="/"
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </>
  );
}
