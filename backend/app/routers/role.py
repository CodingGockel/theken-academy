from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.core.enums import RoleEnum
from app.schemas.user import RoleResponse, RoleUpdate
from app.core.auth import get_current_user

router = APIRouter(prefix="/api/role", tags=["role"])


@router.get("/{user_id}", response_model=RoleResponse)
def get_role(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id and current_user.role != RoleEnum.ADMIN:
        raise HTTPException(
            status_code=403,
            detail="Keine Berechtigung, die Rolle anderer Benutzer einzusehen"
        )

    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")

    return target_user


@router.put("/{user_id}", response_model=RoleResponse)
def set_role(
    user_id: int,
    role_data: RoleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Nur Admins dürfen Rollen ändern")

    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")

    target_user.role = role_data.role
    db.commit()
    db.refresh(target_user)
    return target_user
