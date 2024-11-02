# builtin

# external
from fastapi import APIRouter, Request

# internal
from .io import BuildRecipeInput, BuildRecipeOutput, RecipeInformationOutput
from src.modules.database import SupabaseClient, RecipeData, RetrieveRecipeParams, RecipesFromIngredientsParams


recipe_router: APIRouter = APIRouter(prefix="/recipe")

@recipe_router.get("/{recipe_id}")
def get_recipe_information(recipe_id: int, request: Request) -> RecipeInformationOutput:
    assert isinstance(recipe_id, int), "Recipe ID must be of type int!"

    supabase_client: SupabaseClient = request.app.state.supabase_client

    try:
        params: RetrieveRecipeParams = RetrieveRecipeParams(id=recipe_id)
        data: RecipeData = supabase_client.retrieve_recipe_data(params=params)

        recipe_name: str = data.get_name()
        ingredients_list: list[str] = data.get_ingredients_list()
        directions: list[str] = data.get_directions_list()
    
        return RecipeInformationOutput(recipe_name=recipe_name, ingredient_amounts=ingredients_list, directions=directions)
    
    except AttributeError as err:
        print(err)
        
        return RecipeInformationOutput(recipe_name="", ingredient_amounts=[], directions=[])


def recipe_data_to_output(data: RecipeData) -> RecipeInformationOutput:
    name: str = data.get_name()
    ingredients: list[str] = data.get_ingredients_list()
    directions: list[str] = data.get_directions_list()
    
    return RecipeInformationOutput(recipe_name=name, ingredient_amounts=ingredients, directions=directions)

@recipe_router.post("/find")
def build_recipe_from_ingredients(inputs: BuildRecipeInput, request: Request) -> BuildRecipeOutput:
    # TODO: retrieve all possible recipes from database and return a list of them
    try:
        supabase_client: SupabaseClient = request.app.state.supabase_client

        params: RecipesFromIngredientsParams = RecipesFromIngredientsParams(ingredients=inputs.ingredients)

        possible_recipes: list[RecipeData] = supabase_client.retrieve_recipes_from_ingredients(params=params)

        assert (len(possible_recipes) != 0)

        recipe_output: list[RecipeInformationOutput] = map(recipe_data_to_output, possible_recipes)

        return BuildRecipeOutput(possible_recipes=recipe_output)
    
    except AssertionError as err:
        
        return BuildRecipeOutput(possible_recipes=["None"])