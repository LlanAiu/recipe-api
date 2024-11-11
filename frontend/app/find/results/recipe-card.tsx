import { RecipeData } from '@/app/data/types';
import Link from 'next/link';


export default function RecipeCard({ recipe } : {recipe: RecipeData}){
    
    return (
        <div>
            <Link href={`/recipe/${recipe.id}`}>
                <p>{recipe.name}</p>
            </Link>
        </div>
    );
}