import { useState, useEffect } from "react";

export default function Home() {
    const [fruits, setFruits] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const queryParams = [];

        if (search) queryParams.push(`search=${search}`);
        if (category) queryParams.push(`category=${category}`);
        const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

        fetch(`http://localhost:3001/fruits${queryString}`)
            .then((res) => res.json())
            .then((data) => setFruits(data))
            .catch((err) => console.error("Errore nel fetch:", err));
    }, [search, category]);

    return (
        <div>
            <h1>Frutta:</h1>

            <input
                type="text"
                placeholder="Cerca frutto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Tutte le categorie</option>
                <option value="Tropicale">Tropicale</option>
                <option value="Agrume">Agrume</option>
                <option value="Pomacea">Pomacea</option>
                <option value="Bacca">Bacca</option>
                <option value="Frutto di bosco">Frutto di bosco</option>
            </select>

            <ul>
                {fruits.map((fruit) => (
                    <li key={fruit.id}>
                        <strong>{fruit.title}</strong> - {fruit.category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
