import EquipmentGrid from "./EquipmentGrid";
import AdvantagesSection from "./AdvantagesSection";

export default function EquipmentSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/factory-bg.jpg')] bg-cover bg-center"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Equipment</h2>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl">
          Our facility houses 25 injection molding machines ranging from 30 to 2800 tons,
          allowing us to handle a wide variety of project sizes and complexities.
        </p>

        <EquipmentGrid />
        <AdvantagesSection />
      </div>
    </section>
  );
}
