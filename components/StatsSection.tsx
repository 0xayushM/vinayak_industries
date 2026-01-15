import StatsCarousel from "./StatsCarousel";

export default function StatsSection() {
  const highlights = [
    {
      title: "Parts Delivered",
      number: "100M+",
      unit: "Components",
      description: "We have successfully manufactured and delivered over 100 million precision-molded parts to automotive, medical, and industrial clients, maintaining consistent quality throughout."
    },
    {
      title: "Quality Pass Rate",
      number: "99.9%",
      unit: "First-Time Right",
      description: "Our rigorous quality control processes ensure that 99.9% of our parts pass inspection on the first attempt, minimizing rejections and ensuring reliability for our clients."
    },
    {
      title: "Max Clamping Force",
      number: "850T",
      unit: "Tonnage",
      description: "Our heavy-duty 850-ton and many other injection molding machines enable us to produce large, complex parts that many competitors cannot handle, giving you access to advanced manufacturing capabilities."
    },
    {
      title: "Manufacturing Facility",
      number: "35,000",
      unit: "Sq. Ft.",
      description: "Our strategically located 35,000 sq. ft. facility in Delhi NCR is equipped with state-of-the-art infrastructure for design, mold development, and high-volume production."
    },
    {
      title: "High-Performance Machines",
      number: "30+",
      unit: "Units",
      description: "Our facility houses 30+ injection molding machines ranging from 60 to 850 tonnes, allowing us to handle projects of any size and complexity with optimal efficiency."
    },
    {
      title: "Zero-Defect OEMs",
      number: "5+",
      unit: "Tier-1 Partners",
      description: "We maintain zero-defect delivery records with 5+ major OEMs in automotive and medical sectors, demonstrating our commitment to excellence and reliability."
    },
    {
      title: "Engineering Precision",
      number: "3",
      unit: "Decades",
      description: "Over 30 years of specialized experience in precision injection molding. Our engineering team has mastered the art of producing complex components with tight tolerances for demanding industries."
    },
    {
      title: "Toolroom Lead Time",
      number: "4-6",
      unit: "Weeks",
      description: "Our in-house toolroom delivers rapid mold development in just 4-6 weeks, significantly faster than industry standards, helping you get to market quickly."
    },
    {
      title: "Faster Tooling",
      number: "30%",
      unit: "Time Savings",
      description: "Our optimized tooling processes are 30% faster than industry averages, reducing your time-to-market and giving you a competitive edge in your industry."
    },
    {
      title: "Production Cycles",
      number: "24x7",
      unit: "Operations",
      description: "We operate round-the-clock production cycles to meet tight deadlines and high-volume demands, ensuring your orders are completed on time, every time."
    },
    {
      title: "In-House Capabilities",
      number: "Full",
      unit: "Turnkey",
      description: "From mold design and maintenance to production and assemblies, everything is handled in-house, reducing lead times and ensuring seamless communication throughout your project."
    },
    {
      title: "Strategic Location",
      number: "Delhi",
      unit: "NCR",
      description: "Located in the heart of India's industrial hub, our Delhi NCR facility offers excellent connectivity and logistics advantages for timely delivery across India and export markets."
    },
    {
      title: "Quality Certified",
      number: "ISO",
      unit: "9001:2015",
      description: "We are ISO 9001:2015 certified, demonstrating our commitment to international quality management standards and continuous improvement in all our processes."
    },
    {
      title: "Industry Trust",
      number: "Auto",
      unit: "Medical and Others",
      description: "Trusted by leading automotive, medical device and other manufacturers, we understand the stringent requirements of regulated industries and deliver components that meet or exceed specifications."
    },
    {
      title: "Material Expertise",
      number: "50+",
      unit: "Polymer Types",
      description: "We work with over 50 different polymer materials including engineering plastics, thermoplastics, and specialty compounds, ensuring the perfect material selection for your specific application requirements."
    },
    {
      title: "Client Retention",
      number: "95%",
      unit: "Repeat Business",
      description: "Our 95% client retention rate reflects our commitment to quality, reliability, and exceptional service. Long-term partnerships built on trust and consistent performance are the foundation of our success."
    }
  ];

  return <StatsCarousel highlights={highlights} />;
}
