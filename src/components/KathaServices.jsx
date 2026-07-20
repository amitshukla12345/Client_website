import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaOm, FaFire, FaPrayingHands, FaUsers, FaMapMarkerAlt, FaArrowRight, FaCrosshairs } from 'react-icons/fa';

export default function KathaServices() {
  
  const services = [
    {
      title: "श्रीमद भागवत कथा",
      subtitle: "भगवान श्रीकृष्ण की दिव्य कथा का श्रवण और चिंतन।",
      icon: FaBookOpen,
      image: "https://placehold.co/400x500/FFF3E0/E05A10?text=Krishna+Image"
    },
    {
      title: "श्री राम कथा",
      subtitle: "मर्यादा पुरुषोत्तम श्रीराम के चरित्र का रसपान।",
      icon: FaCrosshairs, // Placeholder for Bow
      image: "https://placehold.co/400x500/FFF3E0/E05A10?text=Rama+Image"
    },
    {
      title: "शिव महापुराण",
      subtitle: "महादेव की अनंत महिमा और शिव तत्व का ज्ञान।",
      icon: FaOm, // Placeholder for Trident
      image: "https://placehold.co/400x500/FFF3E0/E05A10?text=Shiva+Image"
    },
    {
      title: "देवी भागवत कथा",
      subtitle: "आदिशक्ति जगदम्बा की कथा और महिमा का गुणगान।",
      icon: FaFire, // Placeholder for Lotus/Diya
      image: "https://placehold.co/400x500/FFF3E0/E05A10?text=Durga+Image"
    },
    {
      title: "सुंदरकांड पाठ",
      subtitle: "श्री हनुमान जी की कृपा और सुंदरकांड का पाठ।",
      icon: FaPrayingHands, // Placeholder for Hanuman pose
      image: "https://placehold.co/400x500/FFF3E0/E05A10?text=Hanuman+Image"
    },
    {
      title: "अन्य धार्मिक सेवाएँ",
      subtitle: "पूजन, अनुष्ठान, जागरण एवं अन्य धार्मिक कार्यक्रम।",
      icon: FaOm, // Placeholder for Kalash
      image: "https://placehold.co/400x500/FFF3E0/E05A10?text=Pooja+Image"
    }
  ];

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundColor: '#FCF9F5',
        backgroundImage: `
          radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, rgba(252,249,245,1) 70%),
          url('/images/spiritual_bg.png')
        `,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, bottom center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundBlendMode: 'normal, multiply'
      }}
    >
      {/* Decorative Background - Clean subtle color */}
      
      {/* Left Hanging Bell (Image) */}
      <div className="absolute top-0 left-4 sm:left-12 lg:left-24 w-12 sm:w-16 md:w-20 pointer-events-none drop-shadow-lg z-10">
        <img src="/images/bell.png" alt="Bell Left" className="w-full h-auto mix-blend-multiply" onError={(e) => e.target.style.display = 'none'} />
      </div>
      
      {/* Right Hanging Bell (Image) */}
      <div className="absolute top-0 right-4 sm:right-12 lg:right-24 w-12 sm:w-16 md:w-20 pointer-events-none drop-shadow-lg z-10">
         <img src="/images/bell.png" alt="Bell Right" className="w-full h-auto mix-blend-multiply" onError={(e) => e.target.style.display = 'none'} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        
        {/* HEADER */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="text-[#D4AF37] text-xl">❁</span>
            <span className="text-[13px] font-bold text-[#E05A10] tracking-[0.2em]">सेवा ही समर्पण है</span>
            <span className="text-[#D4AF37] text-xl">❁</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-[#3D2B20] mb-5 tracking-wide">हमारी सेवाएँ</h2>
          <div className="flex items-center justify-center space-x-2 mb-5">
             <div className="w-8 h-[1px] bg-[#D4AF37]/50"></div>
             <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
             <div className="w-8 h-[1px] bg-[#D4AF37]/50"></div>
          </div>
          <p className="text-[#5C4033] text-[15px] sm:text-base font-medium max-w-2xl mx-auto">
            भक्ति, ज्ञान और सेवा के माध्यम से हम समाज में आध्यात्मिक चेतना का प्रसार कर रहे हैं।
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-5 mb-16 justify-items-center">
          {services.map((svc, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="w-full max-w-[240px] bg-white rounded-[20px] overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-white flex flex-col group relative"
            >
              {/* Inner glowing effect container */}
              <div className="absolute inset-0 border-[2px] border-[#FFF8DC] rounded-[20px] pointer-events-none z-20"></div>

              <div className="h-[200px] w-full relative">
                <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                
                {/* Overlapping Icon */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-[3px] border-[#FFF8DC] z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 bg-[#FFF8DC] rounded-full flex items-center justify-center">
                    <svc.icon className="text-[#D4AF37] text-sm" />
                  </div>
                </div>
              </div>
              
              <div className="pt-10 pb-6 px-4 flex-grow flex flex-col items-center text-center relative z-0 bg-gradient-to-b from-white to-[#FFFDF5]">
                <h4 className="font-serif font-black text-[17px] text-[#3D2B20] mb-2">{svc.title}</h4>
                <p className="text-[#6B5A50] text-[11px] leading-relaxed mb-5 flex-grow font-medium">
                  {svc.subtitle}
                </p>
                <Link to="/services" className="text-[#D48500] font-bold text-[13px] flex items-center space-x-1 group-hover:text-[#E05A10] transition-colors">
                  <span>अधिक जानें</span>
                  <FaArrowRight className="text-[10px] mt-[2px]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS BAR */}
        <div className="bg-gradient-to-r from-[#FFF8DC]/80 via-[#FFF3E0] to-[#FFF8DC]/80 border border-[#D4AF37]/30 rounded-2xl p-6 shadow-sm mb-12 max-w-5xl mx-auto relative overflow-hidden">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-x divide-[#D4AF37]/20">
            <div className="flex items-center justify-center space-x-3 px-2">
              <FaUsers className="text-[#D4AF37] text-3xl" />
              <div className="text-left">
                <div className="font-black text-[#3D2B20] text-xl leading-none">25+</div>
                <div className="text-[11px] text-[#5C4033] font-bold mt-1">वर्षों का अनुभव</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 px-2">
              <FaBookOpen className="text-[#D4AF37] text-3xl" />
              <div className="text-left">
                <div className="font-black text-[#3D2B20] text-xl leading-none">500+</div>
                <div className="text-[11px] text-[#5C4033] font-bold mt-1">कथा आयोजन</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 px-2">
              <FaMapMarkerAlt className="text-[#D4AF37] text-3xl" />
              <div className="text-left">
                <div className="font-black text-[#3D2B20] text-xl leading-none">20+</div>
                <div className="text-[11px] text-[#5C4033] font-bold mt-1">राज्यों में सेवा</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 px-2">
              <FaPrayingHands className="text-[#D4AF37] text-3xl" />
              <div className="text-left">
                <div className="font-black text-[#3D2B20] text-xl leading-none">15000+</div>
                <div className="text-[11px] text-[#5C4033] font-bold mt-1">श्रद्धालु परिवार</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 px-2">
              <FaOm className="text-[#D4AF37] text-3xl" />
              <div className="text-left">
                <div className="font-black text-[#3D2B20] text-xl leading-none">5</div>
                <div className="text-[11px] text-[#5C4033] font-bold mt-1">मुख्य सेवाएँ</div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BUTTON */}
        <div className="text-center relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent -z-10"></div>
          <Link to="/services" className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D48500] to-[#E05A10] hover:from-[#c27a00] hover:to-[#c94d0d] text-white font-bold text-sm sm:text-base px-10 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105">
            <span>सभी सेवाएँ देखें</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

      </div>
    </section>
  );
}
