import RecipeClient from '@/app/data/recipeClient';
import { RecipeData } from '@/app/data/types';


async function getRecipeData(id: number): Promise<RecipeData> {

    const instance: RecipeClient = RecipeClient.getInstance();

    return await instance.getRecipeData(id);
} 


export default async function RecipeInformation( { params } : {params: Promise<{id: number}>}){
    const id = (await params).id;
    
    const recipeData: RecipeData = await getRecipeData(id);

    return (
        <div>
            <p>{recipeData.name}</p>
            {recipeData.directions.map((dir: string) => (
                <p key={dir}>{dir}</p>
            ))}
            {recipeData.ingredients.map((ingredient: string) => (
                <p key={ingredient}>{ingredient}</p>
            ))}
        </div>
    );
}