function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (formType === 'login') {
        signupForm.classList.remove('active');
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginForm.classList.add('active');
    } else {
        loginForm.classList.remove('active');
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupForm.classList.add('active');
    }
}

document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    try {
        const response = await fetch('http://localhost:5500/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        if(response.ok) {
            alert("Signup successful! You can now log in.");
            toggleForm('login');
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Make sure your Node.js server is running.");
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;
    
    try {
        const response = await fetch('http://localhost:5500/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if(response.ok) {
            alert("Login successful! Welcome back.");
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Make sure your Node.js server is running.");
    }
});