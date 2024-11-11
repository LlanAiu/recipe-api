import { redirect } from 'next/navigation';
import { RecipeData } from '../../data/types';
import RecipeClient from '@/app/data/recipe-client';
import RecipeCard from './recipe-card';

async function postIngredients(ingredients: string[]): Promise<RecipeData[]> {
    const recipeClient: RecipeClient = RecipeClient.getInstance();

    return await recipeClient.getPossibleRecipes(ingredients);
}

export default async function ResultsPage({ searchParams }: {
    searchParams?: {
        ingredients: string
    }
}) {

    const params = await searchParams;

    if (!params?.ingredients) {
        redirect("../find");
    }

    const ingredientsList: string[] = params.ingredients.split("/");

    console.log(ingredientsList);

    const recipes: RecipeData[] = await postIngredients(ingredientsList);

    console.log(recipes);

    return (
        <>
            <h1>Recipe Results</h1>
            {recipes.map((recipe: RecipeData, index: number) => {
                return (<RecipeCard key={index} recipe={recipe} />)
            })}
        </>
    );
}