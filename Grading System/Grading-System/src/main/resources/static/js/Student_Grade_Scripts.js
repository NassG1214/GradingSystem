function goBack() {
    window.history.back();
}

let originalGrades = [];

function calculateGrades(assignments, exams) {
    const totalAssignments = assignments.reduce((total, a) => total + (a.maxGrade || 0), 0);
    const totalAssignmentGrades = assignments.reduce((total, a) => total + ((a.grade || 0) / 100 * (a.maxGrade || 0)), 0);
    const assignmentPercentage = totalAssignments > 0 ? (totalAssignmentGrades / totalAssignments * 100) : 0;

    const totalExams = exams.reduce((total, e) => total + (e.maxGrade || 0), 0);
    const totalExamGrades = exams.reduce((total, e) => total + ((e.grade || 0) / 100 * (e.maxGrade || 0)), 0);
    const examPercentage = totalExams > 0 ? (totalExamGrades / totalExams * 100) : 0;

    const overallPercentage = (assignmentPercentage * 0.2) + (examPercentage * 0.8);

    let gradeLetter = 'F';
    if (overallPercentage >= 90) gradeLetter = 'A';
    else if (overallPercentage >= 80) gradeLetter = 'B';
    else if (overallPercentage >= 70) gradeLetter = 'C';
    else if (overallPercentage >= 60) gradeLetter = 'D';

    return {
        overallPercentage: overallPercentage.toFixed(2),
        gradeLetter: gradeLetter
    };
}

function updateGrades() {
    const assignmentRows = document.querySelectorAll('#assignment-body tr');
    const examRows = document.querySelectorAll('#exam-body tr');

    const assignments = Array.from(assignmentRows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            name: cells[0].textContent,
            grade: cells[1].textContent === 'NULL' ? null : parseFloat(cells[1].textContent.replace('%', '')),
            maxGrade: parseFloat(cells[2].textContent)
        };
    });

    const exams = Array.from(examRows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            name: cells[0].textContent,
            grade: cells[1].textContent === 'NULL' ? null : parseFloat(cells[1].textContent.replace('%', '')),
            maxGrade: parseFloat(cells[2].textContent)
        };
    });

    const gradeData = calculateGrades(assignments.filter(a => a.grade !== null), exams.filter(e => e.grade !== null));
    document.getElementById('grade-percentage').textContent = gradeData.overallPercentage + '%';
    document.getElementById('grade-letter').textContent = gradeData.gradeLetter;

    document.getElementById('completed-assignments').textContent = `${assignments.filter(a => a.grade !== null).length}/${assignments.length}`;
    document.getElementById('completed-exams').textContent = `${exams.filter(e => e.grade !== null).length}/${exams.length}`;
}

function calculateRequiredGrades(assignments, exams, anticipatedPercentage) {
    const totalAssignments = assignments.reduce((total, a) => total + (a.maxGrade || 0), 0);
    const totalExams = exams.reduce((total, e) => total + (e.maxGrade || 0), 0);

    const currentAssignmentGrades = assignments.reduce((total, a) => total + ((a.grade || 0) / 100 * (a.maxGrade || 0)), 0);
    const currentExamGrades = exams.reduce((total, e) => total + ((e.grade || 0) / 100 * (e.maxGrade || 0)), 0);

    const totalGradesNeeded = (anticipatedPercentage / 100) * (totalAssignments * 0.2 + totalExams * 0.8);
    const neededGrades = totalGradesNeeded - (currentAssignmentGrades * 0.2 + currentExamGrades * 0.8);

    const nullAssignments = assignments.filter(a => a.grade === null);
    const nullExams = exams.filter(e => e.grade === null);

    let neededAssignmentGrade = 0;
    if (nullAssignments.length > 0) {
        neededAssignmentGrade = (neededGrades * 5) / nullAssignments.length; // Adjusted the calculation
    }

    let neededExamGrade = 0;
    if (nullExams.length > 0) {
        neededExamGrade = (neededGrades * 1.25) / nullExams.length; // Adjusted the calculation
    }

    return {
        neededAssignmentGrade: convertPercentageToLetterGrade(neededAssignmentGrade),
        neededExamGrade: convertPercentageToLetterGrade(neededExamGrade)
    };
}

function convertPercentageToLetterGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

function updateAnticipatedGrades(assignments, exams, type) {
    const anticipatedGradeElement = document.getElementById('anticipated-grade');
    const anticipatedGradeLetter = anticipatedGradeElement.value.trim().toUpperCase();

    let anticipatedPercentage;
    switch (anticipatedGradeLetter) {
        case 'A': anticipatedPercentage = 90; break;
        case 'B': anticipatedPercentage = 80; break;
        case 'C': anticipatedPercentage = 70; break;
        case 'D': anticipatedPercentage = 60; break;
        default: anticipatedPercentage = 0; break;
    }

    const requiredGrades = calculateRequiredGrades(assignments, exams, anticipatedPercentage);

    if (type === 'assignments' || type === 'both') {
        const nullAssignments = assignments.filter(a => a.grade === null);
        if (nullAssignments.length > 0) {
            const neededAssignmentGrade = requiredGrades.neededAssignmentGrade;
            nullAssignments.forEach(a => {
                a.grade = neededAssignmentGrade;
            });
        }
        document.getElementById('required-assignments').textContent = requiredGrades.neededAssignmentGrade;
    }

    if (type === 'exams' || type === 'both') {
        const nullExams = exams.filter(e => e.grade === null);
        if (nullExams.length > 0) {
            const neededExamGrade = requiredGrades.neededExamGrade;
            nullExams.forEach(e => {
                e.grade = neededExamGrade;
            });
        }
        document.getElementById('required-exams').textContent = requiredGrades.neededExamGrade;
    }

    assignments.forEach((assignment, index) => {
        const row = document.querySelector(`#assignment-body tr:nth-child(${index + 1})`);
        const gradeCell = row.querySelector('td:nth-child(2)');
        gradeCell.textContent = assignment.grade !== null ? assignment.grade.toFixed(2) + '%' : 'NULL';
    });

    exams.forEach((exam, index) => {
        const row = document.querySelector(`#exam-body tr:nth-child(${index + 1})`);
        const gradeCell = row.querySelector('td:nth-child(2)');
        gradeCell.textContent = exam.grade !== null ? exam.grade.toFixed(2) + '%' : 'NULL';
    });

    updateGrades();
}

function makeEditable(cell) {
    cell.contentEditable = true;
    cell.addEventListener('blur', updateGrades);
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
                    const assignments = student.assignments;
                    const exams = student.exams;

                    // Populate assignments table
                    const assignmentBody = document.getElementById('assignment-body');
                    assignments.forEach((assignment, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${assignment.name}</td>
                            <td>${assignment.grade === null ? 'NULL' : assignment.grade + '%'}</td>
                            <td>${assignment.maxGrade}</td>
                        `;
                        const gradeCell = row.querySelector('td:nth-child(2)');
                        makeEditable(gradeCell);
                        assignmentBody.appendChild(row);
                    });

                    // Populate exams table
                    const examBody = document.getElementById('exam-body');
                    exams.forEach((exam, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${exam.name}</td>
                            <td>${exam.grade === null ? 'NULL' : exam.grade + '%'}</td>
                            <td>${exam.maxGrade}</td>
                        `;
                        const gradeCell = row.querySelector('td:nth-child(2)');
                        makeEditable(gradeCell);
                        examBody.appendChild(row);
                    });

                    // Save original grades for reset
                    originalGrades = JSON.parse(JSON.stringify(assignments.concat(exams)));

                    // Initial grade calculation
                    updateGrades();

                    // Handle anticipated grade input
                    document.getElementById('calculate-assignments').addEventListener('click', () => updateAnticipatedGrades(assignments, exams, 'assignments'));
                    document.getElementById('calculate-exams').addEventListener('click', () => updateAnticipatedGrades(assignments, exams, 'exams'));
                    document.getElementById('reset-button').addEventListener('click', () => resetGrades(assignments, exams));
                } else {
                    console.error('Student not found');
                }
            })
            .catch(error => console.error('Error fetching assignment data:', error));
    } else {
        window.location.href = '../LoginPage.html'; // Redirect if no valid session
    }
});

function resetGrades(assignments, exams) {
    originalGrades.forEach((item, index) => {
        if (index < assignments.length) {
            assignments[index].grade = item.grade;
        } else {
            exams[index - assignments.length].grade = item.grade;
        }
    });

    assignments.forEach((assignment, index) => {
        const row = document.querySelector(`#assignment-body tr:nth-child(${index + 1})`);
        const gradeCell = row.querySelector('td:nth-child(2)');
        gradeCell.textContent = assignment.grade !== null ? assignment.grade + '%' : 'NULL';
    });

    exams.forEach((exam, index) => {
        const row = document.querySelector(`#exam-body tr:nth-child(${index + 1})`);
        const gradeCell = row.querySelector('td:nth-child(2)');
        gradeCell.textContent = exam.grade !== null ? exam.grade + '%' : 'NULL';
    });

    updateGrades();

    document.getElementById('required-assignments').textContent = '';
    document.getElementById('required-exams').textContent = '';
}