import { RecipeData } from './types';
import NodeCache from "node-cache";


const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });
const CACHE_KEY = "recipes";

//doesn't work...
export function getFromCache(): RecipeData[] {
    console.log(cache);
    return cache.get(CACHE_KEY) || [];
}

export function setToCache(data: RecipeData[]) {
    cache.set(CACHE_KEY, data);
    console.log(cache);
}


// export class RecipeCache {
//     private static instance: RecipeCache;

//     private recipes: RecipeData[];

//     public static getInstance(): RecipeCache {
//         if(!RecipeCache.instance){
//             RecipeCache.instance = new RecipeCache();
//         }
//         return RecipeCache.instance;
//     }

//     public constructor(){
//         this.recipes = [];
//     }

//     public setRecipes(recipes: RecipeData[]){
//         this.recipes = recipes;
//     }

//     public getRecipes(): RecipeData[] {
//         return this.recipes;
//     }
// }