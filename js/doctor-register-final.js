//FUNÇÃO DOS TOASTS 
// Definindo a função showToast globalmente

let successMsg = '<span class="material-symbols-outlined">check_circle</span>Cadastro realizado com sucesso!';
// let errorMsg = '<span class="material-symbols-outlined">cancel</span>Erro';

function showToast(msg) {
    let toastBox = document.getElementById('toast-box');
    if (!toastBox) {
    console.error("Elemento toast-box não encontrado!");
    return;
    }

    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);

    if (msg.includes('Erro')) {
    toast.classList.add('error');
    }

    setTimeout(() => {
    toast.remove();
    }, 6000); // Remove o toast após 6 segundos 
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
    // JÁ VALIDADO PELO HTML
    // PEGAR OS DADOS DO FORM
    // ENVIAR PARA A API   

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
    })
    .catch(error => {
        console.error('Erro capturado:', error);
    
        let errorMsg = '<span class="material-symbols-outlined">cancel</span>Erro';
    
        // Verifica se há uma resposta HTTP
        if (error && error.body) {
            // Tentamos analisar o corpo da resposta como JSON
            try {
                const responseBody = JSON.parse(error.body);
                // Verificamos se a resposta contém mensagens de erro
                if (responseBody && responseBody.errors) {
                    // Exibimos as mensagens de erro no toast
                    errorMsg = '';
                    for (const key in responseBody.errors) {
                        responseBody.errors[key].forEach(errorMessage => {
                            errorMsg += `<br>Erro: ${errorMessage}`;
                        });
                    }
                }
            } catch (parseError) {
                console.error('Erro ao analisar o corpo da resposta:', parseError);
            }
        } else {
            console.error('Erro:', error.message);
            errorMsg += `<br>${error.message}`;
        }
    
        showToast(errorMsg);
    });
    
    
    
    
}

