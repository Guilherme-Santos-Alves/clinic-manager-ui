let idAppointment;

// function showPopup(id){
//     let popupBtns = document.querySelector(".popup-btn");
//     popupBtns.innerHTML = '';
//     let closePopup = document.querySelector(".close-popup");
//     let popup = document.querySelector(".popup");
//     popup.style.display = "block";

//     idAppointment = id;

//     let templateBtns = `
//     <button class="enter" id="btn-enter">Entrar na Reunião</button>
//     <button class="attachment" id="btn-attachment">Gerar Anexo</button>
//     <button class="finish" id="btn-finish">Finalizar</button>
//     `;

//     popupBtns.insertAdjacentHTML("beforeend", templateBtns);
//     closePopup.removeEventListener("click", closePopupHandler);
//     closePopup.addEventListener("click", closePopupHandler);
// }

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

// Função para fechar o popup
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
        // getPrescription(`${idAppointment}`);
        // getMedicalCertificate(`${idAppointment}`);
        getExamRequest(`${idAppointment}`);
    });
}

let namePatient = localStorage.getItem("patientName");
let cpfPatient = localStorage.getItem("document");
let appointmentBody;

function getMedicalCertificate(id) {
    return new Promise((resolve, reject) => {
        let attachments = document.querySelector(".attachments");
        attachments.innerHTML = '';

        let status = document.getElementById("select-staus").value;

        let roleUrl = localStorage.getItem("roleName");

        let userId;
        if (roleUrl === 'patients') {
            userId = localStorage.getItem("patientId");
        } else if (roleUrl === 'doctors') {
            userId = localStorage.getItem("doctorId");
        }

        let appointmentId = id;

        const token = localStorage.getItem("token");

        fetch(`https://localhost:7231/api/services/${roleUrl}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((response) => {
                response.json().then((appointments) => {
                    const appointment = appointments.find(appointment => appointment.id == appointmentId);
                    console.log(appointmentId);
                    if (appointment) {
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

                        let template = `
                        <div class="medical-certificate">
                            <h1>Atestado Médico</h1>
                            <form class="content" action="javascript:void(0)" onsubmit="postMedicalCertificate()" id="form-medical-certififcate">
                                <ul>
                                    Atesto para os devidos fins que o 
                                    <div class="for">Sr. (a) ${appointment.patientName},</div>
                                </ul>
                                portador do CPF:
                                <ul>
                                    <div class="cpf">${cpfPatient},</div>
                                    esteve sob cuidados
                                </ul>
                                <ul>
                                    médicos no dia
                                    <div class="from-date">
                                        ${date + "/" + month}
                                    </div>
                                    e deverá se afastar de suas
                                </ul>
                                <ul>
                                    atividades pelo período de até:
                                    <input class="until-date" type="number" placeholder="Dias:" required>
                                    por motivo de:
                                </ul>
                                <textarea name="" id="" cols="30" rows="10" class="reason" required></textarea>
                                <div class="btn"><button>Enviar</button></div>
                            </form>
                        </div>
                        `;

                        document.querySelector(".attachments").insertAdjacentHTML("beforeend", template);
                        
                        closePopup = document.querySelector(".close-popup");
                        idAppointment = id;

                        let popupBtns = document.querySelector(".popup-btn");
                        popupBtns.innerHTML = '';
                        popupBtns.style.display = 'none';

                        appointmentBody = appointment;
                        resolve(appointmentBody);

                    } else {
                        console.log("Appointment não encontrado com o ID fornecido:", id);
                        reject("Appointment não encontrado");
                    }
                });
            })
            .catch(error => {
                console.error("Erro ao buscar os dados:", error);
                reject(error);
            });
    });
}

function postMedicalCertificate() {
    const token = localStorage.getItem("token");
    console.log(appointmentBody);

    const sickLeaveDurationValue = parseInt(document.querySelector(".until-date").value);
    const sickLeaveMotiveValue = document.querySelector(".reason").value;
   
    const jsonDataMedicalCertificate = {
        patientId: appointmentBody.patientId,
        doctorId: appointmentBody.doctorId,
        sickLeaveDuration: sickLeaveDurationValue,
        sickLeaveMotive: sickLeaveMotiveValue
    };
    console.log(jsonDataMedicalCertificate);

    fetch("https://localhost:7231/api/attachments/medicalcertificate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonDataMedicalCertificate)
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
