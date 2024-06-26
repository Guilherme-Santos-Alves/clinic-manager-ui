function login() {
    let endpoint = 'https://localhost:7231/api/auth';
    let requestBody = {
        login: document.querySelector('#cpf-input').value,
        password: document.querySelector('#password-input').value
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta da API:', data);
        localStorage.setItem("token", data.token)
        showToast(successMsg);
        localStorage.setItem("document", requestBody.login);
        localStorage.setItem("roleName", data.role);
        if (data.role === "Receptionist"){
            window.location.href = "admin.html";
        } else if (data.role === "Patient"){
            window.location.href = "patient.html";
        } else if (data.role === "Doctor"){
            window.location.href = "doctor.html";
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        showToast(errorMsg);
    });
}