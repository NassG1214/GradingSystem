
function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'professor') {
        fetch('/Website/data/validation_data.json')
            .then(response => response.json())
            .then(data => {
                const professor = data.teachers.find(prof => prof.id == userID);
                if (professor) {
                    const classCode = professor.class_code;
                    document.getElementById('class-code').textContent = classCode;
                    const rosterBody = document.getElementById('roster-body');
                    const students = data.students.filter(stud => stud.class_code === classCode);
                    students.forEach(student => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${student.id}</td>
                            <td>${student.first_name}</td>
                            <td>${student.last_name}</td>
                            <td>${student.email}</td>
                        `;
                        rosterBody.appendChild(row);
                    });
                } else {
                    console.error('Professor not found');
                }
            })
            .catch(error => console.error('Error fetching student roster:', error));
    } else {
        window.location.href = '/Website/Main Page/LoginPage.html'; // Redirect if no valid session
    }
});
