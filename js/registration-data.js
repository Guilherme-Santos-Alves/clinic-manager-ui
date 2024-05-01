

function buildMyDataPatient(){
    let registrationData = document.querySelector(".registration-data");
    registrationData.innerHTML = '';
    let contentConsultations = document.querySelector(".cl-consultations");
    contentConsultations.innerHTML = '';
    let contentExams = document.querySelector(".cl-exams");
    contentExams.innerHTML = '';
    let contentAppointments = document.querySelector(".my-appointments");
    contentAppointments.innerHTML = '';

    let template = `
    <h1>Dados Pessoais</h1>
    <form class="form-box" action="javascript:void(0)" onsubmit="editMyDataPatient()">
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
                <label for="">Altura:</label>
                <input type="text" id="height">
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">Peso:</label>
                <input type="text" id="weight">
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
                <label for="">Email:</label>
                <input type="text" id="email">
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

    document.querySelector(".registration-data").insertAdjacentHTML("beforeend", template);
    getDataPatient();
}

function getDataPatient() {
    const token = localStorage.getItem("token");
    const patientDocument = localStorage.getItem("document");
  
    fetch(`https://localhost:7231/api/patients/document/${patientDocument}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      response.json().then((patient) => {
        patientId = patient.userId;
        let showName = `${patient.firstName + " " + patient.lastName}`;
        document.querySelector("#firstName").value = patient.firstName;
        document.querySelector("#lastName").value = patient.lastName;
        document.querySelector("#cpf").value = patient.cpf;
        
        const birthDate = new Date(patient.birthday);
        const day = birthDate.getDate();
        const month = birthDate.getMonth() + 1;
        const year = birthDate.getFullYear();
        const formattedBirthDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        document.querySelector("#birthDay").value = formattedBirthDate;

        document.querySelector("#phone").value = patient.phone;
        document.querySelector("#height").value = patient.height;
        document.querySelector("#weight").value = patient.weight;
        document.querySelector("#bloodType").value = patient.bloodType;
        document.querySelector("#email").value = patient.email;
        
        document.querySelector("#state").value = patient.addressDTO.state;
        document.querySelector("#city").value = patient.addressDTO.city;
        document.querySelector("#neighborhood").value = patient.addressDTO.neighborhood;
        document.querySelector("#cep").value = patient.addressDTO.cep;
        document.querySelector("#number").value = patient.addressDTO.number;
      });
    });
}

function buildMyDataDoctor(){
    let registrationData = document.querySelector(".registration-data");
    registrationData.innerHTML = '';
    let contentConsultations = document.querySelector(".cl-consultations");
    contentConsultations.innerHTML = '';
    let contentExams = document.querySelector(".cl-exams");
    contentExams.innerHTML = '';
    let contentAppointments = document.querySelector(".my-appointments");
    contentAppointments.innerHTML = '';

    let template = `
    <h1>Dados Pessoais</h1>
    <form class="form-box" action="javascript:void(0)" onsubmit="editMyDataDoctor()">
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

    document.querySelector(".registration-data").insertAdjacentHTML("beforeend", template);
    getDataDoctor();
}

let doctorId;

function getDataDoctor() {
    const token = localStorage.getItem("token");
    const doctorDocument = localStorage.getItem("document");
  
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

function editMyDataPatient(){
    const token = localStorage.getItem("token");

    let numberHouse = parseInt(document.querySelector("#number").value);
    let height = parseFloat(document.querySelector("#height").value);
    let weight = parseFloat(document.querySelector("#weight").value);

    const editMyDataPatient = {
        id: patientId,
        phone: document.querySelector("#phone").value,
        email: document.querySelector("#email").value,
        height: height,
        weight: weight,
        addressDTO: {
            number: numberHouse,
            city: document.querySelector("#city").value,
            state: document.querySelector("#state").value,
            cep: document.querySelector("#cep").value,
            neighborhood: document.querySelector("#neighborhood").value
        }
    }
    console.log(editMyDataPatient);

    fetch(`https://localhost:7231/api/patients/${patientId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(editMyDataPatient)
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

function editMyDataDoctor(){
    const token = localStorage.getItem("token");

    let numberHouse = parseInt(document.querySelector("#number").value);

    const editMyDataDoctor = {
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
    console.log(editMyDataDoctor);

    fetch(`https://localhost:7231/api/doctors/${doctorId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(editMyDataDoctor)
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