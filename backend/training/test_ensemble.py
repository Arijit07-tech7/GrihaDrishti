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

TARGET = "SalePrice"
ID_COLUMN = "Id"

TEST_SIZE = 0.20
RANDOM_STATE = 42


# ============================================================
# HEADER
# ============================================================

print("=" * 90)
print("             GRIHADRISHTI ENSEMBLE EXPERIMENT")
print("=" * 90)


# ============================================================
# 1. LOAD DATA
# ============================================================

print("\n[1/7] Loading dataset...")

df = pd.read_csv(DATA_PATH)

X = df.drop(columns=[TARGET]).copy()
y = df[TARGET].copy()

if ID_COLUMN in X.columns:
    X = X.drop(columns=[ID_COLUMN])


numeric_features = X.select_dtypes(
    include=["int64", "float64"]
).columns.tolist()

categorical_features = X.select_dtypes(
    include=["object"]
).columns.tolist()


# ============================================================
# 2. SPLIT
# ============================================================

print("\n[2/7] Creating validation split...")

X_train, X_valid, y_train, y_valid = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
)

print(f"Training samples   : {len(X_train)}")
print(f"Validation samples : {len(X_valid)}")


# ============================================================
# 3. PREPROCESSOR
# ============================================================

print("\n[3/7] Building preprocessing pipeline...")

numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="median"),
        )
    ]
)

categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="most_frequent"),
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
# 4. TRAIN NORMAL MODEL
# ============================================================

print("\n[4/7] Training tuned Gradient Boosting...")


normal_model = GradientBoostingRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=3,
    min_samples_split=4,
    min_samples_leaf=2,
    loss="huber",
    random_state=RANDOM_STATE,
)


normal_pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", normal_model),
    ]
)


normal_pipeline.fit(
    X_train,
    y_train,
)


normal_predictions = normal_pipeline.predict(
    X_valid
)


# ============================================================
# 5. TRAIN LOG MODEL
# ============================================================

print("\n[5/7] Training log-target Gradient Boosting...")


log_model = GradientBoostingRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=3,
    min_samples_split=4,
    min_samples_leaf=2,
    loss="huber",
    random_state=RANDOM_STATE,
)


log_pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor,
        ),
        (
            "model",
            log_model,
        ),
    ]
)


y_train_log = np.log1p(
    y_train
)


log_pipeline.fit(
    X_train,
    y_train_log,
)


log_predictions = np.expm1(
    log_pipeline.predict(X_valid)
)


log_predictions = np.maximum(
    log_predictions,
    0,
)


# ============================================================
# 6. TEST MULTIPLE BLENDS
# ============================================================

print("\n[6/7] Testing prediction blends...")
print("=" * 90)


blend_weights = [
    0.00,
    0.10,
    0.20,
    0.30,
    0.40,
    0.50,
    0.60,
    0.70,
    0.80,
    0.90,
    1.00,
]


results = []


for log_weight in blend_weights:

    normal_weight = 1.0 - log_weight

    predictions = (
        normal_weight * normal_predictions
        + log_weight * log_predictions
    )


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


    absolute_error = np.abs(
        predictions - y_valid.values
    )


    percentage_error = (
        absolute_error
        / y_valid.values
        * 100
    )


    within_5 = (
        percentage_error <= 5
    ).mean() * 100


    within_10 = (
        percentage_error <= 10
    ).mean() * 100


    within_20 = (
        percentage_error <= 20
    ).mean() * 100


    results.append(
        {
            "Normal Weight": normal_weight,
            "Log Weight": log_weight,
            "MAE": mae,
            "RMSE": rmse,
            "R2": r2,
            "Within 5%": within_5,
            "Within 10%": within_10,
            "Within 20%": within_20,
        }
    )


results_df = pd.DataFrame(
    results
)


# ============================================================
# DISPLAY
# ============================================================

print(
    results_df.round(4).to_string(
        index=False
    )
)


# ============================================================
# BEST BY R2
# ============================================================

best_r2 = results_df.loc[
    results_df["R2"].idxmax()
]


# BEST BY MAE
best_mae = results_df.loc[
    results_df["MAE"].idxmin()
]


# BEST BY RMSE
best_rmse = results_df.loc[
    results_df["RMSE"].idxmin()
]


# BEST BY ±20%
best_20 = results_df.loc[
    results_df["Within 20%"].idxmax()
]


# ============================================================
# 7. FINAL RESULTS
# ============================================================

print("\n")
print("=" * 90)
print("                       ENSEMBLE RESULTS")
print("=" * 90)


print("\nBEST R²:")
print(
    f"Normal Weight : {best_r2['Normal Weight']:.2f}"
)
print(
    f"Log Weight    : {best_r2['Log Weight']:.2f}"
)
print(
    f"R²            : {best_r2['R2']:.4f}"
)
print(
    f"MAE           : ${best_r2['MAE']:,.2f}"
)
print(
    f"RMSE          : ${best_r2['RMSE']:,.2f}"
)
print(
    f"±10%          : {best_r2['Within 10%']:.2f}%"
)
print(
    f"±20%          : {best_r2['Within 20%']:.2f}%"
)


print("\nBEST MAE:")
print(
    f"Normal Weight : {best_mae['Normal Weight']:.2f}"
)
print(
    f"Log Weight    : {best_mae['Log Weight']:.2f}"
)
print(
    f"MAE           : ${best_mae['MAE']:,.2f}"
)
print(
    f"R²            : {best_mae['R2']:.4f}"
)


print("\nBEST RMSE:")
print(
    f"Normal Weight : {best_rmse['Normal Weight']:.2f}"
)
print(
    f"Log Weight    : {best_rmse['Log Weight']:.2f}"
)
print(
    f"RMSE          : ${best_rmse['RMSE']:,.2f}"
)
print(
    f"R²            : {best_rmse['R2']:.4f}"
)


print("\nBEST ±20% COVERAGE:")
print(
    f"Normal Weight : {best_20['Normal Weight']:.2f}"
)
print(
    f"Log Weight    : {best_20['Log Weight']:.2f}"
)
print(
    f"±20%          : {best_20['Within 20%']:.2f}%"
)
print(
    f"R²            : {best_20['R2']:.4f}"
)


# ============================================================
# SAVE RESULTS
# ============================================================

RESULT_PATH = (
    BASE_DIR
    / "models"
    / "ensemble_results.csv"
)


results_df.to_csv(
    RESULT_PATH,
    index=False,
)


print("\n")
print("=" * 90)
print("Ensemble results saved to:")
print(RESULT_PATH)
print("=" * 90)

print("\nENSEMBLE EXPERIMENT COMPLETE.")