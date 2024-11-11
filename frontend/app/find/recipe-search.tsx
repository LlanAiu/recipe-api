'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import IngredientSearchResult from './ingredient-search';

const MAX_SEARCH_RESULTS: number = 10;

function truncateArray(arr: string[]): string[] {
    let maxIndex = Math.min(arr.length, MAX_SEARCH_RESULTS);
    return arr.slice(0, maxIndex);
}

export default function RecipeSearch({ ingredientsList } : { ingredientsList: string[] }) {

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const allIngredients = ingredientsList;

    const inputRef = useRef(null);
    useOutsideAlerter(inputRef, () => handleFocus("BLUR", undefined));

    const handleSearch = useDebouncedCallback((search: string) => {
        if (search) {
            search = search.toLowerCase();
            const filtered: string[] = allIngredients.filter((ingredient: string) => (ingredient.includes(search)));
            const results: string[] = truncateArray(filtered);

            setIngredients(s => results);
        } else {
            const initial: string[] = truncateArray(allIngredients);

            setIngredients(s => initial);
        }

    }, 250);

    function handleFocus(state: "FOCUS" | "BLUR", search: string | undefined) {
        if (state === "FOCUS") {
            if (search) {
                const cleaned: string = search.toLowerCase();
                const filtered: string[] = allIngredients.filter(i => i.includes(cleaned));
                const truncated: string[] = truncateArray(filtered);
                setIngredients(s => truncated);
            } else {
                const all: string[] = truncateArray(allIngredients);
                console.log(all.length);
                setIngredients(s => all);
            }
        } else {
            setIngredients(s => []);
        }
    }

    function addIngredient(ingredient: string) {
        setSelectedIngredients(s => [...s, ingredient]);
    };

    function removeIngredient(ingredient: string) {
        const filtered: string[] = selectedIngredients.filter((i: string) => !(i === ingredient));
        setSelectedIngredients(s => filtered);
    }

    return (
        <div ref={inputRef}>
            <input
                type="text"
                onChange={e => handleSearch(e.target.value)}
                onFocus={e => handleFocus("FOCUS", e.target.value)}
                placeholder="Search for ingredients"
            />
            <input
                type='hidden'
                name='ingredients'
                value={selectedIngredients.join("/")}
            />
            {ingredients.map((ingredient, index) => (
                <IngredientSearchResult
                    key={index}
                    ingredient={ingredient}
                    addIngredient={addIngredient}
                    removeIngredient={removeIngredient}
                    initialCheck={selectedIngredients.includes(ingredient)}
                />
            ))}
            <div>
                <h3>Selected Ingredients:</h3>
                <ul>
                    {selectedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function useOutsideAlerter(ref: MutableRefObject<any>, callback: () => void) {
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [ref]);
}