function filterDoctor(){
  let doctorList = document.querySelector("#doctors-list");
  doctorList.innerHTML = '';
  let optionDisabled = `<option value="" disabled selected>Selecione um médico</option>`;
  doctorList.insertAdjacentHTML("beforeend", optionDisabled);

  let specialityValue;

  const specialtyExam = document.querySelector("#specialty-exam");
  const specialtyConsultation = document.querySelector("#specialty-consultation");

  if (specialtyExam) {
      specialityValue = specialtyExam.value;
  } else if (specialtyConsultation) {
      specialityValue = specialtyConsultation.value;
  }

  const token = localStorage.getItem("token");

  fetch(`https://localhost:7231/api/doctors/specialty/${specialityValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    })
    .then((response) => {
      response.json().then((doctors) => {
          doctors.forEach((doctor) => {
            let listDoctors = `<option class="option-doctor-list" value="${doctor.userId}">${doctor.firstName + " " + doctor.lastName}</option>`
            document.querySelector("#doctors-list").insertAdjacentHTML("beforeend" , listDoctors);
          });
      });
  });
}

// function listDoctorsSelect(){
//   const token = localStorage.getItem("token");

//   fetch("https://localhost:7231/api/doctors", {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     })
//     .then((response) => {
//       response.json().then((doctors) => {
//           doctors.forEach((doctor) => {
//             let listDoctors = `<option value="${doctor.userId}">${doctor.firstName + " " + doctor.lastName}</option>`
//             document.querySelector("#doctors-list").insertAdjacentHTML("beforeend" , listDoctors);
//           });
//       });
//   });
// }

let patientId;
let patientFullName;

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
      patientFullName = `${patient.firstName + " " + patient.lastName}`;
      localStorage.setItem("patientName", patientFullName);
      patientId = patient.userId;
      localStorage.setItem("patientId", patientId);
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

function appointmentsPatient(){
  let cleanAppointments = document.querySelector(".appointments");
  cleanAppointments.innerHTML = '';

  let status = document.getElementById("select-staus").value;

  const token = localStorage.getItem("token");
  
  //`https://localhost:7231/api/services?status=${status}` URL COM O PARAMETRO STATUS
  fetch(`https://localhost:7231/api/services/patients/${patientId}`, {
  method: 'GET',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
  },
  })
  .then((response) => {
      response.json().then((appointments) => {
          appointments.forEach((appointment) => {
              var startDateStr = appointment.startDate;
              var startDate = new Date(startDateStr);
              var hour = startDate.getHours();
              var minutes = startDate.getMinutes();
              var date = startDate.getDate();
              var month = startDate.getMonth() + 1;
              minutes = minutes < 10 ? "0" + minutes : minutes;
              hour = hour < 10 ? "0" + hour : hour;
              month = month < 10 ? "0" + month : month;
              date = date < 10 ? "0" + date : date;
              let idAppointment = appointment.id;

              let adress;
              let appointmentData;
              if (appointment.modality === 0){
                  adress = "Rua Inexistente, 262"
                  appointmentData = `
                      <div class="content" id="content-appointment"> 
                      <div class="data"> 
                          <ul> Data: `+ date + "/" + month + "  -  " +  "Hora: " +  hour + ":" + minutes +` </ul>
                          <ul> ${appointment.name} </ul> 
                          <ul>Dr. ${appointment.doctorName}</ul> 
                          <ul>${adress}</ul> 
                      </div> 
                      <div class="btns -recepcionist"> 
                          <button class="cancel " onclick="popupCancelAppointment(${idAppointment}, '${appointment.name}')">Cancelar</button> 
                      </div>
                      </div>
                  `;
              } else {
                  adress = "Telemedicina";
                  appointmentData = `
                      <div class="content" id="content-appointment"> 
                      <div class="data"> 
                          <ul> Data: `+ date + "/" + month + "  -  " +  "Hora: " +  hour + ":" + minutes +` </ul>
                          <ul> ${appointment.name} </ul> 
                          <ul>Dr. ${appointment.doctorName}</ul> 
                          <ul>${adress}</ul> 
                      </div> 
                      <div class="btns"> 
                        <a href="${appointment.meetingLink}" class="start-link" onclick="link aqui">Iniciar</a>
                        <button class="cancel " onclick="popupCancelAppointment(${idAppointment}, '${appointment.name}')">Cancelar</button> 
                      </div>
                      </div>
                  `;
              }

              document.querySelector(".appointments").insertAdjacentHTML("beforeend", appointmentData);
          });
      });
  });
}

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
                <option value="" selected disabled>Especialidade</option>
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

  document.querySelector(".cl-exams").insertAdjacentHTML("beforeend", templateExams);  
  let doctorSpecialty = document.querySelector("#specialty-exam");
  doctorSpecialty.addEventListener("change", filterDoctor);
}

function postExams(){
  const token = localStorage.getItem("token");
  let idDoctor = parseInt(document.querySelector("#doctors-list").value);

  const jsonDataExams = {
    patientId: 2,
    doctorId: idDoctor,
    name: document.querySelector("#exam-name").value,
    patientName: `${patientFullName}`,
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
      limparCampos();
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
                    <option value="" selected disabled>Especialidade</option>
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

  document.querySelector(".cl-consultations").insertAdjacentHTML("beforeend", templateConsultations);
  let doctorSpecialty = document.querySelector("#specialty-consultation");
  doctorSpecialty.addEventListener("change", filterDoctor);
}

function fetchConsultations(){
  const token = localStorage.getItem("token");
  let idDoctor = parseInt(document.querySelector("#doctors-list").value);

  const jsonDataConsultations = {
    patientId: 2,
    doctorId: idDoctor,
    name: document.querySelector("#specialty-consultation").value,
    patientName: `${patientFullName}`,
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
    limparCampos();
  })
  .catch(error => {
    console.error('Erro:', error);
    showToast(errorMsg);
  });
}

function limparCampos(){
  var inputsExams = document.querySelectorAll('input, textarea, select, radio');

  inputsExams.forEach(function(input) {
    input.value = '';
  });
}

function exit(){
  let token = localStorage.clear();
  window.location.href = "index.html";
}