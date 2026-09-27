
from pathlib import Path

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


# ============================================================
# CONFIG
# ============================================================

TARGET_COLUMN = "SalePrice"
ID_COLUMN = "Id"

TEST_SIZE = 0.20
RANDOM_STATE = 42


# ============================================================
# HEADER
# ============================================================

print("=" * 90)
print("          GRIHADRISHTI LOG-TARGET MODEL EXPERIMENT")
print("=" * 90)


# ============================================================
# 1. LOAD DATA
# ============================================================

print("\n[1/7] Loading dataset...")

if not DATA_PATH.exists():
    raise FileNotFoundError(
        f"Dataset not found:\n{DATA_PATH}"
    )

df = pd.read_csv(DATA_PATH)

print(f"Dataset shape : {df.shape}")


# ============================================================
# 2. PREPARE FEATURES
# ============================================================

print("\n[2/7] Preparing features...")

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
# 3. LOG TRANSFORM TARGET
# ============================================================

print("\n[3/7] Applying log transformation to SalePrice...")

y_log = np.log1p(y)

print(
    f"Original target mean : ${y.mean():,.2f}"
)

print(
    f"Original target max  : ${y.max():,.2f}"
)


# ============================================================
# 4. TRAIN / VALIDATION SPLIT
# ============================================================

print("\n[4/7] Creating validation split...")

X_train, X_valid, y_train_log, y_valid_log = train_test_split(
    X,
    y_log,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
)


# Keep the original SalePrice values for final evaluation
y_train_original = y.loc[
    y_train_log.index
]

y_valid_original = y.loc[
    y_valid_log.index
]


print(
    f"Training samples   : {len(X_train)}"
)

print(
    f"Validation samples : {len(X_valid)}"
)


# ============================================================
# 5. PREPROCESSING
# ============================================================

print("\n[5/7] Building preprocessing pipeline...")


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
# 6. LOG-TARGET GRADIENT BOOSTING MODEL
# ============================================================

print("\n[6/7] Training log-target Gradient Boosting model...")


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


# Train using log-transformed SalePrice
pipeline.fit(
    X_train,
    y_train_log,
)


# Predict log prices
predictions_log = pipeline.predict(
    X_valid
)


# Convert predictions back to original dollar scale
predictions = np.expm1(
    predictions_log
)

# Prevent negative predictions
predictions = np.maximum(
    predictions,
    0
)


# ============================================================
# 7. EVALUATION
# ============================================================

print("\n[7/7] Evaluating on original SalePrice scale...")


mae = mean_absolute_error(
    y_valid_original,
    predictions,
)


rmse = np.sqrt(
    mean_squared_error(
        y_valid_original,
        predictions,
    )
)


r2 = r2_score(
    y_valid_original,
    predictions,
)


# ------------------------------------------------------------
# Percentage errors
# ------------------------------------------------------------

absolute_errors = np.abs(
    predictions
    - y_valid_original.values
)


percentage_errors = (
    absolute_errors
    / y_valid_original.values
    * 100
)


within_2 = (
    percentage_errors <= 2
).mean() * 100


within_5 = (
    percentage_errors <= 5
).mean() * 100


within_10 = (
    percentage_errors <= 10
).mean() * 100


within_20 = (
    percentage_errors <= 20
).mean() * 100


above_20 = (
    percentage_errors > 20
).mean() * 100


# ============================================================
# RESULTS
# ============================================================

print("\n")
print("=" * 90)
print("                  LOG-TARGET MODEL RESULTS")
print("=" * 90)


print(
    f"MAE              : ${mae:,.2f}"
)

print(
    f"RMSE             : ${rmse:,.2f}"
)

print(
    f"R²               : {r2:.4f}"
)

print(
    f"Within ±2%       : {within_2:.2f}%"
)

print(
    f"Within ±5%       : {within_5:.2f}%"
)

print(
    f"Within ±10%      : {within_10:.2f}%"
)

print(
    f"Within ±20%      : {within_20:.2f}%"
)

print(
    f"Above ±20%       : {above_20:.2f}%"
)


print("=" * 90)


# ============================================================
# COMPARISON WITH CURRENT BEST MODEL
# ============================================================

print("\n")
print("=" * 90)
print("                 COMPARISON WITH CURRENT MODEL")
print("=" * 90)


print(
    "Current tuned model:"
)

print(
    "R²       = 0.9115"
)

print(
    "±5%      = 42.12%"
)

print(
    "±10%     = 71.58%"
)

print(
    "±20%     = 89.73%"
)


print("\nLog-target model:")

print(
    f"R²       = {r2:.4f}"
)

print(
    f"±5%      = {within_5:.2f}%"
)

print(
    f"±10%     = {within_10:.2f}%"
)

print(
    f"±20%     = {within_20:.2f}%"
)


print("=" * 90)


# ============================================================
# SAVE VALIDATION PREDICTIONS
# ============================================================

results_df = pd.DataFrame(
    {
        "Actual SalePrice": y_valid_original.values,
        "Predicted SalePrice": predictions,
        "Difference": predictions
        - y_valid_original.values,
        "Absolute Error": absolute_errors,
        "Error %": percentage_errors,
    }
)


RESULT_PATH = (
    BASE_DIR
    / "models"
    / "log_model_validation_results.csv"
)


results_df.to_csv(
    RESULT_PATH,
    index=False,
)


print(
    f"\nValidation report saved to:"
)

print(
    RESULT_PATH
)


print("\nLOG-TARGET EXPERIMENT COMPLETE.")