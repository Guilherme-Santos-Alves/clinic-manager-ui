function verificarRole(){
    let roles = document.getElementsByName("role");
    console.log(roles); // Verifica se os elementos estão sendo capturados corretamente
    if (roles.length < 3) {
        console.error("Não há elementos suficientes com o nome 'role'");
        return null; // Ou algum valor padrão para indicar erro
    }

    if (roles[0].checked === true){
        return "paciente";
    } else if(roles[1].checked === true){
        return "medico";
    } else if (roles[2].checked === true){
        return "administrador";
    }
}


function login(){
    // JÁ VALIDADO PELO HTML
    // PEGAR OS DADOS DO FORM
    // ENVIAR PARA A API
    let payload = {
        role: (verificarRole()),
        cpf: (document.querySelector('#cpf-input').value),
        password: (document.querySelector('#password-input').value),
    }

    fetch("https://65f9ccd23909a9a65b1966ed.mockapi.io/api/clinic" , {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(response => {
        alert("Bem-vindo!");
        window.location.href = "patient.html"
    })
}
