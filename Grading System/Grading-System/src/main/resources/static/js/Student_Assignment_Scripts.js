function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'student') {
        fetch('/validation_data.json') // Corrected the path to match your setup
            .then(response => response.json())
            .then(data => {
                const student = data.students.find(stud => stud.id == userID);
                if (student) {
                    const assignments = student.assignments;
                    const exams = student.exams;

                    // Populate assignments table
                    const assignmentBody = document.getElementById('assignment-body');
                    assignments.forEach((assignment) => {
                        if (assignment.grade === 'NULL') assignment.grade = 0;
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${assignment.name}</td>
                            <td>${assignment.grade}</td>
                            <td>${assignment.maxGrade}</td>
                        `;
                        assignmentBody.appendChild(row);
                    });
                    document.getElementById('assignments-number').textContent = assignments.length;
                    document.getElementById('assignments-total').textContent = assignments.reduce((total, a) => total + parseInt(a.grade), 0) + '/' + assignments.reduce((total, a) => total + parseInt(a.maxGrade), 0);

                    // Populate exams table
                    const examBody = document.getElementById('exam-body');
                    exams.forEach((exam) => {
                        if (exam.grade === 'NULL') exam.grade = 0;
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${exam.name}</td>
                            <td>${exam.grade}</td>
                            <td>${exam.maxGrade}</td>
                        `;
                        examBody.appendChild(row);
                    });
                    document.getElementById('exams-number').textContent = exams.length;
                    document.getElementById('exams-total').textContent = exams.reduce((total, e) => total + parseInt(e.grade), 0) + '/' + exams.reduce((total, e) => total + parseInt(e.maxGrade), 0);
                } else {
                    console.error('Student not found');
                }
            })
            .catch(error => console.error('Error fetching assignment data:', error));
    } else {
        window.location.href = '/LoginPage.html'; // Updated redirect path
    }
});