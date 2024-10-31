# builtin

# external
from pydantic import BaseModel

# internal


class BuildRecipeInput(BaseModel):
    ingredients: list[str]

class BuildRecipeOutput(BaseModel):
    possible_recipes: list[str]

class RecipeInformationOutput(BaseModel):
    recipe_name: str
    ingredient_amounts: list[str]
    directions: str