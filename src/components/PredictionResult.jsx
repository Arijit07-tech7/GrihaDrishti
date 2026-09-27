import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Home,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

function PredictionResult({
  propertyData,
  predictionResult,
  predictionError,
  onBack,
  onRecalculate,
}) {
  const salePrice = predictionResult?.prediction?.salePrice;

  const formattedPrice = useMemo(() => {
    if (typeof salePrice !== "number") {
      return "—";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(salePrice);
  }, [salePrice]);

  const propertySummary = [
    {
      label: "Overall Quality",
      value: propertyData?.OverallQual ?? "—",
    },
    {
      label: "Living Area",
      value: propertyData?.GrLivArea
        ? `${Number(propertyData.GrLivArea).toLocaleString()} sq ft`
        : "—",
    },
    {
      label: "Bedrooms",
      value: propertyData?.BedroomAbvGr ?? "—",
    },
    {
      label: "Bathrooms",
      value: propertyData?.FullBath ?? "—",
    },
    {
      label: "Year Built",
      value: propertyData?.YearBuilt ?? "—",
    },
    {
      label: "Neighborhood",
      value: propertyData?.Neighborhood ?? "—",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-250px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_40%)]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Dashboard
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10">
              <Home size={18} className="text-amber-300" />
            </div>

            <span className="text-sm font-semibold tracking-wide">
              GrihaDrishti
            </span>
          </div>

          <button
            onClick={onRecalculate}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
          >
            <RotateCcw size={16} />
            Recalculate
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            <Sparkles size={14} />
            AI Valuation Complete
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Your Property Valuation
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            GrihaDrishti analyzed the property information using the trained
            house-price prediction model.
          </p>
        </motion.div>

        {/* Error */}
        {predictionError && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-center"
          >
            <p className="text-sm font-medium text-red-300">
              {predictionError}
            </p>
          </motion.div>
        )}

        {/* Main Prediction Card */}
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-2xl sm:p-10"
        >
          <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative">
            {/* Result */}
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                <CheckCircle2
                  size={32}
                  className="text-emerald-400"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Estimated Sale Price
              </p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-3 text-5xl font-bold tracking-tight text-white sm:text-7xl"
              >
                {formattedPrice}
              </motion.div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-300">
                <TrendingUp size={14} />
                Real ML Model Prediction
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-white/10" />

            {/* Model information */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <BrainCircuit
                      size={20}
                      className="text-blue-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      AI Prediction
                    </p>
                    <p className="text-xs text-slate-500">
                      Trained Gradient Boosting model
                    </p>
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-400">
                  The prediction was generated by the trained GrihaDrishti
                  machine-learning pipeline using the submitted property
                  features.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                    <Sparkles
                      size={20}
                      className="text-violet-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Prediction Target
                    </p>
                    <p className="text-xs text-slate-500">
                      SalePrice
                    </p>
                  </div>
                </div>

                <p className="text-xs leading-5 text-slate-400">
                  The model predicts the SalePrice value represented by the
                  training dataset.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Property Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Property Profile
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Submitted Property Details
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Key values used in this prediction.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {propertySummary.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="text-xs text-slate-500">
                  {item.label}
                </p>

                <p className="mt-2 truncate text-base font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Dataset note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 rounded-2xl border border-amber-300/10 bg-amber-300/[0.04] p-5"
        >
          <p className="text-xs leading-5 text-slate-400">
            <span className="font-semibold text-amber-300">
              Note:
            </span>{" "}
            The current model is trained on the provided House Prices
            dataset, whose target variable is SalePrice. The displayed
            currency is USD because the training target is represented in
            USD.
          </p>
        </motion.div>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <button
            onClick={onRecalculate}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
          >
            Recalculate Property
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </main>
    </div>
  );
}

export default PredictionResult;