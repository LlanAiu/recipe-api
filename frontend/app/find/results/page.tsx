import { redirect } from 'next/navigation';
import { RecipeData } from '../../data/types';
import RecipeCard from './recipe-card';
import { getPossibleRecipes } from '@/app/data/api-client';
import Link from 'next/link';

export default async function ResultsPage({ searchParams }: {
    searchParams?: Promise<{
        ingredients: string
    }>
}) {

    const params = await searchParams;

    if (!params?.ingredients) {
        redirect("../find");
    }

    const dataString: string = params.ingredients;

    const ingredientsList: string[] = params.ingredients.split("/");

    ingredientsList.sort();

    const recipes: RecipeData[] = await getPossibleRecipes(ingredientsList);

    return (
        <div className='p-6'>
            <div className='mt-10 w-full space-y-3 mb-10'>
                <h1 className='text-2xl text-gray-800 text-center'><b>Recipe Search Results</b></h1>
                {/* <div className='border rounded-md bg-slate-100 hover:bg-slate-300 w-max m-auto'>
                    <Link href={`/find`}>
                        <p className='p-2 text-center text-sm w-max'>Back to Search</p>
                    </Link>
                </div> */}
            </div>
            <div className='w-3/5 m-auto'>
                {recipes.map((recipe: RecipeData, index: number) => {
                    return (<RecipeCard key={index} recipe={recipe} urlQuery={dataString}/>)
                })}
            </div>
        </div>
    );
}