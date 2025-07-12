
function FavoritesBar({ favorites, handleFavorite }) {
    return (
        <div>
            <h3>Preferiti</h3>
            {favorites.length === 0 ? (
                <p>Nessun preferito</p>
            ) : (
                favorites.map((fruit) => (
                    <div key={fruit.id}>
                        <p>{fruit.title}</p>
                        <button onClick={() => handleFavorite(fruit)}>Rimuovi!</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default FavoritesBar;
