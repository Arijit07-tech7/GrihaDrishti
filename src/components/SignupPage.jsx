import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Home,
    Lock,
    Mail,
    ShieldCheck,
    Sparkles,
    User,
} from "lucide-react";
import { useState } from "react";

import { signupUser } from "../utils/demoAuth";

function SignupPage({ onSignup, onLogin }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    // =========================================================
    // CREATE ACCOUNT
    // =========================================================

    const handleSignup = () => {
        setError("");
        setSuccess("");

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        // -----------------------------------------------------
        // Basic validation
        // -----------------------------------------------------

        if (!cleanName) {
            setError("Please enter your full name.");
            return;
        }

        if (!cleanEmail) {
            setError("Please enter your email address.");
            return;
        }

        // -----------------------------------------------------
        // Simple email validation
        // -----------------------------------------------------

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            setError(
                "Please enter a valid email address."
            );
            return;
        }

        if (!password) {
            setError("Please create a password.");
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }

        if (!confirmPassword) {
            setError(
                "Please confirm your password."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Passwords do not match."
            );
            return;
        }

        // -----------------------------------------------------
        // Create account
        // -----------------------------------------------------

        setLoading(true);

        setTimeout(() => {
            const result = signupUser({
                name: cleanName,
                email: cleanEmail,
                password,
            });

            setLoading(false);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setSuccess(
                "Account created successfully."
            );

            // Auto-login → Home
            setTimeout(() => {
                onSignup?.(result.user);
            }, 700);
        }, 800);
    };

    // =========================================================
    // PASSWORD STRENGTH
    // =========================================================

    const passwordLength = password.length;

    const hasMinLength =
        passwordLength >= 6;

    const hasNumber =
        /\d/.test(password);

    const hasLetter =
        /[a-zA-Z]/.test(password);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#03050B] text-white">

            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.14),transparent_30%),linear-gradient(135deg,#02040A,#080B16_50%,#100A18)]" />

            {/* Golden glow */}

            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/[0.035] blur-[140px]" />

            {/* Architectural grid */}

            <div className="pointer-events-none absolute inset-0 opacity-[0.035]">

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                        backgroundSize:
                            "70px 70px",
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

                <div className="grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_480px]">

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

                            {/* Badge */}

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-200/[0.04] px-4 py-2">

                                <Sparkles
                                    size={14}
                                    className="text-amber-300"
                                />

                                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-100/60">
                                    Intelligent Property Valuation
                                </span>

                            </div>

                            {/* Heading */}

                            <h1 className="text-5xl font-medium leading-[1.08] tracking-[-0.045em] xl:text-6xl">

                                Build your
                                <br />

                                <span className="bg-gradient-to-r from-white via-[#FFF7D8] to-amber-300 bg-clip-text text-transparent">
                                    property intelligence.
                                </span>

                            </h1>

                            {/* Description */}

                            <p className="mt-7 max-w-lg text-sm leading-7 text-white/40">
                                Create your GrihaDrishti account
                                and unlock AI-powered property
                                valuation, insights, discovery,
                                and prediction history.
                            </p>

                            {/* Features */}

                            <div className="mt-10 space-y-3">

                                <Benefit
                                    title="AI-powered valuation"
                                    text="Understand the estimated value of a property."
                                />

                                <Benefit
                                    title="Personal workspace"
                                    text="Keep your predictions and property insights together."
                                />

                                <Benefit
                                    title="Smart property discovery"
                                    text="Explore properties with meaningful intelligence."
                                />

                            </div>

                        </div>

                    </motion.section>

                    {/* =================================================
                        SIGNUP CARD
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

                                    <User
                                        size={20}
                                        className="text-amber-300"
                                    />

                                </div>

                                <h2 className="text-3xl font-semibold tracking-tight">
                                    Create account
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-white/40">
                                    Start your GrihaDrishti
                                    property intelligence journey.
                                </p>

                            </div>

                            {/* =================================================
                                FORM
                            ================================================== */}

                            <div className="relative mt-8 space-y-4">

                                {/* FULL NAME */}

                                <div>

                                    <label className="mb-2 block text-xs font-medium text-white/55">
                                        Full name
                                    </label>

                                    <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 transition focus-within:border-amber-200/40 focus-within:bg-black/35">

                                        <User
                                            size={17}
                                            className="text-white/25 transition group-focus-within:text-amber-300"
                                        />

                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(event) =>
                                                setName(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Your full name"
                                            autoComplete="name"
                                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                                        />

                                    </div>

                                </div>

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
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                                        />

                                    </div>

                                </div>

                                {/* PASSWORD */}

                                <div>

                                    <label className="mb-2 block text-xs font-medium text-white/55">
                                        Password
                                    </label>

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
                                            placeholder="Create a password"
                                            autoComplete="new-password"
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

                                    {/* Password strength */}

                                    {password && (
                                        <div className="mt-3 space-y-2">

                                            <PasswordRule
                                                active={
                                                    hasMinLength
                                                }
                                                text="At least 6 characters"
                                            />

                                            <PasswordRule
                                                active={
                                                    hasLetter
                                                }
                                                text="Contains a letter"
                                            />

                                            <PasswordRule
                                                active={
                                                    hasNumber
                                                }
                                                text="Contains a number"
                                            />

                                        </div>
                                    )}

                                </div>

                                {/* CONFIRM PASSWORD */}

                                <div>

                                    <label className="mb-2 block text-xs font-medium text-white/55">
                                        Confirm password
                                    </label>

                                    <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 transition focus-within:border-amber-200/40 focus-within:bg-black/35">

                                        <Lock
                                            size={17}
                                            className="text-white/25 transition group-focus-within:text-amber-300"
                                        />

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                confirmPassword
                                            }
                                            onChange={(event) =>
                                                setConfirmPassword(
                                                    event.target.value
                                                )
                                            }
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key ===
                                                    "Enter"
                                                ) {
                                                    handleSignup();
                                                }
                                            }}
                                            placeholder="Confirm your password"
                                            autoComplete="new-password"
                                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (value) =>
                                                        !value
                                                )
                                            }
                                            className="text-white/25 transition hover:text-white/70"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={17} />
                                            ) : (
                                                <Eye size={17} />
                                            )}
                                        </button>

                                    </div>

                                </div>

                                {/* PASSWORD MATCH */}

                                {confirmPassword && (
                                    <div className="flex items-center gap-2">

                                        <CheckCircle2
                                            size={13}
                                            className={
                                                password ===
                                                confirmPassword
                                                    ? "text-emerald-300"
                                                    : "text-red-300"
                                            }
                                        />

                                        <span
                                            className={
                                                password ===
                                                confirmPassword
                                                    ? "text-[10px] text-emerald-300/80"
                                                    : "text-[10px] text-red-300/80"
                                            }
                                        >
                                            {password ===
                                            confirmPassword
                                                ? "Passwords match"
                                                : "Passwords do not match"}
                                        </span>

                                    </div>
                                )}

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

                                {/* CREATE ACCOUNT */}

                                <button
                                    type="button"
                                    onClick={handleSignup}
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 py-4 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(252,211,77,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_50px_rgba(252,211,77,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />

                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create GrihaDrishti Account

                                            <ArrowRight
                                                size={17}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </>
                                    )}

                                </button>

                                {/* LOGIN */}

                                <p className="pt-2 text-center text-sm text-white/35">

                                    Already have an account?

                                    <button
                                        type="button"
                                        onClick={onLogin}
                                        className="ml-2 font-medium text-amber-300 transition hover:text-amber-200"
                                    >
                                        Sign in
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
                                    Demo account • Browser-based storage
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
// BENEFIT CARD
// ============================================================

function Benefit({ title, text }) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-300/10">

                <Sparkles
                    size={14}
                    className="text-amber-300"
                />

            </div>

            <div>

                <p className="text-xs font-medium text-white/70">
                    {title}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-white/30">
                    {text}
                </p>

            </div>

        </div>
    );
}

// ============================================================
// PASSWORD RULE
// ============================================================

function PasswordRule({
    active,
    text,
}) {
    return (
        <div className="flex items-center gap-2">

            <CheckCircle2
                size={12}
                className={
                    active
                        ? "text-emerald-300"
                        : "text-white/20"
                }
            />

            <span
                className={
                    active
                        ? "text-[10px] text-emerald-300/80"
                        : "text-[10px] text-white/25"
                }
            >
                {text}
            </span>

        </div>
    );
}

export default SignupPage;