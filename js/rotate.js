var anguloAtual = 0;

function rotacionar() {
    var dropdownMenu = document.getElementById('dropdown-menu');
    var dropdownSidebar = document.getElementById('dropdown-sidebar');
    var elementoArrow = document.getElementById('arrow');

    if (anguloAtual === 0) {
        anguloAtual += 90;
        dropdownMenu.style.display = 'block'; 
        dropdownSidebar.style.marginBottom = '140px';
        dropdownMenu.style.padding = '40px 0';
    } else {
        anguloAtual = 0;
        dropdownMenu.style.display = 'none';
        dropdownSidebar.style.marginBottom = '40px';
        dropdownMenu.style.padding = '0';
    }

    elementoArrow.style.transform = 'rotate(' + anguloAtual + 'deg)';
}
