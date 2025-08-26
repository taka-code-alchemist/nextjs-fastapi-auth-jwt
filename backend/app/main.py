from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import todo, auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要なら "http://localhost:3000" などに限定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router)
app.include_router(auth.router)

@app.get('/')
async def root():
    return {'message': 'Hello World'}
