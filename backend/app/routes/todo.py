from fastapi import APIRouter

router = APIRouter()


@router.get("/general", tags=["api"])
async def general_method():
    return({'message': 'you are general.'})


@router.get("/limited", tags=["api"])
async def limited_method():
    return({'message': 'you are limited.'})


@router.get("/superlimited", tags=["api"])
async def super_limited():
    return({'message': 'you are super limited.'})
