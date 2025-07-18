import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./pages/Home";
import FruitDetailsPage from "./pages/FruitDetailsPage";
import FavoritesBar from "./components/FavoritesBar";

function App() {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <BrowserRouter>
      <FavoritesProvider>

        <button
          className="favorites-toggle"
          onClick={() => setShowFavorites(prev => !prev)}
        >
          <i className={`fa-solid ${showFavorites ? 'fa-xmark' : 'fa-star'}`}></i>
          {showFavorites ? ' Chiudi Preferiti' : ' Mostra Preferiti'}
        </button>

        {showFavorites && (
          <FavoritesBar />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fruits/:id" element={<FruitDetailsPage />} />
        </Routes>

      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
