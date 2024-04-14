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
              let listDoctors = `
              <div class="row">
                <h6 class="title">-</h6>
                <button class="description">10h:30</button>
                <p class="doctor-name">${doctor.firstName + " " + doctor.lastName}</p>
              </div>`
              
              document.querySelector("#table-body").insertAdjacentHTML("beforeend" , listDoctors);
            });
        });
    });
  }