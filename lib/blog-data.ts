export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  thumb: string;
  alt: string;
  heading: string;
  description: string;
  metaDescription: string;
  metaTitle: string;
  subHeading: string;
  subDescription: string;
  conclusion: string;
  conclusionDescription: string;
  cronical: string;
}

import { siteConfig } from "@/data/siteConfig";
import blogs from "@/public/blogs/best-time-for-exterior-painting-and-how-to-do-it-right.webp";
import thumb from "@/public/blogs.webp";

import blogThumbCabinet from "@/public/blogs/cabinet_painting_tips_every_homeowner_should_know.webp";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "cabinet-painting-tips-every-homeowner-should-know",
    title: "Cabinet Painting Tips Every Homeowner Should Know",
    date: "AUG 01, 2025",
    thumb: thumb as any,
    alt: "cabinet-painting-tips-every-homeowner-should-know",
    excerpt:
      "Are you thinking about upgrading your kitchen or bathroom without spending a lot of money on a full renovation? For Calgary homeowners, painting your cabinets is one of the most important and necessary ways to refresh your space. Whether you're going for a modern look or want something classic, clean white, the right approach makes all the difference, especially in Calgary’s unique climate. Before you decide to get cabinet painting done, here are a few smart tips to help you get the job done right.",
    imageUrl: blogThumbCabinet as any,
    heading: "Expert Cabinet Painting Tips Everyone Should Know",
    description: `<p>Before you go for a DIY job or the assistance of a professional cabinet painting company in Calgary, there are a few things that you should keep in mind.</p></br><p>Choosing the right paint for your cabinets is essential to achieve the look you want. Not all paints suit all surfaces, especially when it comes to painting cabinets. Water-based paints are popular for their low odour and easy cleanup, while oil-based or alkyd paints offer a tougher, more durable finish. Many homeowners prefer a semi-gloss or satin finish, as it provides a good balance between easy cleaning and a smooth look.</p></br><p>The second important tip for a great paint job is ensuring that the surface is properly prepared. To ensure a smooth finish, the surface of the cabinets should be cleaned in detail to remove any built-up grime. If you are doing it yourself, follow the steps carefully. If you're not so sure, it's best to reach out to a <a href='${siteConfig.business.website}/cabinet-painting-calgary' class="text-blue">professional cabinet painter in Calgary</a>. Experts are equipped with the right tools and techniques that suit your preferences and budget.</p></br><p>If you are following a DIY approach, it is best advised to label all the cabinet doors and drawers before removing them so you know exactly where each one goes later. This will save you time and effort and ensure everything goes on smoothly.</p></br><p>When it’s time to paint, going slow and applying thin, even coats is the right way to go about it. Applying too much at once can cause drips, uneven texture, or bubbling. A professional knows all the right techniques to get your cabinet that even and clean look, which you might not be able to achieve following a DIY  approach. Depending on the type and colour of the paint, two or three coats might be required for full coverage.</p></br><p>Follow the tips mentioned above and achieve a sleek look for your cabinets. If you are looking for a professional cabinet <a href='${siteConfig.business.website}/' class="text-blue"> painting company in Calgary</a>, Primo Painters is where you can get all your needs met with precision and excellent customer satisfaction.</p>`,
    cronical: `<link rel="canonical" href="${siteConfig.business.website}/blog/cabinet-painting-tips-every-homeowner-should-know"/>`,
    metaTitle: "Cabinet Painting Tips Every Homeowner Should Know",
    metaDescription:
      "Before you go for a DIY job or the assistance of a professional cabinet painting company in Calgary, there are a few things that you should keep in mind.",
    subHeading: "",
    subDescription: "",
    conclusion: "",
    conclusionDescription: "",
  },
  {
    id: 2,
    slug: "best-time-for-exterior-painting-and-how-to-do-it-right",
    title: "Best Time for Exterior Painting and How to Do It Right",
    date: "May 11, 2026",
    thumb: thumb as any,
    alt: "best-time-for-exterior-painting-and-how-to-do-it-right",
    excerpt:
      "If you're in Alberta, you already know how dramatic the weather can be. Winters bring harsh temperatures that often dip well below freezing, while summers hit hard with intense sun and the occasional hailstorm. These extreme conditions can seriously affect your home's exterior, making regular painting not just an upgrade, but an important part of protecting your space in the long run.",
    imageUrl: blogs as any,
    heading: "Why Exterior Painting Is Important for Calgary Homes?",
    description:
      "<p>Exterior painting is more than just a cosmetic choice in Calgary; it is necessary given the weather conditions that the city faces year-round. It not only makes your home look fresh and attractive, but also protects it from various elements. Let's look at some reasons why you should get it done.</p></br><p>As we have already discussed above, Calgary experiences a harsh and unpredictable climate all year round, and exterior painting helps form a protective barrier against it. A high-quality paint job helps to block the harsh UV rays in the summer that can fade and corrode the outer layers of your home's walls. Moreover, during harsh winters when the temperature is extremely low, the paint can crack and peel in many places. Exterior painting helps prevent this problem by acting as a strong barrier, saving your investment and time in the long run.</p></br><p>Did you know? A high-quality exterior paint job not only protects the paint but also helps prevent wood rot by keeping moisture out of the cracks and prevents rust on the metal surfaces.</p></br><p>Additionally, a fresh paint job helps boost the curb appeal of your home's exterior and makes it look more modern, appealing, and cared for. If you're thinking about selling your house, a fresh exterior paint can really make a positive difference, increasing its resale value and signalling to buyers that it's been well taken care of.</p>",
    subHeading: "Signs Your House Needs an Exterior Paint Job",
    subDescription: `<p>Not sure if it's time to repaint your home? Here are some common signs that your exterior is due for a fresh coat:</p> </br>

    <p>The clearest sign that your house needs exterior <a href='${siteConfig.business.website}/' class="text-blue">painting services</a> is if you observe peeling, bubbling, or cracking of the paint. This means that the damage has already set in, and it's time to get it redone before the problem worsens.</p></br> 

    <p>Another common indicator that your house needs an exterior paint job is if you notice faded paint that appears dull and lifeless. This generally means that your paint has suffered severe sun damage and age, and needs to be replaced.</p></br> 

    <p>Paint works with caulking to keep out moisture. If you see cracked or missing caulking around windows and doors, it may be time to repaint and recaulk those areas.</p></br> 

    <p>If you notice any of the signs mentioned above, it indicates that the exterior of your house needs a refresh and a high-quality paint job. At Primo Painters, we offer a wide range of solutions specifically to address exterior paint issues and give it a look that brings it back to life.</p></br> 
    `,
    conclusion:
      "Do It Right with the Best Exterior Painting Company in Calgary",
    conclusionDescription: `<p>When it comes to <a href='${siteConfig.business.website}/services/exterior-painting-calgary' class="text-blue">exterior painting in Calgary</a>, timing, technique, and quality matter, and so does who you hire. Don't risk your biggest investment on rookies. No matter the issue you are facing with the exterior of your house or business, whether it's peeling, fading, or simply a fresh new look, trust a local company that understands Calgary's unique climate and delivers lasting results.</p></br>

    <p>Primo Painters offers professional, reliable, and weather-smart exterior painting services for both homes and businesses. We believe in using the highest-quality materials, expert preparation techniques, and finishing every job with attention to detail, ensuring your home looks great and stays protected year-round.</p>
`,
    cronical: `<link rel="canonical" href="${siteConfig.business.website}/blog/best-time-for-exterior-painting-and-how-to-do-it-right"/>`,
    metaDescription:
      "Exterior painting is more than just a cosmetic choice in Calgary; it is necessary given the weather conditions that the city faces year-round.",
    metaTitle: "Best Time For Exterior Painting And How To Do It Right",
  },
];
