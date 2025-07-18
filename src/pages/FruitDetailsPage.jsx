import { useParams, Link } from "react-router-dom";
import { useFetchFruit } from "../hooks/UseFetchFruit";
import { useFavorites } from "../context/FavoritesContext";

export default function FruitDetailsPage() {
    const { id } = useParams();
    const { fruit, error } = useFetchFruit(id);
    const { favorites, handleFavorite } = useFavorites();

    if (error) return <p>Errore nel caricamento del frutto.</p>;
    if (!fruit) return <p>Caricamento...</p>;

    const isFavorite = favorites.some(f => f.id === fruit.id);

    return (
        <>
            <header className="fruit-details-header">
                <Link to="/">
                    <h1><i className="fa-solid fa-house"></i> FruitMatch</h1>
                </Link>
            </header>

            <div className="fruit-details-container">
                <div className="fruit-info">
                    <h2>{fruit.title}</h2>
                    <p><strong>Categoria:</strong> {fruit.category}</p>
                    <p><strong>Origine:</strong> {fruit.originCountry}</p>
                    <p><strong>Dolcezza:</strong> {fruit.sweetness}</p>
                    <p><strong>Stagione:</strong> {fruit.season}</p>
                    <p><strong>Calorie per 100g:</strong> {fruit.caloriesPer100g}</p>
                    <p><strong>Vitamine:</strong> {fruit.vitamins}</p>

                    <button onClick={() => handleFavorite(fruit)} className="fav-button">
                        <i className={`fa-solid ${isFavorite ? 'fa-xmark' : 'fa-star'}`}></i>
                        {isFavorite ? ' Rimuovi dai preferiti' : ' Aggiungi ai preferiti'}
                    </button>
                </div>

                <div className="fruit-image">
                    <img
                        src={`/fruitsimages/${fruit.title.toLowerCase().replace(/\s/g, "")}.jpg`}
                        alt={fruit.title}
                    />
                </div>
            </div>
        </>
    );
}
