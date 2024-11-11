import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { RecipeData, ServerRecipeData } from './types';


const BACKEND_URL_DEV: string | undefined = process.env.BACKEND_DEV_URL;
const BACKEND_URL_DEPLOY: string | undefined = process.env.BACKEND_DEPLOY_URL;

function isProduction(): boolean {
    return process.env.NODE_ENV === "production";
}

const BACKEND_URL: string | undefined = isProduction() ? BACKEND_URL_DEPLOY : BACKEND_URL_DEV

class InvalidEnvironmentError extends Error{
    constructor(message: string){
        super(message);
        this.name = "InvalidEnvironmentError";
    }
}

export default class RecipeClient {
    private static instance: RecipeClient;

    private client: AxiosInstance;

    public static getInstance(): RecipeClient {
        if(!RecipeClient.instance){
            RecipeClient.instance = new RecipeClient();
        }
        return RecipeClient.instance;
    }

    private constructor(){
        if(!BACKEND_URL){
            throw new InvalidEnvironmentError("Deployed Backend URL Not Found in Environment!");
        }

        this.client = axios.create({
            baseURL: BACKEND_URL,
            timeout: 50000,
        });
    }

    public async getRecipeData(id: number): Promise<RecipeData> {
        const response: AxiosResponse | undefined = await this.client
            .get(`/recipe/${id}`)
            .catch((error) => {
                console.log(`Failed to fetch recipe data with ID: ${id}`);
                console.log(error);
                return undefined;
            });

        if(!response){
            return {
                id: -1,
                name: "Not Found",
                ingredients: [],
                directions: []
            };
        }

        const data = response.data;

        if(data["recipe_name"] === ""){
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

    public async getPossibleRecipes(ingredients: string[]): Promise<RecipeData[]>{
        const response: AxiosResponse | undefined = await this.client
            .post("/recipe/find", {
                ingredients: ingredients
            })
            .catch((error) => {
                console.log("Failed to fetch possible recipes");
                console.log(error)
                return undefined;
            });

        if(!response){
            return [];
        }

        const data: ServerRecipeData[] = response.data["possible_recipes"] as ServerRecipeData[];

        const recipes: RecipeData[] = data.map((recipe: ServerRecipeData) => {
            const asRecipe: RecipeData = {
                id: recipe.id,
                name: recipe.recipe_name,
                ingredients: recipe.ingredient_amounts,
                directions: recipe.directions
            };   
            return asRecipe;
        })

        if(recipes.length === 0){
            return [];
        } else {
            return recipes;
        }
    }

}