'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import IngredientSearchResult from './ingredient-search';

const MAX_SEARCH_RESULTS: number = 10;

function truncateArray(arr: string[]): string[] {
    let maxIndex = Math.min(arr.length, MAX_SEARCH_RESULTS);
    return arr.slice(0, maxIndex);
}

export default function RecipeSearch({ ingredientsList }: { ingredientsList: string[] }) {

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
        <div>
            <h1 className='text-2xl pt-6 pl-4 text-gray-800'><b>Select Ingredients</b></h1>
            <div>
                <div className='p-4'>
                    <textarea
                        className='w-full border rounded-md p-2'
                        rows={2}
                        value={selectedIngredients.length === 0 ? 'No Ingredients Selected' : selectedIngredients.join(", ")}
                        readOnly
                    />
                </div>
                <div className='w-full inline-block'>
                    <div ref={inputRef} className='w-4/5 inline-block px-4'>
                        <input
                            type="text"
                            className='py-1.5 px-2 w-full rounded-md bg-slate-100'
                            onChange={e => handleSearch(e.target.value)}
                            onFocus={e => handleFocus("FOCUS", e.target.value)}
                            placeholder="Search for ingredients..."
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
                    </div>

                    <div className='w-1/5 inline-block text-center align-top'>
                        <button className='mx-4 py-1.5 px-3 border rounded-md bg-slate-100 hover:bg-blue-100' type='submit'>Search</button>
                    </div>
                </div>
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