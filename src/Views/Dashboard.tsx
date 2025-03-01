import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonList, fetchWithPegination } from "../Action/Action";
interface Pokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}
const Dashboard: React.FC = () => {
  const [pokemonList, setPokemonList] = React.useState<
    Array<{ name: string; url: string }>
  >([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [pokemonDetails, setPokemonDetails] = React.useState<Pokemon>();

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetchPokemonList();
      setPokemonDetails(result);
      setPokemonList(result?.results);
    };
    fetchData();
  }, []);

  const handleNext = async () => {
    const url = pokemonDetails?.next;
    if (!url) return;
    let result = await fetchWithPegination(url);
    setPokemonDetails(result);
    setPokemonList(result?.results);
  };

  const handlePrev = async () => {
    const url = pokemonDetails?.previous;
    if (!url) return;
    let result = await fetchWithPegination(url);
    setPokemonDetails(result);
    setPokemonList(result?.results);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="">
      <div className="w-full h-full flex  py-5 flex-col  items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        <h3 className="text-3xl font-medium text-gray-700 mb-6">
          Pokemon World
        </h3>
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative flex items-center border rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              className="w-full text-[15px] bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-sm rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="UI Kits, Dashboards..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-5 px-5 max-h-[69vh] overflow-y-scroll bg-gray-200 h-auto">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex justify-center items-center p-4 bg-gray-300 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl h-fit"
          >
            <Link to={`/pokemon/${extractPokemonId(pokemon.url)}`}>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent capitalize">
                {pokemon.name}
              </span>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center py-5">
        <div className="flex flex-col items-center">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePrev}
              disabled={!pokemonDetails?.previous}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={!pokemonDetails?.next}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function extractPokemonId(url: string) {
  const regex = /\/(\d+)\/$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
