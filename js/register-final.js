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



// Defina a função jsonToFormData
function jsonToFormData(json) {
    const formData = new FormData();
    // Implementação da função...
}

document.addEventListener("DOMContentLoaded", function() {
    const patientRegisterFinal = document.getElementById('form-register-final');

    patientRegisterFinal.addEventListener('submit', evento => {
        evento.preventDefault();

        
        let height = parseFloat(localStorage.getItem("height"));
        let weight = parseFloat(localStorage.getItem("weight"));
        let userDocument = parseInt(localStorage.getItem("cpf"));
        let number = parseInt(document.getElementById("rg-numberHouse").value);
        let bloodType = parseInt(localStorage.getItem("bloodType"));


        const jsonData = {
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            birthDay: localStorage.getItem("birthDay"),
            phone: localStorage.getItem("phone"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password"),
            cpf: localStorage.getItem("cpf"),
            bloodType: bloodType,
            height: height,
            weight: weight,
            address: {
                userDocument: userDocument,
                cep: document.getElementById("rg-cep").value,
                state: document.getElementById("rg-state").value,
                city: document.getElementById("rg-city").value,
                neighborhood: document.getElementById("rg-neighborhood").value,
                number: number
            }
        };

        console.log(JSON.stringify(jsonData));

        // Enviar para a API
        fetch("https://localhost:7252/api/patients", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "no-cors",
            body: JSON.stringify(jsonData)
        }) 
        .then(response => response.json())
        .then(response => {
            console.log(response);
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    });
});

