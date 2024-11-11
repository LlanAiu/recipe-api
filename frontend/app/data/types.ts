
export type RecipeData = {
    id: number,
    name: string,
    ingredients: string[],
    directions: string[]
}

export type ServerRecipeData = {
    id: number,
    recipe_name: string,
    ingredient_amounts: string[],
    directions: string[]
}