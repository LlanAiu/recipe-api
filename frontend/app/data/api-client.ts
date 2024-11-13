import { RecipeData, ServerIngredientData, ServerRecipeData } from './types';


const BACKEND_URL_DEV: string | undefined = process.env.BACKEND_DEV_URL;
const BACKEND_URL_DEPLOY: string | undefined = process.env.BACKEND_DEPLOY_URL;

function isProduction(): boolean {
    return process.env.NODE_ENV === "production";
}

const BACKEND_URL: string | undefined = isProduction() ? BACKEND_URL_DEPLOY : BACKEND_URL_DEV

class InvalidEnvironmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidEnvironmentError";
    }
}

function checkValidEnvironment(){
    if(!BACKEND_URL){
        throw new InvalidEnvironmentError("Environment missing valid backend url!");
    }
}

const CACHE_RESULTS: RequestInit = {
    cache: 'force-cache'
}

const JSON_HEADER: Headers = new Headers();
JSON_HEADER.append("Content-Type", "application/json");

export async function getRecipeData(id: number): Promise<RecipeData> {
    checkValidEnvironment();

    const response: Response = await fetch(`${BACKEND_URL}/recipe/${id}`, CACHE_RESULTS);
    const data: any = await response.json();

    if (!data || data["recipe_name"] === "") {
        return {
            id: -1,
            name: "Not Found",
            ingredients: [],
            directions: []
        };
    }

    return {
        id: id,
        name: data["recipe_name"],
        ingredients: data["ingredient_amounts"],
        directions: data["directions"]
    }
}

export async function getPossibleRecipes(ingredients: string[]): Promise<RecipeData[]> {
    const requestData = JSON.stringify({
        ingredients: ingredients
    });

    const response: Response = await fetch(`${BACKEND_URL}/recipe/find`, {
        method: "POST",
        body: requestData,
        headers: JSON_HEADER,
        cache: 'force-cache'
    });

    const data = await response.json();

    // const data: ServerRecipeData[] = response.data["possible_recipes"] as ServerRecipeData[];

    const recipes: RecipeData[] = data.map((recipe: ServerRecipeData) => {
        const asRecipe: RecipeData = {
            id: recipe.id,
            name: recipe.recipe_name,
            ingredients: recipe.ingredient_amounts,
            directions: recipe.directions
        };
        return asRecipe;
    });

    if (recipes.length === 0) {
        return [];
    } else {
        return recipes;
    }
}

export async function getAllIngredients(): Promise<string[]> {
    const response: CacheAxiosResponse | undefined = await this.client
        .get("/ingredient/all")
        .catch((error) => {
            console.log("Failed to fetch ingredients");
            console.log(error);
            return undefined;
        });

    if (!response) {
        return [];
    }

    const data: ServerIngredientData[] = response.data["ingredients_list"] as ServerIngredientData[];

    const ingredients: string[] = data.map((ingredient: ServerIngredientData) => ingredient.name);

    return ingredients;
}

