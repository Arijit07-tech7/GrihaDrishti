from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[1]

MODEL_PATH = BASE_DIR / "models" / "house_price_model.pkl"


# ============================================================
# LOAD TRAINED MODEL
# ============================================================

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Trained model not found at: {MODEL_PATH}"
    )

model = joblib.load(MODEL_PATH)


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="GrihaDrishti API",
    description="AI-powered house price prediction API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# PROPERTY DATA MODEL
# ============================================================

class PropertyData(BaseModel):

    model_config = ConfigDict(
        populate_by_name=True,
        extra="ignore",
    )

    MSSubClass: float | None = None
    MSZoning: str | None = None
    LotFrontage: float | None = None
    LotArea: float | None = None

    Street: str | None = None
    Alley: str | None = None
    LotShape: str | None = None
    LandContour: str | None = None
    Utilities: str | None = None
    LotConfig: str | None = None
    LandSlope: str | None = None

    Neighborhood: str | None = None

    Condition1: str | None = None
    Condition2: str | None = None

    BldgType: str | None = None
    HouseStyle: str | None = None

    OverallQual: float | None = None
    OverallCond: float | None = None

    YearBuilt: float | None = None
    YearRemodAdd: float | None = None

    RoofStyle: str | None = None
    RoofMatl: str | None = None

    Exterior1st: str | None = None
    Exterior2nd: str | None = None

    MasVnrType: str | None = None
    MasVnrArea: float | None = None

    ExterQual: str | None = None
    ExterCond: str | None = None

    Foundation: str | None = None

    BsmtQual: str | None = None
    BsmtCond: str | None = None
    BsmtExposure: str | None = None
    BsmtFinType1: str | None = None
    BsmtFinSF1: float | None = None

    BsmtFinType2: str | None = None
    BsmtFinSF2: float | None = None

    BsmtUnfSF: float | None = None
    TotalBsmtSF: float | None = None

    Heating: str | None = None
    HeatingQC: str | None = None

    CentralAir: str | None = None
    Electrical: str | None = None

    # Dataset column: 1stFlrSF
    first_floor_sf: float | None = Field(
        default=None,
        alias="1stFlrSF",
    )

    # Dataset column: 2ndFlrSF
    second_floor_sf: float | None = Field(
        default=None,
        alias="2ndFlrSF",
    )

    LowQualFinSF: float | None = None
    GrLivArea: float | None = None

    BsmtFullBath: float | None = None
    BsmtHalfBath: float | None = None

    FullBath: float | None = None
    HalfBath: float | None = None

    BedroomAbvGr: float | None = None
    KitchenAbvGr: float | None = None

    KitchenQual: str | None = None

    TotRmsAbvGrd: float | None = None
    Functional: str | None = None

    Fireplaces: float | None = None
    FireplaceQu: str | None = None

    GarageType: str | None = None
    GarageYrBlt: float | None = None
    GarageFinish: str | None = None

    GarageCars: float | None = None
    GarageArea: float | None = None

    GarageQual: str | None = None
    GarageCond: str | None = None

    PavedDrive: str | None = None

    WoodDeckSF: float | None = None
    OpenPorchSF: float | None = None
    EnclosedPorch: float | None = None

    # Dataset column: 3SsnPorch
    three_ssn_porch: float | None = Field(
        default=None,
        alias="3SsnPorch",
    )

    ScreenPorch: float | None = None
    PoolArea: float | None = None

    PoolQC: str | None = None
    Fence: str | None = None
    MiscFeature: str | None = None

    MiscVal: float | None = None

    MoSold: float | None = None
    YrSold: float | None = None

    SaleType: str | None = None
    SaleCondition: str | None = None


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get("/")
def root():

    return {
        "name": "GrihaDrishti API",
        "status": "online",
        "model": "house_price_model.pkl",
        "model_type": "Log-target Gradient Boosting",
        "target": "SalePrice",
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_type": "Log-target Gradient Boosting",
    }


# ============================================================
# PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict_property(data: PropertyData):

    try:

        # ------------------------------------------------------
        # Convert Pydantic model to dictionary
        # ------------------------------------------------------

        payload = data.model_dump(
            by_alias=True,
            exclude_none=True,
        )


        # ------------------------------------------------------
        # Create DataFrame
        # ------------------------------------------------------

        input_df = pd.DataFrame(
            [payload]
        )


        # ------------------------------------------------------
        # Make prediction
        #
        # IMPORTANT:
        # The final model was trained using:
        #
        # log1p(SalePrice)
        #
        # Therefore we must convert the prediction back using:
        #
        # expm1(prediction)
        # ------------------------------------------------------

        log_prediction = model.predict(
            input_df
        )


        predicted_price = float(
            np.expm1(
                log_prediction[0]
            )
        )


        # ------------------------------------------------------
        # Prevent negative price
        # ------------------------------------------------------

        if predicted_price < 0:
            predicted_price = 0.0


        # ------------------------------------------------------
        # Return API response
        # ------------------------------------------------------

        return {
            "success": True,
            "prediction": {
                "salePrice": round(
                    predicted_price,
                    2,
                ),
                "currency": "USD",
                "target": "SalePrice",
            },
            "message": "Property valuation generated successfully.",
        }


    except Exception as error:

        print(
            "Prediction error:",
            repr(error),
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )