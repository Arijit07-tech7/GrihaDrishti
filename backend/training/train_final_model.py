from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[1]

DATA_PATH = BASE_DIR / "data" / "train.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_PATH = MODEL_DIR / "house_price_model.pkl"


# ============================================================
# CONFIG
# ============================================================

TARGET_COLUMN = "SalePrice"
ID_COLUMN = "Id"

RANDOM_STATE = 42


# ============================================================
# HEADER
# ============================================================

print("=" * 90)
print("             GRIHADRISHTI FINAL LOG-TARGET MODEL")
print("=" * 90)


# ============================================================
# 1. LOAD DATA
# ============================================================

print("\n[1/6] Loading complete dataset...")

if not DATA_PATH.exists():
    raise FileNotFoundError(
        f"Dataset not found:\n{DATA_PATH}"
    )

df = pd.read_csv(DATA_PATH)

print(f"Rows    : {df.shape[0]}")
print(f"Columns : {df.shape[1]}")


# ============================================================
# 2. PREPARE FEATURES
# ============================================================

print("\n[2/6] Preparing features...")

X = df.drop(
    columns=[TARGET_COLUMN]
).copy()

y = df[TARGET_COLUMN].copy()


if ID_COLUMN in X.columns:
    X = X.drop(
        columns=[ID_COLUMN]
    )


numeric_features = X.select_dtypes(
    include=["int64", "float64"]
).columns.tolist()

categorical_features = X.select_dtypes(
    include=["object"]
).columns.tolist()


print(
    f"Numeric features     : {len(numeric_features)}"
)

print(
    f"Categorical features : {len(categorical_features)}"
)


# ============================================================
# 3. PREPROCESSING
# ============================================================

print("\n[3/6] Building preprocessing pipeline...")


numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="median"
            ),
        ),
    ]
)


categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="most_frequent"
            ),
        ),
        (
            "onehot",
            OneHotEncoder(
                handle_unknown="ignore",
                sparse_output=False,
            ),
        ),
    ]
)


preprocessor = ColumnTransformer(
    transformers=[
        (
            "numeric",
            numeric_pipeline,
            numeric_features,
        ),
        (
            "categorical",
            categorical_pipeline,
            categorical_features,
        ),
    ]
)


# ============================================================
# 4. FINAL LOG-TARGET MODEL
# ============================================================

print("\n[4/6] Creating final Log-target Gradient Boosting model...")


model = GradientBoostingRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=3,
    min_samples_split=4,
    min_samples_leaf=2,
    loss="huber",
    random_state=RANDOM_STATE,
)


pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor,
        ),
        (
            "model",
            model,
        ),
    ]
)


# ============================================================
# 5. LOG-TRANSFORM TARGET
# ============================================================

print("\n[5/6] Applying log1p transformation to SalePrice...")


y_log = np.log1p(y)


print(
    f"Original SalePrice range : "
    f"${y.min():,.0f} - ${y.max():,.0f}"
)


print(
    f"Log-transformed target    : "
    f"{y_log.min():.4f} - {y_log.max():.4f}"
)


# ============================================================
# 6. TRAIN + SAVE
# ============================================================

print("\n[6/6] Training final model on all 1460 houses...")


pipeline.fit(
    X,
    y_log,
)


MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


joblib.dump(
    pipeline,
    MODEL_PATH,
)


print("\n" + "=" * 90)
print("                  FINAL MODEL READY")
print("=" * 90)

print(
    f"\nModel saved to:"
)

print(
    MODEL_PATH
)

print(
    "\nModel type:"
)

print(
    "Log-target GradientBoostingRegressor"
)

print(
    "\nConfiguration:"
)

print(
    "n_estimators  = 1000"
)

print(
    "learning_rate = 0.05"
)

print(
    "max_depth     = 3"
)

print(
    "min_samples_split = 4"
)

print(
    "min_samples_leaf  = 2"
)

print(
    "loss          = huber"
)

print(
    "\nTarget transformation:"
)

print(
    "Training  : log1p(SalePrice)"
)

print(
    "Prediction : expm1(model_output)"
)

print(
    "\nTraining rows:"
)

print(
    len(X)
)

print("=" * 90)

print(
    "\nFINAL MODEL TRAINING COMPLETE."
)