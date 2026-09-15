export const siteConfig = {
  business: {
    name: "Primo Painters",
    applicationName: "Primo Painters",

    website: "https://primopainters.ca",

    email: "info@primopainters.ca",

    phone: "+17806952631",
    phoneDisplay: "(780) 695-2631",

    priceRange: "$$",

    hours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
      {
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
  },

  branding: {
    logo: "/primo-painters-logo.png",
    ogImage: "/og-image.png",
  },

  booking: {
    // The slug really is primo-painting, not painters. That is the actual
    // Calendly account, so it cannot be "corrected" here without breaking
    // booking. It would have to be changed in Calendly first.
    calendlyUrl: "https://calendly.com/primo-painting/30min?hide_gdpr_banner=1",
  },

  location: {
    address: {
      street: "217 Legacy Reach Cres SE",
      city: "Calgary",
      province: "AB",
      postalCode: "T2X 5A7",
      country: "CA",
    },

    coordinates: {
      latitude: 50.8550013,
      longitude: -113.9955408,
    },

    googleMaps:
      "https://www.google.com/maps/place/Primo+Painters+Calgary/@50.8550013,-113.9955408,17z/data=!4m6!3m5!1s0x53719da9a4980f5d:0xcdb54d98d20b7521!8m2!3d50.8550013!4d-113.9955408!16s%2Fg%2F11nr1d01rz",

    serviceArea: "Calgary",
  },

  reviews: {
    rating: 5,
    reviewCount: 1,

    // Google's id for this listing, used by lib/googleReviews.ts.
    //
    // Not a secret: it is public and it identifies the business, so it belongs
    // here with the rest of the per-client detail rather than in .env.local
    // with the API key. New client, new config, same code.
    //
    // ⚠ These change. The id previously hardcoded in app/api/getReviews was
    // ChIJT0simD93cVMRNkpXzYqRErA, and Google now answers it with
    // "The provided Place ID is no longer valid". Google rotates them when a
    // listing is edited, merged or moved. If reviews ever go blank, check this
    // first. The one below was confirmed live on 2026-09-15, and its cid
    // matches the one inside location.googleMaps above, so both point at the
    // same listing.
    placeId: "ChIJXQ-YpKmdcVMRIXUL0phNtc0",
  },

  social: {
    googleBusiness:
      "https://www.google.com/maps/place/Primo+Painters+Calgary/@50.8550013,-113.9955408,17z/data=!4m6!3m5!1s0x53719da9a4980f5d:0xcdb54d98d20b7521!8m2!3d50.8550013!4d-113.9955408!16s%2Fg%2F11nr1d01rz",

    // An empty string means "no account yet". The footer renders that icon as
    // an inert shape rather than a link, so nothing is ever broken or fake.
    // Fill the URL in here and it becomes a real link everywhere at once.

    // Emptied on purpose. The old value was
    // https://www.youtube.com/@Primo-Painting, but the business is Primo
    // Painters, so that handle is wrong or does not exist. An empty string
    // makes the footer icon inert and drops the entry from the JSON-LD
    // sameAs array, which is better than telling Google about a channel that
    // is not there. Paste the real URL back here once it is confirmed.
    youtube: "",

    facebook: "",

    instagram: "",
  },
} as const;
