# builtin
from contextlib import asynccontextmanager

# external
from fastapi import FastAPI, Request

# internal
from src.api import recipe_router, ingredient_router
from src.globals import Environment
from src.database import SupabaseClient
from src.modules import RecipeFinder


def initialize_database_client(app: FastAPI):
    environment: Environment = app.state.environment
    supabase_client: SupabaseClient = SupabaseClient(environment.SUPABASE_PROJECT_URL, environment.SUPABASE_API_KEY)
    app.state.supabase_client = supabase_client

def initialize_recipe_finder(app: FastAPI):
    supabase_client: SupabaseClient = app.state.supabase_client
    recipe_finder: RecipeFinder = RecipeFinder(supabase_client=supabase_client)
    app.state.recipe_finder = recipe_finder

@asynccontextmanager
async def lifespan(app: FastAPI):
    environment: Environment = Environment()
    app.state.environment = environment
    initialize_database_client(app)
    initialize_recipe_finder(app)
    yield

app: FastAPI = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root(request: Request):
    return {"Hello" : "World"}

app.include_router(router=recipe_router)
app.include_router(router=ingredient_router)