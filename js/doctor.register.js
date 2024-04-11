function buildInputSolution() {
    template = `
    <div class="original-line -clone">
        <input type="text" class="rg-solution">
        <button class="cl-button -add-solution" id="btn-new-specialty" onclick="buildInputSolution()">+</button>
    </div> 
    `;
    document.querySelector(".fifth-line").insertAdjacentHTML("beforeend", template);

    // Adicionar ouvinte de evento ao novo input de solução clonado
    let clonedInput = document.querySelector(".fifth-line").lastElementChild.querySelector(".rg-solution");
    clonedInput.addEventListener('input', processarValoresInputs);
    
    processarValoresInputs(); // Atualizar localStorage imediatamente após clonar
}

// Função para processar os valores dos inputs

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar ouvintes de evento para os campos do formulário
    document.getElementById("rg-name").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-surname").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-birthdate").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-phone").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-cpf").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-blood-type").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-email").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-password").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-crm").addEventListener('input', updateLocalStorage);
    document.getElementById("rg-specialty").addEventListener('change', updateLocalStorage);
    
    // Adicionar ouvintes de evento para todos os inputs de solução
    let solutionInputs = document.querySelectorAll(".rg-solution");
    solutionInputs.forEach(input => {
        input.addEventListener('input', processarValoresInputs);
    });
});

// Função para processar os valores dos inputs de solução e atualizar o localStorage
function processarValoresInputs() {
    let solutions = document.querySelectorAll(".rg-solution");
    let payloadSolution = '';

    solutions.forEach((solution, index) => {
        // Adiciona "data: " seguido pelo valor do input
        payloadSolution += `${solution.value}`;

        // Adiciona uma vírgula se não for o último input
        if (index < solutions.length - 1) {
            payloadSolution += ', ';
        }
    });

    console.log(payloadSolution); // Exibir a string resultante no console para fins de demonstração
    
    localStorage.setItem("solutions", payloadSolution);
}

// Função para atualizar localStorage quando um campo é alterado
function updateLocalStorage() {
    localStorage.setItem("firstName", document.getElementById("rg-name").value);
    localStorage.setItem("lastName", document.getElementById("rg-surname").value);
    localStorage.setItem("birthDay", document.getElementById("rg-birthdate").value);
    localStorage.setItem("phone", document.getElementById("rg-phone").value);
    localStorage.setItem("cpf", document.getElementById("rg-cpf").value);
    localStorage.setItem("bloodType", document.getElementById("rg-blood-type").value);
    localStorage.setItem("email", document.getElementById("rg-email").value);
    localStorage.setItem("password", document.getElementById("rg-password").value);
    localStorage.setItem("crm", document.getElementById("rg-crm").value);
    localStorage.setItem("specialty", document.getElementById("rg-specialty").value);
}

//Leva para a próxima página de cadastro
function registerOne(){
    window.location.href = "doctor-register-final.html";
}