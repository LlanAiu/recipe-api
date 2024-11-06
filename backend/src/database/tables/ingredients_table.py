# builtin

# external
from supabase import Client
from postgrest import SyncRequestBuilder, APIResponse
from postgrest.exceptions import APIError

# internal
from .data_types import RecipesFromIngredientsParams, RecipesFromIngredients, RecipesUsingIngredient


def to_recipe_ingredient(data: dict) -> RecipesUsingIngredient:
    valid_data: bool = "id" in data.keys() and "recipe_ingredients" in data.keys()

    if(not valid_data):
        raise ValueError("Invalid data for recipe-ingredient relation")
    
    ingredient_id: int = data.get("id")

    recipe_ids: list[int] = []

    recipe_ingredient_relations: list[dict] = data.get("recipe_ingredients")

    for recipe_ingredient in recipe_ingredient_relations:
        if("recipe_id" in recipe_ingredient.keys()):
            recipe_id: int = recipe_ingredient.get("recipe_id")
            recipe_ids.append(recipe_id)

    return RecipesUsingIngredient(id=ingredient_id, recipes=recipe_ids)

class IngredientsTable():
    ingredients_table: SyncRequestBuilder

    def __init__(self, client: Client):
        self.ingredients_table = client.table("ingredients")

    def get_recipes_using_ingredients(self, params: RecipesFromIngredientsParams) -> RecipesFromIngredients:
        ingredients_list: list[str] = params.ingredients

        try:
            response: APIResponse = (
                self.ingredients_table
                .select("id, recipe_ingredients(ingredient_id, recipe_id)")
                .in_("name", ingredients_list)
                .execute()
            )

            data: list[dict] = response.data

            if(len(data) != len(ingredients_list)):
                none: list[RecipesUsingIngredient] = []
                return RecipesFromIngredients(recipe_ingredients=none)

            recipe_ingredients: list[RecipesUsingIngredient] = map(to_recipe_ingredient, data)

            return RecipesFromIngredients(recipe_ingredients=recipe_ingredients)
    
        except APIError as err:
            print(err)

            none: list[RecipesUsingIngredient] = []
            return RecipesFromIngredients(recipe_ingredients=none)
