<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:020617,35:111827,70:312e81,100:c9a227&height=250&section=header&text=GRIHADRISHTI&fontSize=62&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20House%20Price%20Intelligence&descAlignY=63&descSize=19" width="100%" />

<br>

# 🏡 GrihaDrishti

### **See the home. Understand its value.**

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=21&duration=2500&pause=700&color=C9A227&center=true&vCenter=true&width=800&lines=AI+Property+Valuation;Intelligent+Property+Discovery;79+Property+Features;AI+Property+Insights;Prediction+History;Premium+Cinematic+Experience" />

<br><br>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=111827" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white" />

<br><br>

<img src="https://img.shields.io/badge/AI-Property%20Intelligence-8B5CF6?style=flat-square" />
<img src="https://img.shields.io/badge/ML-Gradient%20Boosting-C9A227?style=flat-square" />
<img src="https://img.shields.io/badge/UI-Premium%20Cinematic-312E81?style=flat-square" />
<img src="https://img.shields.io/badge/Responsive-Desktop%20%2B%20Mobile-22C55E?style=flat-square" />

</div>

---

## ✦ About GrihaDrishti

**GrihaDrishti** is an AI-powered house price intelligence platform that combines machine learning, property discovery, property insights, prediction history and a premium cinematic interface into one modern real-estate experience.

The name comes from:

**Griha** — Home  
**Drishti** — Perspective

GrihaDrishti represents a smarter perspective toward understanding a home's characteristics and estimated value.

---

## ✦ Complete User Experience

```mermaid
flowchart LR
    A["🏡 Splash"] --> B["🔐 Login"]
    B --> C["🏠 Dashboard"]
    C --> D["🤖 AI Prediction"]
    D --> E["⚙️ AI Analysis"]
    E --> F["💰 Prediction Result"]
    F --> G["🕘 History"]

    C --> H["🏙️ Property Discovery"]
    H --> I["🏡 Property Details"]
    I --> J["📅 Demo Booking"]

    C --> K["📚 Market Insights"]

    classDef primary fill:#111827,stroke:#C9A227,color:#fff,stroke-width:2px;
    classDef secondary fill:#312E81,stroke:#8B5CF6,color:#fff,stroke-width:2px;
    classDef result fill:#854D0E,stroke:#C9A227,color:#fff,stroke-width:3px;

    class A,B,C primary;
    class D,E,H,I,K secondary;
    class F,G,J result;
````

---

## ✦ Core Features

### 🎬 Premium Cinematic Splash Screen

The application begins with a cinematic property-intelligence experience featuring architectural visuals, animated loading, spatial HUD elements, premium typography, technical interface details and responsive desktop/mobile compositions.

### 🔐 Authentication

The frontend includes a complete demonstration authentication flow:

* Email login
* Signup
* Password visibility
* Password validation
* Forgot password
* Demo OTP generation
* OTP verification
* Password reset
* Demo Google login
* Logout
* Local session persistence

### 🏠 Intelligent Dashboard

The dashboard provides a central control surface for the application with:

* Personalized welcome
* AI property valuation
* Property discovery
* Prediction history
* Market insights
* Recent predictions
* Quick actions
* Responsive navigation
* User information

### 🤖 AI Property Valuation

Users can enter detailed property information and receive an estimated property value from the trained machine-learning model.

The prediction system processes **79 property features**.

### ⚙️ AI Analysis Animation

After submitting property information, GrihaDrishti provides an animated AI processing experience representing:

* Property data processing
* Property context analysis
* Market pattern analysis
* AI valuation processing
* Final valuation preparation

### 💰 Prediction Result

The prediction result screen displays the model-generated estimated SalePrice along with the submitted property information and the ability to recalculate.

### 🕘 Prediction History

Successful predictions can be stored locally.

Users can:

* View predictions
* Review property information
* Delete individual predictions
* Clear all history
* Export prediction history as CSV
* Start a new prediction

### 🏙️ Property Discovery

The property discovery module provides:

* Property cards
* Property images
* Location
* BHK
* Area
* Sale price
* Price per sq.ft.
* Amenities
* Property status
* Demo availability
* Favourites
* Property details
* Gallery
* Demo booking
* Demo payment
* Booking confirmation
* Booking ID
* My Bookings

### 📚 Market Insights

Market Insights explains the complete set of prediction inputs in customer-friendly language.

Every feature explains:

* What it is
* What the user should enter
* Example input
* Why it matters for property value

### 📊 CSV Export

Prediction history can be exported into CSV format for offline review.

---

## ✦ AI Valuation Engine

```mermaid
flowchart TD
    A["🏠 Property Input"] --> B["Validation"]
    B --> C["Feature Preparation"]
    C --> D["Numeric Processing"]
    C --> E["Categorical Processing"]
    D --> F["Gradient Boosting"]
    E --> F
    F --> G["log1p(SalePrice)"]
    G --> H["Model Prediction"]
    H --> I["expm1()"]
    I --> J["💰 Estimated SalePrice"]

    classDef input fill:#0F172A,stroke:#C9A227,color:#fff,stroke-width:2px;
    classDef process fill:#1E1B4B,stroke:#8B5CF6,color:#fff,stroke-width:2px;
    classDef output fill:#854D0E,stroke:#C9A227,color:#fff,stroke-width:3px;

    class A input;
    class B,C,D,E,F,G,H,I process;
    class J output;
```

---

## ✦ Machine Learning Model

The current valuation engine uses a **Gradient Boosting Regressor** trained on the Ames / House Prices dataset.

### Model Configuration

| Parameter             |                     Value |
| --------------------- | ------------------------: |
| Algorithm             | GradientBoostingRegressor |
| Estimators            |                      1000 |
| Learning Rate         |                      0.05 |
| Maximum Depth         |                         3 |
| Minimum Samples Split |                         4 |
| Minimum Samples Leaf  |                         2 |
| Loss                  |                     Huber |
| Target                |                 SalePrice |
| Training Target       |        `log1p(SalePrice)` |
| Prediction            |     `expm1(model_output)` |

### Validation Results

| Metric       |     Result |
| ------------ | ---------: |
| Average MAE  | $14,971.52 |
| Average RMSE | $27,996.37 |
| Average R²   |     0.8596 |
| Within ±5%   |     46.37% |
| Within ±10%  |     73.70% |
| Within ±20%  |     92.33% |

> R² is a statistical evaluation metric and should not be interpreted as an accuracy percentage.

---

## ✦ 79 Property Intelligence Features

GrihaDrishti uses 79 model input features.

<details>
<summary><b>🏠 Property Basics</b></summary>

Building Class, Zoning, Lot Frontage, Lot Area, Street, Alley, Lot Shape, Land Contour, Utilities, Lot Configuration, Land Slope, Neighborhood, Condition 1, Condition 2, Building Type and House Style.

</details>

<details>
<summary><b>⭐ Quality & Construction</b></summary>

Overall Quality, Overall Condition, Year Built, Year Remodeled, Roof Style, Roof Material, Exterior 1, Exterior 2, Masonry Type, Masonry Area, Exterior Quality, Exterior Condition and Foundation.

</details>

<details>
<summary><b>🧱 Basement</b></summary>

Basement Quality, Basement Condition, Basement Exposure, Basement Finish Type 1, Basement Finished Area 1, Basement Finish Type 2, Basement Finished Area 2, Basement Unfinished Area, Total Basement Area, Basement Full Bath and Basement Half Bath.

</details>

<details>
<summary><b>🛋️ Utilities & Interior</b></summary>

Heating, Heating Quality, Central Air, Electrical, First Floor Area, Second Floor Area, Low Quality Finished Area, Above Ground Living Area, Full Bath, Half Bath, Bedrooms Above Ground, Kitchens Above Ground, Kitchen Quality, Total Rooms Above Ground and Functional Condition.

</details>

<details>
<summary><b>🔥 Fireplace & Garage</b></summary>

Fireplaces, Fireplace Quality, Garage Type, Garage Year Built, Garage Finish, Garage Cars, Garage Area, Garage Quality, Garage Condition and Paved Driveway.

</details>

<details>
<summary><b>🌳 Outdoor Features</b></summary>

Wood Deck Area, Open Porch Area, Enclosed Porch Area, Three Season Porch, Screen Porch, Pool Area, Pool Quality, Fence, Miscellaneous Feature and Miscellaneous Value.

</details>

<details>
<summary><b>📅 Sale Information</b></summary>

Month Sold, Year Sold, Sale Type and Sale Condition.

</details>

---

## ✦ Market Insights

Market Insights transforms technical model features into simple property information.

For every feature, users can understand:

**What is this?**

**What should I enter?**

**Example**

**Why does it matter?**

This allows customers to understand the prediction form without needing machine-learning knowledge.

---

## ✦ Property Discovery

```mermaid
flowchart LR
    A["🏙️ Discover"] --> B["Property Card"]
    B --> C["🏡 Details"]
    C --> D["🖼️ Gallery"]
    C --> E["✨ Amenities"]
    C --> F["💰 Pricing"]
    C --> G["📍 Location"]
    C --> H["❤️ Favourite"]
    C --> I["📅 Booking"]
    I --> J["💳 Demo Payment"]
    J --> K["🎫 Booking ID"]

    classDef start fill:#111827,stroke:#C9A227,color:#fff,stroke-width:2px;
    classDef feature fill:#312E81,stroke:#8B5CF6,color:#fff,stroke-width:2px;
    classDef final fill:#854D0E,stroke:#C9A227,color:#fff,stroke-width:3px;

    class A,B start;
    class C,D,E,F,G,H,I,J feature;
    class K final;
```

The discovery experience includes demo properties with:

* Images
* Location
* BHK
* Area
* Price
* Price per sq.ft.
* Amenities
* Availability
* Property details
* Gallery
* Favourites
* Demo booking
* Demo payment
* Booking confirmation
* Booking ID
* My Bookings

> Availability and payment are demonstration features and do not represent real-time transactions.

---

## ✦ Prediction History

Prediction history is stored locally in the browser.

Each saved prediction can contain:

* Prediction date
* Sale price
* Currency
* Overall quality
* Overall condition
* Living area
* Bedrooms
* Bathrooms
* Year built
* Year remodeled
* Neighborhood
* Lot area
* Garage cars
* Garage area
* Basement area
* First floor area
* Second floor area

Available actions:

* View
* Delete
* Clear all
* Export CSV
* New prediction

---

## ✦ Authentication Flow

```mermaid
flowchart TD
    A["🔐 Login"] --> B["Email + Password"]
    A --> C["Create Account"]
    A --> D["Demo Google Login"]
    A --> E["Forgot Password"]

    E --> F["Email"]
    F --> G["Demo OTP"]
    G --> H["Verify OTP"]
    H --> I["New Password"]
    I --> J["Login"]

    B --> K["🏠 Dashboard"]
    C --> K
    D --> K
    J --> K

    classDef auth fill:#111827,stroke:#C9A227,color:#fff,stroke-width:2px;
    classDef action fill:#312E81,stroke:#8B5CF6,color:#fff,stroke-width:2px;
    classDef success fill:#14532D,stroke:#22C55E,color:#fff,stroke-width:3px;

    class A,B,C,D,E auth;
    class F,G,H,I,J action;
    class K success;
```

The authentication system is intentionally frontend-only and uses browser local storage.

It is designed for demonstration and prototype purposes rather than production security.

---

## ✦ Premium UI

GrihaDrishti follows a cinematic architecture-inspired design language.

The interface combines:

* Dark premium surfaces
* Architectural imagery
* Gold highlights
* Glass-style cards
* Spatial HUD elements
* Animated interfaces
* Smooth transitions
* Responsive layouts
* Modern typography
* AI-inspired visual effects

---

## ✦ Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* GSAP
* Lucide React
* JavaScript

### Backend

* Python
* FastAPI
* Pydantic
* Pandas
* NumPy
* Joblib

### Machine Learning

* Scikit-learn
* Gradient Boosting Regressor
* One-Hot Encoding
* Median Imputation
* Log-target transformation

---

## ✦ System Architecture

```mermaid
flowchart TB
    A["🌐 GrihaDrishti"] --> B["React Frontend"]

    B --> C["🔐 Authentication"]
    B --> D["🏠 Dashboard"]
    B --> E["🤖 Prediction"]
    B --> F["🏙️ Discovery"]
    B --> G["📚 Insights"]
    B --> H["🕘 History"]

    E --> I["⚡ FastAPI"]
    I --> J["Pydantic Validation"]
    J --> K["Preprocessing"]
    K --> L["Gradient Boosting Model"]
    L --> M["💰 Prediction"]

    classDef frontend fill:#111827,stroke:#61DAFB,color:#fff,stroke-width:2px;
    classDef backend fill:#0F766E,stroke:#2DD4BF,color:#fff,stroke-width:2px;
    classDef ml fill:#312E81,stroke:#A78BFA,color:#fff,stroke-width:2px;
    classDef result fill:#854D0E,stroke:#C9A227,color:#fff,stroke-width:3px;

    class A,B,C,D,E,F,G,H frontend;
    class I,J,K backend;
    class L,M ml;
```

---

## ✦ Project Structure

```text
GrihaDrishti/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnalysisPage.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MarketInsights.jsx
│   │   ├── PredictionHistory.jsx
│   │   ├── PredictionPage.jsx
│   │   ├── PredictionResult.jsx
│   │   ├── PropertyDiscovery.jsx
│   │   ├── SignupPage.jsx
│   │   └── SplashScreen.jsx
│   ├── utils/
│   │   ├── api.js
│   │   └── demoAuth.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── backend/
│   ├── app/
│   ├── data/
│   ├── models/
│   └── training/
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ✦ Installation

### Clone

```bash
git clone https://github.com/Arijit07-tech7/GrihaDrishti.git
cd GrihaDrishti
```

### Frontend

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

### Backend

```bash
cd backend
python -m venv .venv
```

Windows:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

## ✦ API

### Health Check

```http
GET /health
```

### Prediction

```http
POST /predict
```

Example response:

```json
{
  "success": true,
  "prediction": {
    "salePrice": 203611.67,
    "currency": "USD",
    "target": "SalePrice"
  },
  "message": "Property valuation generated successfully."
}
```

---

## ✦ Dataset

The current model uses the **Ames / House Prices dataset**.

The dataset contains historical housing information and the prediction target is `SalePrice`.

The model is therefore a machine-learning demonstration based on historical Ames housing data and should not be interpreted as a live Kolkata or Indian real-estate pricing engine.

The generated value is an estimated model output and is not a guaranteed market price.

---

## ✦ Current Status

| Feature                 | Status |
| ----------------------- | :----: |
| Cinematic Splash Screen |    ✅   |
| Demo Login              |    ✅   |
| Demo Signup             |    ✅   |
| Forgot Password         |    ✅   |
| Demo OTP                |    ✅   |
| Demo Google Login       |    ✅   |
| Dashboard               |    ✅   |
| AI Property Prediction  |    ✅   |
| ML Backend              |    ✅   |
| AI Analysis Animation   |    ✅   |
| Prediction Result       |    ✅   |
| Prediction History      |    ✅   |
| CSV Export              |    ✅   |
| Market Insights         |    ✅   |
| Property Discovery      |    ✅   |
| Property Details        |    ✅   |
| Favourites              |    ✅   |
| Demo Booking            |    ✅   |
| Demo Payment UI         |    ✅   |
| Booking Confirmation    |    ✅   |
| Responsive Design       |    ✅   |

---

## ✦ Roadmap

* India-specific housing datasets
* Location-aware valuation
* Live property information
* Real-time market insights
* Explainable AI
* Advanced recommendations
* Production authentication
* Secure database integration
* Cloud deployment
* More advanced valuation models
* Real-time property intelligence

---

## ✦ Security

The current authentication implementation is a frontend demonstration using browser local storage.

Do not commit:

* API keys
* Passwords
* Private tokens
* Secret credentials
* Sensitive environment variables

Production deployment should use secure authentication, protected backend services and appropriate database security.

---

## ✦ Important Note

GrihaDrishti is currently a property-intelligence prototype designed for educational, demonstration, portfolio and development purposes.

The current valuation engine is trained on historical Ames housing data.

The prediction should therefore be treated as an estimated machine-learning output rather than a professional property appraisal or guaranteed market price.

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=800&size=24&duration=2800&pause=800&color=C9A227&center=true&vCenter=true&width=800&lines=See+the+home.;Understand+its+value.;Experience+property+intelligence." />

<br><br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:c9a227,35:312e81,70:111827,100:020617&height=150&section=footer&animation=fadeIn" width="100%" />

<br><br>

<img src="https://img.shields.io/badge/✦%20CREATED%20BY-ARIJIT%20GUPTA-C9A227?style=for-the-badge&labelColor=020617" />

<br><br>

# ✦ ARIJIT GUPTA ✦

### **GrihaDrishti**

<sub>AI • Property Intelligence • Machine Learning • Modern Web Experience</sub>

</div>
