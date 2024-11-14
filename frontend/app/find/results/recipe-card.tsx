import { RecipeData } from '@/app/data/types';
import Link from 'next/link';


export default function RecipeCard({ recipe, urlQuery, index } : {
    recipe: RecipeData, 
    urlQuery: string,
    index: number
}){
    
    const colors: string[] = ["primary-bg", "secondary-bg", "tertiary-bg"];
    const hoverColors: string[] = ["hover:dark-primary-bg", "hover:dark-secondary-bg", "hover:dark-tertiary-bg"];

    const color: string = colors[index % colors.length];
    const hoverColor: string = hoverColors[index % hoverColors.length];
        
    return (
        <div className={`border h-max rounded-md ${color} ${hoverColor} text-center`}>
            <Link href={`/recipe/${recipe.id}?query=${urlQuery}`}>
                <p className='p-3'>{recipe.name}</p>
            </Link>
        </div>
    );
}