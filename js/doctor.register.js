// document.addEventListener("DOMContentLoaded", function() {
//     const originalDiv = document.getElementById("divOriginal");
//     const botaoClonar = document.getElementById("botaoClonar");
//     const containerDivsClonadas = document.getElementById("containerDivsClonadas");

//     // Função para clonar uma div
//     function clonarDiv() {
//         const clonedDiv = originalDiv.cloneNode(true);

//         // Adiciona um manipulador de evento ao botão na div clonada
//         const clonedAddButton = clonedDiv.querySelector("#btn-new-specialty");
//         clonedAddButton.addEventListener("click", function() {
//             buildInputSolution();
//             clonarDiv();
//         });


//         // Adiciona a div clonada ao container
//         containerDivsClonadas.appendChild(clonedDiv);
//     }

//     // Adiciona um manipulador de evento ao botão na div original
//     const addButton = originalDiv.querySelector("#btn-new-specialty");
//     addButton.addEventListener("click", clonarDiv);

//     // Adiciona um manipulador de evento ao botão "Clonar Div"
//     botaoClonar.addEventListener("click", clonarDiv);
// });

function buildInputSolution(){
    template = `
    <div id="divOriginal" class="original-line -clone">
        <input type="text" id="rg-solution">
        <button class="cl-button -add-solution" id="btn-new-specialty" onclick="buildInputSolution()">+</button>
    </div> `;
    document.querySelector(".fifth-line").insertAdjacentHTML("beforeend", template);
}

"fifth-line"