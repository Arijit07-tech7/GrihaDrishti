from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
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
# CONFIGURATION
# ============================================================

TARGET_COLUMN = "SalePrice"
ID_COLUMN = "Id"

TEST_SIZE = 0.20
RANDOM_STATE = 42


# ============================================================
# LOAD DATASET
# ============================================================

print("=" * 70)
print("              GRIHADRISHTI ML TRAINING")
print("=" * 70)

print("\n[1/7] Loading dataset...")

if not DATA_PATH.exists():
    raise FileNotFoundError(
        f"Dataset not found at:\n{DATA_PATH}"
    )

df = pd.read_csv(DATA_PATH)

print(f"Dataset loaded successfully.")
print(f"Rows    : {df.shape[0]}")
print(f"Columns : {df.shape[1]}")


# ============================================================
# BASIC VALIDATION
# ============================================================

print("\n[2/7] Validating dataset...")

if TARGET_COLUMN not in df.columns:
    raise ValueError(
        f"Target column '{TARGET_COLUMN}' was not found in dataset."
    )

print(f"Target column : {TARGET_COLUMN}")

if ID_COLUMN in df.columns:
    print(f"Identifier    : {ID_COLUMN}")
else:
    print("Identifier    : Id column not found.")


# ============================================================
# SEPARATE FEATURES AND TARGET
# ============================================================

print("\n[3/7] Preparing features and target...")

# Target
y = df[TARGET_COLUMN].copy()

# Features
X = df.drop(columns=[TARGET_COLUMN]).copy()

# Id is only an identifier and should not be used
# as a predictive feature.
if ID_COLUMN in X.columns:
    X = X.drop(columns=[ID_COLUMN])

print(f"Features used : {X.shape[1]}")
print(f"Target rows   : {len(y)}")


# ============================================================
# DETECT FEATURE TYPES
# ============================================================

numeric_features = X.select_dtypes(
    include=["int64", "int32", "float64", "float32"]
).columns.tolist()

categorical_features = X.select_dtypes(
    include=["object", "category", "bool"]
).columns.tolist()

print("\nFeature type summary:")
print(f"Numerical features   : {len(numeric_features)}")
print(f"Categorical features : {len(categorical_features)}")


# ============================================================
# PREPROCESSING PIPELINES
# ============================================================

print("\n[4/7] Building preprocessing pipeline...")

# Numerical preprocessing
numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="median"),
        ),
    ]
)


# Categorical preprocessing
categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="most_frequent"
            ),
        ),
        (
            "encoder",
            OneHotEncoder(
                handle_unknown="ignore",
                sparse_output=False,
            ),
        ),
    ]
)


# Combine numerical + categorical processing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "numerical",
            numeric_pipeline,
            numeric_features,
        ),
        (
            "categorical",
            categorical_pipeline,
            categorical_features,
        ),
    ],
    remainder="drop",
)


# ============================================================
# MODEL
# ============================================================

print("\n[5/7] Creating ML model...")

model = GradientBoostingRegressor(
    n_estimators=500,
    learning_rate=0.03,
    max_depth=4,
    min_samples_split=4,
    min_samples_leaf=2,
    loss="huber",
    random_state=RANDOM_STATE,
)


# Complete pipeline
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
# TRAIN / VALIDATION SPLIT
# ============================================================

X_train, X_valid, y_train, y_valid = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
)


print("\nTraining split:")
print(f"Training samples   : {len(X_train)}")
print(f"Validation samples : {len(X_valid)}")


# ============================================================
# TRAIN MODEL
# ============================================================

print("\n[6/7] Training model...")
print("This may take a little while...\n")

pipeline.fit(
    X_train,
    y_train,
)

print("Model training completed.")


# ============================================================
# VALIDATION
# ============================================================

print("\nEvaluating model...")

predictions = pipeline.predict(X_valid)

mae = mean_absolute_error(
    y_valid,
    predictions,
)

rmse = np.sqrt(
    mean_squared_error(
        y_valid,
        predictions,
    )
)

r2 = r2_score(
    y_valid,
    predictions,
)


print("\n" + "=" * 70)
print("                    MODEL RESULTS")
print("=" * 70)

print(f"MAE  : ${mae:,.2f}")
print(f"RMSE : ${rmse:,.2f}")
print(f"R²   : {r2:.4f}")

print("=" * 70)


# ============================================================
# SAVE MODEL
# ============================================================

print("\n[7/7] Saving trained model...")

MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True,
)

joblib.dump(
    pipeline,
    MODEL_PATH,
)

print(f"\nModel saved successfully:")
print(MODEL_PATH)


# ============================================================
# FINAL CHECK
# ============================================================

if MODEL_PATH.exists():
    model_size_mb = MODEL_PATH.stat().st_size / (
        1024 * 1024
    )

    print(
        f"Model file size : {model_size_mb:.2f} MB"
    )

    print("\nSUCCESS!")
    print(
        "GrihaDrishti house-price ML pipeline "
        "is ready for the FastAPI backend."
    )
else:
    raise RuntimeError(
        "Model file was not created successfully."
    )


print("\n" + "=" * 70)
print("                  TRAINING COMPLETE")
print("=" * 70)