# builtin

# external
from pydantic import BaseModel

# internal

class FarewellInput(BaseModel):
    first_name: str
    last_name: str

class FarewellOutput(BaseModel):
    farewell: str