import React, { useContext } from 'react';
import { FaMapMarkerAlt, FaHome, FaCalendarAlt, FaClock, FaOm, FaCrown, FaQuoteLeft, FaQuoteRight, FaUsers } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

export default function YajmanIntro() {
  const { yajman } = useContext(AppContext);

  // If no yajman data exists, or if it's explicitly hidden, don't render
  if (!yajman || !yajman.yajmanName || yajman.isPublished === false) {
    return null;
  }

  // Filter and sort family members
  const visibleFamilyMembers = (yajman.familyMembers || [])
    .filter(m => m.isVisible !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Helper to parse crop data and return inline styles for object-position/transform
  const renderCropStyle = (cropDataStr, zoomFactor = 1) => {
    if (!cropDataStr) return {};
    try {
      const data = JSON.parse(cropDataStr);
      return {
        objectPosition: `${data.posX}% ${data.posY}%`,
        transform: `scale(${data.zoom * zoomFactor})`
      };
    } catch (e) {
      return {};
    }
  };

  const infoCards = [
    { icon: FaMapMarkerAlt, title: 'वर्तमान निवास', value: yajman.currentAddress },
    { icon: FaHome, title: 'मूल निवास', value: yajman.nativePlace },
    { icon: FaCalendarAlt, title: 'कथा दिवस', value: yajman.kathaDay },
    { icon: FaClock, title: 'कथा समय', value: yajman.kathaTime },
    { icon: FaOm, title: 'कथा आयोजन', value: yajman.kathaName },
  ].filter(item => !!item.value); // Only keep cards with values

  return (
    <div className="w-full bg-[#FFFDF7] py-16 px-4 overflow-hidden relative font-sans">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-5 pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-5 pointer-events-none rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="absolute top-1/4 left-1/4 w-full h-full max-w-3xl bg-gradient-to-tr from-[#FFF3E0]/40 to-transparent blur-3xl rounded-full pointer-events-none mix-blend-multiply"></div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]"></div>
            <div className="text-[#D4AF37] flex space-x-2 text-sm sm:text-base">
              <span>॥</span>
              <span className="font-serif tracking-widest font-bold">जय श्री राम</span>
              <span>॥</span>
            </div>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]"></div>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#3D2B20]">श्रद्धालु यजमान परिचय</h2>
          <p className="text-[#8B5A2B] mt-2 font-medium tracking-wide">कथा आयोजन एवं यजमान विवरण</p>
        </div>

        {/* The Glassmorphism Premium Card */}
        <div className="relative bg-white/70 backdrop-blur-xl border-2 border-[#D4AF37]/30 rounded-[20px] shadow-[0_20px_50px_-12px_rgba(212,175,55,0.15)] overflow-hidden">
          
          {/* Right Corner Badge */}
          {yajman.kathaName && (
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-6 py-2 rounded-bl-3xl shadow-lg font-bold text-sm sm:text-base tracking-wide flex items-center space-x-2 border-b-2 border-l-2 border-white/20">
                <FaOm className="text-white/80" />
                <span>{yajman.kathaName}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-stretch p-6 sm:p-10 lg:p-12 gap-10 lg:gap-14">
            
            {/* LEFT SIDE: Image */}
            <div className="w-full lg:w-[35%] relative group flex-shrink-0 flex flex-col items-center justify-center">
              {(yajman.originalImageUrl || yajman.profileImageUrl) && (
                <>
                  <div className="relative p-2 bg-gradient-to-br from-[#D4AF37] via-[#FFF3E0] to-[#D4AF37] rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] w-full max-w-[400px]">
                    <div className="absolute inset-0 border border-white/50 rounded-3xl z-10 pointer-events-none"></div>
                    <div className="w-full aspect-[4/5] rounded-[20px] overflow-hidden relative bg-[#FFF3E0]">
                      <img 
                        src={yajman.originalImageUrl || yajman.profileImageUrl} 
                        alt={yajman.yajmanName} 
                        className="w-full h-full object-cover"
                        style={renderCropStyle(yajman.cropData)}
                      />
                      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E05A10] to-[#C04000] text-white px-8 py-3 rounded-lg shadow-xl border-2 border-[#D4AF37] font-bold tracking-widest text-lg md:text-xl whitespace-nowrap z-20 flex items-center space-x-2">
                    <FaCrown className="text-[#D4AF37]" />
                    <span>मुख्य यजमान</span>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT SIDE: Details */}
            <div className={`w-full ${(yajman.originalImageUrl || yajman.profileImageUrl) ? 'lg:w-[65%]' : 'lg:w-full text-center items-center'} flex flex-col justify-center space-y-8 mt-6 lg:mt-0 relative z-10`}>
              
              {/* Name Section */}
              <div className={`relative ${!(yajman.originalImageUrl || yajman.profileImageUrl) ? 'flex flex-col items-center' : ''}`}>
                <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#800000] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#800000] to-[#E05A10]">
                  {yajman.yajmanName}
                </h3>
                {yajman.wifeName && (
                  <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37] mt-2 tracking-wide">
                    एवं {yajman.wifeName}
                  </h4>
                )}
                <div className="h-[2px] w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mt-4"></div>
              </div>

              {/* Info Cards Grid */}
              {infoCards.length > 0 && (
                <div className={`grid grid-cols-2 sm:grid-cols-3 ${!(yajman.originalImageUrl || yajman.profileImageUrl) ? 'md:grid-cols-4 lg:grid-cols-5 place-items-center max-w-4xl' : 'md:grid-cols-4 lg:grid-cols-5'} gap-4`}>
                  {infoCards.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white/60 backdrop-blur-md border border-[#D4AF37]/40 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center space-y-2 hover:-translate-y-1 w-full"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#FFF3E0] text-[#E05A10] flex items-center justify-center text-lg group-hover:bg-[#E05A10] group-hover:text-white transition-colors border border-[#E05A10]/20">
                        <item.icon />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-[#8B5A2B] font-semibold mb-0.5">{item.title}</p>
                        <p className="text-xs sm:text-sm font-bold text-[#3D2B20] leading-tight line-clamp-2">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Blessing Box */}
              {yajman.blessingMessage && (
                <div className={`relative bg-gradient-to-br from-[#FFF8DC]/80 to-white/60 p-6 sm:p-8 rounded-2xl border-l-4 border-[#D4AF37] shadow-inner mt-4 ${!(yajman.originalImageUrl || yajman.profileImageUrl) ? 'max-w-4xl w-full' : ''}`}>
                  <FaQuoteLeft className="absolute top-4 left-4 text-4xl text-[#D4AF37]/20" />
                  <p className="text-center text-[#5C4033] font-medium text-sm sm:text-base leading-relaxed px-6 sm:px-10 italic">
                    {yajman.blessingMessage}
                  </p>
                  <FaQuoteRight className="absolute bottom-4 right-4 text-4xl text-[#D4AF37]/20" />
                </div>
              )}

              {/* Bottom Family Section */}
              {visibleFamilyMembers.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 w-full">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent flex-grow max-w-[150px]"></div>
                    <h4 className="font-bold text-[#3D2B20] text-xl px-4 font-serif flex items-center space-x-2">
                      <FaUsers className="text-[#E05A10]" />
                      <span>समस्त यजमान परिवार</span>
                    </h4>
                    <div className="h-px bg-gradient-to-r from-[#D4AF37]/50 via-[#D4AF37]/50 to-transparent flex-grow max-w-[150px]"></div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                    {visibleFamilyMembers.map((member, index) => (
                      <div key={index} className="flex flex-col items-center group w-28 sm:w-32">
                        {(member.originalImageUrl || member.imageUrl) ? (
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-[#D4AF37] to-[#E05A10] shadow-md mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                            <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white">
                              <img 
                                src={member.originalImageUrl || member.imageUrl} 
                                alt={member.name} 
                                className="w-full h-full object-cover"
                                style={renderCropStyle(member.cropData)}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-[#D4AF37] to-[#E05A10] shadow-md mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                            <div className="w-full h-full rounded-full border-[3px] border-white bg-[#FFF3E0] flex items-center justify-center text-3xl font-bold text-[#E05A10]/40">
                              {member.name ? member.name.charAt(0) : '?'}
                            </div>
                          </div>
                        )}
                        {member.name && <h5 className="font-bold text-[#3D2B20] text-sm sm:text-base text-center leading-tight mb-1.5">{member.name}</h5>}
                        {member.relation && <p className="text-[11px] sm:text-xs text-[#E05A10] font-bold bg-[#FFF3E0] px-3 py-1 rounded-full shadow-sm">{member.relation}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
