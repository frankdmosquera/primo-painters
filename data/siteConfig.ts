export const siteConfig = {
  business: {
    name: "Primo Painters",
    applicationName: "Primo Painters",

    website: "https://primopainters.ca",

    email: "info@primopainters.ca",

    phone: "+15877352312",
    phoneDisplay: "(587) 735-2312",

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
  },

  social: {
    googleBusiness:
      "https://www.google.com/maps/place/Primo+Painters+Calgary/@50.8550013,-113.9955408,17z/data=!4m6!3m5!1s0x53719da9a4980f5d:0xcdb54d98d20b7521!8m2!3d50.8550013!4d-113.9955408!16s%2Fg%2F11nr1d01rz",

    // An empty string means "no account yet". The footer renders that icon as
    // an inert shape rather than a link, so nothing is ever broken or fake.
    // Fill the URL in here and it becomes a real link everywhere at once.

    // TODO: confirm the channel handle. The business is Primo Painters, but
    // this says Painting. Changing it blind would create a dead link, so it
    // stays until the real handle is checked on YouTube.
    youtube: "https://www.youtube.com/@Primo-Painting",

    facebook: "",

    instagram: "",
  },
} as const;
