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
            <div className='mb-5 inline-block w-full'>
                <h1 className='text-2xl text-gray-800 inline-block'><b>Recipe Results</b></h1>
                <div className='inline-block float-right mr-5 border rounded-md bg-slate-100 hover:bg-slate-300'>
                    <Link href={`/find`}>
                        <p className='p-2'>Back to Search</p>
                    </Link>
                </div>
            </div>
            
            {recipes.map((recipe: RecipeData, index: number) => {
                return (<RecipeCard key={index} recipe={recipe} urlQuery={dataString}/>)
            })}
        </div>
    );
}