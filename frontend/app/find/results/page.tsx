import { redirect } from 'next/navigation';
import { RecipeData } from '../../data/types';
import RecipeClient from '@/app/data/recipe-client';
import RecipeCard from './recipe-card';

async function postIngredients(ingredients: string[]): Promise<RecipeData[]> {
    const recipeClient: RecipeClient = RecipeClient.getInstance();

    return await recipeClient.getPossibleRecipes(ingredients);
}

export default async function ResultsPage({ searchParams }: {
    searchParams?: Promise<{
        ingredients: string
    }>
}) {

    const params = await searchParams;

    if (!params?.ingredients) {
        redirect("../find");
    }

    const ingredientsList: string[] = params.ingredients.split("/");

    const recipes: RecipeData[] = await postIngredients(ingredientsList);


    // Test data for CSS bc hela long reload time otherwise
    // const recipes: RecipeData[] = [
    //     {
    //       id: 2120,
    //       name: "Jewell Ball's Chicken",
    //       ingredients: [
    //         '1 small jar chipped beef, cut up',
    //         '4 boned chicken breasts',
    //         '1 can cream of mushroom soup',
    //         '1 carton sour cream'
    //       ],
    //       directions: [
    //         'Place chipped beef on bottom of baking dish.',
    //         'Place chicken on top of beef.',
    //         'Mix soup and cream together; pour over chicken. Bake, uncovered, at 275\\u00b0 for 3 hours.'
    //       ]
    //     }
    //   ];

    return (
        <div className='p-6'>
            <h1 className='text-2xl text-gray-800 mb-5'><b>Recipe Results</b></h1>
            {recipes.map((recipe: RecipeData, index: number) => {
                return (<RecipeCard key={index} recipe={recipe} />)
            })}
        </div>
    );
}