from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split


BASE_DIR = Path(__file__).resolve().parents[1]

DATA_PATH = BASE_DIR / "data" / "train.csv"
MODEL_PATH = BASE_DIR / "models" / "house_price_model.pkl"

TARGET_COLUMN = "SalePrice"
ID_COLUMN = "Id"

TEST_SIZE = 0.20
RANDOM_STATE = 42


print("=" * 75)
print("              GRIHADRISHTI MODEL EVALUATION")
print("=" * 75)


# ------------------------------------------------------------
# 1. Load dataset
# ------------------------------------------------------------

print("\n[1/5] Loading dataset...")

df = pd.read_csv(DATA_PATH)

print(f"Rows    : {df.shape[0]}")
print(f"Columns : {df.shape[1]}")


# ------------------------------------------------------------
# 2. Prepare data exactly like training
# ------------------------------------------------------------

print("\n[2/5] Preparing validation data...")

X = df.drop(columns=[TARGET_COLUMN]).copy()
y = df[TARGET_COLUMN].copy()

if ID_COLUMN in X.columns:
    X = X.drop(columns=[ID_COLUMN])


# IMPORTANT:
# Use the exact same split as train_model.py
X_train, X_valid, y_train, y_valid = train_test_split(
    X,
    y,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
)


print(f"Validation samples : {len(X_valid)}")


# ------------------------------------------------------------
# 3. Load trained model
# ------------------------------------------------------------

print("\n[3/5] Loading trained model...")

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model not found at:\n{MODEL_PATH}"
    )

model = joblib.load(MODEL_PATH)

print("Model loaded successfully.")


# ------------------------------------------------------------
# 4. Generate predictions
# ------------------------------------------------------------

print("\n[4/5] Generating validation predictions...")

predictions = model.predict(X_valid)

mae = mean_absolute_error(y_valid, predictions)

rmse = np.sqrt(
    mean_squared_error(y_valid, predictions)
)

r2 = r2_score(
    y_valid,
    predictions
)


# ------------------------------------------------------------
# 5. Display results
# ------------------------------------------------------------

print("\n" + "=" * 75)
print("                    MODEL PERFORMANCE")
print("=" * 75)

print(f"MAE  : ${mae:,.2f}")
print(f"RMSE : ${rmse:,.2f}")
print(f"R²   : {r2:.4f}")

print("=" * 75)


print("\nSample validation predictions:")
print("-" * 75)

results = pd.DataFrame(
    {
        "Actual Price": y_valid.values,
        "Predicted Price": predictions,
    }
)

results["Difference"] = (
    results["Predicted Price"]
    - results["Actual Price"]
)

results["Absolute Error"] = (
    results["Difference"].abs()
)

results["Error %"] = (
    results["Absolute Error"]
    / results["Actual Price"]
    * 100
)

display_results = results.head(20).copy()

display_results["Actual Price"] = (
    display_results["Actual Price"]
    .round(2)
)

display_results["Predicted Price"] = (
    display_results["Predicted Price"]
    .round(2)
)

display_results["Difference"] = (
    display_results["Difference"]
    .round(2)
)

display_results["Absolute Error"] = (
    display_results["Absolute Error"]
    .round(2)
)

display_results["Error %"] = (
    display_results["Error %"]
    .round(2)
)

print(
    display_results.to_string(
        index=False
    )
)


print("\n" + "=" * 75)
print("                  EVALUATION COMPLETE")
print("=" * 75)