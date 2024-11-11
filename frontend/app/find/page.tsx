
import RecipeSearch from './recipe-search';
import { redirect } from 'next/navigation';

async function fetchIngredients(): Promise<string[]> {
    return ['beef', 'butter', 'nuts', 'cream of mushroom soup', 'chicken breasts', 'sour cream', 'bite size shredded rice biscuits', 'brown sugar', 'milk', 'vanilla'];
}

export default async function Page(){
    const allIngredients: string[] = await fetchIngredients();

    async function handleSubmit(formData: FormData){
        'use server'

        const data: string | undefined = formData.get("ingredients")?.toString();
        if(!data){
            throw new TypeError("No Ingredient Data Found in Form");
        }

        redirect(`/find/results?ingredients=${data}`);
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