# builtin

# external
from supabase import Client
from postgrest import SyncRequestBuilder, APIResponse
from postgrest.exceptions import APIError

# internal
from .data_types import RetrieveRecipeParams, RecipeData, RecipeAttribute


class RecipeTable():
    recipe_table: SyncRequestBuilder

    def __init__(self, client: Client):
        self.recipe_table = client.table("recipes")

    def retrieve_recipe(self, params: RetrieveRecipeParams) -> RecipeData:
        recipe_id: int = params.id

        try:
            response: APIResponse = self.recipe_table.select("*").eq("id", recipe_id).execute()
            
            if(len(response.data) != 1):
                return RecipeData(name="", ingredients="", directions="")

            data: dict = response.data[0]
            
            name_data: str = data.get(RecipeAttribute.NAME.value)
            ingredients_data: str = data.get(RecipeAttribute.INGREDIENTS.value)
            directions_data: str = data.get(RecipeAttribute.DIRECTIONS.value)

            return RecipeData(name=name_data, ingredients=ingredients_data, directions=directions_data)
        
        except APIError as err:
            print(err)
            
            return RecipeData(name="", ingredients="", directions="")