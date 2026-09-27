// ============================================================
// GrihaDrishti - Demo Authentication System
// Frontend-only demo using localStorage
// ============================================================

const USERS_KEY = "griha_users";
const CURRENT_USER_KEY = "griha_current_user";
const OTP_KEY = "griha_reset_otp";

// ------------------------------------------------------------
// Get all users
// ------------------------------------------------------------

function getUsers() {
    try {
        const users = localStorage.getItem(USERS_KEY);

        if (!users) {
            return [];
        }

        return JSON.parse(users);
    } catch (error) {
        console.error("Unable to read users:", error);
        return [];
    }
}

// ------------------------------------------------------------
// Save users
// ------------------------------------------------------------

function saveUsers(users) {
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}

// ------------------------------------------------------------
// Create account
// ------------------------------------------------------------

export function signupUser({
    name,
    email,
    password,
}) {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
        return {
            success: false,
            message: "Please enter your full name.",
        };
    }

    if (!cleanEmail) {
        return {
            success: false,
            message: "Please enter your email address.",
        };
    }

    if (!password) {
        return {
            success: false,
            message: "Please enter a password.",
        };
    }

    if (password.length < 6) {
        return {
            success: false,
            message: "Password must contain at least 6 characters.",
        };
    }

    const users = getUsers();

    const existingUser = users.find(
        (user) => user.email === cleanEmail
    );

    if (existingUser) {
        return {
            success: false,
            message: "An account with this email already exists.",
        };
    }

    const newUser = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : `user_${Date.now()}`,

        name: cleanName,

        email: cleanEmail,

        password,

        provider: "email",

        createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    saveUsers(users);

    // Automatically login after signup
    const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        provider: newUser.provider,
    };

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    );

    return {
        success: true,
        user: sessionUser,
        message: "Account created successfully.",
    };
}

// ------------------------------------------------------------
// Login
// ------------------------------------------------------------

export function loginUser({
    email,
    password,
}) {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
        return {
            success: false,
            message: "Please enter your email and password.",
        };
    }

    const users = getUsers();

    const user = users.find(
        (item) =>
            item.email === cleanEmail &&
            item.password === password
    );

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password.",
        };
    }

    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: user.provider,
    };

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    );

    return {
        success: true,
        user: sessionUser,
        message: "Login successful.",
    };
}

// ------------------------------------------------------------
// Demo Google Login
// ------------------------------------------------------------

export function googleDemoLogin(email) {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
        return {
            success: false,
            message: "Please enter your Google email.",
        };
    }

    const users = getUsers();

    let user = users.find(
        (item) => item.email === cleanEmail
    );

    // If user doesn't exist, create a demo Google account
    if (!user) {
        user = {
            id: crypto.randomUUID
                ? crypto.randomUUID()
                : `google_${Date.now()}`,

            name: cleanEmail.split("@")[0],

            email: cleanEmail,

            password: null,

            provider: "google",

            createdAt: new Date().toISOString(),
        };

        users.push(user);

        saveUsers(users);
    }

    const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        provider: "google",
    };

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(sessionUser)
    );

    return {
        success: true,
        user: sessionUser,
        message: "Google demo login successful.",
    };
}

// ------------------------------------------------------------
// Get currently logged-in user
// ------------------------------------------------------------

export function getCurrentUser() {
    try {
        const user = localStorage.getItem(
            CURRENT_USER_KEY
        );

        if (!user) {
            return null;
        }

        return JSON.parse(user);
    } catch (error) {
        console.error("Unable to read current user:", error);
        return null;
    }
}

// ------------------------------------------------------------
// Logout
// ------------------------------------------------------------

export function logoutUser() {
    localStorage.removeItem(
        CURRENT_USER_KEY
    );
}

// ------------------------------------------------------------
// Generate Demo OTP
// ------------------------------------------------------------

export function generateResetOTP(email) {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
        return {
            success: false,
            message: "Please enter your email address.",
        };
    }

    const users = getUsers();

    const user = users.find(
        (item) => item.email === cleanEmail
    );

    if (!user) {
        return {
            success: false,
            message: "No account found with this email.",
        };
    }

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const otpData = {
        email: cleanEmail,
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000,
    };

    localStorage.setItem(
        OTP_KEY,
        JSON.stringify(otpData)
    );

    return {
        success: true,
        otp,
        message: "Demo OTP generated successfully.",
    };
}

// ------------------------------------------------------------
// Verify OTP
// ------------------------------------------------------------

export function verifyResetOTP({
    email,
    otp,
}) {
    const cleanEmail = email.trim().toLowerCase();

    const savedOTP = localStorage.getItem(
        OTP_KEY
    );

    if (!savedOTP) {
        return {
            success: false,
            message: "OTP not found. Please request a new OTP.",
        };
    }

    try {
        const otpData = JSON.parse(savedOTP);

        if (Date.now() > otpData.expiresAt) {
            localStorage.removeItem(OTP_KEY);

            return {
                success: false,
                message: "OTP has expired. Please request a new one.",
            };
        }

        if (
            otpData.email !== cleanEmail ||
            otpData.otp !== otp.trim()
        ) {
            return {
                success: false,
                message: "Invalid OTP.",
            };
        }

        return {
            success: true,
            message: "OTP verified successfully.",
        };
    } catch (error) {
        console.error("OTP verification error:", error);

        return {
            success: false,
            message: "Unable to verify OTP.",
        };
    }
}

// ------------------------------------------------------------
// Reset Password
// ------------------------------------------------------------

export function resetPassword({
    email,
    newPassword,
}) {
    const cleanEmail = email.trim().toLowerCase();

    if (!newPassword) {
        return {
            success: false,
            message: "Please enter a new password.",
        };
    }

    if (newPassword.length < 6) {
        return {
            success: false,
            message: "Password must contain at least 6 characters.",
        };
    }

    const users = getUsers();

    const userIndex = users.findIndex(
        (user) => user.email === cleanEmail
    );

    if (userIndex === -1) {
        return {
            success: false,
            message: "User account not found.",
        };
    }

    users[userIndex].password = newPassword;

    saveUsers(users);

    localStorage.removeItem(OTP_KEY);

    return {
        success: true,
        message: "Password reset successfully.",
    };
}

// ------------------------------------------------------------
// Check if email exists
// ------------------------------------------------------------

export function userExists(email) {
    const cleanEmail = email.trim().toLowerCase();

    const users = getUsers();

    return users.some(
        (user) => user.email === cleanEmail
    );
}