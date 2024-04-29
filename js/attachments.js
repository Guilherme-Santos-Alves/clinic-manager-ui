let appointmentBody;

function getPrescription(id){
    let attachmentsBtn = document.querySelector("#btn-attachments");
    attachmentsBtn.style.display = 'none';
    let userId = localStorage.getItem("doctorId");

    const token = localStorage.getItem("token");

    fetch(`https://localhost:7231/api/services/doctors/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then((response) => {
        response.json().then((appointments) => {
            const appointment = appointments.find(appointment => appointment.id == id);
            if (appointment) {

                let template = `
                    <form class="prescriptions" id="form-prescriptions" action="javascript:void(0)" onsubmit="postPrescription()">
                        <h1>Receita Médica</h1>
                        <div class="for">
                            <ul>Para:</ul>
                            <div class="name"><ul>${appointment.patientName}</ul></div>
                        </div>
                        <div class="prescription">
                            <ul>Prescrição:</ul>
                            <textarea rows="8" cols="50" id="text-prescription"></textarea>
                        </div>
                        <div class="btn"><button>Enviar</button></div>
                    </form>
                `;

                document.querySelector(".attachments").insertAdjacentHTML("beforeend", template);
                
                closePopup = document.querySelector(".close-popup");
                idAppointment = id;

                let popupBtns = document.querySelector(".popup-btn");
                popupBtns.innerHTML = '';
                popupBtns.style.display = 'none';

                appointmentBody = appointment;

            }
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
        reject(error);
    });
};

function postPrescription() {
    const token = localStorage.getItem("token");
    console.log(appointmentBody);

    let TextPrescription = document.querySelector("#text-prescription").value;
   
    const jsonDataPrescription = {
        patientId: appointmentBody.patientId,
        doctorId: appointmentBody.doctorId,
        content: TextPrescription
    };
    console.log(jsonDataPrescription);

    fetch("https://localhost:7231/api/attachments/prescription", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonDataPrescription)
    })
    .then(response => {
        console.log(response);
        limparCampos()
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
}

function getExamRequest(id){
    let attachmentsBtn = document.querySelector("#btn-attachments");
    attachmentsBtn.style.display = 'none';
    let userId = localStorage.getItem("doctorId");

    const token = localStorage.getItem("token");

    fetch(`https://localhost:7231/api/services/doctors/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then((response) => {
        response.json().then((appointments) => {
            const appointment = appointments.find(appointment => appointment.id == id);
            if (appointment) {

                let template = `
                <form class="exam-request" id="form-exam-request" action="javascript:void(0)" onsubmit="postExamRequest()">
                    <h1>Solicitar Exame</h1>
                    <div class="for">
                        <ul>Para:</ul>
                        <div class="name"><ul>${appointment.patientName}</ul></div>
                    </div>
                    <div class="request">
                        <ul>Solicito os seguintes exames:</ul>
                        <textarea rows="8" cols="50" id="exam-request"></textarea>
                    </div>
                    <div class="btn"><button>Enviar</button></div>
                </form>
                `;

                document.querySelector(".attachments").insertAdjacentHTML("beforeend", template);
                
                closePopup = document.querySelector(".close-popup");
                idAppointment = id;

                let popupBtns = document.querySelector(".popup-btn");
                popupBtns.innerHTML = '';
                popupBtns.style.display = 'none';

                appointmentBody = appointment;
                console.log(appointmentBody);

            }
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
        reject(error);
    });
};

function postExamRequest() {
    console.log("funçãop chamada")
    const token = localStorage.getItem("token");
    console.log(appointmentBody);

    let TextExamRequest = document.querySelector("#exam-request").value;
   
    const jsonDataExamRequest = {
        patientId: appointmentBody.patientId,
        doctorId: appointmentBody.doctorId,
        content: TextExamRequest
    };
    console.log(jsonDataExamRequest);

    fetch("https://localhost:7231/api/attachments/examrequest", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonDataExamRequest)
    })
    .then(response => {
        console.log(response);
        limparCampos()
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
}

function getMedicalCertificate(id) {
    let cpfPatient = localStorage.getItem("document");
    let attachmentsBtn = document.querySelector("#btn-attachments");
    attachmentsBtn.style.display = 'none';
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
                        <ul>
                            esteve sob cuidados médicos no dia
                            <div class="from-date">
                                ${date + "/" + month}
                            </div>
                            e deverá se afastar de suas
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
                popupBtns.style.display = 'none';

                appointmentBody = appointment;

            }
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
        reject(error);
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
        limparCampoExam();
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
    
}