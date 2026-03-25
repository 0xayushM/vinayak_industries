'use client';

import Image from 'next/image';
import brandsData from '@/data/brands.json';
import LogoLoop from './LogoLoop';

const BrandsCarousel = () => {
  const brands = brandsData.brands;

  const brandLogos = brands.map((brand) => ({
    src: brand.image,
    alt: brand.name,
    width: 224,
    height: 144,
  }));

  return (
    <section className="py-8 w-full">
      <div className="w-full flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-carbon)] text-3xl md:text-4xl font-bold text-center my-12 text-gray-900">
          Our Trusted Partners
        </h2>
        
        <LogoLoop
          logos={brandLogos}
          speed={80}
          direction="left"
          logoHeight={100}
          gap={45}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Our trusted brand partners"
        />
        <LogoLoop
          logos={brandLogos}
          speed={80}
          direction="right"
          logoHeight={100}
          gap={45}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Our trusted brand partners"
        />
      </div>
    </section>
  );
};

export default BrandsCarousel;
