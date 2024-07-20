const storageKey = 'Professor_Assignments_Data';
const validationDataUrl = '/validation_data.json';

function goBack() {
    window.history.back();
}

function makeEditable(cell) {
    cell.contentEditable = true;
    cell.addEventListener('blur', updateMaxGrade);
}

function updateMaxGrade(event) {
    const cell = event.target;
    const row = cell.parentElement;
    const name = row.querySelector('td:nth-child(1)').textContent;
    const newMaxGrade = cell.textContent.replace(' points', '');

    let data = JSON.parse(localStorage.getItem(storageKey)) || { assignments: [], exams: [] };
    let item = data.assignments.find(a => a.name === name) || data.exams.find(e => e.name === name);
    if (item) {
        item.maxGrade = newMaxGrade;
    }
    localStorage.setItem(storageKey, JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'professor') {
        fetch(validationDataUrl)
            .then(response => response.json())
            .then(data => {
                const professor = data.teachers.find(prof => prof.id == userID);
                if (professor) {
                    const classCode = professor.class_code;
                    const assignments = [];
                    const exams = [];

                    data.students.forEach(student => {
                        if (student.class_code === classCode) {
                            student.assignments.forEach(assign => {
                                if (!assignments.find(a => a.name === assign.name)) {
                                    assignments.push({ name: assign.name, maxGrade: assign.maxGrade });
                                }
                            });

                            student.exams.forEach(exam => {
                                if (!exams.find(e => e.name === exam.name)) {
                                    exams.push({ name: e.name, maxGrade: e.maxGrade });
                                }
                            });
                        }
                    });

                    const assignmentsData = { assignments, exams };
                    localStorage.setItem(storageKey, JSON.stringify(assignmentsData));
                    populateTables(assignmentsData);
                } else {
                    console.error('Professor not found');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        window.location.href = '/LoginPage.html'; // Redirect if no valid session
    }
});

function populateTables(data) {
    // Populate assignments table
    const assignments = data.assignments;
    const assignmentBody = document.getElementById('assignment-body');
    assignments.forEach((assignment) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="true">${assignment.name}</td>
            <td contenteditable="true">${assignment.maxGrade} points</td>
        `;
        const maxGradeCell = row.querySelector('td:nth-child(2)');
        makeEditable(maxGradeCell);
        assignmentBody.appendChild(row);
    });

    // Populate exams table
    const exams = data.exams;
    const examBody = document.getElementById('exam-body');
    exams.forEach((exam) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="true">${exam.name}</td>
            <td contenteditable="true">${exam.maxGrade} points</td>
        `;
        const maxGradeCell = row.querySelector('td:nth-child(2)');
        makeEditable(maxGradeCell);
        examBody.appendChild(row);
    });
}

function addAssignment() {
    const assignmentTable = document.querySelector('.assignment-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td contenteditable="true">New Assignment</td>
        <td contenteditable="true">points</td>
    `;
    assignmentTable.appendChild(newRow);
    makeEditable(newRow.querySelector('td:nth-child(2)'));

    let data = JSON.parse(localStorage.getItem(storageKey));
    data.assignments.push({ name: 'New Assignment', maxGrade: '0' });
    localStorage.setItem(storageKey, JSON.stringify(data));
}

function removeAssignment() {
    const assignmentTable = document.querySelector('.assignment-table tbody');
    if (assignmentTable.rows.length > 0) {
        const removedRow = assignmentTable.rows[assignmentTable.rows.length - 1];
        const name = removedRow.querySelector('td:nth-child(1)').textContent;
        assignmentTable.deleteRow(-1);

        let data = JSON.parse(localStorage.getItem(storageKey));
        data.assignments = data.assignments.filter(a => a.name !== name);
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
}

function addExam() {
    const examTable = document.querySelector('.exam-table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td contenteditable="true">New Exam</td>
        <td contenteditable="true">points</td>
    `;
    examTable.appendChild(newRow);
    makeEditable(newRow.querySelector('td:nth-child(2)'));

    let data = JSON.parse(localStorage.getItem(storageKey));
    data.exams.push({ name: 'New Exam', maxGrade: '0' });
    localStorage.setItem(storageKey, JSON.stringify(data));
}

function removeExam() {
    const examTable = document.querySelector('.exam-table tbody');
    if (examTable.rows.length > 0) {
        const removedRow = examTable.rows[examTable.rows.length - 1];
        const name = removedRow.querySelector('td:nth-child(1)').textContent;
        examTable.deleteRow(-1);

        let data = JSON.parse(localStorage.getItem(storageKey));
        data.exams = data.exams.filter(e => e.name !== name);
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
}

function finalizeChanges() {
    let data = JSON.parse(localStorage.getItem(storageKey));

    fetch('/Professor_Assignments.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(message => {
            console.log(message);
            alert("Changes finalized and saved to JSON file.");
        })
        .catch(error => console.error('Error saving changes:', error));
}