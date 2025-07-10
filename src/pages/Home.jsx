import { useState, useEffect } from "react";

export default function Home() {
    const [fruits, setFruits] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/fruits")
            .then((res) => res.json())
            .then((data) => {
                setFruits(data);
            })
            .catch((err) => {
                console.error("Errore nel fetch:", err);
            });
    }, []);


    return (
        <div>
            <h1>Frutta : </h1>
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
