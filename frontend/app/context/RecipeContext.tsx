import { createContext, useState, ReactNode } from 'react';
import { RecipeData } from '../data/types';

interface RecipeContextType {
    recipes: RecipeData[];
    setRecipes: (recipes: RecipeData[]) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
};
