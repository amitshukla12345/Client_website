import React, { useContext, useMemo } from 'react'
import { AppContext } from '../context/AppContext'

const DEFAULT_DEVICE_CONFIG = {
  height: 500,
  zoom: 100,
  posX: 50,
  posY: 50,
  overlay: true,
  overlayOpacity: 30
};

const DEFAULT_CONFIG = {
  desktop: { ...DEFAULT_DEVICE_CONFIG, height: 500 },
  laptop: { ...DEFAULT_DEVICE_CONFIG, height: 450 },
  tablet: { ...DEFAULT_DEVICE_CONFIG, height: 400 },
  mobile: { ...DEFAULT_DEVICE_CONFIG, height: 300 }
};

export default function ResponsiveHeroBanner({ pageName, fallbackImage, title, children }) {
  const { pageHeroBanners } = useContext(AppContext);

  const bannerData = useMemo(() => {
    return pageHeroBanners?.find(b => b.pageName === pageName);
  }, [pageHeroBanners, pageName]);

  const config = useMemo(() => {
    if (bannerData && bannerData.configData) {
      try {
        return JSON.parse(bannerData.configData);
      } catch (e) {
        console.error("Error parsing hero banner config", e);
      }
    }
    return DEFAULT_CONFIG;
  }, [bannerData]);

  const imageUrl = bannerData?.imageUrl || fallbackImage;

  // Generate a unique ID for this instance to scope the CSS
  const uniqueId = useMemo(() => `hero-${pageName.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`, [pageName]);

  const dConf = config.desktop || DEFAULT_CONFIG.desktop;
  const lConf = config.laptop || config.desktop || DEFAULT_CONFIG.laptop;
  const tConf = config.tablet || DEFAULT_CONFIG.tablet;
  const mConf = config.mobile || DEFAULT_CONFIG.mobile;

  return (
    <section className="relative w-full overflow-hidden flex justify-center items-center bg-[#FFFDF7]" id={uniqueId}>
      {/* 
        We use an embedded style block to handle media queries dynamically 
        so we don't rely on JS resize listeners, ensuring a smooth, jank-free load.
      */}
      <style>{`
        #${uniqueId} {
          height: ${dConf.height}px;
        }
        #${uniqueId} .hero-bg-image {
          object-position: ${dConf.posX}% ${dConf.posY}%;
          transform: scale(${dConf.zoom / 100});
          transform-origin: ${dConf.posX}% ${dConf.posY}%;
        }
        #${uniqueId} .hero-overlay {
          opacity: ${dConf.overlayOpacity / 100};
        }

        /* Laptop */
        @media (max-width: 1280px) {
          #${uniqueId} {
            height: ${lConf.height}px;
          }
          #${uniqueId} .hero-bg-image {
            object-position: ${lConf.posX}% ${lConf.posY}%;
            transform: scale(${lConf.zoom / 100});
            transform-origin: ${lConf.posX}% ${lConf.posY}%;
          }
          #${uniqueId} .hero-overlay {
            opacity: ${lConf.overlayOpacity / 100};
          }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          #${uniqueId} {
            height: ${tConf.height}px;
          }
          #${uniqueId} .hero-bg-image {
            object-position: ${tConf.posX}% ${tConf.posY}%;
            transform: scale(${tConf.zoom / 100});
            transform-origin: ${tConf.posX}% ${tConf.posY}%;
          }
          #${uniqueId} .hero-overlay {
            opacity: ${tConf.overlayOpacity / 100};
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          #${uniqueId} {
            height: ${mConf.height}px;
          }
          #${uniqueId} .hero-bg-image {
            object-position: ${mConf.posX}% ${mConf.posY}%;
            transform: scale(${mConf.zoom / 100});
            transform-origin: ${mConf.posX}% ${mConf.posY}%;
          }
          #${uniqueId} .hero-overlay {
            opacity: ${mConf.overlayOpacity / 100};
          }
        }
      `}</style>

      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`${pageName} Hero Banner`} 
          className="hero-bg-image absolute inset-0 w-full h-full object-cover shadow-sm transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[#EAD8C8]/30"></div>
      )}

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"></div>

      {/* Custom Children overlay */}
      {children}

      {/* Optional Title Layer (if provided) */}
      {title && (
        <div className="relative z-10 w-full px-6 flex justify-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">
            {title}
          </h1>
        </div>
      )}
    </section>
  )
}
