interface AdvantageCardProps {
  number: number;
  title: string;
  description: string;
}

function AdvantageCard({ number, title, description }: AdvantageCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 text-gray-900">
      <div className="text-6xl font-bold text-gray-200 mb-4">{number}</div>
      <h3 className="text-2xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default function AdvantagesSection() {
  const advantages = [
    {
      number: 1,
      title: "Expert<br />R&D Team",
      description: "Our dedicated R&D team, comprised of over 40 professionals, brings decades of expertise.",
    },
    {
      number: 2,
      title: "Cost-Effective<br />Solutions",
      description: "Achieve substantial savings of 30-50% with our optimized manufacturing processes.",
    },
    {
      number: 3,
      title: "Quick<br />Turnaround",
      description: "For time-sensitive projects, we excel in delivering rapid production without compromising quality.",
    },
  ];

  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Main Advantages</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {advantages.map((advantage) => (
          <AdvantageCard
            key={advantage.number}
            number={advantage.number}
            title={advantage.title}
            description={advantage.description}
          />
        ))}
        
        <div className="bg-amber-500 rounded-2xl p-8 text-white flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Discover Our<br />Complete<br />Equipment List</h3>
            <button className="mt-4 text-amber-500 bg-white px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              View List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
