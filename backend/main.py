from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware

# Configuración de CORS
origins = [
    "http://localhost",
    "http://localhost:4200",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql://postgres:123456789@postgres.c7qk80qq89s4.us-east-2.rds.amazonaws.com:5432/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    date = Column(Date, default=datetime.now().date())  # Se establece automáticamente la fecha
    description = Column(String)
    content = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    
    user = relationship("User", back_populates="recipes")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    
    recipes = relationship("Recipe", back_populates="user")

Base.metadata.create_all(bind=engine)

class RecipeCreate(BaseModel):
    name: str
    description: str
    content: str
    username: str

class UserCreate(BaseModel):
    username: str
    

@app.get("/")
async def welcome():
    return {"message": "Bienvenido a mi API de recetas"}

@app.post("/recipes/")
async def create_recipe(recipe: RecipeCreate):
    db = SessionLocal()
    # Buscar el usuario por su nombre de usuario
    user = db.query(User).filter(User.username == recipe.username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Crear la receta asociada al usuario
    db_recipe = Recipe(
        name=recipe.name,
        description=recipe.description,
        content=recipe.content,
        user_id=user.id,
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@app.get("/recipes/{recipe_id}")
async def get_recipe(recipe_id: int):
    db = SessionLocal()
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    return recipe

@app.get("/users/{username}/recipes/")
async def get_user_recipes(username: str):
    db = SessionLocal()
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    recipes = db.query(Recipe).filter(Recipe.user_id == user.id).all()
    if not recipes:
        raise HTTPException(status_code=404, detail="No se encontraron recetas para este usuario")
    return recipes

@app.post("/users/")
async def create_user(user: UserCreate):
    db = SessionLocal()
    
    # Verificar si el nombre de usuario ya existe
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        # Si el nombre de usuario ya existe, puedes optar por simplemente continuar
        # o puedes devolver un mensaje informativo
        return existing_user
    
    # Si el nombre de usuario no existe, crear el nuevo usuario
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user
