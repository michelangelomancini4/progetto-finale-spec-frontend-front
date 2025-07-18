import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

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
