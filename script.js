// Function to toggle between login and signup forms
let isLogin = false;

function toggleForm() {
    isLogin = !isLogin;
    document.getElementById('form-title').textContent = isLogin ? 'Login' : 'Signup';
    document.getElementById('toggle-link').textContent = isLogin 
        ? "Don't have an account? Signup here" 
        : "Already have an account? Login here";
    document.getElementById('message').textContent = '';
}

// Function to handle login or signup
function handleAuth() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (isLogin) {
        // Login
        if (storedUser && storedUser.password === password) {
            document.getElementById('message').textContent = 'Login successful!';
            document.getElementById('message').style.color = 'green';
        } else {
            document.getElementById('message').textContent = 'Invalid username or password';
            document.getElementById('message').style.color = 'red';
        }
    } else {
        // Signup
        if (storedUser) {
            document.getElementById('message').textContent = 'Username already exists';
            document.getElementById('message').style.color = 'red';
        } else {
            localStorage.setItem(username, JSON.stringify({ password }));
            document.getElementById('message').textContent = 'Signup successful!';
            document.getElementById('message').style.color = 'green';
        }
    }
}
