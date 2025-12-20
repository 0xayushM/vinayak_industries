'use client';

import Image from 'next/image';

const BrandsCarousel = () => {
  const brands = Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const ext = [3, 4, 5, 6, 9, 10, 14, 16, 19].includes(num) ? 'jpeg' : 'png';
    return `/images/brands/img${num}.${ext}`;
  });

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
                  className="flex-shrink-0 w-40 h-24 relative bg-white p-4 flex items-center justify-center"
                >
                  <Image
                    src={brand}
                    alt={`Brand ${(index % brands.length) + 1}`}
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
