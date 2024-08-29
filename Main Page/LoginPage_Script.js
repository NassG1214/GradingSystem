document.addEventListener('DOMContentLoaded', () => {
    const studentLoginForm = document.getElementById('student-login-form');
    const professorLoginForm = document.getElementById('professor-login-form');

    function validateLogin(email, password, userType) {
        return fetch('/data/validation_data.json')
            .then(response => response.json())
            .then(data => {
                const users = data[userType];
                const user = users.find(u => u.email === email && u.password === password);
                return user;
            })
            .catch(error => console.error('Error fetching validation data:', error));
    }

    function showError(sectionId) {
        const section = document.getElementById(sectionId);
        section.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        setTimeout(() => {
            section.style.backgroundColor = 'transparent';
        }, 500);
    }

    function handleLogin(event, userType, sectionId, redirectUrl) {
        event.preventDefault();
        const email = document.getElementById(`${userType === 'students' ? 's' : 't'}-email`).value;
        const password = document.getElementById(`${userType === 'students' ? 's' : 't'}-password`).value;

        validateLogin(email, password, userType)
            .then(user => {
                if (user) {
                    localStorage.setItem('userID', user.id);
                    localStorage.setItem('userRole', userType === 'students' ? 'student' : 'professor');
                    window.location.href = user.redirectUrl;
                } else {
                    showError(sectionId);
                }
            });
    }

    studentLoginForm.addEventListener('submit', event => {
        handleLogin(event, 'students', 'sLogin', '/Student/html/StudentPortal.html');
    });

    professorLoginForm.addEventListener('submit', event => {
        handleLogin(event, 'teachers', 'pLogin', '/Professor/html/Professor_Portal.html');
    });
});
