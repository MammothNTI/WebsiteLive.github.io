// Create KVdb instance with your bucket ID
const kvdbStorage = KVdb.bucket('XFgePpjYajjjKfuFWSMmAi').localStorage();

let isLogin = false;

// Function to toggle between login and signup forms
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

    if (isLogin) {
        // Login
        kvdbStorage.getItem(username)
            .then(storedUser => {
                if (storedUser && storedUser.password === password) {
                    document.getElementById('message').textContent = 'Login successful!';
                    document.getElementById('message').style.color = 'green';
                } else {
                    document.getElementById('message').textContent = 'Invalid username or password';
                    document.getElementById('message').style.color = 'red';
                }
            })
            .catch(err => {
                document.getElementById('message').textContent = 'Error during login';
                document.getElementById('message').style.color = 'red';
            });
    } else {
        // Signup
        kvdbStorage.getItem(username)
            .then(storedUser => {
                if (storedUser) {
                    document.getElementById('message').textContent = 'Username already exists';
                    document.getElementById('message').style.color = 'red';
                } else {
                    kvdbStorage.setItem(username, { password })
                        .then(() => {
                            document.getElementById('message').textContent = 'Signup successful!';
                            document.getElementById('message').style.color = 'green';
                        })
                        .catch(err => {
                            document.getElementById('message').textContent = 'Error during signup';
                            document.getElementById('message').style.color = 'red';
                        });
                }
            })
            .catch(err => {
                document.getElementById('message').textContent = 'Error checking username';
                document.getElementById('message').style.color = 'red';
            });
    }
}
