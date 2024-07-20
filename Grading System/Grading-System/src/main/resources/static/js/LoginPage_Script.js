// Function to validate login credentials
function validateLogin(email, password, userType) {
    return fetch('/validation_data.json')  // Ensure this URL is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            // Extract users based on the userType
            const users = data[userType];
            if (!users) {
                throw new Error('Invalid userType.');
            }
            // Find the user matching the email and password
            const user = users.find(u => u.email === email && u.password === password);
            return user;
        })
        .catch(error => {
            console.error('Error fetching validation data:', error);
            return null; // Return null if there's an error
        });
}

// Event listener for student login form
document.getElementById('studentLoginForm').addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('s-email').value;
    const password = document.getElementById('s-password').value;

    validateLogin(email, password, 'students')
        .then(user => {
            if (user) {
                localStorage.setItem('userID', user.id);
                localStorage.setItem('userRole', 'student');
                window.location.href = '/StudentPortal.html'; // Updated path for student
            } else {
                showError('sLogin');
            }
        });
});

// Event listener for professor login form
document.getElementById('professorLoginForm').addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('t-email').value;
    const password = document.getElementById('t-password').value;

    validateLogin(email, password, 'teachers')
        .then(user => {
            if (user) {
                localStorage.setItem('userID', user.id);
                localStorage.setItem('userRole', 'professor');
                window.location.href = '/Professor_Portal.html'; // Updated path for professor
            } else {
                showError('pLogin');
            }
        });
});