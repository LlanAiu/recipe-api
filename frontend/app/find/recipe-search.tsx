'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import IngredientSearchResult from './ingredient-search';
import Image from 'next/image';
import IngredientPill from './ingredient-pill';
import { AnimatePresence, motion, Variants } from 'motion/react';

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

    const [animationState, setAnimationState] = useState<"search" | "hidden">('hidden');

    const variants: Variants = {
        search: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.03 * index
            }
        }),
        hidden: (index: number) => ({
            opacity: 0,
            y: -10,
            transition: {
                delay: 0.05 * index
            }
        })
    }

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
            setAnimationState("search");
        } else {
            setIngredients(s => []);
            setAnimationState("hidden");
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
        <div className='pt-10 w-full'>
            <h1 className='text-2xl pt-6 pl-4 text-gray-800 w-full text-center'><b>Select Ingredients</b></h1>
            <div className='w-3/5 m-auto space-y-3 mt-3'>
                <div className='py-4 px-4 h-max'>
                    <div className='border rounded-md min-h-24 p-1'>
                        {selectedIngredients.length == 0 && (
                            <p className='p-2 text-sm text-gray-400'>No ingredients added</p>
                        )}
                        {selectedIngredients.map((ingredient: string, index: number) => (
                            <IngredientPill key={index} ingredient={ingredient} onClick={removeIngredient} />
                        ))}
                    </div>
                </div>
                <div className='w-full flex flex-row'>
                    <div ref={inputRef} className='w-4/5 flex-auto px-4'>
                        <input
                            type="text"
                            className='py-1.5 px-2 h-10 w-full rounded-md bg-slate-100'
                            onChange={e => handleSearch(e.target.value)}
                            onFocus={e => handleFocus("FOCUS", e.target.value)}
                            placeholder="Search for ingredients..."
                        />
                        <input
                            type='hidden'
                            name='ingredients'
                            value={selectedIngredients.join("/")}
                        />
                        <motion.div
                            variants={variants}
                            animate={animationState}
                        >
                            <AnimatePresence>
                                {ingredients.map((ingredient, index) => (
                                    <motion.div
                                        variants={variants}
                                        initial='hidden'
                                        custom={index}
                                        exit='hidden'
                                    >
                                        <IngredientSearchResult
                                            key={index}
                                            ingredient={ingredient}
                                            addIngredient={addIngredient}
                                            removeIngredient={removeIngredient}
                                            initialCheck={selectedIngredients.includes(ingredient)} 
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <div className='w-max flex-initial text-center align-top'>
                        <button className='ml-2 mr-4 py-1.5 px-3 h-10 border rounded-md bg-slate-100 hover:bg-blue-100' type='submit'>
                            <Image
                                src={'/search-icon.png'}
                                alt='Search Icon'
                                width={20}
                                height={20}
                            />
                        </button>
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