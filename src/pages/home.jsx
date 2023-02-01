import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const defaultGames = [
    {
      id: 1,
      name: "Bottle Flip",
      url: "https://simpleiralgames.com",
      author: "Simple Viral Games",
      published_date: "2022-08-01 00:00:00",
    },
    {
      id: 2,
      name: "Tic Tac Toe",
      url: "https://minimalisticgames.com",
      author: "Minimalistic Games",
      published_date: "2022-06-15 00:00:00",
    },
    {
      id: 3,
      name: "Rock, Paper, Scissors",
      url: "https://classicsandbeyond.com",
      author: "Classics and Beyond",
      published_date: "2022-09-21 00:00:00",
    },
    {
      id: 4,
      name: "Solitaire",
      url: "https://cardgamesinc.com",
      author: "Card Games Inc.",
      published_date: "2022-07-02 00:00:00",
    },
  ];

  const [games, setGames] = useState([]);

  // if games are in local storage, use them, otherwise use default games
  useEffect(() => {
    if (localStorage.games) {
      setGames(JSON.parse(localStorage.games));
    } else {
      setGames(defaultGames);
      localStorage.setItem("games", JSON.stringify(defaultGames));
    }
  }, []);

  //   add a new game to the list of games
  const handleSubmit = (e) => {
    e.preventDefault();
    const newGame = {
      name: e.target.name.value,
      url: e.target.url.value,
      author: e.target.author.value,
      published_date: e.target.published_date.value,

      //   sets to a unique number
      id: Math.floor(Math.random() * 100000000),
    };
    setGames([...games, newGame]);
    localStorage.setItem("games", JSON.stringify([...games, newGame]));
  };

  return (
    <div>
      <div>
        <div>
          {/* available games */}
          <h1 className="text-center text-7xl">Available Games</h1>
          {games.map((game, index) => (
            <div key={index}>
              <div className="flex flex-col mb-10 items-center justify-center w-full h-auto bg-gray-100">
                <div className="flex my-10 flex-col items-center justify-center w-full h-full max-w-2xl p-4 mx-auto bg-white rounded-lg shadow-xl">
                  {/* games*/}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {game.name}
                      {/* {console.log(localStorage.games)} */}
                    </h1>

                    <Link href={`/${game.id}`}>View Game</Link>
                  </div>

                  {/* delete a game */}
                  <div>
                    <button
                      className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        const newGames = games.filter((_, i) => i !== index);
                        setGames(newGames);
                        localStorage.setItem("games", JSON.stringify(newGames));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* create a new game */}
        <div className="h-full">
          <h1 className="text-center text-4xl">Create a new game</h1>
          <form
            className="flex flex-col items-center justify-center w-full h-full max-w-2xl p-4 mx-auto bg-white rounded-lg shadow-xl"
            onSubmit={handleSubmit}
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
    </div>
  );
}
