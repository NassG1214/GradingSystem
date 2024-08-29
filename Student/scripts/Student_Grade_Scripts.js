function goBack() {
    window.history.back();
}

let originalGrades = [];

function calculateGrades(assignments, exams) {
    const totalAssignments = assignments.reduce((total, a) => total + a.maxGrade, 0);
    const totalAssignmentGrades = assignments.reduce((total, a) => total + (a.grade / 100 * a.maxGrade), 0);
    const assignmentPercentage = totalAssignmentGrades / totalAssignments * 100;

    const totalExams = exams.reduce((total, e) => total + e.maxGrade, 0);
    const totalExamGrades = exams.reduce((total, e) => total + (e.grade / 100 * e.maxGrade), 0);
    const examPercentage = totalExamGrades / totalExams * 100;

    const overallPercentage = (assignmentPercentage * 0.2) + (examPercentage * 0.8);

    let gradeLetter = 'F';
    if (overallPercentage >= 95) {
        gradeLetter = 'A';
    } else if (overallPercentage >= 90) {
        gradeLetter = 'A-';
    } else if (overallPercentage >= 87) {
        gradeLetter = 'B+';
    } else if (overallPercentage > 83) {
        gradeLetter = 'B';
    } else if (overallPercentage >= 80) {
        gradeLetter = 'B-';
    } else if (overallPercentage >= 77) {
        gradeLetter = 'C+';
    } else if (overallPercentage >= 70) {
        gradeLetter = 'C';
    } else if (overallPercentage >= 60) {
        gradeLetter = 'D';
    }

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
        const grade = cells[1].textContent.trim() === 'NULL' ? null : parseFloat(cells[1].textContent);
        const maxGrade = parseFloat(cells[2].textContent);
        return {
            name: cells[0].textContent.trim(),
            grade: isNaN(grade) ? null : grade,
            maxGrade: isNaN(maxGrade) ? 0 : maxGrade
        };
    });

    const exams = Array.from(examRows).map(row => {
        const cells = row.querySelectorAll('td');
        const grade = cells[1].textContent.trim() === 'NULL' ? null : parseFloat(cells[1].textContent);
        const maxGrade = parseFloat(cells[2].textContent);
        return {
            name: cells[0].textContent.trim(),
            grade: isNaN(grade) ? null : grade,
            maxGrade: isNaN(maxGrade) ? 0 : maxGrade
        };
    });

    console.log('Assignments:', assignments);
    console.log('Exams:', exams);
    const filteredAssignments = assignments.filter(a => a.grade !== null);
    const filteredExams = exams.filter(e => e.grade !== null);
    console.log('Filtered Assignments:', filteredAssignments);
    console.log('Filtered Exams:', filteredExams);
    const gradeData = calculateGrades(filteredAssignments, filteredExams);
    console.log('Grade Data:', gradeData);
    document.getElementById('grade-percentage').textContent = gradeData.overallPercentage + '%';
    document.getElementById('grade-letter').textContent = gradeData.gradeLetter;
    document.getElementById('completed-assignments').textContent = `${filteredAssignments.length}/${assignments.length}`;
    document.getElementById('completed-exams').textContent = `${filteredExams.length}/${exams.length}`;
}

function calculateRequiredGrades(assignments, exams, anticipatedPercentage) {
    const totalAssignments = assignments.reduce((total, a) => total + (parseFloat(a.maxGrade) || 0), 0);
    const totalExams = exams.reduce((total, e) => total + (parseFloat(e.maxGrade) || 0), 0);
    console.log(`Total Assignments Max Grade: ${totalAssignments}`);
    console.log(`Total Exams Max Grade: ${totalExams}`);

    const currentAssignmentGrades = assignments.reduce((total, a) => {
        const grade = parseFloat(a.grade);
        return total + ((isNaN(grade) || grade === null ? 0 : grade / 100) * a.maxGrade);
    }, 0);
    const currentExamGrades = exams.reduce((total, e) => {
        const grade = parseFloat(e.grade);
        return total + ((isNaN(grade) || grade === null ? 0 : grade / 100) * e.maxGrade);
    }, 0);
    console.log(`Current Assignment Grades: ${currentAssignmentGrades}`);
    console.log(`Current Exam Grades: ${currentExamGrades}`);

    const totalWeightedPointsNeeded = (anticipatedPercentage / 100) * ((totalAssignments * 0.2) + (totalExams * 0.8));
    const currentWeightedPoints = (currentAssignmentGrades * 0.2) + (currentExamGrades * 0.8);
    const additionalPointsNeeded = Math.round((totalWeightedPointsNeeded - currentWeightedPoints) * 100) / 100;
    console.log(`Total Weighted Points Needed: ${totalWeightedPointsNeeded}`);
    console.log(`Current Weighted Points: ${currentWeightedPoints}`);
    console.log(`Additional Points Needed: ${additionalPointsNeeded}`);

    const nullAssignments = assignments.filter(a => isNaN(parseFloat(a.grade)) || a.grade === null);
    const nullExams = exams.filter(e => isNaN(parseFloat(e.grade)) || e.grade === null);
    console.log(`Null Assignments: ${nullAssignments.length}`);
    console.log(`Null Exams: ${nullExams.length}`);

    const missingAssignmentPoints = nullAssignments.reduce((total, a) => total + parseFloat(a.maxGrade), 0);
    const missingExamPoints = nullExams.reduce((total, e) => total + parseFloat(e.maxGrade), 0);
    console.log(`Missing Assignment Points: ${missingAssignmentPoints}`);
    console.log(`Missing Exam Points: ${missingExamPoints}`);

    let neededAssignmentGrade = 0;
    let neededExamGrade = 0;
    if (missingAssignmentPoints > 0) {
        neededAssignmentGrade = missingAssignmentPoints > 0
            ? (additionalPointsNeeded / 0.2)
            : 0;
    }
    if (missingExamPoints > 0) {
        neededExamGrade = missingExamPoints > 0
            ? (additionalPointsNeeded / 0.8)
            : 0;
    }
    console.log(`Needed Assignment Grade (Percentage): ${neededAssignmentGrade}`);
    console.log(`Needed Exam Grade (Percentage): ${neededExamGrade}`);

    if (neededAssignmentGrade > 100 || neededAssignmentGrade < 0) {
        neededAssignmentGrade = 'Not Possible!';
    }
    if (neededExamGrade > 100 || neededExamGrade < 0) {
        neededExamGrade = 'Not Possible!';
    }

    return {
        neededAssignmentGrade, neededExamGrade
    };
}

function updateAnticipatedGrades(assignments, exams, type) {
    const anticipatedGradeElement = document.getElementById('anticipated-grade');
    const anticipatedGradeLetter = anticipatedGradeElement.value.trim().toUpperCase();

    let anticipatedPercentage;
    switch (anticipatedGradeLetter) {
        case 'A': anticipatedPercentage = 95; break;
        case 'A-': anticipatedPercentage = 90; break;
        case 'B+': anticipatedPercentage = 87; break;
        case 'B': anticipatedPercentage = 84; break;
        case 'B-': anticipatedPercentage = 80; break;
        case 'C+': anticipatedPercentage = 77; break;
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
        fetch('/data/validation_data.json')
            .then(response => response.json())
            .then(data => {
                const student = data.students.find(stud => stud.id == userID);
                if (student) {
                    const assignments = student.assignments;
                    const exams = student.exams;

                    const assignmentBody = document.getElementById('assignment-body');
                    assignments.forEach((assignment, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${assignment.name}</td>
                            <td>${assignment.grade === 'NULL' ? 'NULL' : assignment.grade + '%'}</td>
                            <td>${assignment.maxGrade}</td>
                        `;
                        const gradeCell = row.querySelector('td:nth-child(2)');
                        makeEditable(gradeCell);
                        assignmentBody.appendChild(row);
                    });

                    const examBody = document.getElementById('exam-body');
                    exams.forEach((exam, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${exam.name}</td>
                            <td>${exam.grade === 'NULL' ? 'NULL' : exam.grade + '%'}</td>
                            <td>${exam.maxGrade}</td>
                        `;
                        const gradeCell = row.querySelector('td:nth-child(2)');
                        makeEditable(gradeCell);
                        examBody.appendChild(row);
                    });

                    originalGrades = JSON.parse(JSON.stringify(assignments.concat(exams)));

                    updateGrades();

                    document.getElementById('calculate-assignments').addEventListener('click', () => updateAnticipatedGrades(assignments, exams, 'assignments'));
                    document.getElementById('calculate-exams').addEventListener('click', () => updateAnticipatedGrades(assignments, exams, 'exams'));
                    document.getElementById('reset-button').addEventListener('click', () => resetGrades(assignments, exams));
                } else {
                    console.error('Student not found');
                }
            })
            .catch(error => console.error('Error fetching assignment data:', error));
    } else {
        window.location.href = '/Main Page/LoginPage.html';
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