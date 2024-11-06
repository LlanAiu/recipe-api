# builtin

# external

# internal
from .types import AllRecipeCounts
from src.database import (
    SupabaseClient, 
    RecipeData, 
    RetrieveRecipeParams, 
    RecipesFromIngredientsParams,
    RecipesFromIngredients,
    RecipeIngredientCount,
    RecipesUsingIngredient
)


def count_ingredient(recipe_counts: AllRecipeCounts, recipe_ingredients: RecipesUsingIngredient):
    recipe_ids: list[int] = recipe_ingredients.recipes
    for recipe_id in recipe_ids:
        if recipe_id not in recipe_counts:
            recipe_counts[recipe_id] = 0
        recipe_counts[recipe_id] += 1


def generate_recipe_ingredient_counts(data: RecipesFromIngredients) -> AllRecipeCounts:
    recipe_counts: dict[int, int] = {}

    possible_recipes: list[RecipesUsingIngredient] = data.recipe_ingredients

    for recipe_ingredient in possible_recipes:
        count_ingredient(recipe_counts=recipe_counts, recipe_ingredients=recipe_ingredient)

    return AllRecipeCounts(recipes=recipe_counts)


class RecipeFinder():
    supabase_client: SupabaseClient

    def __init__(self, supabase_client: SupabaseClient):
        self.supabase_client = supabase_client

    def find_possible_recipes(self, recipe_counts: AllRecipeCounts) -> list[RecipeData]:
        possible_recipes: list[RecipeData] = []

        recipe_dict: dict[int, int] = recipe_counts.recipes

        for recipe_id in recipe_dict.keys():
            recipe_params: RetrieveRecipeParams = RetrieveRecipeParams(id=recipe_id)
            total_count: RecipeIngredientCount = self.supabase_client.recipe_ingredients_table.get_recipe_ingredient_count(params=recipe_params)

            recipe_count = recipe_dict.get(recipe_id)

            if total_count == recipe_count:
                recipe_params: RetrieveRecipeParams = RetrieveRecipeParams(id=recipe_id)
                recipe_data: RecipeData = self.supabase_client.recipes_table.retrieve_recipe(params=recipe_params)
                possible_recipes.append(recipe_data)

        print(possible_recipes)

        return possible_recipes

    def retrieve_recipes_from_ingredients(self, params: RecipesFromIngredientsParams) -> list[RecipeData]:
            
        data: RecipesFromIngredients = self.supabase_client.ingredients_table.get_recipes_using_ingredients(params=params)

        recipe_counts: AllRecipeCounts = generate_recipe_ingredient_counts(data=data)

        return self.find_possible_recipes(recipe_counts=recipe_counts)