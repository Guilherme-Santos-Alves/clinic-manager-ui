//FUNÇÃO DOS TOASTS 
// Definindo a função showToast globalmente

let successMsg = '<span class="material-symbols-outlined">check_circle</span>Cadastro realizado com sucesso!';
let errorMsg = '<span class="material-symbols-outlined">cancel</span>Erro no cadastro! Verifique os dados';

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


function registerPatient(){
    // JÁ VALIDADO PELO HTML
    // PEGAR OS DADOS DO FORM
    // ENVIAR PARA A API   
    let height = parseFloat(localStorage.getItem("height"));
    let weight = parseFloat(localStorage.getItem("weight"));
    let number = parseInt(document.getElementById("rg-numberHouse").value);
    let bloodType = parseInt(localStorage.getItem("bloodType"));
    
    let endpoint = 'https://localhost:7252/api/patients';
    let requestBody = {
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
            role: 0,
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
            // Se necessário, inclua outras headers aqui
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
        showToast(errorMsg);
    });
}


