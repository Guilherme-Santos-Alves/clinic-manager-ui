window.onload = function() {
    const token = localStorage.getItem("token");

    if (token === null || token === undefined){
      window.location.href = "index.html";
    }
}

function buildInputSolution(event) {
    template = `
    <div class="original-line -clone">
        <input type="text" class="rg-solution">
        <button class="cl-button -add-solution" id="btn-new-specialty" onclick="buildInputSolution(event)">+</button>
    </div> 
    `;
    document.querySelector(".fifth-line").insertAdjacentHTML("beforeend", template);
    event.preventDefault();

    let clonedInput = document.querySelector(".fifth-line").lastElementChild.querySelector(".rg-solution");
    clonedInput.addEventListener('input', processarValoresInputs);

    processarValoresInputs();
}

document.addEventListener('DOMContentLoaded', function() {
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
    
    let solutionInputs = document.querySelectorAll(".rg-solution");
    solutionInputs.forEach(input => {
        input.addEventListener('input', processarValoresInputs);
    });
});

function processarValoresInputs() {
    let solutions = document.querySelectorAll(".rg-solution");
    let payloadSolution = '';

    solutions.forEach((solution, index) => {
        payloadSolution += `${solution.value}`;
        if (index < solutions.length - 1) {
            payloadSolution += ', ';
        }
    });
    
    localStorage.setItem("solutions", payloadSolution);
}

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

function registerOne(){
    window.location.href = "doctor-register-final.html";
}