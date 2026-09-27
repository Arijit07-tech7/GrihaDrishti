import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Home,
    KeyRound,
    Lock,
    Mail,
    RefreshCw,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import { useState } from "react";

import {
    generateResetOTP,
    verifyResetOTP,
    resetPassword,
} from "../utils/demoAuth";

function ForgotPassword({ onBack }) {
    // =========================================================
    // STATES
    // =========================================================

    const [step, setStep] = useState("email");

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [generatedOtp, setGeneratedOtp] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    // =========================================================
    // SEND OTP
    // =========================================================

    const handleSendOTP = () => {
        setError("");
        setSuccess("");

        const cleanEmail =
            email.trim().toLowerCase();

        if (!cleanEmail) {
            setError(
                "Please enter your email address."
            );
            return;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            setError(
                "Please enter a valid email address."
            );
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result =
                generateResetOTP(cleanEmail);

            setLoading(false);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setGeneratedOtp(result.otp);

            setSuccess(
                "Demo OTP generated successfully."
            );

            setStep("otp");
        }, 800);
    };

    // =========================================================
    // VERIFY OTP
    // =========================================================

    const handleVerifyOTP = () => {
        setError("");
        setSuccess("");

        if (!otp.trim()) {
            setError(
                "Please enter the OTP."
            );
            return;
        }

        if (otp.trim().length !== 6) {
            setError(
                "OTP must contain 6 digits."
            );
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result =
                verifyResetOTP({
                    email,
                    otp,
                });

            setLoading(false);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setSuccess(
                "OTP verified successfully."
            );

            setTimeout(() => {
                setSuccess("");
                setStep("password");
            }, 500);
        }, 700);
    };

    // =========================================================
    // RESET PASSWORD
    // =========================================================

    const handleResetPassword = () => {
        setError("");
        setSuccess("");

        if (!newPassword) {
            setError(
                "Please enter a new password."
            );
            return;
        }

        if (newPassword.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }

        if (!confirmPassword) {
            setError(
                "Please confirm your new password."
            );
            return;
        }

        if (
            newPassword !==
            confirmPassword
        ) {
            setError(
                "Passwords do not match."
            );
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result =
                resetPassword({
                    email,
                    newPassword,
                });

            setLoading(false);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setSuccess(
                "Password reset successfully."
            );

            setStep("success");
        }, 800);
    };

    // =========================================================
    // RESEND OTP
    // =========================================================

    const handleResendOTP = () => {
        setError("");
        setSuccess("");

        setLoading(true);

        setTimeout(() => {
            const result =
                generateResetOTP(email);

            setLoading(false);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setGeneratedOtp(result.otp);

            setOtp("");

            setSuccess(
                "A new demo OTP has been generated."
            );
        }, 700);
    };

    // =========================================================
    // GO BACK
    // =========================================================

    const handleBack = () => {
        setError("");
        setSuccess("");

        onBack?.();
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
                                    Account Recovery
                                </span>

                            </div>

                            <h1 className="text-5xl font-medium leading-[1.08] tracking-[-0.045em] xl:text-6xl">

                                Secure your
                                <br />

                                <span className="bg-gradient-to-r from-white via-[#FFF7D8] to-amber-300 bg-clip-text text-transparent">
                                    GrihaDrishti access.
                                </span>

                            </h1>

                            <p className="mt-7 max-w-lg text-sm leading-7 text-white/40">
                                Recover your account,
                                verify your identity with
                                a demo OTP, and create
                                a new password.
                            </p>

                            <div className="mt-10 space-y-3">

                                <RecoveryFeature
                                    icon={
                                        <Mail size={15} />
                                    }
                                    title="Email verification"
                                    text="Use your registered account email."
                                />

                                <RecoveryFeature
                                    icon={
                                        <KeyRound size={15} />
                                    }
                                    title="OTP verification"
                                    text="Verify the six-digit recovery code."
                                />

                                <RecoveryFeature
                                    icon={
                                        <Lock size={15} />
                                    }
                                    title="Password reset"
                                    text="Create a new password after verification."
                                />

                            </div>

                        </div>

                    </motion.section>

                    {/* =================================================
                        CARD
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
                            ease: "easeOut",
                        }}
                        className="w-full"
                    >

                        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-9">

                            {/* Glow */}

                            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-300/[0.08] blur-[70px]" />

                            {/* =================================================
                                EMAIL STEP
                            ================================================== */}

                            {step === "email" && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                >

                                    <StepHeader
                                        icon={
                                            <Mail
                                                size={20}
                                                className="text-amber-300"
                                            />
                                        }
                                        title="Forgot password?"
                                        description="Enter your registered email to receive a demo OTP."
                                    />

                                    <div className="mt-8">

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
                                                        handleSendOTP();
                                                    }
                                                }}
                                                placeholder="you@example.com"
                                                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                                            />

                                        </div>

                                    </div>

                                    <StatusMessage
                                        error={error}
                                        success={success}
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            handleSendOTP
                                        }
                                        disabled={loading}
                                        className="group mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                    >

                                        {loading ? (
                                            <>
                                                <Spinner />

                                                Generating OTP...
                                            </>
                                        ) : (
                                            <>
                                                Send Demo OTP

                                                <ArrowRight
                                                    size={17}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </>
                                        )}

                                    </button>

                                    <BackButton
                                        onClick={handleBack}
                                        text="Back to Login"
                                    />

                                </motion.div>
                            )}

                            {/* =================================================
                                OTP STEP
                            ================================================== */}

                            {step === "otp" && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                >

                                    <StepHeader
                                        icon={
                                            <KeyRound
                                                size={20}
                                                className="text-amber-300"
                                            />
                                        }
                                        title="Verify OTP"
                                        description={`Enter the six-digit code for ${email}.`}
                                    />

                                    {/* DEMO OTP */}

                                    <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-4">

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/50">
                                                    Demo OTP
                                                </p>

                                                <p className="mt-1 text-2xl font-semibold tracking-[0.25em] text-amber-200">
                                                    {generatedOtp}
                                                </p>

                                            </div>

                                            <KeyRound
                                                size={22}
                                                className="text-amber-300/60"
                                            />

                                        </div>

                                        <p className="mt-2 text-[10px] text-white/30">
                                            For demo purposes,
                                            this OTP is displayed
                                            here instead of being
                                            sent by email.
                                        </p>

                                    </div>

                                    {/* OTP INPUT */}

                                    <div className="mt-5">

                                        <label className="mb-2 block text-xs font-medium text-white/55">
                                            Verification code
                                        </label>

                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(event) =>
                                                setOtp(
                                                    event.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    )
                                                )
                                            }
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key ===
                                                    "Enter"
                                                ) {
                                                    handleVerifyOTP();
                                                }
                                            }}
                                            placeholder="000000"
                                            className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-center text-xl font-semibold tracking-[0.45em] text-white outline-none placeholder:text-white/15 focus:border-amber-200/40"
                                        />

                                    </div>

                                    <StatusMessage
                                        error={error}
                                        success={success}
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            handleVerifyOTP
                                        }
                                        disabled={loading}
                                        className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:opacity-60"
                                    >

                                        {loading ? (
                                            <>
                                                <Spinner />

                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                Verify OTP

                                                <CheckCircle2
                                                    size={17}
                                                />
                                            </>
                                        )}

                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            handleResendOTP
                                        }
                                        disabled={loading}
                                        className="mt-4 flex w-full items-center justify-center gap-2 text-xs text-amber-300/70 transition hover:text-amber-200 disabled:opacity-40"
                                    >

                                        <RefreshCw
                                            size={13}
                                        />

                                        Generate New OTP

                                    </button>

                                    <BackButton
                                        onClick={() => {
                                            setStep(
                                                "email"
                                            );
                                            setOtp("");
                                            setError("");
                                            setSuccess("");
                                        }}
                                        text="Change Email"
                                    />

                                </motion.div>
                            )}

                            {/* =================================================
                                PASSWORD STEP
                            ================================================== */}

                            {step === "password" && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                >

                                    <StepHeader
                                        icon={
                                            <Lock
                                                size={20}
                                                className="text-amber-300"
                                            />
                                        }
                                        title="Create new password"
                                        description="Choose a new password for your GrihaDrishti account."
                                    />

                                    <div className="mt-8 space-y-5">

                                        {/* NEW PASSWORD */}

                                        <div>

                                            <label className="mb-2 block text-xs font-medium text-white/55">
                                                New password
                                            </label>

                                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 focus-within:border-amber-200/40">

                                                <Lock
                                                    size={17}
                                                    className="text-white/25"
                                                />

                                                <input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    value={
                                                        newPassword
                                                    }
                                                    onChange={(event) =>
                                                        setNewPassword(
                                                            event.target.value
                                                        )
                                                    }
                                                    placeholder="Create new password"
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
                                                    className="text-white/25 hover:text-white/70"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    ) : (
                                                        <Eye
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    )}
                                                </button>

                                            </div>

                                        </div>

                                        {/* CONFIRM PASSWORD */}

                                        <div>

                                            <label className="mb-2 block text-xs font-medium text-white/55">
                                                Confirm password
                                            </label>

                                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 focus-within:border-amber-200/40">

                                                <Lock
                                                    size={17}
                                                    className="text-white/25"
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
                                                            handleResetPassword();
                                                        }
                                                    }}
                                                    placeholder="Confirm new password"
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
                                                    className="text-white/25 hover:text-white/70"
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    ) : (
                                                        <Eye
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    )}
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                    <StatusMessage
                                        error={error}
                                        success={success}
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            handleResetPassword
                                        }
                                        disabled={loading}
                                        className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:opacity-60"
                                    >

                                        {loading ? (
                                            <>
                                                <Spinner />

                                                Resetting...
                                            </>
                                        ) : (
                                            <>
                                                Reset Password

                                                <ArrowRight
                                                    size={17}
                                                />
                                            </>
                                        )}

                                    </button>

                                </motion.div>
                            )}

                            {/* =================================================
                                SUCCESS STEP
                            ================================================== */}

                            {step === "success" && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    className="py-5 text-center"
                                >

                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/[0.08]">

                                        <CheckCircle2
                                            size={40}
                                            className="text-emerald-300"
                                        />

                                    </div>

                                    <h2 className="mt-6 text-3xl font-semibold">
                                        Password reset
                                    </h2>

                                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/40">
                                        Your GrihaDrishti
                                        password has been
                                        successfully updated.
                                    </p>

                                    <div className="mt-6 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4">

                                        <p className="text-xs text-emerald-300/80">
                                            Your account is ready.
                                        </p>

                                        <p className="mt-1 text-[10px] text-white/30">
                                            You can now sign in
                                            using your new
                                            password.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            handleBack
                                        }
                                        className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                                    >

                                        Return to Login

                                        <ArrowRight
                                            size={17}
                                        />

                                    </button>

                                </motion.div>
                            )}

                            {/* =================================================
                                SECURITY FOOTER
                            ================================================== */}

                            <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/[0.07] pt-5">

                                <ShieldCheck
                                    size={13}
                                    className="text-emerald-300/70"
                                />

                                <span className="text-[10px] text-white/25">
                                    Demo account recovery system
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
// STEP HEADER
// ============================================================

function StepHeader({
    icon,
    title,
    description,
}) {
    return (
        <div className="relative">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200/15 bg-amber-200/[0.05]">
                {icon}
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
                {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
                {description}
            </p>

        </div>
    );
}

// ============================================================
// STATUS MESSAGE
// ============================================================

function StatusMessage({
    error,
    success,
}) {
    if (error) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: -5,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs text-red-300"
            >
                {error}
            </motion.div>
        );
    }

    if (success) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: -5,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-xs text-emerald-300"
            >
                {success}
            </motion.div>
        );
    }

    return null;
}

// ============================================================
// BACK BUTTON
// ============================================================

function BackButton({
    onClick,
    text,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="mt-5 flex w-full items-center justify-center gap-2 text-xs text-white/35 transition hover:text-white/70"
        >
            <ArrowLeft size={13} />

            {text}
        </button>
    );
}

// ============================================================
// SPINNER
// ============================================================

function Spinner() {
    return (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
    );
}

// ============================================================
// RECOVERY FEATURE
// ============================================================

function RecoveryFeature({
    icon,
    title,
    text,
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-300/10 text-amber-300">
                {icon}
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

export default ForgotPassword;