const token = localStorage.getItem("token");

function inativeDoctor(id){
    fetch(`https://localhost:7231/api/doctors/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    })
    .then(response => {
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
}

function inativePatient(id){
    fetch(`https://localhost:7231/api/patients/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    })
    .then(response => {
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
}