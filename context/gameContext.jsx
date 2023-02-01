const { createContext } = require("react");

const GameContext = createContext();

export default function GameProvider({ children }) {
  async function getAllGames() {
    return localStorage.games;
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
    localStorage.setItem("games", JSON.stringify(updatedGames));
  }

  return (
    <GameContext.Provider value={{ getAllGames, updateGame }}>
      {children}
    </GameContext.Provider>
  );
}

const GameConsumer = GameContext.Consumer;
export { GameConsumer, GameContext };
