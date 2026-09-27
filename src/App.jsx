import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  Home,
  Sparkles,
} from "lucide-react";

import "./App.css";

import SplashScreen from "./components/SplashScreen";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/HomePage";
import PredictionPage from "./components/PredictionPage";
import AnalysisPage from "./components/AnalysisPage";
import PredictionResult from "./components/PredictionResult";
import PredictionHistory from "./components/PredictionHistory";
import PropertyDiscovery from "./components/PropertyDiscovery";
import MarketInsights from "./components/MarketInsights";

import {
  getCurrentUser,
  logoutUser,
} from "./utils/demoAuth";

import { predictHousePrice } from "./utils/api";

function App() {
  /*
  |--------------------------------------------------------------------------
  | Application State
  |--------------------------------------------------------------------------
  */

  const [showSplash, setShowSplash] =
    useState(true);

  const [authPage, setAuthPage] =
    useState("login");

  const [currentUser, setCurrentUser] =
    useState(() => {
      return getCurrentUser();
    });

  const [currentPage, setCurrentPage] =
    useState("home");

  /*
  |--------------------------------------------------------------------------
  | Prediction State
  |--------------------------------------------------------------------------
  */

  const [predictionData, setPredictionData] =
    useState(null);

  const [predictionResult, setPredictionResult] =
    useState(null);

  const [predictionError, setPredictionError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Prediction History
  |--------------------------------------------------------------------------
  */

  const [predictionHistory, setPredictionHistory] =
    useState(() => {
      try {
        const saved = localStorage.getItem(
          "griha_prediction_history"
        );

        if (!saved) {
          return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed)
          ? parsed
          : [];
      } catch (error) {
        console.error(
          "Unable to load prediction history:",
          error
        );

        return [];
      }
    });

  /*
  |--------------------------------------------------------------------------
  | Save prediction history whenever it changes
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    try {
      localStorage.setItem(
        "griha_prediction_history",
        JSON.stringify(predictionHistory)
      );
    } catch (error) {
      console.error(
        "Unable to save prediction history:",
        error
      );
    }
  }, [predictionHistory]);

  /*
  |--------------------------------------------------------------------------
  | Splash
  |--------------------------------------------------------------------------
  */

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage("home");
    setAuthPage("login");
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setCurrentPage("home");
    setAuthPage("login");
  };

  const handleLogout = () => {
    logoutUser();

    setCurrentUser(null);

    setCurrentPage("home");

    setPredictionData(null);

    setPredictionResult(null);

    setPredictionError("");

    setAuthPage("login");
  };

  /*
  |--------------------------------------------------------------------------
  | Start Prediction
  |--------------------------------------------------------------------------
  */

  const handleStartPrediction = () => {
    setPredictionData(null);

    setPredictionResult(null);

    setPredictionError("");

    setCurrentPage("prediction");
  };

  /*
  |--------------------------------------------------------------------------
  | Prediction Form Submitted
  |--------------------------------------------------------------------------
  */

  const handlePredictionSubmit = (data) => {
    setPredictionData(data);

    setPredictionResult(null);

    setPredictionError("");

    setCurrentPage("analysis");
  };

  /*
  |--------------------------------------------------------------------------
  | AI Analysis Complete
  |--------------------------------------------------------------------------
  */

  const handleAnalysisComplete = async () => {
    if (!predictionData) {
      setPredictionError(
        "No property data was found for prediction."
      );

      setCurrentPage("result");

      return;
    }

    setPredictionError("");

    try {
      /*
      |--------------------------------------------------------------------------
      | Call FastAPI ML backend
      |--------------------------------------------------------------------------
      */

      const result =
        await predictHousePrice(
          predictionData
        );

      /*
      |--------------------------------------------------------------------------
      | Create history item
      |--------------------------------------------------------------------------
      */

      const historyItem = {
        id:
          typeof crypto !== "undefined" &&
          crypto.randomUUID
            ? crypto.randomUUID()
            : `prediction_${Date.now()}`,

        createdAt:
          new Date().toISOString(),

        propertyData: predictionData,

        predictionResult: result,
      };

      /*
      |--------------------------------------------------------------------------
      | Add newest prediction to beginning
      |--------------------------------------------------------------------------
      */

      setPredictionHistory(
        (previous) => [
          historyItem,
          ...previous,
        ]
      );

      /*
      |--------------------------------------------------------------------------
      | Save result
      |--------------------------------------------------------------------------
      */

      setPredictionResult(result);

      setCurrentPage("result");
    } catch (error) {
      console.error(
        "Prediction request failed:",
        error
      );

      setPredictionError(
        error?.message ||
          "Unable to generate the house price prediction."
      );

      setPredictionResult(null);

      setCurrentPage("result");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Recalculate
  |--------------------------------------------------------------------------
  */

  const handleRecalculate = () => {
    setPredictionResult(null);

    setPredictionError("");

    setCurrentPage("prediction");
  };

  /*
  |--------------------------------------------------------------------------
  | Prediction History - Delete
  |--------------------------------------------------------------------------
  */

  const handleDeleteHistory = (id) => {
    setPredictionHistory(
      (previous) =>
        previous.filter(
          (item) => item.id !== id
        )
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Prediction History - Clear All
  |--------------------------------------------------------------------------
  */

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all prediction history?"
    );

    if (!confirmed) {
      return;
    }

    setPredictionHistory([]);
  };

  /*
  |--------------------------------------------------------------------------
  | Property Discovery
  |--------------------------------------------------------------------------
  */

  const handlePropertyDiscovery = () => {
    setCurrentPage("discovery");
  };

  /*
  |--------------------------------------------------------------------------
  | Market Insights
  |--------------------------------------------------------------------------
  */

  const handleMarketInsights = () => {
    setCurrentPage("market");
  };

  /*
  |--------------------------------------------------------------------------
  | Prediction History Navigation
  |--------------------------------------------------------------------------
  */

  const handlePredictionHistory = () => {
    setCurrentPage("history");
  };

  /*
  |--------------------------------------------------------------------------
  | Splash Screen
  |--------------------------------------------------------------------------
  */

  if (showSplash) {
    return (
      <SplashScreen
        onComplete={
          handleSplashComplete
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */

  if (!currentUser) {
    /*
    |--------------------------------------------------------------------------
    | Signup
    |--------------------------------------------------------------------------
    */

    if (authPage === "signup") {
      return (
        <SignupPage
          onSignup={handleSignup}
          onLogin={() =>
            setAuthPage("login")
          }
        />
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Forgot Password
    |--------------------------------------------------------------------------
    */

    if (authPage === "forgot") {
      return (
        <ForgotPassword
          onBack={() =>
            setAuthPage("login")
          }
        />
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    return (
      <LoginPage
        onLogin={handleLogin}
        onSignup={() =>
          setAuthPage("signup")
        }
        onForgotPassword={() =>
          setAuthPage("forgot")
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | HOME
  |--------------------------------------------------------------------------
  */

  if (currentPage === "home") {
    return (
      <HomePage
        user={currentUser}
        onLogout={handleLogout}
        onPredict={
          handleStartPrediction
        }
        onPropertyDiscovery={
          handlePropertyDiscovery
        }
        onPredictionHistory={
          handlePredictionHistory
        }
        onMarketInsights={
          handleMarketInsights
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PREDICTION
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | PredictionPage is kept exactly as the existing page.
  | Market Insights does NOT modify this page.
  |
  */

  if (currentPage === "prediction") {
    return (
      <PredictionPage
        user={currentUser}
        onBack={() =>
          setCurrentPage("home")
        }
        onSubmit={
          handlePredictionSubmit
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | AI ANALYSIS
  |--------------------------------------------------------------------------
  */

  if (currentPage === "analysis") {
    return (
      <AnalysisPage
        propertyData={predictionData}
        onComplete={
          handleAnalysisComplete
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PREDICTION RESULT
  |--------------------------------------------------------------------------
  */

  if (currentPage === "result") {
    return (
      <PredictionResult
        propertyData={predictionData}
        predictionResult={
          predictionResult
        }
        predictionError={
          predictionError
        }
        onBack={() =>
          setCurrentPage("home")
        }
        onRecalculate={
          handleRecalculate
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PREDICTION HISTORY
  |--------------------------------------------------------------------------
  */

  if (currentPage === "history") {
    return (
      <PredictionHistory
        history={predictionHistory}
        onBack={() =>
          setCurrentPage("home")
        }
        onDelete={
          handleDeleteHistory
        }
        onClearAll={
          handleClearHistory
        }
        onPredict={
          handleStartPrediction
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PROPERTY DISCOVERY
  |--------------------------------------------------------------------------
  */

  if (currentPage === "discovery") {
    return (
      <PropertyDiscovery
        user={currentUser}
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MARKET INSIGHTS
  |--------------------------------------------------------------------------
  |
  | NEW:
  | Real MarketInsights component is used here.
  |
  | It contains the customer-friendly explanation
  | of all 79 House Prices dataset features.
  |
  */

  if (currentPage === "market") {
    return (
      <MarketInsights
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | FALLBACK
  |--------------------------------------------------------------------------
  */

  return (
    <HomePage
      user={currentUser}
      onLogout={handleLogout}
      onPredict={
        handleStartPrediction
      }
      onPropertyDiscovery={
        handlePropertyDiscovery
      }
      onPredictionHistory={
        handlePredictionHistory
      }
      onMarketInsights={
        handleMarketInsights
      }
    />
  );
}

export default App;