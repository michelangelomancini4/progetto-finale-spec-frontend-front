import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FruitDetailsPage({ favorites, handleFavorite }) {
    const { id } = useParams();
    const [fruit, setFruit] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/fruits/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Frutto non trovato");
                return res.json();
            })
            .then((data) => {
                console.log(" Dato ricevuto:", data);
                setFruit(data.fruit);
            })
            .catch((err) => console.error(" Errore:", err));
    }, [id]);

    if (!fruit) return <p>Caricamento...</p>;

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
                        <i className={`fa-solid ${favorites?.some(f => f.id === fruit.id) ? 'fa-xmark' : 'fa-star'}`}></i>
                        {favorites?.some(f => f.id === fruit.id) ? ' Rimuovi dai preferiti' : ' Aggiungi ai preferiti'}
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
