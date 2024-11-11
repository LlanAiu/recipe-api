# builtin

# external
from fastapi import APIRouter, Request

# internal
from .io import GetIngredientsOutput
from src.database import SupabaseClient, IngredientList, Ingredient


ingredient_router: APIRouter = APIRouter(prefix="/ingredient")

@ingredient_router.get("/all")
def get_all_ingredients(request: Request) -> GetIngredientsOutput:
    supabase_client: SupabaseClient = request.app.state.supabase_client

    ingredients: IngredientList = supabase_client.ingredients_table.get_all_ingredients()

    ingredients_list: list[Ingredient] = ingredients.all_ingredients

    return GetIngredientsOutput(ingredients_list=ingredients_list)
