export default function StatsSection() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <svg viewBox="0 0 60 40" className="w-full h-full">
                  <rect x="10" y="5" width="40" height="25" fill="#dc2626" rx="2"/>
                  <rect x="10" y="5" width="40" height="10" fill="#ffffff" rx="2"/>
                  <rect x="10" y="20" width="40" height="10" fill="#ffffff" rx="2"/>
                </svg>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Made in</h3>
            <p className="text-gray-700">USA Plastics</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              50<span className="text-amber-500">+</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Years of industry</h3>
            <p className="text-gray-700">experience</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Family-owned</h3>
            <p className="text-gray-700">Company</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Turnkey</h3>
            <p className="text-gray-700">Manufacturing</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Large Tonnage</h3>
            <p className="text-gray-700">up to 2800</p>
          </div>
        </div>
      </div>
    </section>
  );
}
