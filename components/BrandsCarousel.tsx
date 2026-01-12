'use client';

import Image from 'next/image';
import brandsData from '@/data/brands.json';

const BrandsCarousel = () => {
  const brands = brandsData.brands;

  return (
    <section className="py-8 overflow-hidden w-full">
      <div className="w-full">
        <h2 className="font-[family-name:var(--font-carbon)] text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Our Trusted Partners
        </h2>
        
        <div className="relative w-full">
          <div className="flex overflow-hidden">
            <div className="flex gap-8 animate-scroll">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-56 h-36 relative bg-white p-4 flex items-center justify-center"
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-2"
                    sizes="160px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandsCarousel;
