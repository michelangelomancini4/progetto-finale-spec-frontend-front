import { useState } from "react";
import { Link } from "react-router-dom";
import { useFruitsSearch } from "../hooks/UseFruitSearch";
import { useFavorites } from "../context/FavoritesContext";

export default function Home() {

    // Custom hook to handle fruit search, filtering and sorting

    const {
        fruits,
        debSearch,
        setDebSearch,
        category,
        setCategory,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder
    } = useFruitsSearch();

    const { favorites, handleFavorite } = useFavorites();

    const [selectedFruits, setSelectedFruits] = useState([]);

    // Function to select up to 2 fruits for comparison

    function handleFruitComparison(fruit) {
        const alreadySelected = selectedFruits.some(f => f.id === fruit.id);

        if (alreadySelected) {
            setSelectedFruits(selectedFruits.filter(f => f.id !== fruit.id));
        } else if (selectedFruits.length < 2) {
            fetch(`http://localhost:3001/fruits/${fruit.id}`)
                .then(res => res.json())
                .then(data => {
                    setSelectedFruits([...selectedFruits, data.fruit]);
                })
                .catch(err => console.error("Errore nel fetch del frutto:", err));
        } else {
            alert("Puoi confrontare solo 2 frutti alla volta!");
        }
    }

    return (
        <>
            <Link to={`/`}><h1>FruitMatch:</h1></Link>
            <div>
                <div className="filterbar">
                    <input
                        type="text"
                        placeholder="Cerca frutto..."
                        value={debSearch}
                        onChange={(e) => setDebSearch(e.target.value)}
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Tutte le categorie</option>
                        <option value="Tropicale">Tropicale</option>
                        <option value="Agrume">Agrume</option>
                        <option value="Pomacea">Pomacea</option>
                        <option value="Bacca">Bacca</option>
                        <option value="Frutto di bosco">Frutto di bosco</option>
                    </select>
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                        <option value="title">Ordina per Titolo</option>
                        <option value="category">Ordina per Categoria</option>
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>

                <div className="fruitlist-container">
                    <ul className="fruitlist">
                        {fruits.map((fruit) => (
                            <li key={fruit.id}>
                                <div>
                                    <strong className="fruit-titlecategory">
                                        <Link to={`/fruits/${fruit.id}`}>{fruit.title}</Link>
                                    </strong>
                                    <p>{fruit.category}</p>
                                </div>
                                <Link to={`/fruits/${fruit.id}`}>
                                    <div className="fruit-img-wrapper">
                                        <img
                                            src={`/fruitsimages/${fruit.title.toLowerCase().replace(/\s/g, "")}.jpg`}
                                            alt={fruit.title}
                                            className="img-default"
                                        />
                                        <img
                                            src={`/fruitsimageshover/${fruit.title.toLowerCase().replace(/\s/g, "")}.jpg`}
                                            alt={`${fruit.title} hover`}
                                            className="img-hover"
                                        />
                                    </div>
                                </Link>

                                <div className="fruitbuttons">
                                    <button onClick={() => handleFruitComparison(fruit)}>
                                        {selectedFruits.some(f => f.id === fruit.id) ? "Rimuovi" : "Confronta"}
                                    </button>

                                    <button onClick={() => handleFavorite(fruit)}>
                                        <i className={`fa-solid ${favorites?.some(f => f.id === fruit.id) ? 'fa-xmark' : 'fa-star'}`}></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {selectedFruits.length > 0 ? (
                <div>
                    <h2>Confronto Frutti</h2>
                    <div className="comparison-panel">
                        {selectedFruits.map(fruit => (
                            <div key={fruit.id}>
                                <h3>{fruit.title}</h3>
                                <p><strong>Categoria:</strong> {fruit.category}</p>
                                <p><strong>Origine:</strong> {fruit.originCountry}</p>
                                <p><strong>Dolcezza:</strong> {fruit.sweetness}</p>
                                <p><strong>Stagione:</strong> {fruit.season}</p>
                                <p><strong>Calorie/per 100g:</strong> {fruit.caloriesPer100g}</p>
                                <p><strong>Vitamine:</strong> {fruit.vitamins}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : <p>Seleziona due frutti per il confronto</p>}
        </>
    );
}
