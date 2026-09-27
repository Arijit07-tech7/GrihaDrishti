import { useMemo } from "react";
import {
    ArrowLeft,
    CalendarDays,
    Download,
    Home,
    Trash2,
    TrendingUp,
    X,
} from "lucide-react";
import { motion } from "framer-motion";


function PredictionHistory({
    history = [],
    onBack,
    onDelete,
    onClearAll,
}) {

    // =========================================================
    // FORMAT PRICE
    // =========================================================

    const formatPrice = (price) => {

        if (
            typeof price !== "number" ||
            Number.isNaN(price)
        ) {
            return "—";
        }

        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }
        ).format(price);
    };


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "Unknown date";
        }

        try {

            return new Intl.DateTimeFormat(
                "en-IN",
                {
                    dateStyle: "medium",
                    timeStyle: "short",
                }
            ).format(
                new Date(date)
            );

        } catch {

            return "Unknown date";
        }
    };


    // =========================================================
    // CSV DOWNLOAD
    // =========================================================

    const downloadCSV = () => {

        if (history.length === 0) {
            return;
        }


        const headers = [
            "Prediction Date",
            "Sale Price",
            "Currency",
            "Overall Quality",
            "Overall Condition",
            "Living Area",
            "Bedrooms",
            "Bathrooms",
            "Year Built",
            "Year Remodeled",
            "Neighborhood",
            "Lot Area",
            "Garage Cars",
            "Garage Area",
            "Basement Area",
            "First Floor Area",
            "Second Floor Area",
        ];


        const rows = history.map(
            (item) => {

                const property =
                    item.propertyData || {};

                const prediction =
                    item.predictionResult
                        ?.prediction || {};


                return [
                    formatDate(
                        item.createdAt
                    ),

                    prediction.salePrice ??
                        "",

                    prediction.currency ??
                        "USD",

                    property.OverallQual ??
                        "",

                    property.OverallCond ??
                        "",

                    property.GrLivArea ??
                        "",

                    property.BedroomAbvGr ??
                        "",

                    property.FullBath ??
                        "",

                    property.YearBuilt ??
                        "",

                    property.YearRemodAdd ??
                        "",

                    property.Neighborhood ??
                        "",

                    property.LotArea ??
                        "",

                    property.GarageCars ??
                        "",

                    property.GarageArea ??
                        "",

                    property.TotalBsmtSF ??
                        "",

                    property["1stFlrSF"] ??
                        "",

                    property["2ndFlrSF"] ??
                        "",
                ];
            }
        );


        const escapeCSV = (value) => {

            const text =
                String(value ?? "");

            return `"${text.replace(
                /"/g,
                '""'
            )}"`;
        };


        const csv = [
            headers.map(
                escapeCSV
            ).join(","),

            ...rows.map(
                (row) =>
                    row.map(
                        escapeCSV
                    ).join(",")
            ),
        ].join("\n");


        const blob = new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;",
            }
        );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `grihadrishti-prediction-history-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(
            url
        );
    };


    // =========================================================
    // SUMMARY
    // =========================================================

    const summary = useMemo(() => {

        if (history.length === 0) {

            return {
                count: 0,
                average: 0,
                highest: 0,
            };
        }


        const prices = history
            .map(
                (item) =>
                    item.predictionResult
                        ?.prediction
                        ?.salePrice
            )
            .filter(
                (price) =>
                    typeof price ===
                    "number" &&
                    !Number.isNaN(price)
            );


        const average =
            prices.length > 0
                ? prices.reduce(
                    (sum, price) =>
                        sum + price,
                    0
                ) / prices.length
                : 0;


        const highest =
            prices.length > 0
                ? Math.max(
                    ...prices
                )
                : 0;


        return {
            count: history.length,
            average,
            highest,
        };

    }, [history]);


    return (
        <main className="min-h-screen overflow-hidden bg-[#03050B] text-white">

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="pointer-events-none fixed inset-0">

                <div className="absolute left-1/2 top-[-220px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

                <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.06),transparent_40%)]" />

            </div>


            {/* =================================================
                HEADER
            ================================================= */}

            <header className="relative z-10 border-b border-white/10 bg-[#03050B]/75 backdrop-blur-2xl">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

                    <button
                        type="button"
                        onClick={onBack}
                        className="group flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                    >

                        <ArrowLeft
                            size={18}
                            className="transition-transform group-hover:-translate-x-1"
                        />

                        Dashboard

                    </button>


                    <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10">

                            <Home
                                size={18}
                                className="text-amber-300"
                            />

                        </div>

                        <span className="text-sm font-semibold">
                            Griha
                            <span className="text-amber-300">
                                Drishti
                            </span>
                        </span>

                    </div>


                    <button
                        type="button"
                        onClick={downloadCSV}
                        disabled={
                            history.length === 0
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-2.5 text-xs font-semibold text-amber-200 transition hover:border-amber-300/25 hover:bg-amber-300/[0.1] disabled:cursor-not-allowed disabled:opacity-30"
                    >

                        <Download size={15} />

                        Download CSV

                    </button>

                </div>

            </header>


            {/* =================================================
                CONTENT
            ================================================= */}

            <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

                {/* =================================================
                    TITLE
                ================================================= */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
                >

                    <div>

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/[0.04] px-3 py-1.5">

                            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,.7)]" />

                            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200/60">
                                Your Workspace
                            </span>

                        </div>


                        <h1 className="text-3xl font-medium tracking-[-0.035em] sm:text-5xl">
                            Prediction
                            <span className="text-amber-300">
                                {" "}History
                            </span>
                        </h1>


                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/35">
                            Review the property valuations
                            generated by your GrihaDrishti AI
                            prediction engine.
                        </p>

                    </div>


                    {history.length > 0 && (
                        <button
                            type="button"
                            onClick={onClearAll}
                            className="inline-flex items-center gap-2 self-start rounded-xl border border-red-400/10 bg-red-400/[0.04] px-4 py-2.5 text-xs text-red-300/70 transition hover:border-red-400/20 hover:bg-red-400/[0.08] hover:text-red-300 lg:self-auto"
                        >

                            <Trash2 size={14} />

                            Clear All

                        </button>
                    )}

                </motion.section>


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                <section className="mb-8 grid gap-4 sm:grid-cols-3">

                    <SummaryCard
                        label="Total Predictions"
                        value={summary.count}
                        suffix="predictions"
                    />


                    <SummaryCard
                        label="Average Estimated Price"
                        value={
                            summary.average
                                ? formatPrice(
                                    summary.average
                                )
                                : "—"
                        }
                        suffix=""
                    />


                    <SummaryCard
                        label="Highest Estimated Price"
                        value={
                            summary.highest
                                ? formatPrice(
                                    summary.highest
                                )
                                : "—"
                        }
                        suffix=""
                    />

                </section>


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {history.length === 0 && (
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="rounded-[28px] border border-white/10 bg-white/[0.025] p-10 text-center sm:p-16"
                    >

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-300/10">

                            <TrendingUp
                                size={28}
                                className="text-amber-300"
                            />

                        </div>


                        <h2 className="mt-6 text-xl font-medium text-white/80">
                            No predictions yet
                        </h2>


                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/30">
                            Your real AI property valuations
                            will automatically appear here
                            after you make a prediction.
                        </p>


                        <button
                            type="button"
                            onClick={() => {
                                window.dispatchEvent(
                                    new CustomEvent(
                                        "griha:go-predict"
                                    )
                                );
                            }}
                            className="mt-6 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                        >
                            Make Your First Prediction
                        </button>

                    </motion.section>
                )}


                {/* =================================================
                    HISTORY LIST
                ================================================= */}

                {history.length > 0 && (
                    <div className="space-y-5">

                        {history.map(
                            (item, index) => {

                                const property =
                                    item.propertyData ||
                                    {};

                                const prediction =
                                    item
                                        .predictionResult
                                        ?.prediction ||
                                    {};

                                const price =
                                    prediction.salePrice;


                                return (
                                    <motion.article
                                        key={
                                            item.id ||
                                            `${item.createdAt}-${index}`
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay:
                                                index *
                                                0.05,
                                        }}
                                        className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.025] p-5 transition hover:border-amber-200/15 hover:bg-white/[0.035] sm:p-6"
                                    >

                                        <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[250px] w-[250px] rounded-full bg-amber-300/[0.04] blur-[90px]" />


                                        <div className="relative">

                                            {/* TOP */}

                                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                                                <div className="flex items-start gap-4">

                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/15 bg-amber-300/[0.06]">

                                                        <Home
                                                            size={20}
                                                            className="text-amber-300"
                                                        />

                                                    </div>


                                                    <div>

                                                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                                                            AI Valuation
                                                        </p>


                                                        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                                            {formatPrice(
                                                                price
                                                            )}
                                                        </h2>


                                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-white/30">

                                                            <span className="flex items-center gap-1.5">

                                                                <CalendarDays
                                                                    size={12}
                                                                />

                                                                {formatDate(
                                                                    item.createdAt
                                                                )}

                                                            </span>


                                                            <span className="rounded-full border border-emerald-300/10 bg-emerald-300/[0.04] px-2 py-1 text-emerald-300/60">
                                                                Real ML Prediction
                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onDelete(
                                                            item.id
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center self-end rounded-xl border border-white/10 bg-white/[0.02] text-white/25 transition hover:border-red-400/20 hover:bg-red-400/[0.05] hover:text-red-300 sm:self-start"
                                                    aria-label="Delete prediction"
                                                >

                                                    <X
                                                        size={16}
                                                    />

                                                </button>

                                            </div>


                                            {/* DIVIDER */}

                                            <div className="my-5 h-px bg-white/[0.07]" />


                                            {/* PROPERTY DATA */}

                                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                                                <HistoryValue
                                                    label="Overall Quality"
                                                    value={
                                                        property.OverallQual ??
                                                        "—"
                                                    }
                                                />


                                                <HistoryValue
                                                    label="Living Area"
                                                    value={
                                                        property.GrLivArea
                                                            ? `${Number(
                                                                property.GrLivArea
                                                            ).toLocaleString()} sq ft`
                                                            : "—"
                                                    }
                                                />


                                                <HistoryValue
                                                    label="Bedrooms"
                                                    value={
                                                        property.BedroomAbvGr ??
                                                        "—"
                                                    }
                                                />


                                                <HistoryValue
                                                    label="Bathrooms"
                                                    value={
                                                        property.FullBath ??
                                                        "—"
                                                    }
                                                />


                                                <HistoryValue
                                                    label="Year Built"
                                                    value={
                                                        property.YearBuilt ??
                                                        "—"
                                                    }
                                                />


                                                <HistoryValue
                                                    label="Neighborhood"
                                                    value={
                                                        property.Neighborhood ??
                                                        "—"
                                                    }
                                                />

                                            </div>

                                        </div>

                                    </motion.article>
                                );
                            }
                        )}

                    </div>
                )}

            </main>

        </main>
    );
}


/* =============================================================
   SUMMARY CARD
============================================================= */

function SummaryCard({
    label,
    value,
    suffix,
}) {
    return (
        <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5">

            <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                {label}
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {value}
            </p>

            {suffix && (
                <p className="mt-1 text-[10px] text-white/25">
                    {suffix}
                </p>
            )}

        </div>
    );
}


/* =============================================================
   HISTORY VALUE
============================================================= */

function HistoryValue({
    label,
    value,
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/10 p-4">

            <p className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                {label}
            </p>

            <p className="mt-2 truncate text-sm font-medium text-white/70">
                {value}
            </p>

        </div>
    );
}


export default PredictionHistory;