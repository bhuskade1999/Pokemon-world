import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemon } from "../Action/Action";
const PokemonCard: React.FC = () => {
  const [pokeData, setPokeData] = useState<any>(null);

  // Fetch the detailed data for the specific pokemon (e.g., abilities, stats)

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await fetchPokemon(parseInt(id));
        setPokeData(result);
      };
      fetchData();
    }
  }, [id]);

  if (!pokeData) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white w-[300px] p-4">
        <img
          className="w-full h-48 object-cover"
          src={pokeData.sprites.front_default}
          alt={pokeData.name}
        />
        <div className="p-4">
          <div className="text-2xl flex gap-2 font-semibold text-gray-800 capitalize">
            <h2> Name : </h2>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {pokeData.name}
            </h2>
          </div>

          <p className="text-gray-600 font-semibold">Id: {pokeData.id}</p>

          <div className="mt-2">
            <p className="font-medium text-gray-700">Types:</p>
            <ul className=" ml-7 list-disc">
              {pokeData.types.map((type: any) => (
                <li
                  key={type.type.name}
                  className="px-2 py-1 text-sm rounded-lg font-semibold text-gray-800 capitalize"
                  style={{ backgroundColor: getTypeColor(type.type.name) }}
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <p className="font-medium text-gray-700">Abilities:</p>
            <ul className=" ml-7 list-disc">
              {pokeData.abilities.map((ability: any) => (
                <li
                  key={ability.ability.name}
                  className="px-2 py-1 text-sm rounded-lg font-semibold text-gray-800 capitalize"
                >
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2 flex">
            <p className="font-medium text-gray-700">Weight:</p>
            <p className="px-2 py-1 text-sm rounded-lg font-semibold text-gray-800 capitalize">
              {pokeData.weight} kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get a color based on the Pokémon type
const getTypeColor = (type: string) => {
  const typeColors: { [key: string]: string } = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    bug: "bg-lime-500",
    normal: "bg-gray-400",
    psychic: "bg-pink-500",
    poison: "bg-purple-500",
    dragon: "bg-indigo-500",
    fairy: "bg-pink-200",
    // Add more types as necessary
  };
  return typeColors[type] || "bg-gray-500"; // Default to gray if no match
};

export default PokemonCard;
