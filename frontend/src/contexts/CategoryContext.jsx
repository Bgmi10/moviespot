import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../config";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState({
        movies: [],
        series: [],
    });
    const [categoryRaw, setCategoryRaw] = useState([]);

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const fetchCategory = async () => {
        try {
            const res = await fetch(baseUrl + '/category/all');
            const data = await res.json();
            if (data.data) {
                const rawCategories = data.data;
                setCategoryRaw(rawCategories);
                
                // Shuffle the categories before setting state
                const shuffledMovies = rawCategories.movies ? shuffleArray(rawCategories.movies) : [];
                const shuffledSeries = rawCategories.series ? shuffleArray(rawCategories.series) : [];
                
                setCategory({
                    movies: shuffledMovies,
                    series: shuffledSeries
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const deleteCategory = async (id) => {
        try {
            const res = await fetch(baseUrl + `/category/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (res.status === 200) {
                await fetchCategory(); // Refresh categories
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    const updateCategory = async (id, title) => {
        try {
            const res = await fetch(baseUrl + `/category/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            });
            
            if (res.status === 200) {
                await fetchCategory(); // Refresh categories
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    const createCategory = async (type, title) => {
        try {
            const res = await fetch(baseUrl + `/category`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, title })
            });
            
            if (res.status === 200) {
                await fetchCategory(); // Refresh categories
                return true;
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    return(
        <CategoryContext.Provider value={{ 
            category, 
            setCategory, 
            categoryRaw, 
            createCategory, 
            updateCategory, 
            deleteCategory,
            fetchCategory 
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => {
    return useContext(CategoryContext);
}