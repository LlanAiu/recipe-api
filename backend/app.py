# builtin
from contextlib import asynccontextmanager

# external
from fastapi import FastAPI

# internal
from src.api import greet_router, farewell_router
from src.globals import Environment


@asynccontextmanager
async def lifespan(app: FastAPI):
    environment: Environment = Environment()
    app.state.environment = environment
    print(environment.ALAN_KEY)
    print("Hello")
    yield
    print("World")

app: FastAPI = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"Hello" : "World"}

app.include_router(router=greet_router)
app.include_router(router=farewell_router)