
import Image from 'next/image'
import Link from 'next/link'
import './homebanner.css'

const HomeBanner = () => {
  return (
    <div>
      <div className='back-img lg:mt-[40px] container max-w-7xl mx-auto py-20 max-sm:py-6 relative'>
        {/* Lazy-loaded Background Image */}
        <Image
          src="/general/HomeBannerBG.webp"
          alt="Home Banner Background"
          fill
          className="object-cover -z-10"
          priority={false} 
        />

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 sm:px-12 z-20 relative'>
          <div className='text-white col-span-2'>
            <h3 className='text-3xl lg:text-[36px] sm:text-[16px] font-medium mb-4 uppercase'>
              Ready to Transform Your Space?
            </h3>
            <p className='font-extralight lg:text-[16px] sm:text-[12px]'>
              Get professional advice, a free quote, and a flawless finish for
              your space. Book a consultation with our expert painters in
              Calgary today.
            </p>
          </div>

          <div className='flex items-center lg:justify-end justify-start'>
            <Link
              href='/booking'
              className='flex items-center bg-[#0D378D] text-white pl-4 pr-2 py-3 rounded-full text-base font-medium border-2 border-[#cadbff]'>
              <span className='mr-2 lg:text-[16px] text-[14px] md:text-[10px]'>
                Schedule a Consultation
              </span>
              <svg
                width='31'
                height='31'
                viewBox='0 0 31 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <rect y='0.40918' width='31' height='30' rx='15' fill='white' />
                <path
                  d='M22.5 9.40918C22.5 8.85689 22.0523 8.40918 21.5 8.40918L12.5 8.40918C11.9477 8.40918 11.5 8.85689 11.5 9.40918C11.5 9.96146 11.9477 10.4092 12.5 10.4092L20.5 10.4092L20.5 18.4092C20.5 18.9615 20.9477 19.4092 21.5 19.4092C22.0523 19.4092 22.5 18.9615 22.5 18.4092L22.5 9.40918ZM10.2071 22.1163L22.2071 10.1163L20.7929 8.70207L8.79289 20.7021L10.2071 22.1163Z'
                  fill='#0D378D'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner;



// import Link from 'next/link'
// import Image from 'next/image'
// import './homebanner.css'

// const HomeBanner = () => {
//   return (
//     <div className='   '>
//       <div
//         className=' back-img lg:mt-[40px] container max-w-7xl mx-auto py-20  max-sm:py-6
//         relative'>
//         <div className=' grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 sm:px-12 z-20 relative'>
//           <div className='text-white col-span-2 '>
//             <h3 className='text-3xl lg:text-[36px] sm:text-[16px] font-medium mb-4 uppercase'>
//               Ready to Transform Your Space?
//             </h3>
//             <p className=' font-extralight lg:text-[16px] sm:text-[12px]'>
//               Get professional advice, a free quote, and a flawless finish for
//               your space. Book a consultation with our expert painters in
//               Calgary today.
//             </p>
//           </div>

//           <div className='flex items-center lg:justify-end justify-start'>
//             <Link
//               href='/booking'
//               className='flex items-center bg-[#0D378D] text-white pl-4 pr-2 py-3 rounded-full text-base font-medium border-2 border-[#cadbff]'>
//               <span className='mr-2 lg:text-[16px] text-[14px] md:text-[10px]'>
//                 Schedule a Consultation
//               </span>
//               <svg
//                 width='31'
//                 height='31'
//                 viewBox='0 0 31 31'
//                 fill='none'
//                 xmlns='http://www.w3.org/2000/svg'>
//                 <rect y='0.40918' width='31' height='30' rx='15' fill='white' />
//                 <path
//                   d='M22.5 9.40918C22.5 8.85689 22.0523 8.40918 21.5 8.40918L12.5 8.40918C11.9477 8.40918 11.5 8.85689 11.5 9.40918C11.5 9.96146 11.9477 10.4092 12.5 10.4092L20.5 10.4092L20.5 18.4092C20.5 18.9615 20.9477 19.4092 21.5 19.4092C22.0523 19.4092 22.5 18.9615 22.5 18.4092L22.5 9.40918ZM10.2071 22.1163L22.2071 10.1163L20.7929 8.70207L8.79289 20.7021L10.2071 22.1163Z'
//                   fill='#0D378D'
//                 />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

//export default HomeBanner
