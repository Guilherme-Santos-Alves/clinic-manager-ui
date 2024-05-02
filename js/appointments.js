function buildMyAppointments(){
    let contentConsult = document.querySelector(".consult-user");
    if (contentConsult){
        contentConsult.innerHTML = '';
    }
    let contentConsultations = document.querySelector(".cl-consultations");
    contentConsultations.innerHTML = '';
    let contentExams = document.querySelector(".cl-exams");
    contentExams.innerHTML = '';
    let contentAppointments = document.querySelector(".my-appointments");
    contentAppointments.innerHTML = '';

    let registrationData = document.querySelector(".registration-data");
    if(registrationData){

        registrationData.innerHTML = '';
    } 
  
    let templateAppointments = `
    <h1>Agendamentos</h1>
    <form class="form-appointments" action="javascript:void(0)" onsubmit="appointmentsRedirect()">
        <div class="search-input">
            <label for="select-custom">Pesquisa:</label>
            <input type="text" >
        </div>
        <div class="select-custom -appointments" id="select-custom">
            <label for="select-staus">Status:</label>
            <select name="" id="select-staus">
                <option value="all">Todos</option>
                <option selected value="pending">Agendado</option>
                <option value="finished">Efetivado</option>
                <option value="">Não Realizado</option>
                <option value="canceled">Cancelado</option>
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
        
    </div>
    `;
    document.querySelector(".my-appointments").insertAdjacentHTML("beforeend", templateAppointments);
}

function appointmentsRedirect(){
    let roleName = localStorage.getItem("roleName");

    if (roleName === "Receptionist"){
        appointments();
    } else if (roleName === "Patient"){
        appointmentsPatient();
    } else if (roleName === "Doctor"){
        appointmentsDoctor();
    }
}
  
function appointments(){
    let cleanAppointments = document.querySelector(".appointments");
    cleanAppointments.innerHTML = '';

    let status = document.getElementById("select-staus").value;

    const token = localStorage.getItem("token");
    
    //`https://localhost:7231/api/services?status=${status}` URL COM O PARAMETRO STATUS
    fetch(`https://localhost:7231/api/services`, {
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
                if (appointment.modality === 0){
                    adress = "Rua Inexistente, 262"
                } else {
                    adress = "Telemedicina";
                }
                
                let hourAndMinutes = `
                <div class="content" id="content-appointment"> 
                <div class="data"> 
                    <ul> Data: `+ date + "/" + month + "  -  " +  "Hora: " +  hour + ":" + minutes +` </ul>
                    <ul> ${appointment.name} </ul> 
                    <ul>Dr. ${appointment.doctorName}</ul> 
                    <ul>Paciente: ${appointment.patientName}</ul> 
                    <ul>${adress}</ul> 
                </div> 
                <div class="btns -recepcionist"> 
                    <button class="cancel " onclick="popupCancelAppointment(${idAppointment}, '${appointment.name}')">Cancelar</button> 
                </div>
                </div>
                `;

    
                document.querySelector(".appointments").insertAdjacentHTML("beforeend", hourAndMinutes);
            });
        });
    });
}

function cancelAppointment(idAppointment){
    const token = localStorage.getItem("token");
    console.log(idAppointment);

    fetch(`https://localhost:7231/api/services/${idAppointment}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
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

function finishAppointment(id){
    const token = localStorage.getItem("token");
    fetch(`https://localhost:7231/api/services/finish/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    })
    .then(response => {
        console.log(response+ 'chamado');

        showToast(successMsg);
    })
    .catch(error => {
        console.error('Erro:', error);
        showToast(errorMsg);
    });
}

function startAppointment(id){
    const token = localStorage.getItem("token");
    fetch(`https://localhost:7231/api/services/start/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    })
}