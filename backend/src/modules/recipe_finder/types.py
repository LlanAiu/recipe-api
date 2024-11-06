# builtin

# external
from pydantic import BaseModel

# internal

class AllRecipeCounts(BaseModel):
    recipes: dict[int, int]
