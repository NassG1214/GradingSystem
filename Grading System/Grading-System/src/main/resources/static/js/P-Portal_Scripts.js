document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem('userID');
    const userRole = localStorage.getItem('userRole');

    if (userID && userRole === 'professor') {
        fetch('/validation_data.json') // Adjusted the path to match your setup
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
        window.location.href = '/LoginPage.html'; // Updated the redirect path
    }
});