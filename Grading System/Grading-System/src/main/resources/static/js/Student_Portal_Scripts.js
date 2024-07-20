document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'student') {
        fetch('/static/validation_data.json') // Corrected path to validation_data.json
            .then(response => response.json())
            .then(data => {
                const student = data.students.find(stud => stud.id == userID);
                if (student) {
                    const studentName = `${student.first_name} ${student.last_name}`;
                    document.getElementById('student-name').textContent = studentName;
                } else {
                    console.error('Student not found');
                }
            })
            .catch(error => console.error('Error fetching student data:', error));
    } else {
        window.location.href = '../LoginPage.html'; // Corrected path to LoginPage.html
    }
});
