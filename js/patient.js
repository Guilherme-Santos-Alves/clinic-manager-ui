function changeGrid() {
  var element = document.querySelector(".main-content");
  element.style.gridTemplateColumns = "290px 0px auto";
  var center = document.querySelector(".center");
  center.innerHTML = '';
}

function apagar(){
  var center = document.querySelector(".center");
  center.innerHTML = '';
  let contentConsultations = document.querySelector(".content-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".content-exams");
  contentExams.innerHTML = '';
}

let successMsg = '<span class="material-symbols-outlined">check_circle</span>Sucesso';
let errorMsg = '<span class="material-symbols-outlined">cancel</span>Erro';

function showToast(msg) {
  let toastBox = document.getElementById('toast-box');
  if (!toastBox) {
    console.error("Elemento toast-box não encontrado!");
    return;
  }

  let toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = msg;
  toastBox.appendChild(toast);

  if (msg.includes('Erro')) {
    toast.classList.add('error');
  }

  setTimeout(() => {
    toast.remove();
  }, 6000); // Remove o toast após 6 segundos 
}

// RESGATA OS NOMES DOS MEDICOS E MOSTRA NO HTML
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
            let listDoctors = `<option value="1">${doctor.firstName + " " + doctor.lastName}</option>`
            document.querySelector("#doctors-list").insertAdjacentHTML("beforeend" , listDoctors);
          });
      });
  });
}

window.onload = function() {
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
            let showName = `${doctor.firstName + " " + doctor.lastName}`
            document.querySelector(".name").insertAdjacentHTML("beforeend" , showName);
          });
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let optionRadios = document.getElementsByName("option");
  let contentExams = document.querySelector(".content-exams");
  let contentConsultations = document.querySelector(".content-consultations");

  // Adicionando um ouvinte de evento de mudança a cada rádio
  optionRadios.forEach((radio) => {
    radio.addEventListener("change", checkExamOrConsultation);
  });

  // Função para verificar se a opção de exame ou consulta foi selecionada e chamar a função apropriada
  function checkExamOrConsultation() {
    if (optionRadios[0].checked) {
      console.log("Opção Exame selecionada.");
      buildInputsExams();
      if (contentConsultations) {
        contentConsultations.innerHTML = ''; // Limpa o conteúdo da div
      }
    } else if (optionRadios[1].checked) {
      console.log("Opção Consulta selecionada.");
      buildInputsConsultations();
      if (contentExams) {
        contentExams.innerHTML = ''; // Limpa o conteúdo da div
      }
    }
  }
});

// VERFIFICAR INPUTS DE PRESENCIAL OU VIRTUAL
function checkModality() {
  let modality = document.getElementsByName("modality");

  if (modality[0].checked === true) {
    return "virtual";
  } else if (modality[1].checked === true) {
    return "presential";
  } else if (modality[2].checked === true) {
    return "virtual";
  } else if (modality[3].checked === true) {
    return "presential";
  }
}

function buildInputsExams() {
  let contentConsultations = document.querySelector(".content-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".content-exams");
  contentExams.innerHTML = '';

  // Template do formulário de exames
  const templateExams = `
    <h1 class="title">Agendar Exame</h1>
    <form action="javascript:void(0)" class="form-box">
      <div class="specialty" id="specialty">
          <label class="select-speciality" for="specialty-exam">Selecione a especialidade do exame:</label>
          <select required name="specialty" id="specialty-exam">
              <option value="" disabled selected>Especialidade</option> 
              <option value="Exames de imagem">Exames de imagem</option>
              <option value="Cardiologia">Cardiologia</option>
          </select>
      </div>
      <div class="doctor-select">
        <label for="doctors-list">Médico:</label>
        <select name="doctors-list" id="doctors-list">
        <option value="" disabled selected>Selecione um médico</option>
        </select> 
      </div>
      <div class="exam">
          <label class="select-speciality" for="exam">Exame:</label>
          <input class="input" required placeholder="Digite o nome do exame">
      </div>   
      <div class="from-the-hour">
          <label class="between" for="exams-from-hour">Entre:</label> 
          <input required class="input" type="time" id="exams-from-hour" value="00:00">
          <label class="e" for="exams-until-hour">e</label> 
          <input required class="input" type="time" id="exams-until-hour" value="23:59">
      </div>
      <div class="radio-container">
          <span class="material-symbols-outlined">phone_iphone</span>
          <label for="radio-virtual-exams">Telemedicina</label>
          <input required name="modality" class="radio" type="radio" id="radio-virtual-exams">
          <span class="material-symbols-outlined">person</span>
          <label for="radio-presential-exams">Presencial</label>
          <input required name="modality" class="radio" type="radio" id="radio-presential-exams">
      </div>
      <div class="cl-button -patient">
          <button type="submit" class="btn-link" id="btn-link-exam" >Continuar</button>
      </div>
    </form>
  `;
  listDoctorsSelect();
  // Inserir o formulário na seção de exames
  document.querySelector(".content-exams").insertAdjacentHTML("beforeend", templateExams);  
}

function buildInputsConsultations() {
  let contentConsultations = document.querySelector(".content-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".content-exams");
  contentExams.innerHTML = '';
  
  let templateConsultations = `
  <h1 class="title">Agendar Consulta</h1>
  <form action="javascript:void(0)" class="form-box">
    <div class="specialty" id="specialty">
    <label class="select-speciality" for="specialty-consultation">Selecione a especialidade da consulta:</label>
    <select name="specialty" id="specialty-consultation">
      <option value="" disabled selected >Especialidade</option> 
      <option value="Cardiologia">Cardiologia</option>
      <option value="Ortopedia">Ortopedia</option>
    </select>
    </div>
    <div class="doctor-select">
    <label for="doctors-list">Médico:</label>
    <select name="doctors-list" id="doctors-list">
    <option value="" disabled selected>Selecione um médico</option>
    </select> 
    </div>
    <div class="from-the-hour" >
    <label class="between" for="from-date">Entre:</label>
    <input class="input" type="time" id="consultations-from-hour" value="00:00">
    <label class="e" for="from-date">e</label>
    <input class="input" type="time" id="consultations-until-hour" value="23:59">
    </div>
    <div class="radio-container">
    <span class="material-symbols-outlined">
      phone_iphone
    </span>
    <label for="radio-virtual-consultations">Telemedicina</label><input required name="modality" class="radio" type="radio" id="radio-virtual-consultations" onchange="checkModality()">
    <span class="material-symbols-outlined">
      person
    </span>
    <label for="radio-presential-consultations">Presencial</label><input required name="modality" class="radio" type="radio" id="radio-presential-consultations" onchange="checkModality()">
    </div>
    <div class="cl-button -patient">
    <button type="submit" class="btn-link" id="btn-link-consultation" >Continuar</button>
    </div>                     
  </form>
  `;

  listDoctorsSelect();

  document.querySelector(".content-consultations").insertAdjacentHTML("beforeend", templateConsultations);

  const patient = document.querySelector(".left");

  patient.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const jsonDataConsultations = {
      specialtyConsultation: document.querySelector("#specialty-consultation").value,
      modality: checkModality(),
      fromHour: document.querySelector("#consultations-from-hour").value,
      untilHour: document.querySelector("#consultations-until-hour").value,
    };

    console.log(jsonDataConsultations);

    // Enviar para a API
    // fetch("https://localhost:7252/api/patients", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(jsonData)
    // })
    // .then(response => response.json())
    // .then(response => {
    //     console.log(response);
    //     window.location.href = "index.html";
    // })
    // .catch(error => {
    //     console.error('Erro:', error);
    // });
  });
}