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


// function login(){
//     // JÁ VALIDADO PELO HTML
//     // PEGAR OS DADOS DO FORM
//     // ENVIAR PARA A API
//     let payload = {
//         role: (verificarRole()),
//         cpf: (document.querySelector('#cpf-input').value),
//         password: (document.querySelector('#password-input').value),
//     }

//     fetch("https://65f9ccd23909a9a65b1966ed.mockapi.io/api/clinic" , {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }) 
//     .then(response => response.json())
//     .then(response => {
//         alert("Bem-vindo!");
//         window.location.href = "patient.html"
//     })
// }

document.addEventListener("DOMContentLoaded", function() {
    const login = document.getElementById('form-login');

    login.addEventListener('submit', evento => {
        evento.preventDefault();

        const jsonData = {
            role: (verificarRole()),
            cpf: (document.querySelector('#cpf-input').value),
            password: (document.querySelector('#password-input').value)
        };

        console.log(jsonData);

        // Enviar para a API
        // fetch("https://localhost:7252/api/patients", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(jsonData)
        // }) 
        // .then(response => response.json())
        // .then(response => {
        //     console.log(response);
        //     window.location.href = "index.html";
        // })
        // .catch(error => {
        //     console.error('Erro:', error);
        // });

    });
});