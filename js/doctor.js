

window.onload = function() {
  const token = localStorage.getItem("token");

  if (token === null || token === undefined){
    window.location.href = "index.html";
  }
  
  const doctorDocument = localStorage.getItem("document");

  fetch(`https://localhost:7231/api/doctors/document/${doctorDocument}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then((response) => {
    response.json().then((doctor) => {
      let showName = `${doctor.firstName + " " + doctor.lastName}`;
      document.querySelector(".name").insertAdjacentHTML("beforeend" , showName);
      doctorId = doctor.userId;
      localStorage.setItem("doctorId", doctorId);
    });
  });
}

function appointmentsDoctor(){
  let cleanAppointments = document.querySelector(".appointments");
  cleanAppointments.innerHTML = '';

  let status = document.getElementById("select-staus").value;

  const token = localStorage.getItem("token");
  console.log("chamou" + doctorId);
  
  //`https://localhost:7231/api/services?status=${status}` URL COM O PARAMETRO STATUS
  fetch(`https://localhost:7231/api/services/doctors/${doctorId}`, {
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
                  `<button class="cancel" onclick="popupCancelAppointment(${idAppointment}, '${appointment.name}')">Cancelar</button>` +
              '</div>'
              '</div>';

  
              document.querySelector(".appointments").insertAdjacentHTML("beforeend", hourAndMinutes);
              console.log("e"+appointments);
          });
      });
  });
}

function enterMeetingDoctor(){

  const token = localStorage.getItem("token");
  
  //`https://localhost:7231/api/services?status=${status}` URL COM O PARAMETRO STATUS
  fetch(`https://localhost:7231/api/services/doctors/${doctorId}`, {
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
                  `<button class="cancel" onclick="popupCancelAppointment(${idAppointment}, '${appointment.name}')">Cancelar</button>` +
              '</div>'
              '</div>';

  
              document.querySelector(".appointments").insertAdjacentHTML("beforeend", hourAndMinutes);
              console.log("e"+appointments);
          });
      });
  });
}
