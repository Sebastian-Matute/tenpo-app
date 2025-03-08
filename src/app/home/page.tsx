"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  url: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const offset = (page - 1) * itemsPerPage;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
        );

        if (!response.ok) {
          throw new Error("API Response failed");
        }

        const result = await response.json();

        const pokemonDetails = await Promise.all(
          result.results.map(async (pokemon: Pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );

        const totalCount = Math.min(2000, result.count);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
        setData(pokemonDetails);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Error: <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Error: <span className="text-red-500">{error}</span>
      </div>
    );
  }

  const handleLogout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center sm:items-start">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to the Pokedex</h1>

        <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center space-x-4 my-6">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500"
              >
                Previous
              </button>
              <span className="flex items-center text-gray-300">
                {page} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500"
              >
                Next
              </button>
            </div>

            {loading ? (
              <div className="text-center py-10 text-gray-300">
                Loading page..
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((pokemon) => (
                  <div
                    key={pokemon.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                  >
                    <div className="p-4 flex justify-center bg-gray-700">
                      <img
                        src={
                          pokemon.sprites.other["official-artwork"]
                            .front_default || pokemon.sprites.front_default
                        }
                        alt={pokemon.name}
                        className="h-40 object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between">
                        <p className="text-lg font-medium text-white capitalize">
                          {pokemon.name}
                        </p>
                        <p className="text-sm font-medium text-blue-400">
                          #{pokemon.id}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pokemon.types.map((type) => (
                          <span
                            key={type.type.name}
                            className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-200"
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="text-sm">
                          <span className="text-gray-400">Height:</span>{" "}
                          {pokemon.height / 10}m
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Weight:</span>{" "}
                          {pokemon.weight / 10}kg
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center space-x-4 my-6">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500"
              >
                Previous
              </button>
              <span className="flex items-center text-gray-300">
                {page} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
