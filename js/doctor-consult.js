function buildSearchDoctor() {
    let contentConsult = document.querySelector(".consult-user");
    contentConsult.innerHTML = '';
    let contentConsultations = document.querySelector(".cl-consultations");
    contentConsultations.innerHTML = '';
    let contentExams = document.querySelector(".cl-exams");
    contentExams.innerHTML = '';

    let template = `
    <div class="consult-doctor">
        <h1>Consultar Médicos</h1>
        <form class="form-box" action="javascript:void(0)" onsubmit="getDoctor()">
            <label for="search-text">Pesquisar:</label>
            <input type="text" id="search-text">
            <button type="submit" class="search">
                <span class="material-symbols-outlined">
                    search
                </span>
            </button>
        </form>
        <div class="content-consult">

        </div>
    </div>
    `;
    contentConsult.insertAdjacentHTML("beforeend", template);
}

function getDoctor() {
    document.querySelector(".content-consult").innerHTML = '';

    const token = localStorage.getItem("token");
    
    fetch("https://localhost:7231/api/doctors", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(doctors => {
        doctors.forEach(doctor => {
             let specialty;
            if (doctor.specialty === 0){
                specialty = "Clínica Médica";
            } else if (doctor.specialty === 1){
                specialty = "Cardiologia";
            } else if (doctor.specialty === 2){
                specialty = "Neurologia";
            } else if (doctor.specialty === 3){
                specialty = "Endocrinologia";
            } else if (doctor.specialty === 4){
                specialty = "Ortopedia";
            } else if (doctor.specialty === 5){
                specialty = "Dermatologia";
            } else if (doctor.specialty === 6){
                specialty = "Oftalmologia";
            } else if (doctor.specialty === 7){
                specialty = "Ginecologia";
            } else if (doctor.specialty === 8){
                specialty = "Pediatria";
            } 

            let template = `
            <div class="content">
                <div class="data">
                    <ul>${doctor.firstName + " " + doctor.lastName}</ul>
                    <ul>${specialty}</ul>
                    <ul>CRM: ${doctor.crm}</ul>
                </div>
                <div class="edit">
                    <button class="edit-btn" onclick="doctorInputs(${doctor.cpf})">Editar</button>
                    <button class="inative-btn">Inativar</button>
                </div>
            </div>
            `;
            document.querySelector(".content-consult").insertAdjacentHTML("beforeend", template);
        });

    });
}

function doctorInputs(doctorDocument){
    let contentConsultations = document.querySelector(".cl-consultations");
    contentConsultations.innerHTML = '';
    let contentExams = document.querySelector(".cl-exams");
    contentExams.innerHTML = '';
    let contentConsult = document.querySelector(".consult-user");
    contentConsult.innerHTML = '';

    let template = `
    <h1>Dados Pessoais</h1>
    <form class="form-box" action="javascript:void(0)" onsubmit="editDataDoctor()">
        <div class="line">
            <div class="left">
                <label for="">Nome:</label>
                <input type="text" id="firstName" disabled>
            </div>
            <div class="right">
                <label for="">Sobrenome:</label>
                <input type="text" id="lastName" disabled>
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">CPF:</label>
                <input type="text" id="cpf" disabled>
            </div>
            <div class="right">
                <label for="">Data de Nascimento:</label>
                <input type="date" id="birthDay" disabled>
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">Telefone:</label>
                <input type="text" id="phone">
            </div>
            <div class="right">
                <label for="">Tipo Sanguíneo:</label>
                <div class="select-custom -registration">
                    <select name="" id="bloodType" disabled>
                        <option value="0">A+</option>
                        <option value="1">A-</option>
                        <option value="4">AB+</option>
                        <option value="5">AB-</option>
                        <option value="2">B+</option>
                        <option value="3">B-</option>
                        <option value="6">O+</option>
                        <option value="7">O-</option>
                    </select>
                    <div class="custom-arrow">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">CRM:</label>
                <input type="text" id="crm" disabled>
            </div>
            <div class="right">
                <label for="">Especialidade:</label>
                <div class="select-custom -registration">
                    <select name="" id="specialty" disabled>
                        <option value="0">Clínica Médica</option>
                        <option value="1">Cardiologia</option>
                        <option value="2">Neurologia</option>
                        <option value="3">Endocrinologia</option>
                        <option value="4">Ortopedia</option>
                        <option value="5">Dermatologia</option>
                        <option value="6">Oftalmologia</option>
                        <option value="7">Ginecologia</option>
                        <option value="8">Pediatria</option>
                    </select>
                    <div class="custom-arrow">
                        <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">Email:</label>
                <input type="text" id="email">
            </div>
            <div class="right">
                <label for="">Soluções:</label>
                <input type="text" id="solutions">
            </div>
        </div>

        <h2>Endereço</h2>

        <div class="line">
            <div class="left">
                <label for="">Estado:</label>
                <input type="text" id="state">
            </div>
            <div class="right">
                <label for="">Cidade:</label>
                <input type="text" id="city">
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">Bairro:</label>
                <input type="text" id="neighborhood">
            </div>
            <div class="right">
                <label for="">CEP:</label>
                <input type="text" id="cep">
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">Número:</label>
                <input type="text" id="number">
            </div>
        </div>
        <div class="send-data">
            <button type="submit">Enviar Dados</button>
        </div>
    </form>
    `;

    document.querySelector(".consult-user").insertAdjacentHTML("beforeend", template);
    getDataDoctor(doctorDocument);
}

let doctorId;

function getDataDoctor(doctorDocument) {
    const token = localStorage.getItem("token");
  
    fetch(`https://localhost:7231/api/doctors/document/${doctorDocument}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      response.json().then((doctor) => {
        doctorId = doctor.userId;

        document.querySelector("#firstName").value = doctor.firstName;
        document.querySelector("#lastName").value = doctor.lastName;
        document.querySelector("#cpf").value = doctor.cpf;
        
        const birthDate = new Date(doctor.birthday);
        const day = birthDate.getDate();
        const month = birthDate.getMonth() + 1;
        const year = birthDate.getFullYear();
        const formattedBirthDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        document.querySelector("#birthDay").value = formattedBirthDate;

        document.querySelector("#phone").value = doctor.phone;
        document.querySelector("#bloodType").value = doctor.bloodType;
        document.querySelector("#crm").value = doctor.crm;
        document.querySelector("#specialty").value = doctor.specialty;
        document.querySelector("#email").value = doctor.email;
        document.querySelector("#solutions").value = doctor.solutions;

        
        document.querySelector("#state").value = doctor.addressDTO.state;
        document.querySelector("#city").value = doctor.addressDTO.city;
        document.querySelector("#neighborhood").value = doctor.addressDTO.neighborhood;
        document.querySelector("#cep").value = doctor.addressDTO.cep;
        document.querySelector("#number").value = doctor.addressDTO.number;
      });
    });
}

function editDataDoctor(){
    const token = localStorage.getItem("token");

    let numberHouse = parseInt(document.querySelector("#number").value);

    const editDataDoctor = {
        id: doctorId,
        phone: document.querySelector("#phone").value,
        email: document.querySelector("#email").value,
        solutions: document.querySelector("#solutions").value,
        addressDTO: {
            number: numberHouse,
            city: document.querySelector("#city").value,
            state: document.querySelector("#state").value,
            cep: document.querySelector("#cep").value,
            neighborhood: document.querySelector("#neighborhood").value
        }
    }
    console.log(editDataDoctor);

    fetch(`https://localhost:7231/api/doctors/${doctorId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(editDataDoctor)
    })
    .then(response => {
        console.log(response);
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
}