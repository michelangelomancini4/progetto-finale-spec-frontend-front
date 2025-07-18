import { useState, useEffect } from "react";

export function useFavorites() {
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
            if (isAlreadyFavorite) {
                return prev.filter(f => f.id !== favFruit.id);
            } else {
                return [...prev, favFruit];
            }
        });
    };

    return { favorites, handleFavorite };
}
