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
  }, 6000);
}

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
  let contentConsultations = document.querySelector(".cl-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".cl-exams");
  contentExams.innerHTML = '';
  let contentAppointments = document.querySelector(".my-appointments");
  contentAppointments.innerHTML = '';

  const templateExams = `
  <h1 class="title">Agendar Exame</h1>
  <form action="javascript:void(0)" class="form-box">
      
      <div class="specialty" id="specialty">
          <div class="select-custom -exam-or-consultation" id="select-custom">
              <label class="select-speciality" for="specialty-exam">Selecione a especialidade do exame:</label>
              <select required name="specialty" id="specialty-exam">
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
          <select name="doctors-list" id="doctors-list">
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
          <input class="input" required placeholder="Digite o nome do exame">
      </div>   
      <div class="from-the-hour">
          <label class="between" for="exams-from-hour">Entre:</label> 
          <input required class="input" type="time" id="exams-from-hour" value="00:00">
          <label class="e" for="exams-until-hour">e</label> 
          <input required class="input" type="time" id="exams-until-hour" value="23:59">
      </div>
      <div class="cl-button -patient">
          <button type="submit" class="btn-link" id="btn-link-exam" >Continuar</button>
      </div>
  </form>
  `;
  
  listDoctorsSelect();

  document.querySelector(".cl-exams").insertAdjacentHTML("beforeend", templateExams);  
}

function buildInputsConsultations() {
  let contentConsultations = document.querySelector(".cl-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".cl-exams");
  contentExams.innerHTML = '';
  let contentAppointments = document.querySelector(".my-appointments");
  contentAppointments.innerHTML = '';
  
  let templateConsultations = `
  <h1 class="title">Agendar Consulta</h1>
    <form action="javascript:void(0)" class="form-box" onsubmit="fetchConsultations()">
        <div class="specialty" id="specialty">
            <div class="select-custom -exam-or-consultation" id="select-custom">
                <label class="select-speciality" for="specialty-consultation">Selecione a especialidade da consulta:</label>
                    <select name="specialty" id="specialty-consultation">
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
            <select name="doctors-list" id="doctors-list">
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
          <label class="e" for="consultations-until-hour">Data:</label>
          <input class="input" type="date" id="consultations-until-hour" value="23:59">
          <label class="between" for="consultations-from-hour">Hora:</label>
          <input class="input" type="time" id="consultations-from-hour" value="00:00">               
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

  document.querySelector(".cl-consultations").insertAdjacentHTML("beforeend", templateConsultations);
  
}

function fetchConsultations(){
  const jsonDataConsultations = {
    specialtyConsultation: document.querySelector("#specialty-consultation").value,
    modality: checkModality(),
    fromHour: document.querySelector("#consultations-from-hour").value,
    untilHour: document.querySelector("#consultations-until-hour").value,
  };

  console.log(jsonDataConsultations);

  fetch("https://localhost:7252/api/patients", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  })
  .then(response => response.json())
  .then(response => {
      console.log(response);
      window.location.href = "index.html";
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}

function buildMyAppoinyments(){
  let contentConsultations = document.querySelector(".cl-consultations");
  contentConsultations.innerHTML = '';
  let contentExams = document.querySelector(".cl-exams");
  contentExams.innerHTML = '';
  let contentAppointments = document.querySelector(".my-appointments");
  contentAppointments.innerHTML = '';

  let templateAppointments = `
  <h1>Meus Agendamentos</h1>
  <form class="form-appointments" action="">
      <div class="search-input">
          <label for="select-custom">Pesquisa:</label>
          <input type="text" >
      </div>
      <div class="select-custom -appointments" id="select-custom">
          <label for="select-staus">Status:</label>
          <select name="" id="select-staus">
              <option value="">Todos</option>
              <option selected value="">Agendado</option>
              <option value="">Efetivado</option>
              <option value="">Não Realizado</option>
              <option value="">Cancelado</option>
          </select>
          <div class="custom-arrow">
              <span class="material-symbols-outlined">
                  arrow_drop_down
              </span>
          </div>
      </div> 
      <div class="search-button">
          <button type="submit" class="search">
              <span class="material-symbols-outlined">
                  search
              </span>
          </button>
      </div>
  </form>
  <div class="appointments">
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
      <div class="content">
          <ul>21/12/23 - 10:30</ul>
          <ul>Clínica Médica</ul>
          <ul>Av.Terminal de Papicu</ul>
      </div>
  </div>
  `;

  document.querySelector(".my-appointments").insertAdjacentHTML("beforeend", templateAppointments);
}