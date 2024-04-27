function buildMyAppointments(role){
    let contentConsultations = document.querySelector(".cl-consultations");
    contentConsultations.innerHTML = '';
    let contentExams = document.querySelector(".cl-exams");
    contentExams.innerHTML = '';
    let contentAppointments = document.querySelector(".my-appointments");
    contentAppointments.innerHTML = '';
    let registrationData = document.querySelector(".registration-data");
    registrationData.innerHTML = '';
  
    let templateAppointments = `
    <h1>Meus Agendamentos</h1>
    <form class="form-appointments" action="javascript:void(0)" onsubmit="appointments()">
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
    localStorage.setItem("roleName", role);
}
  
function appointments(role){
    let cleanAppointments = document.querySelector(".appointments");
    cleanAppointments.innerHTML = '';

    let status = document.getElementById("select-staus").value;

    let roleUrl = localStorage.getItem("roleName");

    let userId;
    if (roleUrl === 'patients'){
        userId = localStorage.getItem("patientId");
    } else if (roleUrl === 'doctors'){
        userId = localStorage.getItem("doctorId");
    }

    const token = localStorage.getItem("token");
    
    //`https://localhost:7231/api/services?status=${status}` URL COM O PARAMETRO STATUS
    fetch(`https://localhost:7231/api/services/${roleUrl}/${userId}`, {
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
                
                let hourAndMinutes = 
                '<div class="content" id="content-appointment">' +
                '<div class="data">' +
                    '<ul> Data: ' + date + "/" + month + "  -  " +  'Hora: ' + hour + ":" + minutes + '</ul>' +
                    '<ul>' + appointment.name + '</ul>' +
                    '<ul>Dr. ' + appointment.doctorName + '</ul>' +
                    '<ul>Av.Terminal de Papicu, 262</ul>' +
                '</div>' +
                '<div class="btns">' +
                    `<button class="start" onclick="showPopup(${idAppointment})">Iniciar</button>` +
                    '<button class="cancel">Cancelar</button>' +
                '</div>'
                '</div>';

    
                document.querySelector(".appointments").insertAdjacentHTML("beforeend", hourAndMinutes);
            });
        });
    });
}

// function appointmentsDoctor(role){
//     let cleanAppointments = document.querySelector(".appointments");
//     cleanAppointments.innerHTML = '';

//     let status = document.getElementById("select-staus").value;

//     let doctorId = localStorage.getItem("doctorId");
//     const token = localStorage.getItem("token");
    
//     //`https://localhost:7231/api/services?status=${status}` URL COM O PARAMETRO STATUS
//     fetch(`https://localhost:7231/api/services/${role}/${doctorId}`, {
//     method: 'GET',
//     headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//     },
//     })
//     .then((response) => {
//         response.json().then((appointments) => {
//             appointments.forEach((appointment) => {
//                 var startDateStr = appointment.startDate;
//                 var startDate = new Date(startDateStr);
//                 var hour = startDate.getHours();
//                 var minutes = startDate.getMinutes();
//                 var date = startDate.getDate();
//                 var month = startDate.getMonth() + 1;
//                 minutes = minutes < 10 ? "0" + minutes : minutes;
//                 hour = hour < 10 ? "0" + hour : hour;
//                 month = month < 10 ? "0" + month : month;
//                 date = date < 10 ? "0" + date : date;
//                 let idAppointment = appointment.id;
                
//                 let hourAndMinutes = 
//                 '<div class="content" id="content-appointment">' +
//                 '<div class="data">' +
//                     '<ul> Data: ' + date + "/" + month + "  -  " +  'Hora: ' + hour + ":" + minutes + '</ul>' +
//                     '<ul>' + appointment.name + '</ul>' +
//                     '<ul>Dr. ' + appointment.doctorName + '</ul>' +
//                     '<ul>Av.Terminal de Papicu, 262</ul>' +
//                 '</div>' +
//                 '<div class="btns">' +
//                     `<button class="start" onclick="showPopup(${idAppointment})">Iniciar</button>` +
//                     '<button class="cancel">Cancelar</button>' +
//                 '</div>'
//                 '</div>';

    
//                 document.querySelector(".appointments").insertAdjacentHTML("beforeend", hourAndMinutes);
//             });
//         });
//     });
// }

function finishAppointment(id){
    const token = localStorage.getItem("token");
    fetch(`https://localhost:7231/api/services/finish/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
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
    });
}