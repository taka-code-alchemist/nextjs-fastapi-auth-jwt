from fastapi import FastAPI

from routes import todo, auth

app = FastAPI()
app.include_router(todo.router)
app.include_router(auth.router)

@app.get('/')
async def root():
    return {'message": "Hello World'}
