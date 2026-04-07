// Authentication System
const AUTH_STORAGE_KEY = 'officehub_auth';

// Demo user database
const demoUsers = {
    'boss@office.com': {
        password: 'boss123',
        role: 'boss',
        name: 'Boss / CEO',
        dashboard: 'boss-dashboard.html'
    },
    'manager@office.com': {
        password: 'manager123',
        role: 'manager',
        name: 'Manager',
        dashboard: 'manager-dashboard.html'
    },
    'employee@office.com': {
        password: 'emp123',
        role: 'employee',
        name: 'Employee',
        dashboard: 'employee-dashboard.html'
    }
};

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Check if user is already logged in
    checkAuthAndRedirect();
});

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('active');
        el.textContent = '';
    });

    // Validation
    if (!email || !password || !role) {
        showError('email', 'Please fill in all fields');
        return;
    }

    // Check credentials
    const user = demoUsers[email];
    
    if (!user) {
        showError('email', 'Email not found');
        return;
    }

    if (user.password !== password) {
        showError('password', 'Incorrect password');
        return;
    }

    if (user.role !== role) {
        showError('role', 'Role does not match this account');
        return;
    }

    // Login successful
    const authData = {
        email: email,
        role: role,
        name: user.name,
        loginTime: new Date().getTime()
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

    // Add animation before redirect
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.textContent = '✓ Login Successful!';
    loginBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
    loginBtn.disabled = true;

    // Redirect after animation
    setTimeout(() => {
        window.location.href = user.dashboard;
    }, 1000);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form-error')) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
        field.style.borderColor = '#ef4444';
    }
}

function checkAuthAndRedirect() {
    const currentPage = window.location.pathname;
    const isLoginPage = currentPage.includes('index.html') || currentPage.endsWith('/');
    const authData = getAuthData();

    if (authData) {
        if (isLoginPage) {
            // Already logged in, redirect to dashboard
            const user = demoUsers[authData.email];
            if (user) {
                window.location.href = user.dashboard;
            }
        }
    } else {
        if (!isLoginPage) {
            // Not logged in, redirect to login
            window.location.href = 'index.html';
        }
    }
}

function getAuthData() {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.location.href = 'index.html';
}

function getCurrentUser() {
    return getAuthData();
}

// Setup logout buttons
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtns = document.querySelectorAll('#logoutBtn, #quickLogout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', logout);
    });

    // Setup user profile dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.toggle('active');
                e.stopPropagation();
            }
        });
    }

    // Close dropdown on click outside
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dd => dd.classList.remove('active'));
    });
});

// Prevent accessing dashboards without login
window.addEventListener('load', checkAuthAndRedirect);
