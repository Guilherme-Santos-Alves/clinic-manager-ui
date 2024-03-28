document.addEventListener("DOMContentLoaded", function () {
  let optionRadios = document.getElementsByName("option");

  // Adicionando um ouvinte de evento de mudança a cada rádio
  optionRadios.forEach((radio) => {
    radio.addEventListener("change", checkExamOrConsultation);
  });

  // Função para verificar se a opção de exame ou consulta foi selecionada e chamar a função apropriada
  function checkExamOrConsultation() {
    if (optionRadios[0].checked) {
      console.log("Opção Exame selecionada.");
      buildInputsExams();
      // Se a opção de exame foi selecionada, remova o ouvinte de evento da opção de consulta
      optionRadios[1].removeEventListener("change", buildInputsExams);
    } else if (optionRadios[1].checked) {
      console.log("Opção Consulta selecionada.");
      buildInputsConsultations();
      // Se a opção de consulta foi selecionada, remova o ouvinte de evento da opção de exame
      optionRadios[0].removeEventListener("change", buildInputsConsultations);
    }
  }
});

// VERFIFICAR INPUTS DE PRESENCIAL OU VIRTUAL
function checkModality() {
  let modality = document.getElementsByName("modality");

  if (modality[0].checked === true) {
    return "virtual";
  } else if (modality[1].checked === true) {
    return "presential";
  } else if (modality[2].checked === true) {
    return "virtual";
  } else if (modality[3].checked === true) {
    return "presential";
  }
}

function buildInputsExams() {
    // Template do formulário de exames
    const templateExams = `
        <div class="specialty" id="specialty">
            <label class="select-speciality" for="specialty-exam">Selecione a Especialidade do exame:</label>
            <select required name="specialty" id="specialty-exam">
                <option value="" disabled selected>Especialidade</option> 
                <option value="Eletrocardiograma">Eletrocardiograma</option>
                <option value="Raio X">Raio X</option>
            </select>
        </div>   
        <div class="from-the-hour">
            <label for="exams-from-hour">Entre:</label> 
            <input required class="input" type="time" id="exams-from-hour" value="00:00">
            <label for="exams-until-hour">e</label> 
            <input required class="input" type="time" id="exams-until-hour" value="23:59">
        </div>
        <div class="radio-container">
            <span class="material-symbols-outlined">phone_iphone</span>
            <label for="radio-virtual-exams">Telemedicina</label>
            <input required name="modality" class="radio" type="radio" id="radio-virtual-exams">
            <span class="material-symbols-outlined">person</span>
            <label for="radio-presential-exams">Presencial</label>
            <input required name="modality" class="radio" type="radio" id="radio-presential-exams">
        </div>
        <div class="cl-button -patient">
            <button type="submit" class="btn-link" id="btn-link-exam">Continuar</button>
        </div>
    `;

    // Inserir o formulário na seção de exames
    document.querySelector(".content-exams").insertAdjacentHTML("beforeend", templateExams);

    // Capturar o formulário quando for submetido
    const patientForm = document.querySelector(".left");

    patientForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar o comportamento padrão de enviar o formulário

        // Capturar os dados do formulário
        const specialtyExam = document.querySelector("#specialty-exam").value;
        const modality = document.querySelector('input[name="modality"]:checked').value;
        const fromHour = document.querySelector("#exams-from-hour").value;
        const untilHour = document.querySelector("#exams-until-hour").value;

        // Criar objeto com os dados do exame
        const jsonDataExams = {
            specialtyExam: specialtyExam,
            modality: modality,
            fromHour: fromHour,
            untilHour: untilHour
        };

        // Exibir os dados do exame no console (para debug)
        console.log(jsonDataExams);

        // Enviar para a API (descomentar e implementar conforme necessário)
        /*
        fetch("https://localhost:7252/api/patients", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonDataExams)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Erro:', error);
        });
        */
    });
}

function buildInputsConsultations() {
  let templateConsultations = `
        <div class="specialty" id="specialty">
        <label class="select-speciality" for="specialty-consultation">Selecione a Especialidade da consulta:</label><select name="specialty" id="specialty-consultation">
            <option value="" disabled selected >Especialidade</option> 
            <option value="Cardiologia">Cardiologia</option>
            <option value="Ortopedia">Ortopedia</option>
        </select>
        </div>
        <div class="from-the-hour" >
            <label for="from-date">Entre:</label> <input class="input" type="time" id="consultations-from-hour" value="00:00">
            <label for="from-date">e</label> <input class="input" type="time" id="consultations-until-hour" value="23:59">
        </div>
        <div class="radio-container">
            <span class="material-symbols-outlined">
                phone_iphone
            </span>
            <label for="radio-virtual-consultations">Telemedicina</label><input required name="modality" class="radio" type="radio" id="radio-virtual-consultations" onchange="checkModality()">
            <span class="material-symbols-outlined">
                person
            </span>
            <label for="radio-presential-consultations">Presencial</label><input required name="modality" class="radio" type="radio" id="radio-presential-consultations" onchange="checkModality()">
        </div>
        <div class="cl-button -patient">
            <button type="submit" class="btn-link" id="btn-link-consultation">Continuar</button>
        </div>
          `;
  document.querySelector(".content-consultations").insertAdjacentHTML("beforeend", templateConsultations);

  const patient = document.querySelector(".left");

  patient.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const jsonDataConsultations = {
      specialtyConsultation: document.querySelector("#specialty-consultation").value,
      modality: checkModality(),
      fromHour: document.querySelector("#consultations-from-hour").value,
      untilHour: document.querySelector("#consultations-until-hour").value,
    };

    console.log(jsonDataConsultations);

    // Enviar para a API
    // fetch("https://localhost:7252/api/patients", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(jsonData)
    // })
    // .then(response => response.json())
    // .then(response => {
    //     console.log(response);
    //     window.location.href = "index.html";
    // })
    // .catch(error => {
    //     console.error('Erro:', error);
    // });
  });
}
