interface TonnageCardProps {
  range: string;
  quantity: number;
}

function TonnageCard({ range, quantity }: TonnageCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <p className="text-blue-400 text-sm mb-2">Tonnage Range</p>
      <p className="text-3xl font-bold mb-1">{range}</p>
      <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mt-4">
        {quantity}
      </div>
      <p className="text-xs text-gray-400 mt-2">Qty</p>
    </div>
  );
}

export default function EquipmentGrid() {
  const tonnageData = [
    { range: "30-220 tons", quantity: 5 },
    { range: "390-720 tons", quantity: 11 },
    { range: "950-1800 tons", quantity: 9 },
    { range: "2800 tons", quantity: 1 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <div className="grid grid-cols-2 gap-4">
        {tonnageData.map((item, index) => (
          <TonnageCard key={index} range={item.range} quantity={item.quantity} />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <svg viewBox="0 0 300 300" className="w-80 h-80">
            <circle cx="150" cy="150" r="120" fill="none" stroke="white" strokeWidth="2" opacity="0.2"/>
            <circle cx="150" cy="150" r="100" fill="none" stroke="white" strokeWidth="2" opacity="0.2"/>
            <path d="M 150 30 L 170 80 L 130 80 Z" fill="white" opacity="0.3"/>
            <path d="M 270 150 L 220 170 L 220 130 Z" fill="white" opacity="0.3"/>
            <path d="M 150 270 L 130 220 L 170 220 Z" fill="white" opacity="0.3"/>
            <path d="M 30 150 L 80 130 L 80 170 Z" fill="white" opacity="0.3"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl font-bold mb-2">2800</div>
              <div className="text-xl">Tonnage (tons)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
