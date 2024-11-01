# builtin

# external
from supabase import create_client, Client

# internal
from .data_types import RecipeData, RecipeAttribute, RetrieveRecipeParams



class SupabaseClient():
    supabase_client: Client

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(project_url, api_key)

    def retrieve_recipe_data(self, params: RetrieveRecipeParams) -> RecipeData:
        try:
            response = self.supabase_client.table('recipes').select("*").eq("id", params.id).execute()
            print(response)
            
            assert len(response.data) == 1
            data: dict = response.data[0]
            
            name_data: str = data.get(RecipeAttribute.NAME.value)
            ingredients_data: str = data.get(RecipeAttribute.INGREDIENTS.value)
            directions_data: str = data.get(RecipeAttribute.DIRECTIONS.value)

            return RecipeData(name=name_data, ingredients=ingredients_data, directions=directions_data)
        
        except AssertionError as err:
            print(err)
            
            return RecipeData(name="", ingredients="", directions="")