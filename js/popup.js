let idAppointment;

function showPopup(id) {
    idAppointment = id;
    let popup = document.querySelector(".popup");
    let closePopup = document.querySelector(".close-popup");

    popup.style.display = "none";
    popup.style.display = "block";

    closePopup.addEventListener("click", function() {
        popup.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", function() {
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
    });
});




