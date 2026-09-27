const API_BASE_URL = "http://127.0.0.1:8000";

export async function predictHousePrice(propertyData) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(propertyData),
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("The prediction server returned an invalid response.");
  }

  if (!response.ok) {
    const message =
      result?.detail || `Prediction failed with status ${response.status}.`;

    throw new Error(message);
  }

  if (!result?.success || !result?.prediction) {
    throw new Error("The prediction server returned an unexpected response.");
  }

  return result;
}