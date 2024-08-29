document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'student') {
        fetch('/data/validation_data.json')
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
        window.location.href = '/Main Page/LoginPage.html'; // Redirect if no valid session
    }
});