// Custom hook to fetch a single fruit by id

import { useState, useEffect } from "react";

export function useFetchFruit(id) {
    const [fruit, setFruit] = useState(null);
    const [error, setError] = useState(null);

    // Fetch fruit details when the ID changes

    useEffect(() => {
        fetch(`http://localhost:3001/fruits/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Frutto non trovato");
                return res.json();
            })
            .then((data) => {
                setFruit(data.fruit);
            })
            .catch((err) => {
                console.error("Errore:", err);
                setError(err);
            });
    }, [id]);

    return { fruit, error };
}
