from pathlib import Path

import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split, ParameterGrid
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
print("             GRIHADRISHTI GRADIENT BOOSTING TUNING")
print("=" * 90)


# ============================================================
# 1. LOAD DATA
# ============================================================

print("\n[1/6] Loading dataset...")

if not DATA_PATH.exists():
    raise FileNotFoundError(
        f"Dataset not found:\n{DATA_PATH}"
    )

df = pd.read_csv(DATA_PATH)

print(f"Dataset shape : {df.shape}")


# ============================================================
# 2. PREPARE DATA
# ============================================================

print("\n[2/6] Preparing dataset...")

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
# 3. SAME VALIDATION SPLIT
# ============================================================

print("\n[3/6] Creating validation split...")

X_train, X_valid, y_train, y_valid = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
)


print(
    f"Training samples   : {len(X_train)}"
)

print(
    f"Validation samples : {len(X_valid)}"
)


# ============================================================
# 4. PREPROCESSING
# ============================================================

print("\n[4/6] Building preprocessing pipeline...")


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
# 5. HYPERPARAMETER SEARCH
# ============================================================

print("\n[5/6] Starting hyperparameter tuning...")
print("=" * 90)


parameter_grid = {
    "n_estimators": [
        500,
        800,
        1200,
    ],

    "learning_rate": [
        0.02,
        0.03,
        0.05,
    ],

    "max_depth": [
        3,
        4,
        5,
    ],

    "min_samples_split": [
        2,
        4,
        6,
    ],

    "min_samples_leaf": [
        1,
        2,
        3,
    ],

    "loss": [
        "huber",
        "squared_error",
    ],
}


# To keep the first tuning run practical,
# we use a carefully selected set of combinations
# instead of testing every possible combination.

parameter_combinations = [
    {
        "n_estimators": 800,
        "learning_rate": 0.02,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1000,
        "learning_rate": 0.02,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1200,
        "learning_rate": 0.02,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 800,
        "learning_rate": 0.03,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1000,
        "learning_rate": 0.03,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1200,
        "learning_rate": 0.03,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 800,
        "learning_rate": 0.03,
        "max_depth": 4,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1000,
        "learning_rate": 0.03,
        "max_depth": 4,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1200,
        "learning_rate": 0.03,
        "max_depth": 4,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 800,
        "learning_rate": 0.05,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1000,
        "learning_rate": 0.05,
        "max_depth": 3,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 800,
        "learning_rate": 0.03,
        "max_depth": 5,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 1000,
        "learning_rate": 0.03,
        "max_depth": 5,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "loss": "huber",
    },
    {
        "n_estimators": 800,
        "learning_rate": 0.03,
        "max_depth": 4,
        "min_samples_split": 2,
        "min_samples_leaf": 1,
        "loss": "squared_error",
    },
    {
        "n_estimators": 1000,
        "learning_rate": 0.03,
        "max_depth": 4,
        "min_samples_split": 2,
        "min_samples_leaf": 1,
        "loss": "squared_error",
    },
]


print(
    f"Configurations to test: {len(parameter_combinations)}"
)


results = []


# ============================================================
# TRAIN EACH CONFIGURATION
# ============================================================

for index, params in enumerate(
    parameter_combinations,
    start=1,
):

    print(
        f"\n[{index}/{len(parameter_combinations)}] "
        f"Testing configuration..."
    )

    print(
        f"n_estimators={params['n_estimators']}, "
        f"learning_rate={params['learning_rate']}, "
        f"max_depth={params['max_depth']}, "
        f"min_samples_split={params['min_samples_split']}, "
        f"min_samples_leaf={params['min_samples_leaf']}, "
        f"loss={params['loss']}"
    )


    model = GradientBoostingRegressor(
        n_estimators=params["n_estimators"],
        learning_rate=params["learning_rate"],
        max_depth=params["max_depth"],
        min_samples_split=params["min_samples_split"],
        min_samples_leaf=params["min_samples_leaf"],
        loss=params["loss"],
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


    # Train
    pipeline.fit(
        X_train,
        y_train,
    )


    # Predict
    predictions = pipeline.predict(
        X_valid
    )


    # Metrics
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


    # Percentage errors
    absolute_errors = np.abs(
        predictions - y_valid.values
    )


    percentage_errors = (
        absolute_errors
        / y_valid.values
        * 100
    )


    within_5 = (
        percentage_errors <= 5
    ).mean() * 100


    within_10 = (
        percentage_errors <= 10
    ).mean() * 100


    within_20 = (
        percentage_errors <= 20
    ).mean() * 100


    results.append(
        {
            **params,
            "MAE": mae,
            "RMSE": rmse,
            "R2": r2,
            "Within_5": within_5,
            "Within_10": within_10,
            "Within_20": within_20,
        }
    )


    print(
        f"MAE={mae:,.2f} | "
        f"RMSE={rmse:,.2f} | "
        f"R²={r2:.4f} | "
        f"±10%={within_10:.2f}%"
    )


# ============================================================
# RESULTS
# ============================================================

print("\n")
print("=" * 90)
print("                    TUNING RESULTS")
print("=" * 90)


results_df = pd.DataFrame(
    results
)


results_df = results_df.sort_values(
    by="R2",
    ascending=False,
)


display_columns = [
    "n_estimators",
    "learning_rate",
    "max_depth",
    "min_samples_split",
    "min_samples_leaf",
    "loss",
    "MAE",
    "RMSE",
    "R2",
    "Within_5",
    "Within_10",
    "Within_20",
]


display_df = results_df[
    display_columns
].copy()


display_df["MAE"] = (
    display_df["MAE"].round(2)
)

display_df["RMSE"] = (
    display_df["RMSE"].round(2)
)

display_df["R2"] = (
    display_df["R2"].round(4)
)

display_df["Within_5"] = (
    display_df["Within_5"].round(2)
)

display_df["Within_10"] = (
    display_df["Within_10"].round(2)
)

display_df["Within_20"] = (
    display_df["Within_20"].round(2)
)


print(
    display_df.to_string(
        index=False
    )
)


# ============================================================
# SAVE RESULTS
# ============================================================

RESULT_PATH = (
    BASE_DIR
    / "models"
    / "gradient_boosting_tuning_results.csv"
)


results_df.to_csv(
    RESULT_PATH,
    index=False,
)


# ============================================================
# BEST CONFIGURATION
# ============================================================

best = results_df.iloc[0]


print("\n")
print("=" * 90)
print("                    BEST CONFIGURATION")
print("=" * 90)


print(
    f"n_estimators      : {int(best['n_estimators'])}"
)

print(
    f"learning_rate     : {best['learning_rate']}"
)

print(
    f"max_depth         : {int(best['max_depth'])}"
)

print(
    f"min_samples_split : {int(best['min_samples_split'])}"
)

print(
    f"min_samples_leaf  : {int(best['min_samples_leaf'])}"
)

print(
    f"loss              : {best['loss']}"
)

print(
    f"\nMAE               : ${best['MAE']:,.2f}"
)

print(
    f"RMSE              : ${best['RMSE']:,.2f}"
)

print(
    f"R²                : {best['R2']:.4f}"
)

print(
    f"Within ±5%        : {best['Within_5']:.2f}%"
)

print(
    f"Within ±10%       : {best['Within_10']:.2f}%"
)

print(
    f"Within ±20%       : {best['Within_20']:.2f}%"
)


print("=" * 90)


print(
    f"\nResults saved to:"
)

print(
    RESULT_PATH
)


print("\nTUNING COMPLETE.")