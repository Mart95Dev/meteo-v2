import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useGeolocationStore from "@/app/store/useGeolocationStore";
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/app/components/Map/Map'), {
  ssr: false
});

interface AsideProps {
  isMobile: boolean;
}

export default function Aside({ isMobile }: AsideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { isGeolocationEnabled, latitude, longitude } = useGeolocationStore();

  const toggleAside = () => {
    setIsOpen(!isOpen);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 300); // Réinitialise après 300ms
  };

  const mapHeight = isMobile ? '100%' : '100%';

  
  const renderAsideContent = () => {
    if (!isGeolocationEnabled) {
      return <p className="aside-text">Localisation en attente</p>;
    }
    return (
      <DynamicMap latitude={latitude} longitude={longitude} height={mapHeight} />
    );
  };

  if (!isMobile) {
    return (
      <aside className="desktop-aside">
        {renderAsideContent()}
      </aside>
    );
  }

    return (
    <>
      {isMobile && isGeolocationEnabled && (
        <button 
          className={`aside-toggle ${isActive ? 'active' : ''}`}
          onClick={toggleAside}
          aria-label={isOpen ? "Fermer le panneau latéral" : "Ouvrir le panneau latéral"}
        >
          {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      )}
      <aside className={`mobile ${isOpen ? 'open' : ''}`}>
        {renderAsideContent()}
      </aside>
    </>
  );
}