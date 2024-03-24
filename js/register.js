function setPersonalData() {
    localStorage.setItem('name', document.querySelector('#rg-name').value);
    localStorage.setItem('surname', document.querySelector('#rg-surname').value);
    localStorage.setItem('birthdate', document.querySelector('#rg-birthdate').value);
    localStorage.setItem('phone', document.querySelector('#rg-phone').value);
    localStorage.setItem('cpf', document.querySelector('#rg-cpf').value);
    localStorage.setItem('height', document.querySelector('#rg-height').value);
    localStorage.setItem('wheight', document.querySelector('#rg-wheight').value);
    localStorage.setItem('bloodType', document.querySelector('#rg-blood-type').value);
    localStorage.setItem('email', document.querySelector('#rg-email').value);
    localStorage.setItem('password', document.querySelector('#rg-password').value);

    window.location.href = "register-final.html"
}