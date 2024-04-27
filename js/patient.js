function listDoctorsSelect(){
  const token = localStorage.getItem("token");

  fetch("https://localhost:7231/api/doctors", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    })
    .then((response) => {
      response.json().then((doctors) => {
          doctors.forEach((doctor) => {
            let listDoctors = `<option value="${doctor.userId}">${doctor.firstName + " " + doctor.lastName}</option>`
            document.querySelector("#doctors-list").insertAdjacentHTML("beforeend" , listDoctors);
          });
      });
  });
}

window.onload = function() {
  const token = localStorage.getItem("token");

  if (token === null || token === undefined){
    window.location.href = "index.html";
  }

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
      document.querySelector(".name").insertAdjacentHTML("beforeend" , showName);
    });
  });
}


function checkModality() {
  let modality = document.getElementsByName("modality");

  if (modality[0].checked === true) {
    return 1;
  } else if (modality[1].checked === true) {
    return 0;
}}

function buildInputsExams() {
  let contentConsultations = document.querySelector(".cl-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".cl-exams");
  contentExams.innerHTML = '';
  let contentAppointments = document.querySelector(".my-appointments");
  contentAppointments.innerHTML = '';
  let registrationData = document.querySelector(".registration-data");
  registrationData.innerHTML = '';

  const templateExams = `
  <h1 class="title">Agendar Exame</h1>
  <form action="javascript:void(0)" class="form-box" onsubmit="postExams()" id="form-exams">
      
      <div class="specialty" id="specialty">
          <div class="select-custom -exam-or-consultation" id="select-custom">
              <label class="select-speciality" for="specialty-exam">Selecione a especialidade do exame:</label>
              <select required name="specialty" id="specialty-exam" required>
                  <option value="" disabled selected>Especialidade</option> 
                  <option value="Exames de imagem">Exames de imagem</option>
                  <option value="Cardiologia">Cardiologia</option>
              </select>
              <div class="custom-arrow">
                  <span class="material-symbols-outlined">
                      arrow_drop_down
                  </span>
              </div>
          </div>
      </div>
      <div class="select-custom -exam-or-consultation">
      <div class="doctor-select">
          <label for="doctors-list">Médico:</label>
          <select name="doctors-list" id="doctors-list" required>
            <option value="" disabled selected>Selecione um médico</option>
          </select> 
          <div class="custom-arrow">
          <span class="material-symbols-outlined">
              arrow_drop_down
          </span>
          </div>
      </div>
      </div>
      <div class="exam">
          <label class="select-speciality" for="exam">Exame:</label>
          <input class="input" required placeholder="Digite o nome do exame" id="exam-name">
      </div>   
      <div class="from-the-hour">
          <label class="between" for="date">Data:</label> 
          <input required class="input" type="date" id="date">
          <label class="e" for="hour">Hora:</label> 
          <input required class="input" type="time" id="hour">
      </div>
      <div class="cl-button -patient">
          <button type="submit" class="btn-link" id="btn-link-exam" >Continuar</button>
      </div>
  </form>
  `;
  
  listDoctorsSelect();

  document.querySelector(".cl-exams").insertAdjacentHTML("beforeend", templateExams);  
}

function postExams(){
  const token = localStorage.getItem("token");
  let idDoctor = parseInt(document.querySelector("#doctors-list").value);

  const jsonDataExams = {
    patientId: 2,
    doctorId: idDoctor,
    name: document.querySelector("#exam-name").value,
    patientName: "Neymar Jr",
    doctorName: document.querySelector("#doctors-list option:checked").text,
    startDate: document.querySelector("#date").value + "T" + document.querySelector("#hour").value,
    modality: 0
  };

  console.log(jsonDataExams);

  fetch("https://localhost:7231/api/services", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jsonDataExams)
  })
  .then(response => response.json())
  .then(response => {
      console.log(response);
      showToast(successMsg);
      limparCampoExam();
  })
  .catch(error => {
      console.error('Erro:', error);
      showToast(errorMsg);
  });
}

function buildInputsConsultations() {
  let contentConsultations = document.querySelector(".cl-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".cl-exams");
  contentExams.innerHTML = '';
  let contentAppointments = document.querySelector(".my-appointments");
  contentAppointments.innerHTML = '';
  let registrationData = document.querySelector(".registration-data");
  registrationData.innerHTML = '';
  
  let templateConsultations = `
  <h1 class="title">Agendar Consulta</h1>
  <form id="form-consultations" action="javascript:void(0)" class="form-box" onsubmit="fetchConsultations()">
      <div class="specialty" id="specialty">
          <div class="select-custom -exam-or-consultation" id="select-custom">
              <label class="select-speciality" for="specialty-consultation">Selecione a especialidade da consulta:</label>
                  <select name="specialty" id="specialty-consultation" required>
                    <option value="" disabled selected >Especialidade</option> 
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Ortopedia">Ortopedia</option>
                  </select>
              <div class="custom-arrow">
                  <span class="material-symbols-outlined">
                      arrow_drop_down
                  </span>
              </div>
          </div>
      </div>
      <div class="select-custom -exam-or-consultation">
      <div class="doctor-select">
          <label for="doctors-list">Médico:</label>
          <select name="doctors-list" id="doctors-list" required>
            <option value="" disabled selected>Selecione um médico</option>
          </select> 
          <div class="custom-arrow">
          <span class="material-symbols-outlined">
              arrow_drop_down
          </span>
          </div>
      </div>
      </div>
      <div class="from-the-hour" >
        <label class="e" for="date">Data:</label>
        <input class="input" type="date" id="date" required>
        <label class="between" for="hour">Hora:</label>
        <input class="input" type="time" id="hour" required>               
      </div>
      <div class="radio-container">
          <span class="material-symbols-outlined">
          phone_iphone
          </span>
          <label for="radio-virtual-consultations">Telemedicina</label><input required name="modality" class="radio" type="radio" id="radio-virtual-consultations" onchange="checkModality()" required>
          <span class="material-symbols-outlined">
          person
          </span>
          <label for="radio-presential-consultations">Presencial</label><input required name="modality" class="radio" type="radio" id="radio-presential-consultations" onchange="checkModality()" required>
      </div>
      <div class="cl-button -patient">
          <button type="submit" class="btn-link" id="btn-link-consultation" >Continuar</button>
      </div>                     
  </form>
  `;

  listDoctorsSelect();

  document.querySelector(".cl-consultations").insertAdjacentHTML("beforeend", templateConsultations);
}

function fetchConsultations(){
  const token = localStorage.getItem("token");
  let idDoctor = parseInt(document.querySelector("#doctors-list").value);

  const jsonDataConsultations = {
    patientId: 2,
    doctorId: idDoctor,
    name: document.querySelector("#specialty-consultation").value,
    patientName: "Neymar Jr",
    doctorName: document.querySelector("#doctors-list option:checked").text,
    startDate: document.querySelector("#date").value + "T" + document.querySelector("#hour").value,
    modality: checkModality()
  };

  console.log(jsonDataConsultations);

  fetch("https://localhost:7231/api/services", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jsonDataConsultations)
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
    showToast(successMsg);
    limparCampoConsultation();
  })
  .catch(error => {
    console.error('Erro:', error);
    showToast(errorMsg);
  });
}

function limparCampoExam() {
  const formExams = document.getElementById("form-exams");
  var inputsExams = formExams.querySelectorAll('input, textarea, select, radio');

  inputsExams.forEach(function(input) {
    input.value = '';
  });
}

function limparCampoConsultation() {
  const formConsultations = document.getElementById("form-consultations");
  var inputs = formConsultations.querySelectorAll('input, textarea, select, radio');

  inputs.forEach(function(input){
    input.value = '';
  }) 
}
