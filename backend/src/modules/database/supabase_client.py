# builtin

# external
from supabase import create_client, Client

# internal
from .data_types import RecipeData, RecipeAttribute, RetrieveRecipeParams, RecipesFromIngredientsParams


def count_ingredients_in_recipe(recipe_counts: dict, recipe_ingredients: list[dict]):
    for recipe_ingredient in recipe_ingredients:
        recipe_id: int = recipe_ingredient.get("recipe_id")
        if recipe_id not in recipe_counts:
            recipe_counts[recipe_id] = 0
        recipe_counts[recipe_id] += 1

def generate_recipe_ingredient_counts(data: list[dict]) -> dict:
    recipe_counts: dict = {}

    for ingredient_data in data:
        possible_recipes: list[dict] = ingredient_data.get("recipe_ingredients")
        count_ingredients_in_recipe(recipe_counts=recipe_counts, recipe_ingredients=possible_recipes)

    return recipe_counts

class SupabaseClient():
    supabase_client: Client
    recipe_ingredient_count: dict

    def __init__(self, project_url: str, api_key: str):
        self.supabase_client = create_client(project_url, api_key)

    def retrieve_recipe_data(self, params: RetrieveRecipeParams) -> RecipeData:
        try:
            response = self.supabase_client.table('recipes').select("*").eq("id", params.id).execute()
            
            assert len(response.data) == 1
            data: dict = response.data[0]
            
            name_data: str = data.get(RecipeAttribute.NAME.value)
            ingredients_data: str = data.get(RecipeAttribute.INGREDIENTS.value)
            directions_data: str = data.get(RecipeAttribute.DIRECTIONS.value)

            return RecipeData(name=name_data, ingredients=ingredients_data, directions=directions_data)
        
        except AssertionError as err:
            print(err)
            
            return RecipeData(name="", ingredients="", directions="")
    
    def find_possible_recipes(self) -> list[RecipeData]:
        possible_recipes: list[RecipeData] = []

        for recipe_id in self.recipe_ingredient_count.keys():
            response = (
                self.supabase_client.table('recipe_ingredients')
                .select("*", count="exact")
                .eq("recipe_id", recipe_id)
                .execute()
            )
                    
            if(response.count == self.recipe_ingredient_count.get(recipe_id)):
                recipe_params: RetrieveRecipeParams = RetrieveRecipeParams(id=recipe_id)
                recipe_data: RecipeData = self.retrieve_recipe_data(params=recipe_params)
                possible_recipes.append(recipe_data)

        return possible_recipes

    def retrieve_recipes_from_ingredients(self, params: RecipesFromIngredientsParams) -> list[RecipeData]:
        try:
            ingredients_list: list[str] = params.ingredients

            response = (
                self.supabase_client.table('ingredients')
                .select("id, recipe_ingredients(ingredient_id, recipe_id)")
                .in_("name", ingredients_list)
                .execute()
            )

            data: list[dict] = response.data

            assert(len(data) == len(ingredients_list))

            self.recipe_ingredient_count = generate_recipe_ingredient_counts(data=data)

            return self.find_possible_recipes()

        except AssertionError as err:
            print(err)