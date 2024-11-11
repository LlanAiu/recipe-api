
import RecipeClient from '../data/recipe-client';
import { RecipeData } from '../data/types';
import RecipeSearch from './recipe-search';

async function fetchIngredients(): Promise<string[]> {
    return ['beef', 'butter', 'nuts', 'cream of mushroom soup', 'chicken breasts', 'sour cream', 'more things'];
}


async function postIngredients(ingredients: string[]): Promise<RecipeData[]>{
    const instance: RecipeClient = RecipeClient.getInstance();
    
    return await instance.getPossibleRecipes(ingredients);
}

export default async function Page(){
    
    const allIngredients: string[] = await fetchIngredients();

    async function handleSubmit(formData: FormData){
        'use server'

        const data: string | undefined = formData.get("ingredients")?.toString();
        if(!data){
            throw new TypeError("No Ingredient Data Found in Form");
        }

        const ingredients: string[] = data.split("/");

        const recipes: RecipeData[] = await postIngredients(ingredients);

        //Not really sure what to do with recipes here tbh...
    }

    return (
        <div>
            <form action={handleSubmit}>
                <RecipeSearch ingredientsList={allIngredients}/>

                <button type='submit'>Search</button>
            </form>
        </div>
    );
}