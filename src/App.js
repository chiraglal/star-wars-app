// src/App.js
import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";

// Lazy load the Planet component
const Planet = lazy(() => import("./components/Planet"));

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchPlanets = async (url) => {
    try {
      const response = await axios.get(url);
      setPlanets(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error("Error fetching planets:", error);
      setPlanets([]);
      setNextPage(null);
      setPrevPage(null);
    }
  };

  useEffect(() => {
    fetchPlanets("https://swapi.dev/api/planets/");
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchPlanets(prevPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Star Wars Planets Directory
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {planets.map((planet, index) => (
            <Planet key={index} planet={planet} />
          ))}
        </Suspense>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className={`bg-blue-500 rounded-md font-semibold text-white px-4 py-2 rounded ${
            !prevPage ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={handlePrevPage}
          disabled={!prevPage}
        >
          Previous
        </button>
        <button
          className={`bg-blue-500 rounded-md font-semibold text-white px-4 py-2 rounded ml-2 ${
            !nextPage ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={handleNextPage}
          disabled={!nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
