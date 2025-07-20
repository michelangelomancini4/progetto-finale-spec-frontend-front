import { useState, useEffect, useMemo, useCallback } from "react";

function debounce(callback, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

export function useFruitsSearch() {
    // States for fruits, search input, filter and sorting

    const [fruits, setFruits] = useState([]);
    const [search, setSearch] = useState("");
    const [debSearch, setDebSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortField, setSortField] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    // Fetch fruits from backend when search or category changes

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

    // Sort fruits by selected field and order

    const sortedFruits = useMemo(() => {
        return [...fruits].sort((a, b) => {
            const valueA = a[sortField].toLowerCase();
            const valueB = b[sortField].toLowerCase();
            return sortOrder === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });
    }, [fruits, sortField, sortOrder]);

    // Debounced search to reduce API calls 

    const debouncedSearch = useCallback(
        debounce((query) => {
            setSearch(query);
        }, 1000),
        []
    );

    // Update  search when debounced input changes

    useEffect(() => {
        debouncedSearch(debSearch);
    }, [debSearch, debouncedSearch]);

    // Return all states to use in Home 

    return {
        fruits: sortedFruits,
        debSearch,
        setDebSearch,
        category,
        setCategory,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder
    };
}
