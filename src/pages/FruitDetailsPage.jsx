import { useParams } from "react-router-dom";
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
            <div>
                <div>
                    <h2>{fruit.title}</h2>
                    <p><strong>Categoria:</strong> {fruit.category}</p>
                    <p><strong>Origine:</strong> {fruit.originCountry}</p>
                    <p><strong>Dolcezza:</strong> {fruit.sweetness}</p>
                    <p><strong>Stagione:</strong> {fruit.season}</p>
                    <p><strong>Calorie per 100g:</strong> {fruit.caloriesPer100g}</p>
                    <p><strong>Vitamine:</strong> {fruit.vitamins}</p>
                </div>
                <button onClick={() => handleFavorite(fruit)}>
                    {favorites?.some(f => f.id === fruit.id) ? '✖️' : '⭐'}
                </button>
            </div>

            <img
                src={`/fruitsimages/${fruit.title.toLowerCase().replace(/\s/g, "")}.jpg`}
                alt={fruit.title}
            />
        </>
    );
}
