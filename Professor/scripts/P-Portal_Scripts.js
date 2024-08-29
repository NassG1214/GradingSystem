
document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'professor') {
        fetch('/data/validation_data.json')
            .then(response => response.json())
            .then(data => {
                const professor = data.teachers.find(prof => prof.id == userID);
                if (professor) {
                    const professorName = `${professor.first_name} ${professor.last_name}`;
                    document.getElementById('professor-name').textContent = professorName;
                } else {
                    console.error('Professor not found');
                }
            })
            .catch(error => console.error('Error fetching professor data:', error));
    } else {
        window.location.href = '/Main Page/LoginPage.html'; // Redirect if no valid session
    }
});
