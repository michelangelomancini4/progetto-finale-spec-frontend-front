import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

    // Initialize favorites state from localStorage 

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    // Update localStorage every time favorites change

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Toggle favorite: add if not present, remove if already favorited

    const handleFavorite = (favFruit) => {
        setFavorites((prev) => {
            const isAlreadyFavorite = prev.some(f => f.id === favFruit.id);
            return isAlreadyFavorite
                ? prev.filter(f => f.id !== favFruit.id)
                : [...prev, favFruit];
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, handleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
