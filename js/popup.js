let idAppointment;

let closePopup;

function showPopup(id) {
    let attachments = document.querySelector(".attachments");
    attachments.innerHTML = '';
    let popup = document.querySelector(".popup");
    closePopup = document.querySelector(".close-popup");
    idAppointment = id;

    let popupBtns = document.querySelector(".popup-btn");
    popupBtns.innerHTML = '';
    popupBtns.style.display = 'block';
    let templateBtns = `
     <button class="enter" id="btn-enter">Entrar na Reunião</button>
     <button class="attachment" id="btn-attachment">Gerar Anexo</button>
     <button class="finish" id="btn-finish">Finalizar</button>
     `;

    popupBtns.insertAdjacentHTML("beforeend", templateBtns);

    popup.style.display = "none";
    popup.style.display = "block";

    closePopup.removeEventListener("click", closePopupHandler);
    closePopup.addEventListener("click", closePopupHandler);
    funcionalidadesBtn();
}

function closePopupHandler() {
    let popup = document.querySelector(".popup");
    popup.style.display = "none";
}

function funcionalidadesBtn(){
    let btnEnter = document.querySelector("#btn-enter");
    let btnFinish = document.querySelector("#btn-finish");
    let btnAttachment = document.querySelector("#btn-attachment");
    

    btnEnter.addEventListener("click", function() {
        startAppointment(`${idAppointment}`);
    });

    btnFinish.addEventListener("click", function() {
        finishAppointment(`${idAppointment}`);
    });

    btnAttachment.addEventListener("click", function() {
        alert(`anexo${idAppointment}`);
        attachmentsBtn();
    });
}

function attachmentsBtn(){
    let attachmentsBtnContainer = document.querySelector(".popup-btn");
    attachmentsBtnContainer.innerHTML = '';

    let template =`
        <button class="medical-prescription" onclick="getPrescription(${idAppointment})">Receita Médica</button>
        <button class="certificate" onclick="getMedicalCertificate(${idAppointment})">Atestado Médico</button>
        <button class="exam-request-btn" onclick="getExamRequest(${idAppointment})">Solicitar Exame</button>
    `;

    attachmentsBtnContainer.insertAdjacentHTML("beforeend", template);
}