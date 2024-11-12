import { RecipeData } from '@/app/data/types';
import Link from 'next/link';


export default function RecipeCard({ recipe } : {recipe: RecipeData}){
    
    return (
        <div className='border h-max rounded-md bg-slate-100 hover:bg-slate-300`'>
            <Link href={`/recipe/${recipe.id}`}>
                <p className='p-3'>{recipe.name}</p>
            </Link>
        </div>
    );
}