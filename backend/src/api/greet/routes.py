# builtin

# external
from fastapi import APIRouter, Request

# internal
from .io import GreetingInput, GreetingOutput
from src.globals import Environment


greet_router: APIRouter = APIRouter(prefix="/greet")

@greet_router.post("/")
def greet_root(input: GreetingInput, request: Request) -> GreetingOutput:
    environment: Environment = request.app.state.environment
    return GreetingOutput(greeting="Hello " + input.first_name + " " + input.last_name + "!")

