import { getRecipeData } from '@/app/data/api-client';
import { RecipeData } from '@/app/data/types';
import Link from 'next/link';
import CheckList from './checklist';


export default async function RecipeInformation({ params, searchParams }: { 
    params: Promise<{ id: number }>,
    searchParams?: Promise<{ query: string }>
}) {

    const search: string | undefined = (await searchParams)?.query;

    const id: number = (await params).id;

    const recipeData: RecipeData = await getRecipeData(id);

    return (
        <div className='pt-12 px-24'>
            <h1 className='text-2xl text-gray-800 mb-8'><b>{recipeData.name}</b></h1>
            <div className='space-y-7 px-4'>
                <div>
                    <h2 className='text-lg mb-2'><b>Required Ingredients: </b></h2>
                    <ul className='list-disc pl-5 space-y-2'>
                        {recipeData.ingredients.map((ingredient: string, index: number) => (
                            <CheckList key={index} description={ingredient} />
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className='text-lg mb-2'><b>Directions: </b></h2>
                    <ol className='list-decimal pl-5 space-y-2'>
                        {recipeData.directions.map((dir: string, index: number) => (
                            <CheckList key={index} description={dir} />
                        ))}
                    </ol>
                </div>
            </div>
            {search && 
            
            <div className='mt-12 rounded-md quaternary-bg hover:dark-quaternary-bg w-max float-right mr-16'>
                <Link href={`/find/results?ingredients=${search}`}>
                    <p className='px-3 py-2 w-max'>Back</p>
                </Link>
            </div>
            }

        </div>
    );
}