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
      let doctorId = doctor.userId;
      localStorage.setItem("doctorId", doctorId);
    });
  });
}