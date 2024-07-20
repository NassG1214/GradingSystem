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

    studentLoginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('s-email').value;
        const password = document.getElementById('s-password').value;

        validateLogin(email, password, 'students')
            .then(user => {
                if (user) {
                    localStorage.setItem('userID', user.id);
                    localStorage.setItem('userRole', 'student');
                    window.location.href = '/Student/html/StudentPortal.html';
                } else {
                    showError('sLogin');
                }
            });
    });

    professorLoginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('t-email').value;
        const password = document.getElementById('t-password').value;

        validateLogin(email, password, 'teachers')
            .then(user => {
                if (user) {
                    localStorage.setItem('userID', user.id);
                    localStorage.setItem('userRole', 'professor');
                    window.location.href = '/Professor/html/Professor_Portal.html';
                } else {
                    showError('pLogin');
                }
            });
    });
});
