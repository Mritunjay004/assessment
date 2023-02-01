import "@/styles/globals.css";
import GameProvider from "context/gameContext";

export default function App({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}
