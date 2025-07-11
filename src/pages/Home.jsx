import { useState, useEffect } from "react";
import { Link } from "react-router-dom"


export default function Home() {
    const [fruits, setFruits] = useState([]);

    // search and filter States
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    // order States
    const [sortField, setSortField] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    // comparison states
    const [selectedFruits, setSelectedFruits] = useState([]);


    useEffect(() => {
        const queryParams = [];

        if (search) queryParams.push(`search=${search}`);
        if (category) queryParams.push(`category=${category}`);
        const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

        fetch(`http://localhost:3001/fruits${queryString}`)
            .then((res) => res.json())
            .then((data) => setFruits(getSortedFruits(data)))
            .catch((err) => console.error("Errore nel fetch:", err));
    }, [search, category, sortField, sortOrder]);

    // function to manage the order
    function getSortedFruits(data) {
        const sorted = [...data].sort((a, b) => {
            const valueA = a[sortField].toLowerCase();
            const valueB = b[sortField].toLowerCase();
            return sortOrder === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });

        return sorted;
    }

    // function to handle comparison between 2 fruits
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
            <div>
                <h1>Frutta:</h1>

                <input
                    type="text"
                    placeholder="Cerca frutto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* category select */}
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Tutte le categorie</option>
                    <option value="Tropicale">Tropicale</option>
                    <option value="Agrume">Agrume</option>
                    <option value="Pomacea">Pomacea</option>
                    <option value="Bacca">Bacca</option>
                    <option value="Frutto di bosco">Frutto di bosco</option>
                </select>

                {/* field select */}
                <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value="title">Ordina per Titolo</option>
                    <option value="category">Ordina per Categoria</option>
                </select>

                {/* oreder select */}
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                {/* fruits list */}
                <ul>
                    {fruits.map((fruit) => (
                        <li key={fruit.id}>
                            <strong><Link to={`/fruits/${fruit.id}`}>{fruit.title}</Link></strong> - {fruit.category}
                            <button onClick={() => handleFruitComparison(fruit)}>
                                {selectedFruits.some(f => f.id === fruit.id) ? "Rimuovi" : "Confronta"}
                            </button>
                        </li>
                    ))}
                </ul>

            </div>

            {/* comparison section */}
            {selectedFruits.length > 0 ? (
                <div>
                    <h2>Confronto Frutti</h2>

                    <div>
                        {selectedFruits.map(fruit => (
                            <div key={fruit.id}>
                                <h3>{fruit.title}</h3>
                                <p><strong>Categoria:</strong> {fruit.category}</p>
                                <p><strong>Origine:</strong> {fruit.originCountry}</p>
                                <p><strong>Dolcezza:</strong> {fruit.sweetness}</p>
                                <p><strong>Stagione:</strong> {fruit.season}</p>
                                <p><strong>Calorie:</strong> {fruit.caloriesPer100g}</p>
                                <p><strong>Vitamine:</strong> {fruit.vitamins}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

        </>
    );
}
