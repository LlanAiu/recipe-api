import RecipeClient from '@/app/data/recipe-client';
import { RecipeData } from '@/app/data/types';


async function getRecipeData(id: number): Promise<RecipeData> {

    const instance: RecipeClient = RecipeClient.getInstance();

    return await instance.getRecipeData(id);
}


export default async function RecipeInformation({ params }: { params: Promise<{ id: number }> }) {
    const id = (await params).id;

    const recipeData: RecipeData = await getRecipeData(id);

    return (
        <div className='p-4'>
            <h1 className='text-2xl text-gray-800 mb-5'><b>{recipeData.name}</b></h1>
            <div className='space-y-5'>
                <div>
                    <h2 className='text-lg mb-2'><b>Required Ingredients: </b></h2>
                    <ul className='list-disc pl-5 space-y-1'>
                        {recipeData.ingredients.map((ingredient: string) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className='text-lg mb-2'><b>Directions: </b></h2>
                    <ol className='list-decimal pl-5 space-y-1'>
                        {recipeData.directions.map((dir: string) => (
                            <li key={dir}>{dir}</li>
                        ))}
                    </ol>
                </div>
            </div>

        </div>
    );
}