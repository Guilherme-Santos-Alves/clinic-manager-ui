document.addEventListener("DOMContentLoaded", function() {
    let optionExams = document.querySelector("#option-exams");
    let optionConsultations = document.querySelector("#option-consultations");

    let contentConsultations = document.querySelector(".content-consultations");
    let contentExams = document.querySelector(".content-exams");

    optionExams.addEventListener('change', function(e) {
        if (optionExams.checked) {
            contentExams.style.display = 'block';
            // MOSTRA OS DADOS DA ESPECIALIDADE EXAME
            // ESCONDE OS DADOS DO INPUT NÃO SELECIONADO
            optionConsultations.checked = false;
            contentConsultations.style.display = 'none';
        } else {
            contentExams.style.display = 'none';
        }
    });
    
    optionConsultations.addEventListener('change', function(e) {
        if (optionConsultations.checked) {
            contentConsultations.style.display = 'block';
            // MOSTRA OS DADOS DA ESPECIALIDADE CONSULTA
            // ESCONDE OS DADOS DO INPUT NÃO SELECIONADO
            optionExams.checked = false;
            contentExams.style.display = 'none';
        } else {
            contentConsultations.style.display = 'none';
        }
    });
});

// Função para enviar os dados do formulário para a API
function examsData() {
    let payload = {
        specialtyExam: document.querySelector("#specialty-exam").value,
        fromHour: document.querySelector("#exams-from-hour").value,
        untilHour: document.querySelector("#exams-until-hour").value
    };

    // Atualizar os valores padrão apenas se os valores forem diferentes dos padrões
    
    fetch("https://65f9ccd23909a9a65b1966ed.mockapi.io/api/exams" , {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
}

