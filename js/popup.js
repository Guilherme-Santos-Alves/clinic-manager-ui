let idAppointment;

let closePopup;

function cleanPopup() {
    const attachmentsElement = document.querySelector(".attachments");
    if (attachmentsElement) {
        attachmentsElement.innerHTML = '';
    }

    const popupBtnElement = document.querySelector(".popup-btn");
    if (popupBtnElement) {
        popupBtnElement.innerHTML = '';
    }

    const popupMessageElement = document.querySelector(".popup-message");
    if (popupMessageElement) {
        popupMessageElement.innerHTML = '';
    }

    const inativeDoctorElement = document.querySelector(".inative-doctor");
    if (inativeDoctorElement) {
        inativeDoctorElement.innerHTML = '';
    }

    const inativePatientElement = document.querySelector(".inative-patient");
    if (inativePatientElement) {
        inativePatientElement.innerHTML = '';
    }

    const popupCancelAppointment = document.querySelector(".cancel-appointment");
    if (popupCancelAppointment) {
        popupCancelAppointment.innerHTML = '';
    }
}

function showPopup(id) {
    cleanPopup();
    startAppointment(id);
    console.log("cahmou");

    let status = document.getElementById("select-staus").value;

    const token = localStorage.getItem("token");

    //`https://localhost:7231/api/services?status=${status}` URL COM O PARAMETRO STATUS
    fetch(`https://localhost:7231/api/services/${id}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    })
    .then((response) => {
        response.json().then((appointment) => {  
            let popup = document.querySelector(".popup");
            closePopup = document.querySelector(".close-popup");
            idAppointment = appointment.id;
            doctorId = appointment.doctorId;

            let popupBtns = document.querySelector(".popup-btn");
            popupBtns.style.display = 'block';

            let templateBtns = `
            <div class="buttons">
                <a class="enter" id="btn-enter" href="${appointment.meetingLink}" target="_blank">Entrar na Reunião</a>
                <button class="attachment" id="btn-attachment">Gerar Anexo</button>
                <button class="finish" id="btn-finish" onclick="finishAppointment(${appointment.id})">Finalizar</button>            
            </div>
            `;

            popupBtns.insertAdjacentHTML("beforeend", templateBtns);

            popup.style.display = "none";
            popup.style.display = "block";

            closePopup.removeEventListener("click", closePopupHandler);
            closePopup.addEventListener("click", closePopupHandler);
            funcionalidadesBtn(doctorId);
            });
        });
};


function closePopupHandler() {
    let popup = document.querySelector(".popup");
    popup.style.display = "none";
}

function funcionalidadesBtn(doctorId){
    let btnEnter = document.querySelector("#btn-enter");
    let btnFinish = document.querySelector("#btn-finish");
    let btnAttachment = document.querySelector("#btn-attachment");

    btnFinish.addEventListener("click", function() {
        finishAppointment(`${idAppointment}`);
    });

    btnAttachment.addEventListener("click", function() {
        attachmentsBtn(`${idAppointment}, ${doctorId}`);
    });
}

function attachmentsBtn(id, doctorId){
    cleanPopup();

    let template =`
        <div class="buttons">
            <button class="medical-prescription" onclick="getPrescription(${id}, ${doctorId})">Receita Médica</button>
            <button class="certificate" onclick="getMedicalCertificate(${id}, ${doctorId})">Atestado Médico</button>
            <button class="exam-request-btn" onclick="getExamRequest(${id}, ${doctorId})">Solicitar Exame</button>
        </div>
    `;

    document.querySelector(".attachments-btn").insertAdjacentHTML("beforeend", template);
}

function popupInativeDoctor(id){
    cleanPopup();

    let popup = document.querySelector(".popup");
    closePopup = document.querySelector(".close-popup");

    popup.style.display = "none";
    popup.style.display = "block";

    closePopup.removeEventListener("click", closePopupHandler);
    closePopup.addEventListener("click", closePopupHandler);

    const token = localStorage.getItem("token");

    fetch(`https://localhost:7231/api/doctors/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      response.json().then((doctor) => {
        let template = `
        <h1>Inativar Médico?</h1>
        <h4>Você está certo de que deseja inativar ${doctor.firstName + " " + doctor.lastName}?</h4>
        <div class="inative-btns">
            <button onclick="inativeDoctor(${id})">Inativar</button>
            <button class="cancel" onclick="closePopupHandler()">Cancelar</button>
        </div>
        `;

        document.querySelector(".inative-doctor").insertAdjacentHTML("beforeend", template);
      });
    });
}

function popupInativePatient(id){
    cleanPopup();

    let popup = document.querySelector(".popup");
    closePopup = document.querySelector(".close-popup");

    popup.style.display = "none";
    popup.style.display = "block";

    closePopup.removeEventListener("click", closePopupHandler);
    closePopup.addEventListener("click", closePopupHandler);

    const token = localStorage.getItem("token");

    fetch(`https://localhost:7231/api/patients/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((response) => {
      response.json().then((patient) => {
        let template = `
        <h1>Inativar Paciente?</h1>
        <h4>Você está certo de que deseja inativar ${patient.firstName + " " + patient.lastName}?</h4>
        <div class="inative-btns">
            <button onclick="inativePatient(${id})">Inativar</button>
            <button class="cancel" onclick="closePopupHandler()">Cancelar</button>
        </div>
        `;

        document.querySelector(".inative-patient").insertAdjacentHTML("beforeend", template);
      });
    });
}

function popupCancelAppointment(id, appointmentName){
    cleanPopup();
    console.log(id, + appointmentName);

    let popup = document.querySelector(".popup");
    closePopup = document.querySelector(".close-popup");

    popup.style.display = "none";
    popup.style.display = "block";

    closePopup.removeEventListener("click", closePopupHandler);
    closePopup.addEventListener("click", closePopupHandler);

    let template = `
    <h1>Cancelar Agendamento?</h1>
    <h4>Você está certo de que deseja cancelar ${appointmentName}?</h4>
    <div class="inative-btns">
        <button onclick="cancelAppointment(${id})">Sim</button>
        <button class="cancel" onclick="closePopupHandler()">Voltar</button>
    </div>
    `;

    document.querySelector(".cancel-appointment").insertAdjacentHTML("beforeend", template);
}