import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import FruitDetailsPage from "./pages/FruitDetailsPage";
import FavoritesBar from "./components/FavoritesBar"


function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });


  // function to handle favorites
  const handleFavorite = (favFruit) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some(f => f.id === favFruit.id)

      if (isAlreadyFavorite) {
        return prev.filter(f => f.id !== favFruit.id)
      }
      else {
        return [...prev, favFruit]
      }
    })
  }
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  return (
    <BrowserRouter>
      <FavoritesBar favorites={favorites} handleFavorite={handleFavorite} />
      <Routes>
        <Route path="/" element={<Home favorites={favorites} handleFavorite={handleFavorite} />} />
        <Route path="/fruits/:id" element={<FruitDetailsPage favorites={favorites} handleFavorite={handleFavorite} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
