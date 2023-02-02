import { GameContext } from "context/gameContext";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";

export default function Home() {
  const { getAllGames, addGame, deleteGame } = useContext(GameContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllGames();
      const json = await response;
      setData(JSON.parse(json));
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-center text-7xl">Available Games</h1>
        {data === null ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data.map((game, index) => (
              <div key={index}>
                <div className="flex flex-col mb-10 items-center justify-center w-full h-auto bg-gray-100">
                  <div className="flex my-10 flex-col items-center justify-center w-full h-full max-w-2xl p-4 mx-auto bg-white rounded-lg shadow-xl">
                    {/* games*/}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {game.name}
                      </h1>

                      <Link href={`/${game.id}`}>View Game</Link>
                    </div>

                    {/* delete a game */}
                    <div>
                      <button
                        className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteGame(game.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* create a new game */}
      <div className="h-full">
        <h1 className="text-center text-4xl">Create a new game</h1>
        <form
          className="flex flex-col items-center justify-center w-full h-full max-w-2xl p-4 mx-auto bg-white rounded-lg shadow-xl"
          onSubmit={(e) => addGame(e)}
        >
          <label htmlFor="name">Name</label>
          <input
            className="border border-solid"
            type="text"
            id="name"
            name="name"
          />
          <label htmlFor="url">URL</label>
          <input
            className="border border-solid"
            type="text"
            id="url"
            name="url"
          />

          <label htmlFor="author">Author</label>
          <input
            className="border border-solid"
            type="text"
            id="author"
            name="author"
          />

          <label htmlFor="published_date">Published Date</label>
          <input
            className="border border-solid"
            type="date"
            id="published_date"
            name="published_date"
          />

          <button
            className="bg-green-500 mt-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
