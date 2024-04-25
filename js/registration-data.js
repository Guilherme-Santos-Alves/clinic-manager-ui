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
    <div class="form-box">
        <div class="line">
            <div class="left">
                <label for="">Nome:</label>
                <input type="text" id="firstName">
            </div>
            <div class="right">
                <label for="">Sobrenome:</label>
                <input type="text" id="lastName">
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">CPF:</label>
                <input type="text" id="cpf">
            </div>
            <div class="right">
                <label for="">Data de Nascimento:</label>
                <input type="date" id="birthDay">
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
                    <select name="" id="bloodType">
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
                <label for="">Bairo:</label>
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
    </div>
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
    <h1>Meus dados</h1>
    <div class="form-box">
        <div class="line">
            <div class="left">
                <label for="">Nome:</label>
                <input type="text" id="firstName">
            </div>
            <div class="right">
                <label for="">Sobrenome:</label>
                <input type="text" id="lastName">
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">CPF:</label>
                <input type="text" id="cpf">
            </div>
            <div class="right">
                <label for="">Data de Nascimento:</label>
                <input type="date" id="birthDay">
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
                    <select name="" id="bloodType">
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
                <input type="text" id="email">
            </div>
            <div class="right">
                <label for="">Especialidade:</label>
                <div class="select-custom -registration">
                    <select name="" id="bloodType">
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
                <label for="">Senha:</label>
                <input type="text" id="password">
            </div>
        </div>
        <div class="line">
            <div class="left">
                <label for="">Soluções:</label>
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
                <label for="">Bairo:</label>
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
    </div>
    `;

    document.querySelector(".registration-data").insertAdjacentHTML("beforeend", template);
}