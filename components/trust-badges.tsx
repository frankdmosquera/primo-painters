import googleLogo from "@/public/SVGs/logos/googleLogo.svg";
import logo3 from "@/public/SVGs/logos/logo3.svg";

/**
 * Plain <img>, not next/image. Both badges are SVGs, so the optimiser has
 * nothing to do with them.
 *
 * `priority` had no plain-HTML equivalent and is replaced by fetchPriority
 * plus eager loading, which is what priority did: skip lazy loading and ask
 * the browser to fetch early. These sit in the hero on several pages.
 */
export default function TrustBadges() {
  return (
    <div className="bg-white py-4 px-9 rounded-2xl shadow-lg  flex gap-6 items-center justify-center ">
      <div className="flex flex-col items-center">
        <img
          src={googleLogo.src}
          alt="Google Reviews"
          title="Google Reviews"
          width={120}
          height={50}
          loading="eager"
          fetchPriority="high"
          className="h-auto"
        />
      </div>
      <div>
        <img
          src={logo3.src}
          alt="Canadian Certified"
          title="Canadian Certified"
          width={120}
          height={50}
          loading="eager"
          fetchPriority="high"
          className="h-auto"
        />
      </div>
    </div>
  );
}
