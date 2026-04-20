from pydantic import BaseModel, EmailStr
from app.core.enums import RoleEnum

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class RoleResponse(BaseModel):
    id: int
    role: str

    class Config:
        from_attributes = True

class RoleUpdate(BaseModel):
    role: RoleEnum
