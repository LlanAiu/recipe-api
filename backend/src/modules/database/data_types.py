# builtin
from enum import Enum

# external
from pydantic import BaseModel

# internal


class RetrieveRecipeParams(BaseModel):
    id: int

class RecipeAttribute(Enum):
    NAME = "name"
    INGREDIENTS = "ingredient_amounts"
    DIRECTIONS = "directions"


def filter_misc_chars(char: str) -> bool:
    filtered_chars: str = "\"[]"
    return char not in filtered_chars

def clean_string(string: str) -> str:
    assert isinstance(string, str), "Input string must be a string!"

    filtered: filter = filter(filter_misc_chars, string)
    filtered_string: str = "".join(filtered)
    return filtered_string.strip()

class RecipeData(BaseModel):
    name: str
    ingredients: str
    directions: str

    def get_name(self) -> str:
        return self.name.strip()

    def get_ingredients_list(self) -> list[str]:
        ingredients: list[str] = self.ingredients.split('\",')

        for i, ingredient in enumerate(ingredients):
            ingredients[i] = clean_string(string=ingredient)

        return ingredients
    
    def get_directions_list(self) -> list[str]:
        directions_list: list[str] = self.directions.split('\",')

        for i, direction in enumerate(directions_list):
            directions_list[i] = clean_string(string=direction)

        return directions_list
