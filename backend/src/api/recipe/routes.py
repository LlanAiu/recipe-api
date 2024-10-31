# builtin

# external
from fastapi import APIRouter

# internal
from .io import BuildRecipeInput, BuildRecipeOutput, RecipeInformationOutput


recipe_router: APIRouter = APIRouter(prefix="/recipe")

@recipe_router.get("/[id]")
def get_recipe_information() -> RecipeInformationOutput:
    # retrieve data from database, or null if not found
    return RecipeInformationOutput()

@recipe_router.post("/find")
def build_recipe_from_ingredients(inputs: BuildRecipeInput) -> BuildRecipeOutput:
    # retrieve all possible recipes from database and return a list of them
    return BuildRecipeOutput(possible_recipes=["None"])