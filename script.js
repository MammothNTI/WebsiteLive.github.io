// KVdb configuration
const kvdbStorage = KVdb.bucket('XFgePpjYajjjKfuFWSMmAi').localStorage();

// State for toggling between Login and Signup forms
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
async function handleAuth() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const storedUser = await kvdbStorage.getItem(username);

    if (isLogin) {
        // Handle login
        if (storedUser && storedUser.password === password) {
            document.getElementById('message').textContent = 'Login successful!';
            document.getElementById('message').style.color = 'green';
        } else {
            document.getElementById('message').textContent = 'Invalid username or password';
            document.getElementById('message').style.color = 'red';
        }
    } else {
        // Handle signup
        if (storedUser) {
            document.getElementById('message').textContent = 'Username already exists';
            document.getElementById('message').style.color = 'red';
        } else {
            // Store new user in KVdb
            await kvdbStorage.setItem(username, { password });
            document.getElementById('message').textContent = 'Signup successful!';
            document.getElementById('message').style.color = 'green';
        }
    }
}
