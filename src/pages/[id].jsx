import { GameContext } from "context/gameContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const GameInfo = ({ id }) => {
  const { getAllGames, updateGame } = useContext(GameContext);
  const games = getAllGames();
  //   console.log(games);

  const [data, setData] = useState();
  const retrieveDataFromPromise = async () => {
    const promiseData = await games;
    console.log(JSON.parse(promiseData));
    setData(JSON.parse(promiseData));
  };

  useEffect(() => {
    retrieveDataFromPromise();
  }, []);

  // edit a game
  const editGame = (e, gameId) => {
    const gameToEdit = {};
    gameToEdit.id = gameId;
    gameToEdit.name = e.target.name.value;
    gameToEdit.url = e.target.url.value;
    gameToEdit.author = e.target.author.value;
    gameToEdit.published_date = e.target.published_date.value;
    updateGame(gameToEdit);

    // reload the page to show the updated data
    window.location.reload();
  };

  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div>
      {data &&
        data.map((game) => {
          if (game.id == id) {
            return (
              <div className="grid justify-center" key={game.id}>
                <div>
                  <h1 className="text-center mt-20 text-5xl ">{game.name}</h1>
                  <p className="mt-3">URL: {game.url}</p>
                  <p className="mt-3">Author: {game.author}</p>
                  <p className="mt-3">
                    Published On: <hr />
                    {new Date(game.published_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex gap-10 mt-10 ">
                  {/* Edit a game */}
                  <div>
                    <button
                      className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setShowEditForm(!showEditForm);
                      }}
                    >
                      Edit
                    </button>

                    {/* should be hidden by default and only show when the button is clicked */}
                    {showEditForm && (
                      <form
                        className=" flex flex-col items-center justify-center w-full h-full max-w-2xl p-4 mx-auto bg-white rounded-lg shadow-xl"
                        onSubmit={(e) => {
                          editGame(e, game.id);
                          setShowEditForm(false);
                        }}
                      >
                        <label htmlFor="name">Name</label>
                        <input
                          className="border border-solid "
                          type="text"
                          id="name"
                          name="name"
                        />
                        <label htmlFor="url">URL</label>
                        <input
                          className="border border-solid "
                          type="text"
                          id="url"
                          name="url"
                        />

                        <label htmlFor="author">Author</label>
                        <input
                          className="border border-solid "
                          type="text"
                          id="author"
                          name="author"
                        />

                        <label htmlFor="published_date">Published Date</label>
                        <input
                          className="border border-solid "
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
                    )}
                  </div>

                  <div>
                    {/* home button */}
                    <Link href="/home">
                      <button className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default GameInfo;

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}
