# builtin

# external
from fastapi import APIRouter

# internal
from .io import FarewellInput, FarewellOutput

farewell_router: APIRouter = APIRouter(prefix="/farewell")

@farewell_router.post("/")
def farewell_root(input: FarewellInput) -> FarewellOutput:
    return FarewellOutput(farewell="Goodbye " + input.first_name + " " + input.last_name + "!")