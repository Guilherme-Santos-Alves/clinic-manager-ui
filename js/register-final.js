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
        name: localStorage.getItem('name'),
        surname: localStorage.getItem('surname'),
        birthdate: localStorage.getItem('birthdate'),
        phone: localStorage.getItem('phone'),
        cpf: localStorage.getItem('cpf'),
        height: localStorage.getItem('height'),
        wheight: localStorage.getItem('wheight'),
        bloodType: localStorage.getItem('bloodType'),
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        //ADRESS
        cep: (document.querySelector('#rg-cep').value),
        state: (document.querySelector('#rg-state').value),
        city: (document.querySelector('#rg-city').value),
        neighborhood: (document.querySelector('#rg-neighborhood').value),
        numberHouse: (document.querySelector('#rg-numberHouse').value)
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
        window.location.href = "login.html"
    })  
}