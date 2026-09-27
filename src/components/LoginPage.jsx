import { motion } from "framer-motion";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Home,
    Lock,
    Mail,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { useState } from "react";

import {
    loginUser,
    googleDemoLogin,
} from "../utils/demoAuth";

function LoginPage({
    onLogin,
    onSignup,
    onForgotPassword,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [googleEmail, setGoogleEmail] = useState("");

    const [showGoogleDemo, setShowGoogleDemo] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    // =========================================================
    // EMAIL + PASSWORD LOGIN
    // =========================================================

    const handleLogin = () => {
        setError("");
        setSuccess("");

        if (!email.trim() || !password) {
            setError(
                "Please enter your email and password."
            );
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result = loginUser({
                email,
                password,
            });

            setLoading(false);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setSuccess("Login successful.");

            setTimeout(() => {
                onLogin?.(result.user);
            }, 500);
        }, 700);
    };

    // =========================================================
    // GOOGLE DEMO LOGIN
    // =========================================================

    const handleGoogleLogin = () => {
        setError("");
        setSuccess("");

        if (!googleEmail.trim()) {
            setError("Please enter your Google email.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result = googleDemoLogin(
                googleEmail
            );

            setLoading(false);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setSuccess(
                "Google login successful."
            );

            setTimeout(() => {
                onLogin?.(result.user);
            }, 500);
        }, 800);
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#03050B] text-white">

            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_85%_25%,rgba(168,85,247,0.14),transparent_30%),linear-gradient(135deg,#02040A,#080B16_50%,#100A18)]" />

            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/[0.035] blur-[130px]" />

            {/* Architectural grid */}

            <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                        backgroundSize: "70px 70px",
                    }}
                />
            </div>

            {/* =====================================================
                HEADER
            ====================================================== */}

            <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10">

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

                <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 sm:flex">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />

                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                        AI Engine Online
                    </span>

                </div>

            </header>

            {/* =====================================================
                MAIN
            ====================================================== */}

            <div className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-10 pt-24">

                <div className="grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_460px]">

                    {/* =================================================
                        LEFT SIDE
                    ================================================== */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            x: -35,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: "easeOut",
                        }}
                        className="hidden lg:block"
                    >

                        <div className="max-w-xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-200/[0.04] px-4 py-2">

                                <Sparkles
                                    size={14}
                                    className="text-amber-300"
                                />

                                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-100/60">
                                    Intelligent Property Valuation
                                </span>

                            </div>

                            <h1 className="text-5xl font-medium leading-[1.08] tracking-[-0.045em] xl:text-6xl">

                                See the home.
                                <br />

                                <span className="bg-gradient-to-r from-white via-[#FFF7D8] to-amber-300 bg-clip-text text-transparent">
                                    Understand its value.
                                </span>

                            </h1>

                            <p className="mt-7 max-w-lg text-sm leading-7 text-white/40">
                                Access your GrihaDrishti workspace and
                                explore AI-powered property intelligence,
                                smart valuation, and meaningful housing
                                insights.
                            </p>

                            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">

                                <Feature
                                    icon={
                                        <Sparkles size={15} />
                                    }
                                    title="AI"
                                    text="Smart valuation"
                                />

                                <Feature
                                    icon={
                                        <Home size={15} />
                                    }
                                    title="Property"
                                    text="Intelligence"
                                />

                                <Feature
                                    icon={
                                        <ShieldCheck size={15} />
                                    }
                                    title="Secure"
                                    text="Private access"
                                />

                            </div>

                        </div>

                    </motion.section>

                    {/* =================================================
                        LOGIN CARD
                    ================================================== */}

                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 35,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.1,
                            ease: "easeOut",
                        }}
                        className="w-full"
                    >

                        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-9">

                            {/* Card glow */}

                            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-300/[0.08] blur-[70px]" />

                            {/* =================================================
                                TOP
                            ================================================== */}

                            <div className="relative">

                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200/15 bg-amber-200/[0.05]">

                                    <Lock
                                        size={20}
                                        className="text-amber-300"
                                    />

                                </div>

                                <h2 className="text-3xl font-semibold tracking-tight">
                                    Welcome back
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-white/40">
                                    Sign in to continue to your
                                    GrihaDrishti workspace.
                                </p>

                            </div>

                            {/* =================================================
                                FORM
                            ================================================== */}

                            <div className="relative mt-8 space-y-5">

                                {/* EMAIL */}

                                <div>

                                    <label className="mb-2 block text-xs font-medium text-white/55">
                                        Email address
                                    </label>

                                    <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 transition focus-within:border-amber-200/40 focus-within:bg-black/35">

                                        <Mail
                                            size={17}
                                            className="text-white/25 transition group-focus-within:text-amber-300"
                                        />

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(
                                                    event.target.value
                                                )
                                            }
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key ===
                                                    "Enter"
                                                ) {
                                                    handleLogin();
                                                }
                                            }}
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                                        />

                                    </div>

                                </div>

                                {/* PASSWORD */}

                                <div>

                                    <div className="mb-2 flex items-center justify-between">

                                        <label className="text-xs font-medium text-white/55">
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            onClick={
                                                onForgotPassword
                                            }
                                            className="text-[11px] text-amber-300/70 transition hover:text-amber-200"
                                        >
                                            Forgot password?
                                        </button>

                                    </div>

                                    <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 transition focus-within:border-amber-200/40 focus-within:bg-black/35">

                                        <Lock
                                            size={17}
                                            className="text-white/25 transition group-focus-within:text-amber-300"
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(
                                                    event.target.value
                                                )
                                            }
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key ===
                                                    "Enter"
                                                ) {
                                                    handleLogin();
                                                }
                                            }}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (value) =>
                                                        !value
                                                )
                                            }
                                            className="text-white/25 transition hover:text-white/70"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={17} />
                                            ) : (
                                                <Eye size={17} />
                                            )}
                                        </button>

                                    </div>

                                </div>

                                {/* ERROR */}

                                {error && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs text-red-300"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                {/* SUCCESS */}

                                {success && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-xs text-emerald-300"
                                    >
                                        {success}
                                    </motion.div>
                                )}

                                {/* LOGIN BUTTON */}

                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 py-4 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(252,211,77,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_50px_rgba(252,211,77,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />

                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign in to GrihaDrishti

                                            <ArrowRight
                                                size={17}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </>
                                    )}

                                </button>

                                {/* DIVIDER */}

                                <div className="flex items-center gap-4 py-1">

                                    <div className="h-px flex-1 bg-white/10" />

                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                        or
                                    </span>

                                    <div className="h-px flex-1 bg-white/10" />

                                </div>

                                {/* GOOGLE BUTTON */}

                                {!showGoogleDemo ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setError("");
                                            setSuccess("");
                                            setShowGoogleDemo(true);
                                        }}
                                        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] py-3.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.055] hover:text-white"
                                    >

                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                                            G
                                        </span>

                                        Continue with Google

                                    </button>
                                ) : (
                                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">

                                        <p className="mb-3 text-xs text-white/45">
                                            Enter your Google email
                                            for this demo.
                                        </p>

                                        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-3">

                                            <Mail
                                                size={16}
                                                className="text-white/25"
                                            />

                                            <input
                                                type="email"
                                                value={googleEmail}
                                                onChange={(event) =>
                                                    setGoogleEmail(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="your@gmail.com"
                                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                                            />

                                        </div>

                                        <div className="mt-3 flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowGoogleDemo(
                                                        false
                                                    );
                                                    setGoogleEmail(
                                                        ""
                                                    );
                                                }}
                                                className="flex-1 rounded-xl border border-white/10 py-3 text-xs text-white/50 transition hover:bg-white/5 hover:text-white"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                onClick={
                                                    handleGoogleLogin
                                                }
                                                disabled={loading}
                                                className="flex-1 rounded-xl bg-white py-3 text-xs font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
                                            >
                                                {loading
                                                    ? "Connecting..."
                                                    : "Continue"}
                                            </button>

                                        </div>

                                    </div>
                                )}

                                {/* SIGNUP */}

                                <p className="pt-2 text-center text-sm text-white/35">

                                    New to GrihaDrishti?

                                    <button
                                        type="button"
                                        onClick={onSignup}
                                        className="ml-2 font-medium text-amber-300 transition hover:text-amber-200"
                                    >
                                        Create an account
                                    </button>

                                </p>

                            </div>

                            {/* SECURITY */}

                            <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/[0.07] pt-5">

                                <ShieldCheck
                                    size={13}
                                    className="text-emerald-300/70"
                                />

                                <span className="text-[10px] text-white/25">
                                    Secure demo access to your
                                    property intelligence
                                </span>

                            </div>

                        </div>

                    </motion.section>

                </div>

            </div>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <div className="absolute bottom-4 left-0 right-0 z-20 text-center">

                <p className="text-[9px] uppercase tracking-[0.28em] text-white/15">
                    GrihaDrishti • AI Property Intelligence
                </p>

            </div>

        </main>
    );
}

// ============================================================
// FEATURE CARD
// ============================================================

function Feature({
    icon,
    title,
    text,
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">

            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-300/10 text-amber-300">
                {icon}
            </div>

            <p className="text-xs font-medium text-white/70">
                {title}
            </p>

            <p className="mt-1 text-[10px] leading-4 text-white/30">
                {text}
            </p>

        </div>
    );
}

export default LoginPage;