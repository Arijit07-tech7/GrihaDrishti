from pathlib import Path

import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import (
    RandomForestRegressor,
    GradientBoostingRegressor,
    ExtraTreesRegressor,
    RandomForestRegressor,
    HistGradientBoostingRegressor,
)
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge, ElasticNet
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


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

print("=" * 85)
print("                 GRIHADRISHTI MODEL COMPARISON")
print("=" * 85)


# ============================================================
# 1. LOAD DATA
# ============================================================

print("\n[1/6] Loading dataset...")

df = pd.read_csv(DATA_PATH)

print(f"Dataset shape : {df.shape}")
print(f"Target        : {TARGET_COLUMN}")


# ============================================================
# 2. PREPARE DATA
# ============================================================

print("\n[2/6] Preparing dataset...")

X = df.drop(columns=[TARGET_COLUMN]).copy()
y = df[TARGET_COLUMN].copy()

if ID_COLUMN in X.columns:
    X = X.drop(columns=[ID_COLUMN])


# Detect feature types

numeric_features = X.select_dtypes(
    include=["int64", "float64"]
).columns.tolist()

categorical_features = X.select_dtypes(
    include=["object"]
).columns.tolist()


print(f"Numeric features     : {len(numeric_features)}")
print(f"Categorical features : {len(categorical_features)}")


# ============================================================
# 3. TRAIN / VALIDATION SPLIT
# ============================================================

print("\n[3/6] Creating validation split...")

X_train, X_valid, y_train, y_valid = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
)

print(f"Training samples   : {len(X_train)}")
print(f"Validation samples : {len(X_valid)}")


# ============================================================
# 4. PREPROCESSING
# ============================================================

numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(strategy="median"),
        ),
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
# 5. MODELS
# ============================================================

print("\n[4/6] Preparing models...")


models = {
    "Gradient Boosting": GradientBoostingRegressor(
        n_estimators=800,
        learning_rate=0.03,
        max_depth=4,
        min_samples_split=4,
        min_samples_leaf=2,
        loss="huber",
        random_state=RANDOM_STATE,
    ),

    "Extra Trees": ExtraTreesRegressor(
        n_estimators=500,
        max_features=1.0,
        min_samples_split=2,
        min_samples_leaf=1,
        random_state=RANDOM_STATE,
        n_jobs=-1,
    ),

    "Random Forest": RandomForestRegressor(
        n_estimators=500,
        max_features=0.8,
        min_samples_split=2,
        min_samples_leaf=1,
        random_state=RANDOM_STATE,
        n_jobs=-1,
    ),

    "Hist Gradient Boosting": HistGradientBoostingRegressor(
        max_iter=500,
        learning_rate=0.05,
        max_leaf_nodes=31,
        l2_regularization=0.1,
        random_state=RANDOM_STATE,
    ),

    "Ridge": Ridge(
        alpha=10.0,
    ),

    "ElasticNet": ElasticNet(
        alpha=0.0005,
        l1_ratio=0.5,
        max_iter=10000,
        random_state=RANDOM_STATE,
    ),
}


# ============================================================
# 6. TRAIN + EVALUATE
# ============================================================

print("\n[5/6] Training and evaluating models...")
print("=" * 85)

results = []


for model_name, estimator in models.items():

    print(f"\n>>> Training: {model_name}")

    # Scaling is useful for linear models
    if model_name in ["Ridge", "ElasticNet"]:

        numeric_pipeline_model = Pipeline(
            steps=[
                (
                    "imputer",
                    SimpleImputer(strategy="median"),
                ),
                (
                    "scaler",
                    StandardScaler(),
                ),
            ]
        )

        categorical_pipeline_model = Pipeline(
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

        model_preprocessor = ColumnTransformer(
            transformers=[
                (
                    "numeric",
                    numeric_pipeline_model,
                    numeric_features,
                ),
                (
                    "categorical",
                    categorical_pipeline_model,
                    categorical_features,
                ),
            ]
        )

    else:

        model_preprocessor = preprocessor


    pipeline = Pipeline(
        steps=[
            (
                "preprocessor",
                model_preprocessor,
            ),
            (
                "model",
                estimator,
            ),
        ]
    )


    pipeline.fit(
        X_train,
        y_train,
    )


    predictions = pipeline.predict(
        X_valid
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


    results.append(
        {
            "Model": model_name,
            "MAE": mae,
            "RMSE": rmse,
            "R2": r2,
        }
    )


    print(
        f"MAE  : ${mae:,.2f}"
    )

    print(
        f"RMSE : ${rmse:,.2f}"
    )

    print(
        f"R²   : {r2:.4f}"
    )


# ============================================================
# FINAL COMPARISON
# ============================================================

print("\n")
print("=" * 85)
print("                         FINAL COMPARISON")
print("=" * 85)


results_df = pd.DataFrame(results)

results_df = results_df.sort_values(
    by="R2",
    ascending=False,
)


display_df = results_df.copy()

display_df["MAE"] = display_df["MAE"].round(2)

display_df["RMSE"] = display_df["RMSE"].round(2)

display_df["R2"] = display_df["R2"].round(4)


print(
    display_df.to_string(
        index=False
    )
)


# ============================================================
# BEST MODEL
# ============================================================

best_model = results_df.iloc[0]

print("\n" + "=" * 85)
print("                         BEST RESULT")
print("=" * 85)

print(
    f"Model : {best_model['Model']}"
)

print(
    f"MAE   : ${best_model['MAE']:,.2f}"
)

print(
    f"RMSE  : ${best_model['RMSE']:,.2f}"
)

print(
    f"R²    : {best_model['R2']:.4f}"
)

print("=" * 85)

print(
    "\nIMPORTANT:"
)

print(
    "This comparison uses the same 80/20 validation split "
    "for every model."
)

print(
    "A higher R² alone does not mean the model is 98% "
    "price-accurate."
)

print(
    "The final model should be selected using validation "
    "performance and error analysis."
)

print(
    "\n[6/6] Model comparison complete."
)