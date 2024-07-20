function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'student') {
        fetch('/static/validation_data.json') // Updated path to validation_data.json
            .then(response => response.json())
            .then(data => {
                const student = data.students.find(stud => stud.id == userID);
                if (student) {
                    document.getElementById('student-name').textContent = `${student.first_name} ${student.last_name}`;
                    document.getElementById('student-id').textContent = student.id;
                    document.getElementById('first-name').textContent = student.first_name;
                    document.getElementById('last-name').textContent = student.last_name;
                    document.getElementById('email').textContent = student.email;
                } else {
                    console.error('Student not found');
                }
            })
            .catch(error => console.error('Error fetching student data:', error));
    } else {
        window.location.href = '../LoginPage.html'; // Updated path to LoginPage.html
    }
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('student-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});