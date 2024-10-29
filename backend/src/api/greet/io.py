# builtin

# external
from pydantic import BaseModel

# internal

class GreetingInput(BaseModel):
    first_name: str
    last_name: str

class GreetingOutput(BaseModel):
    greeting: str