import { RecipeData } from '@/app/data/types';


export default function RecipeCard({ recipe } : {recipe: RecipeData}){
    
    return (
        <div>
            {recipe.name}
        </div>
    );
}