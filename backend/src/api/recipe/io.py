# builtin

# external
from pydantic import BaseModel

# internal


class BuildRecipeInput(BaseModel):
    ingredients: list[str]

class RecipeInformationOutput(BaseModel):
    id: int
    recipe_name: str
    ingredient_amounts: list[str]
    directions: list[str]

class BuildRecipeOutput(BaseModel):
    possible_recipes: list[RecipeInformationOutput]
