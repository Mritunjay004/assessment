const { createContext, useEffect, useState } = require("react");

const GameContext = createContext();

export default function GameProvider({ children }) {
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

  useEffect(() => {
    if (localStorage.games) {
      setGames(JSON.parse(localStorage.games));
    } else {
      setGames(defaultGames);
      localStorage.setItem("games", JSON.stringify(defaultGames));
    }
  }, []);

  async function getAllGames() {
    return localStorage.getItem("games");
  }

  async function updateGame(game) {
    const data = await getAllGames();
    const games = JSON.parse(data);
    const updatedGames = games.map((g) => {
      if (g.id === game.id) {
        return game;
      }
      return g;
    });
    setGames(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
  }

  async function addGame(e) {
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
    window.location.reload();
  }

  async function deleteGame(id) {
    const data = await getAllGames();
    const games = JSON.parse(data);
    const updatedGames = games.filter((game) => game.id !== id);
    setGames(updatedGames);
    localStorage.setItem("games", JSON.stringify(updatedGames));
    window.location.reload();
  }

  return (
    <GameContext.Provider
      value={{ getAllGames, updateGame, addGame, deleteGame }}
    >
      {children}
    </GameContext.Provider>
  );
}

const GameConsumer = GameContext.Consumer;
export { GameConsumer, GameContext };
