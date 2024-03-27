document.addEventListener('DOMContentLoaded', function() {
    // Adicionar ouvintes de evento para os campos do formulário
    document.getElementById("rg-name").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-surname").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-birthdate").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-phone").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-cpf").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-height").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-wheight").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-blood-type").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-email").addEventListener('change', updateLocalStorage);
    document.getElementById("rg-password").addEventListener('change', updateLocalStorage);
});

// Função para atualizar localStorage quando um campo é alterado
function updateLocalStorage() {
    localStorage.setItem("firstName", document.getElementById("rg-name").value);
    localStorage.setItem("lastName", document.getElementById("rg-surname").value);
    
    // Formatar a data de nascimento (birthday) com segundos e milissegundos
    const birthDate = new Date(document.getElementById("rg-birthdate").value);
    const formattedBirthDay = birthDate.getFullYear() + '-' +
        ('0' + (birthDate.getMonth() + 1)).slice(-2) + '-' +
        ('0' + birthDate.getDate()).slice(-2) + 'T' +
        ('0' + birthDate.getHours()).slice(-2) + ':' +
        ('0' + birthDate.getMinutes()).slice(-2) + ':' +
        ('0' + birthDate.getSeconds()).slice(-2) + '.' +
        ('00' + birthDate.getMilliseconds()).slice(-3);
    
    localStorage.setItem("birthDay", formattedBirthDay);
    localStorage.setItem("phone", document.getElementById("rg-phone").value);
    localStorage.setItem("cpf", document.getElementById("rg-cpf").value);
    localStorage.setItem("height", document.getElementById("rg-height").value);
    localStorage.setItem("weight", document.getElementById("rg-wheight").value);
    localStorage.setItem("bloodType", document.getElementById("rg-blood-type").value);
    localStorage.setItem("email", document.getElementById("rg-email").value);
    localStorage.setItem("password", document.getElementById("rg-password").value);
}

function registerOne(){
    window.location.href = "register-final.html";
}
