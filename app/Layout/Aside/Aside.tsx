import React from "react";

export default function Aside() {
  return (
    <aside>
      <section className="history-box ">
        <h1 className="poppins-regular title-history">
          Historique des recherches
        </h1>
        <ul>
          {/* En-têtes de colonnes */}
          <li className="header-row">
            <span>Lieu</span>
            <span>Date</span>
            <span>Temp</span>
            <span>Vent</span>
          </li>

             {/* Affichage des résultats de recherche */}
             {/* {searchResults.map((result, index) => ( */}
            <li  className="data-row">
              <span>city</span>
              <span>date</span>
              <span>21°</span>
              <span>0.5</span>
            </li>
          
        </ul>
      </section>
      <section className="map-box">
        <div>
          <h1>maps ou photo</h1>
        </div>
      </section>
    </aside>
  );
}
