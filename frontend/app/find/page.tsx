
import { getAllIngredients } from '../data/api-client';
import RecipeSearch from './recipe-search';
import { redirect } from 'next/navigation';


export default async function Page(){
    const allIngredients: string[] = await getAllIngredients();

    async function handleSubmit(formData: FormData){
        'use server'
        try {
            const data: string | undefined = formData.get("ingredients")?.toString();

            if(!data){
                throw new TypeError("No Ingredient Data Found in Form");
            }

            redirect(`/find/results?ingredients=${data}`);
        } catch (error){
            console.error(error);
        }
    }

    return (
        <div>
            <form action={handleSubmit}>
                <RecipeSearch ingredientsList={allIngredients}/>
            </form>
        </div>
    );
}