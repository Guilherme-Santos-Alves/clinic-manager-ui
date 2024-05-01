window.onload = function() {
    const token = localStorage.getItem("token");

    if (token === null || token === undefined){
      window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let cepInput = document.querySelector("#rg-cep");

    cepInput.addEventListener('blur', function(e) {
        let cep = e.target.value;

        // Verifica se o CEP possui 8 dígitos numéricos
        if (cep.length === 8 && /^\d+$/.test(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    // Preenche os campos de estado, cidade, bairro e logradouro com os dados obtidos
                    document.querySelector("#rg-state").value = data.uf;
                    document.querySelector("#rg-city").value = data.localidade;
                    document.querySelector("#rg-neighborhood").value = data.bairro;
                })
                .catch(error => console.error('Erro ao obter os dados do CEP:', error));
        } else {
            alert("Por favor, insira um CEP válido com 8 dígitos numéricos.");
        }
    });
});

function registerDoctor() {
    let number = parseInt(document.getElementById("rg-numberHouse").value);
    let bloodType = parseInt(localStorage.getItem("bloodType"));
    let specialty = parseInt(localStorage.getItem("specialty"));

    let endpoint = 'https://localhost:7231/api/doctors';
    const token = localStorage.getItem("token");
    let requestBody = {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        birthDay: localStorage.getItem("birthDay"),
        phone: localStorage.getItem("phone"),
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        cpf: localStorage.getItem("cpf"),
        role: 1,
        solutions: localStorage.getItem("solutions"),
        crm: localStorage.getItem("crm"),
        specialty: specialty,
        bloodType: bloodType,
        addressDTO: {
            number: number,
            city: document.getElementById("rg-city").value,
            state: document.getElementById("rg-state").value,
            cep: document.getElementById("rg-cep").value,
            neighborhood: document.getElementById("rg-neighborhood").value
        }
    };
    console.log(JSON.stringify(requestBody));

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
        showToast(successMsg);
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error.errors('Erro capturado:', error);
        showToast(errorMsg);
    });
}