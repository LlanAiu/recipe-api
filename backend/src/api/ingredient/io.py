# builtin

# external
from pydantic import BaseModel

# internal
from src.database import Ingredient


class GetIngredientsOutput(BaseModel):
    ingredients_list: list[Ingredient]