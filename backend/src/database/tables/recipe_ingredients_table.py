# builtin 

# external
from supabase import Client
from postgrest import SyncRequestBuilder, APIResponse
from postgrest.exceptions import APIError

# internal
from .data_types import RetrieveRecipeParams, RecipeIngredientCount


class RecipeIngredientsTable():
    recipe_ingredients_table: SyncRequestBuilder

    def __init__(self, client: Client):
        self.recipe_ingredients_table = client.table("recipe_ingredients")

    def get_recipe_ingredient_count(self, params: RetrieveRecipeParams) -> RecipeIngredientCount:
        recipe_id: int = params.id

        try:
            response: APIResponse = (
                self.recipe_ingredients_table
                .select("*", count="exact")
                .eq("recipe_id", recipe_id)
                .execute()
            )

            return response.count

        except APIError as err:
            print(err)

            return -1