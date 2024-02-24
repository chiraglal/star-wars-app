// src/components/Planet.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function Planet({ planet }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const promises = planet.residents.slice(0, 2).map(async (residentUrl) => {
        try {
          const response = await axios.get(residentUrl);
          const { name, height, mass, gender } = response.data;
          return { name, height, mass, gender };
        } catch (error) {
          console.error("Error fetching resident:", error);
          return null;
        }
      });

      const residentData = await Promise.all(promises);
      setResidents(residentData.filter(Boolean));
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="bg-white p-4 rounded-sm shadow-md hover:shadow-lg hover:rounded-lg transition duration-100 cursor-pointer">
      <h2 className="text-xl font-bold mb-2">{planet.name}</h2>
      <p>
        <strong>Climate:</strong> {planet.climate}
      </p>
      <p>
        <strong>Terrain:</strong> {planet.terrain}
      </p>
      <p>
        <strong>Population:</strong> {planet.population}
      </p>
      <h3 className="mt-2">Notable Residents:</h3>
      <ul className="pl-4">
        {residents.map((resident, index) => (
          <li key={index}>
            <strong>Name:</strong> {resident.name}
            <br />
            <strong>Height:</strong> {resident.height}
            <br />
            <strong>Mass:</strong> {resident.mass}
            <br />
            <strong>Gender:</strong> {resident.gender}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planet;
