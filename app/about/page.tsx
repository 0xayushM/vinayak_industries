'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Who We Are",
    "Management Team",
    "Infrastructure"
  ];

  const infrastructureImages = [
    "/images/infrastructure/Vinayak-Technoplast1.jpg",
    "/images/infrastructure/Vinayak-Technoplast2.jpg",
    "/images/infrastructure/Vinayak-Technoplast3.jpg",
    "/images/infrastructure/Vinayak-Technoplast4.jpg",
    "/images/infrastructure/Vinayak-Technoplast5.jpg",
    "/images/infrastructure/Vinayak-Technoplast6.jpg",
    "/images/infrastructure/Vinayak-Technoplast7.jpg",
    "/images/infrastructure/Vinayak-Technoplast8.jpg",
    "/images/infrastructure/Vinayak-Technoplast10.jpg",
    "/images/infrastructure/Vinayak-Technoplast11.jpg",
    "/images/infrastructure/Vinayak-Technoplast12.jpg",
    "/images/infrastructure/Vinayak-Technoplast13.jpg",
    "/images/infrastructure/Vinayak-Technoplast14.jpg",
    "/images/infrastructure/Vinayak-Technoplast15.jpg",
    "/images/infrastructure/Vinayak-Technoplast16.jpg",
    "/images/infrastructure/Vinayak-Technoplast17.jpg",
    "/images/infrastructure/Vinayak-Technoplast18.jpg",
    "/images/infrastructure/Vinayak-Technoplast19.jpg",
    "/images/infrastructure/Vinayak-Technoplast20.jpg",
    "/images/infrastructure/Vinayak-Technoplast21.jpg",
    "/images/infrastructure/Vinayak-Technoplast22.jpg",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-white relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/background-tile.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">Vinayak Technoplast</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Specialising in design, mould development and moulding solutions under one roof.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-6 bg-gray-50 sticky top-20 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === index
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="min-h-screen">
        {/* Tab 1: Who We Are */}
        {activeTab === 0 && (
          <div>
            {/* Who We Are */}
            <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Who We Are</h2>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                Vinayak Technoplast specialises in design, mould development and moulding solutions under one roof.
                We are professionally managed company led by our chairman <span className="font-semibold text-gray-900">Mr. Arjun Kumar Agarwal</span>, Mechanical Engineer from <span className="font-semibold text-gray-900">IIT, BHU</span>. 
                We have maintained uniform quality standards and are committed to Customers for giving them timely delivery at most competitive cost. 
                We have experience of <span className="font-semibold text-pink-500">30 Years</span> and are proud to be one of the top moulders in Delhi. We have Strategically located manufacturing unit spanning <span className="font-semibold text-pink-500">35000 Sq Ft</span> manufacturing area.
              </p>
              <p>
                Vinayak Technoplast not only supplies to the OE market suppliers, we are well-established providers to the aftermarket as well. 
                We have a well established base in plastic technology. Over the years, Vinayak Technoplast has maintained its close contact with its customers 
                by interacting with them through international exhibitions, trade shows, personal meetings & technical meets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitments */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Commitments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Good Communication</h3>
              <p className="text-gray-600 leading-relaxed">Good communication with customer and team members to improve customer satisfaction</p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Equal Opportunity</h3>
              <p className="text-gray-600 leading-relaxed">Equal opportunity at work place</p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Skill Development</h3>
              <p className="text-gray-600 leading-relaxed">Skill development and continuous training</p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">First Time Right</h3>
              <p className="text-gray-600 leading-relaxed">First time right every time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Quality Policy</h2>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg leading-relaxed">Vinayak Technoplast is committed to produce and supply quality products to meet our customer needs.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg leading-relaxed">We shall continuously strive to improve the effectiveness of our Quality Management System.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg leading-relaxed">We shall train and motivate our employees for self and continual improvement.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg leading-relaxed">We are conscious of our responsibility towards safety, health and environment.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-900 text-lg leading-relaxed font-semibold">Quality is what we think, act and believe in.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔧</div>
              <p className="text-gray-700 leading-relaxed">Expand Tool Room with Effective Manpower</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <p className="text-gray-700 leading-relaxed">Addition of New sub Processes, Assembly for Electrical Accessories</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💻</div>
              <p className="text-gray-700 leading-relaxed">Work under process upgradation to ERP System integrating the Information flow of all three Plants</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⭐</div>
              <p className="text-gray-700 leading-relaxed">Get Higher Rank in Quality by All Customers</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <p className="text-gray-700 leading-relaxed">Achieved a sales growth of 25%</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <p className="text-gray-700 leading-relaxed">Successfully join new company JAY USHIN</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔬</div>
              <p className="text-gray-700 leading-relaxed">Add ISI Lab For Electrical Accessories</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-gray-700 leading-relaxed">All work done as per ISO/T.S. (I.A.T.F.)</p>
            </div>
          </div>
        </div>
      </section>
          </div>
        )}

        {/* Tab 2: Management Team */}
        {activeTab === 1 && (
          <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Management Team</h2>
          <p className="text-gray-600 mb-12 leading-relaxed text-lg max-w-4xl">
            We are professionally managed company led by our chairman <span className="font-semibold text-gray-900">Mr. Arjun Kumar Agarwal</span>, Mechanical Engineer from <span className="font-semibold text-gray-900">IIT BHU</span>.
            The team works together with our customers to bring a product from concept, through design and testing, into final production. 
            Our success in this industry is the result of hard work of manpower. Our team comprises of engineers, technocrats, marketing managers, 
            quality controllers, R & D personnel, packing as well as store experts. We also provide training to team to improvise their skills.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* CEO Profile */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-80">
                <Image 
                  src="/Sandeep-Agarwal.jpg" 
                  alt="Mr. Sandeep Agarwal, CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mr. Sandeep Agarwal</h3>
                <p className="text-pink-500 font-semibold mb-4">CEO</p>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ornare euismod rutrum. 
                  Fusce condimentum augue at mauris convallis, ut tempor ex tempus. Suspendisse varius varius nisl in accumsan. 
                  Aliquam odio felis, viverra vel leo vitae, faucibus volutpat mi. Donec eu lacus in metus gravida efficitur. 
                  Praesent condimentum gravida gravida. Ut augue nibh, convallis id aliquam vel, venenatis id ligula.
                </p>
              </div>
            </div>

            {/* Team Structure */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-full min-h-[500px]">
                <Image 
                  src="/Team-Structure.jpg" 
                  alt="Team Structure"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
        )}

        {/* Tab 3: Infrastructure */}
        {activeTab === 2 && (
          <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Infrastructure</h2>
          <p className="text-xl text-gray-600 mb-12">
            Strategically located manufacturing unit spanning <span className="font-semibold text-pink-500">35,000 Sq Ft</span> manufacturing area.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureImages.map((image, index) => (
              <div key={index} className="relative h-64 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                <Image 
                  src={image} 
                  alt={`Infrastructure ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
