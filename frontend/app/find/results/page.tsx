
import { RecipeData } from '../../data/types';

export default function ResultsPage() {
    const recipes: RecipeData[] = [];

    

    return (
        <div>
            <h1>Recipe Results</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
}