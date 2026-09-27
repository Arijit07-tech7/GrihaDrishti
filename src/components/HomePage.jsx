import { motion } from "framer-motion";
import {
    ArrowRight,
    BarChart3,
    Bell,
    Building2,
    ChevronRight,
    Clock3,
    Home,
    LogOut,
    MapPin,
    Menu,
    Search,
    Sparkles,
    TrendingUp,
    X,
} from "lucide-react";
import { useState } from "react";

function HomePage({
    user,
    onLogout,
    onPredict,
    onPropertyDiscovery,
    onPredictionHistory,
    onMarketInsights,
}) {
    const [mobileMenu, setMobileMenu] = useState(false);

    const displayName =
        user?.name?.trim() || "Property Explorer";

    // =========================================================
    // QUICK ACCESS HANDLERS
    // =========================================================

    const handlePropertyDiscovery = () => {
        if (typeof onPropertyDiscovery === "function") {
            onPropertyDiscovery();
        } else {
            console.log("Property Discovery clicked");
        }

        setMobileMenu(false);
    };

    const handlePredictionHistory = () => {
        if (typeof onPredictionHistory === "function") {
            onPredictionHistory();
        } else {
            console.log("Prediction History clicked");
        }

        setMobileMenu(false);
    };

    const handleMarketInsights = () => {
        if (typeof onMarketInsights === "function") {
            onMarketInsights();
        } else {
            console.log("Market Insights clicked");
        }

        setMobileMenu(false);
    };

    const handlePredict = () => {
        if (typeof onPredict === "function") {
            onPredict();
        }

        setMobileMenu(false);
    };

    return (
        <main className="min-h-screen overflow-hidden bg-[#03050B] text-white">

            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(168,85,247,0.13),transparent_28%),radial-gradient(circle_at_50%_70%,rgba(245,158,11,0.055),transparent_30%),linear-gradient(135deg,#02040A,#080B16_52%,#100A18)]" />

            <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                        backgroundSize: "70px 70px",
                    }}
                />
            </div>

            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#03050B]/75 backdrop-blur-2xl">

                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    {/* Brand */}

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200/20 bg-amber-200/[0.06]">
                            <Home
                                size={19}
                                className="text-amber-300"
                            />
                        </div>

                        <div>
                            <p className="text-[15px] font-semibold tracking-tight">
                                Griha
                                <span className="text-amber-300">
                                    Drishti
                                </span>
                            </p>

                            <p className="text-[8px] uppercase tracking-[0.28em] text-white/30">
                                Property Intelligence
                            </p>
                        </div>

                    </div>

                    {/* Desktop navigation */}

                    <nav className="hidden items-center gap-8 md:flex">

                        <NavItem
                            label="Dashboard"
                            active
                        />

                        <NavItem
                            label="Predict"
                            onClick={handlePredict}
                        />

                        <NavItem
                            label="Discover"
                            onClick={handlePropertyDiscovery}
                        />

                        <NavItem
                            label="History"
                            onClick={handlePredictionHistory}
                        />

                    </nav>

                    {/* Right */}

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-white/40 transition hover:bg-white/[0.06] hover:text-white sm:flex"
                            aria-label="Notifications"
                        >
                            <Bell size={17} />
                        </button>

                        <div className="hidden h-9 w-px bg-white/10 sm:block" />

                        {/* User */}

                        <div className="hidden items-center gap-3 sm:flex">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200/20 bg-amber-300/10 text-xs font-semibold text-amber-200">
                                {getInitials(displayName)}
                            </div>

                            <div className="max-w-[150px]">
                                <p className="truncate text-xs font-medium text-white/75">
                                    {displayName}
                                </p>

                                <p className="truncate text-[9px] text-white/25">
                                    {user?.email || "Demo account"}
                                </p>
                            </div>

                        </div>

                        {/* Mobile menu */}

                        <button
                            type="button"
                            onClick={() =>
                                setMobileMenu(
                                    (value) => !value
                                )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-white/60 md:hidden"
                            aria-label="Toggle menu"
                        >
                            {mobileMenu ? (
                                <X size={18} />
                            ) : (
                                <Menu size={18} />
                            )}
                        </button>

                    </div>

                </div>

                {/* Mobile navigation */}

                {mobileMenu && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        className="border-t border-white/[0.07] px-5 pb-5 md:hidden"
                    >

                        <div className="space-y-2 pt-4">

                            <MobileNavItem
                                label="Dashboard"
                                active
                            />

                            <MobileNavItem
                                label="Predict House Price"
                                onClick={handlePredict}
                            />

                            <MobileNavItem
                                label="Property Discovery"
                                onClick={
                                    handlePropertyDiscovery
                                }
                            />

                            <MobileNavItem
                                label="Prediction History"
                                onClick={
                                    handlePredictionHistory
                                }
                            />

                            <MobileNavItem
                                label="Market Insights"
                                onClick={
                                    handleMarketInsights
                                }
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setMobileMenu(false);

                                    if (
                                        typeof onLogout ===
                                        "function"
                                    ) {
                                        onLogout();
                                    }
                                }}
                                className="mt-3 flex w-full items-center gap-3 rounded-xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3 text-left text-sm text-red-300/70 transition hover:border-red-400/20 hover:bg-red-400/[0.08] hover:text-red-300"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>

                        </div>

                    </motion.div>
                )}

            </header>

            {/* =====================================================
                MAIN
            ====================================================== */}

            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

                {/* =================================================
                    WELCOME
                ================================================== */}

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
                        duration: 0.7,
                    }}
                    className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
                >

                    <div>

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.04] px-3 py-1.5">

                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,.7)]" />

                            <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-200/60">
                                Intelligence engine ready
                            </span>

                        </div>

                        <p className="text-sm text-white/30">
                            Welcome back,
                        </p>

                        <h1 className="mt-1 text-3xl font-medium tracking-[-0.035em] sm:text-4xl lg:text-5xl">

                            {displayName.split(" ")[0]}

                            <span className="text-amber-300">
                                .
                            </span>

                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/35">
                            See the home. Understand its value.
                            Use AI-powered intelligence to explore
                            property valuation and housing insights.
                        </p>

                    </div>

                    {/* Location */}

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/10">
                            <MapPin
                                size={16}
                                className="text-amber-300"
                            />
                        </div>

                        <div>
                            <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                                Property market
                            </p>

                            <p className="mt-0.5 text-xs text-white/65">
                                India
                            </p>
                        </div>

                    </div>

                </motion.section>

                {/* =================================================
                    HERO PREDICTION CARD
                ================================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.1,
                    }}
                    className="relative mb-8 overflow-hidden rounded-[30px] border border-amber-200/10 bg-gradient-to-br from-amber-300/[0.08] via-white/[0.035] to-purple-400/[0.06] p-6 shadow-[0_30px_100px_rgba(0,0,0,.25)] sm:p-8 lg:p-10"
                >

                    {/* Glow */}

                    <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-300/[0.08] blur-[100px]" />

                    <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-purple-500/[0.07] blur-[110px]" />

                    <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_360px]">

                        {/* Text */}

                        <div>

                            <div className="mb-5 flex items-center gap-2">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/10">
                                    <Sparkles
                                        size={17}
                                        className="text-amber-300"
                                    />
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.24em] text-amber-200/60">
                                    AI Property Valuation
                                </span>

                            </div>

                            <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">

                                Discover what your
                                <br />

                                <span className="bg-gradient-to-r from-white via-[#FFF7D8] to-amber-300 bg-clip-text text-transparent">
                                    property could be worth.
                                </span>

                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
                                Enter property characteristics
                                and let GrihaDrishti estimate
                                its market value using your
                                AI prediction engine.
                            </p>

                            <button
                                type="button"
                                onClick={handlePredict}
                                className="group mt-7 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 px-6 py-4 text-sm font-semibold text-black shadow-[0_12px_45px_rgba(252,211,77,.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(252,211,77,.2)]"
                            >

                                Predict House Price

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                            </button>

                        </div>

                        {/* Architecture visual */}

                        <ArchitectureVisual />

                    </div>

                </motion.section>

                {/* =================================================
                    INTELLIGENCE CARDS
                ================================================== */}

                <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <IntelligenceCard
                        icon={
                            <BarChart3 size={18} />
                        }
                        title="Smart Valuation"
                        value="AI Powered"
                        description="Estimate property value from key characteristics."
                        delay={0.15}
                    />

                    <IntelligenceCard
                        icon={
                            <TrendingUp size={18} />
                        }
                        title="Market Insights"
                        value="Live Analysis"
                        description="Understand property patterns and market signals."
                        delay={0.22}
                        onClick={handleMarketInsights}
                    />

                    <IntelligenceCard
                        icon={
                            <Building2 size={18} />
                        }
                        title="Property Discovery"
                        value="Explore"
                        description="Discover properties that match your interests."
                        delay={0.29}
                        onClick={handlePropertyDiscovery}
                    />

                </section>

                {/* =================================================
                    LOWER GRID
                ================================================== */}

                <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

                    {/* Recent predictions */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.3,
                        }}
                        className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">
                                    Workspace
                                </p>

                                <h3 className="mt-1 text-lg font-medium">
                                    Recent predictions
                                </h3>

                            </div>

                            <button
                                type="button"
                                onClick={
                                    handlePredictionHistory
                                }
                                className="flex items-center gap-1 text-[11px] text-amber-300/70 transition hover:text-amber-200"
                            >
                                View history
                                <ChevronRight size={13} />
                            </button>

                        </div>

                        <div className="mt-6">

                            <EmptyPrediction
                                onPredict={handlePredict}
                            />

                        </div>

                    </motion.div>

                    {/* Quick actions */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.4,
                        }}
                        className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6"
                    >

                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/25">
                            Quick access
                        </p>

                        <h3 className="mt-1 text-lg font-medium">
                            Explore GrihaDrishti
                        </h3>

                        <div className="mt-5 space-y-3">

                            {/* PROPERTY DISCOVERY */}

                            <QuickAction
                                icon={
                                    <Search size={16} />
                                }
                                title="Property Discovery"
                                text="Explore properties"
                                onClick={
                                    handlePropertyDiscovery
                                }
                            />

                            {/* PREDICTION HISTORY */}

                            <QuickAction
                                icon={
                                    <Clock3 size={16} />
                                }
                                title="Prediction History"
                                text="Review your estimates"
                                onClick={
                                    handlePredictionHistory
                                }
                            />

                            {/* MARKET INSIGHTS */}

                            <QuickAction
                                icon={
                                    <TrendingUp size={16} />
                                }
                                title="Market Insights"
                                text="Understand the market"
                                onClick={
                                    handleMarketInsights
                                }
                            />

                        </div>

                    </motion.div>

                </section>

                {/* =================================================
                    LOGOUT
                ================================================== */}

                <div className="mt-8 flex justify-end">

                    <button
                        type="button"
                        onClick={onLogout}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs text-white/35 transition hover:border-red-400/20 hover:bg-red-400/[0.04] hover:text-red-300"
                    >
                        <LogOut size={14} />
                        Logout
                    </button>

                </div>

            </div>

            {/* Footer */}

            <footer className="border-t border-white/[0.06] py-6 text-center">

                <p className="text-[9px] uppercase tracking-[0.25em] text-white/15">
                    GrihaDrishti • AI Property Intelligence
                </p>

            </footer>

        </main>
    );
}


/* =============================================================
   NAV ITEM
============================================================= */

function NavItem({
    label,
    active = false,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative text-xs transition ${
                active
                    ? "text-white"
                    : "text-white/35 hover:text-white/75"
            }`}
        >
            {label}

            {active && (
                <span className="absolute -bottom-[29px] left-1/2 h-px w-5 -translate-x-1/2 bg-amber-300" />
            )}
        </button>
    );
}


/* =============================================================
   MOBILE NAV ITEM
============================================================= */

function MobileNavItem({
    label,
    active = false,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                active
                    ? "border-amber-300/15 bg-amber-300/[0.05] text-white"
                    : "border-white/10 bg-white/[0.025] text-white/55 hover:bg-white/[0.05] hover:text-white"
            }`}
        >
            {label}

            <ChevronRight size={15} />
        </button>
    );
}


/* =============================================================
   INTELLIGENCE CARD
============================================================= */

function IntelligenceCard({
    icon,
    title,
    value,
    description,
    delay,
    onClick,
}) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            disabled={!onClick}
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.7,
                delay,
            }}
            className={`group w-full rounded-[24px] border border-white/10 bg-white/[0.025] p-5 text-left transition duration-300 ${
                onClick
                    ? "cursor-pointer hover:-translate-y-1 hover:border-amber-200/15 hover:bg-white/[0.04]"
                    : "cursor-default"
            }`}
        >

            <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300">
                    {icon}
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-white/25">
                    {value}
                </span>

            </div>

            <h3 className="mt-5 text-sm font-medium text-white/75 group-hover:text-white">
                {title}
            </h3>

            <p className="mt-2 text-xs leading-5 text-white/30">
                {description}
            </p>

        </motion.button>
    );
}


/* =============================================================
   ARCHITECTURE VISUAL
============================================================= */

function ArchitectureVisual() {
    return (
        <div className="relative mx-auto h-[290px] w-full max-w-[360px]">

            {/* Glow */}

            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/[0.08] blur-[60px]" />

            {/* Orbit */}

            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/10"
                style={{
                    transform:
                        "translate(-50%, -50%) rotateX(62deg)",
                }}
            />

            <motion.div
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/10"
                style={{
                    transform:
                        "translate(-50%, -50%) rotateY(64deg)",
                }}
            />

            {/* Building */}

            <div className="absolute bottom-7 left-1/2 w-[245px] -translate-x-1/2">

                {/* Roof */}

                <div className="mx-auto h-8 w-[190px] border border-amber-200/20 bg-white/[0.025] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />

                {/* Main building */}

                <div className="relative h-[145px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] shadow-[0_20px_50px_rgba(0,0,0,.4)]">

                    {/* Floors */}

                    <div className="absolute inset-x-0 top-1/3 h-px bg-white/10" />

                    <div className="absolute inset-x-0 top-2/3 h-px bg-white/10" />

                    {/* Windows */}

                    <div className="grid h-full grid-cols-5 gap-3 p-5">

                        {Array.from({
                            length: 15,
                        }).map((_, index) => (
                            <motion.div
                                key={index}
                                animate={{
                                    opacity:
                                        index % 3 === 0
                                            ? [
                                                0.25,
                                                0.8,
                                                0.25,
                                            ]
                                            : [
                                                0.15,
                                                0.35,
                                                0.15,
                                            ],
                                }}
                                transition={{
                                    duration:
                                        2 +
                                        (index % 4) *
                                            0.4,
                                    repeat: Infinity,
                                    delay:
                                        index * 0.08,
                                }}
                                className="rounded-sm border border-amber-200/10 bg-amber-200/[0.08]"
                            />
                        ))}

                    </div>

                    {/* Entrance */}

                    <div className="absolute bottom-0 left-1/2 h-16 w-12 -translate-x-1/2 border border-amber-200/15 bg-amber-300/[0.06]" />

                </div>

                {/* Ground */}

                <div className="mx-auto h-px w-[290px] bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

            </div>

            {/* Floating AI badge */}

            <motion.div
                animate={{
                    y: [0, -8, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute right-0 top-7 rounded-2xl border border-amber-200/15 bg-[#0A0B13]/80 px-4 py-3 shadow-xl backdrop-blur-xl"
            >

                <div className="flex items-center gap-2">

                    <Sparkles
                        size={13}
                        className="text-amber-300"
                    />

                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/50">
                        AI Analysis
                    </span>

                </div>

                <p className="mt-1 text-xs font-medium text-white/75">
                    Ready
                </p>

            </motion.div>

        </div>
    );
}


/* =============================================================
   EMPTY PREDICTION
============================================================= */

function EmptyPrediction({
    onPredict,
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/10 px-5 py-10 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/10">
                <BarChart3
                    size={20}
                    className="text-amber-300"
                />
            </div>

            <h4 className="mt-4 text-sm font-medium text-white/60">
                No predictions yet
            </h4>

            <p className="mt-2 max-w-sm text-xs leading-5 text-white/25">
                Your property valuation history
                will appear here after you make
                your first prediction.
            </p>

            <button
                type="button"
                onClick={onPredict}
                className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] px-4 py-2.5 text-xs font-medium text-amber-200 transition hover:border-amber-300/25 hover:bg-amber-300/[0.1]"
            >
                Make your first prediction
            </button>

        </div>
    );
}


/* =============================================================
   QUICK ACTION
============================================================= */

function QuickAction({
    icon,
    title,
    text,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 text-left transition duration-300 hover:-translate-y-[1px] hover:border-amber-200/15 hover:bg-white/[0.045] hover:shadow-[0_10px_30px_rgba(0,0,0,.15)] active:scale-[0.99]"
        >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300 transition duration-300 group-hover:bg-amber-300/15 group-hover:shadow-[0_0_20px_rgba(252,211,77,.08)]">
                {icon}
            </div>

            <div className="min-w-0 flex-1">

                <p className="text-xs font-medium text-white/65 transition group-hover:text-white/90">
                    {title}
                </p>

                <p className="mt-0.5 text-[10px] text-white/25 transition group-hover:text-white/35">
                    {text}
                </p>

            </div>

            <ChevronRight
                size={14}
                className="text-white/20 transition duration-300 group-hover:translate-x-1 group-hover:text-amber-300"
            />

        </button>
    );
}


/* =============================================================
   INITIALS
============================================================= */

function getInitials(name) {
    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 0) {
        return "G";
    }

    if (parts.length === 1) {
        return parts[0]
            .slice(0, 2)
            .toUpperCase();
    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();
}


export default HomePage;