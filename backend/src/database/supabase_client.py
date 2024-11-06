# builtin

# external
from supabase import create_client, Client

# internal
from .tables import RecipeTable, RecipeIngredientsTable, IngredientsTable


class SupabaseClient():
    supabase_client: Client

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(supabase_url=project_url, supabase_key=api_key)

        self.recipes_table: RecipeTable = RecipeTable(client=self.supabase_client)
        self.ingredients_table: IngredientsTable = IngredientsTable(client=self.supabase_client)
        self.recipe_ingredients_table: RecipeIngredientsTable = RecipeIngredientsTable(client=self.supabase_client)