function verificarRole() {
    let roles = document.getElementsByName("role");
    if (roles.length < 3) {
        console.error("Não há elementos suficientes com o nome 'role'");
        return null; // Ou algum valor padrão para indicar erro
    }

    if (roles[0].checked === true) {
        return "paciente";
    } else if (roles[1].checked === true) {
        return "medico";
    } else if (roles[2].checked === true) {
        return "administrador";
    }
}

let successMsg = '<span class="material-symbols-outlined">check_circle</span> Login realizado com sucesso!';
let errorMsg = '<span class="material-symbols-outlined">cancel</span> Erro no login!';

function showToast(msg) {
    let toastBox = document.getElementById('toast-box');
    if (!toastBox) {
        console.error("Elemento toast-box não encontrado!");
        return;
    }

    console.log("Mensagem do toast:", msg); // Verifica a mensagem do toast

    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);

    console.log("Toast adicionado ao DOM:", toast); // Verifica se o toast foi adicionado ao DOM corretamente

    if (msg.includes('Erro')) {
        toast.classList.add('error');
    }

    setTimeout(() => {
        toast.remove();
    }, 6000); // Remove o toast após 6 segundos 
}

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
        localStorage.setItem("token", data.token)
        showToast(successMsg);
        window.location.href = "patient.html"
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        showToast(errorMsg);
    });
}

// O restante do seu código...
