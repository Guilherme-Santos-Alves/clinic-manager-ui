function getPrescription(id){
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
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
    
}

function getExamRequest(id){
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
        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
}