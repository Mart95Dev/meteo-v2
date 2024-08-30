import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useGeolocationStore from "@/app/store/useGeolocationStore";

interface AsideProps {
  isMobile: boolean;
}

export default function Aside({ isMobile }: AsideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { isGeolocationEnabled } = useGeolocationStore();

  const toggleAside = () => {
    setIsOpen(!isOpen);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 300); // Réinitialise après 300ms
  };

  if (!isMobile) {
    return (
      <aside>
        <p>aside</p>
        {/* Contenu de l'Aside en mode desktop */}
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
        <p>aside</p>
        {/* Contenu de l'Aside en mode mobile */}
      </aside>
    </>
  );
}