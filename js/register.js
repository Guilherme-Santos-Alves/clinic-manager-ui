document.addEventListener('DOMContentLoaded', function() {
    const pacientRegisterOne = document.getElementById('form-register-one');

    pacientRegisterOne.addEventListener('submit', evento => {
        evento.preventDefault();

        const formData = new FormData(pacientRegisterOne);
        const data = Object.fromEntries(formData);

        localStorage.setItem('personalData', JSON.stringify(data));

        console.log(data);
    });

});
