from pathlib import Path

import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import KFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = BASE_DIR / "data" / "train.csv"


# ============================================================
# CONFIGURATION
# ============================================================

TARGET_COLUMN = "SalePrice"
ID_COLUMN = "Id"

N_SPLITS = 5
RANDOM_STATE = 42


# ============================================================
# HEADER
# ============================================================

print("=" * 95)
print("        GRIHADRISHTI FINAL MODEL CROSS-VALIDATION")
print("=" * 95)


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
# 3. PREPROCESSOR
# ============================================================

print("\n[3/6] Building preprocessing pipeline...")


def create_preprocessor():

    numeric_pipeline = Pipeline(
        steps=[
            (
                "imputer",
                SimpleImputer(
                    strategy="median"
                ),
            )
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


    return ColumnTransformer(
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
# 4. MODEL BUILDERS
# ============================================================

def create_gradient_boosting():

    return GradientBoostingRegressor(
        n_estimators=1000,
        learning_rate=0.05,
        max_depth=3,
        min_samples_split=4,
        min_samples_leaf=2,
        loss="huber",
        random_state=RANDOM_STATE,
    )


def create_pipeline(model):

    return Pipeline(
        steps=[
            (
                "preprocessor",
                create_preprocessor(),
            ),
            (
                "model",
                model,
            ),
        ]
    )


# ============================================================
# 5. CROSS-VALIDATION
# ============================================================

print("\n[4/6] Starting 5-fold cross-validation...")
print("=" * 95)


kf = KFold(
    n_splits=N_SPLITS,
    shuffle=True,
    random_state=RANDOM_STATE,
)


results = []


for fold_number, (train_index, valid_index) in enumerate(
    kf.split(X),
    start=1,
):

    print(
        f"\n================ FOLD {fold_number}/{N_SPLITS} ================"
    )


    X_train = X.iloc[train_index]
    X_valid = X.iloc[valid_index]

    y_train = y.iloc[train_index]
    y_valid = y.iloc[valid_index]


    # ========================================================
    # MODEL A — TUNED GRADIENT BOOSTING
    # ========================================================

    print(
        "\nTraining Tuned Gradient Boosting..."
    )


    normal_pipeline = create_pipeline(
        create_gradient_boosting()
    )


    normal_pipeline.fit(
        X_train,
        y_train,
    )


    normal_predictions = normal_pipeline.predict(
        X_valid
    )


    # ========================================================
    # MODEL B — LOG TARGET GRADIENT BOOSTING
    # ========================================================

    print(
        "Training Log-target Gradient Boosting..."
    )


    log_pipeline = create_pipeline(
        create_gradient_boosting()
    )


    y_train_log = np.log1p(
        y_train
    )


    log_pipeline.fit(
        X_train,
        y_train_log,
    )


    log_predictions = np.expm1(
        log_pipeline.predict(
            X_valid
        )
    )


    log_predictions = np.maximum(
        log_predictions,
        0,
    )


    # ========================================================
    # MODEL C — 60% NORMAL + 40% LOG ENSEMBLE
    # ========================================================

    ensemble_predictions = (
        0.60 * normal_predictions
        + 0.40 * log_predictions
    )


    # ========================================================
    # EVALUATION FUNCTION
    # ========================================================

    def evaluate_predictions(
        model_name,
        predictions,
    ):

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
            predictions
            - y_valid.values
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


        print(
            f"{model_name:<22}"
            f"R²={r2:.4f} | "
            f"MAE=${mae:,.0f} | "
            f"RMSE=${rmse:,.0f} | "
            f"±10%={within_10:.2f}% | "
            f"±20%={within_20:.2f}%"
        )


        results.append(
            {
                "Fold": fold_number,
                "Model": model_name,
                "MAE": mae,
                "RMSE": rmse,
                "R2": r2,
                "Within_5": within_5,
                "Within_10": within_10,
                "Within_20": within_20,
            }
        )


    # ========================================================
    # EVALUATE ALL THREE
    # ========================================================

    evaluate_predictions(
        "Tuned Gradient Boosting",
        normal_predictions,
    )


    evaluate_predictions(
        "Log Gradient Boosting",
        log_predictions,
    )


    evaluate_predictions(
        "60/40 Ensemble",
        ensemble_predictions,
    )


# ============================================================
# 6. FINAL CROSS-VALIDATION SUMMARY
# ============================================================

print("\n")
print("=" * 95)
print("                 CROSS-VALIDATION SUMMARY")
print("=" * 95)


results_df = pd.DataFrame(
    results
)


summary = (
    results_df
    .groupby("Model")
    .agg(
        {
            "MAE": "mean",
            "RMSE": "mean",
            "R2": "mean",
            "Within_5": "mean",
            "Within_10": "mean",
            "Within_20": "mean",
        }
    )
    .reset_index()
)


summary = summary.sort_values(
    by="R2",
    ascending=False,
)


display_summary = summary.copy()


display_summary["MAE"] = (
    display_summary["MAE"].round(2)
)

display_summary["RMSE"] = (
    display_summary["RMSE"].round(2)
)

display_summary["R2"] = (
    display_summary["R2"].round(4)
)

display_summary["Within_5"] = (
    display_summary["Within_5"].round(2)
)

display_summary["Within_10"] = (
    display_summary["Within_10"].round(2)
)

display_summary["Within_20"] = (
    display_summary["Within_20"].round(2)
)


print(
    display_summary.to_string(
        index=False
    )
)


# ============================================================
# SAVE RESULTS
# ============================================================

RESULT_PATH = (
    BASE_DIR
    / "models"
    / "cross_validation_results.csv"
)


summary.to_csv(
    RESULT_PATH,
    index=False,
)


# ============================================================
# BEST MODELS
# ============================================================

best_r2 = summary.loc[
    summary["R2"].idxmax()
]

best_mae = summary.loc[
    summary["MAE"].idxmin()
]

best_rmse = summary.loc[
    summary["RMSE"].idxmin()
]

best_20 = summary.loc[
    summary["Within_20"].idxmax()
]


print("\n")
print("=" * 95)
print("                       FINAL FINDINGS")
print("=" * 95)


print(
    f"\nBest average R²:"
)

print(
    f"{best_r2['Model']} → "
    f"{best_r2['R2']:.4f}"
)


print(
    f"\nBest average MAE:"
)

print(
    f"{best_mae['Model']} → "
    f"${best_mae['MAE']:,.2f}"
)


print(
    f"\nBest average RMSE:"
)

print(
    f"{best_rmse['Model']} → "
    f"${best_rmse['RMSE']:,.2f}"
)


print(
    f"\nBest average ±20% coverage:"
)

print(
    f"{best_20['Model']} → "
    f"{best_20['Within_20']:.2f}%"
)


print("\n")
print(
    "Cross-validation results saved to:"
)

print(
    RESULT_PATH
)


print("\n")
print("=" * 95)
print("              CROSS-VALIDATION COMPLETE")
print("=" * 95)