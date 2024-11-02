# builtin
from contextlib import asynccontextmanager

# external
from fastapi import FastAPI, Request

# internal
from src.api import recipe_router
from src.globals import Environment
from src.modules.database import SupabaseClient


def initialize_database_client(app: FastAPI):
    environment: Environment = app.state.environment
    supabase_client: SupabaseClient = SupabaseClient(environment.SUPABASE_PROJECT_URL, environment.SUPABASE_API_KEY)
    app.state.supabase_client = supabase_client


@asynccontextmanager
async def lifespan(app: FastAPI):
    environment: Environment = Environment()
    app.state.environment = environment
    initialize_database_client(app)
    yield

app: FastAPI = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root(request: Request):
    return {"Hello" : "World"}

app.include_router(router=recipe_router)