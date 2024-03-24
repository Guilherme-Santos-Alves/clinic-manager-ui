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
    
    let payloadPatient = {
        //PERSONAL DATA
        firstName: localStorage.getItem('name'),
        lastName: localStorage.getItem('surname'),
        birthDay: localStorage.getItem('birthdate'),
        phone: localStorage.getItem('phone'),
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        cpf: localStorage.getItem('cpf'),
        bloodType: localStorage.getItem('bloodType'),
        height: localStorage.getItem('height'),
        weight: localStorage.getItem('wheight'), 
        //ADDRESS
        address: {
            userDocument: localStorage.getItem('cpf'),
            number: (document.querySelector('#rg-numberHouse').value),
            city: (document.querySelector('#rg-city').value),
            state: (document.querySelector('#rg-state').value), 
            cep: (document.querySelector('#rg-cep').value), 
            neighborhood: (document.querySelector('#rg-neighborhood').value)
        }
    };

    fetch("https://localhost:7252/api/patients" , {
        method: 'POST',
        body: JSON.stringify(payloadPatient),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(response => {
        alert("Cadastrado com sucesso!");
        window.location.href = "index.html"
    })  
}