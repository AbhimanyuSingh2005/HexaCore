const button = document.querySelector('.user_dashboard_btn');
console.log(button);
button.addEventListener('click', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    console.log(username);
    fetch('/user_dashboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.token) {
                localStorage.setItem('jwtToken', data.token);
                window.location.href = 'htttp://localhost:3000/user_dashboard';
            } else { console.error('Login failed'); }
        }).catch(error => console.error(error));
})  