# builtin

# external
from pydantic_settings import BaseSettings, SettingsConfigDict

# internal


class Environment(BaseSettings):
    SUPABASE_PROJECT_URL: str
    SUPABASE_API_KEY: str

    model_config: SettingsConfigDict = SettingsConfigDict(env_file='.env')