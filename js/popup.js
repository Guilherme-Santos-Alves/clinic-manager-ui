function showPopup(id){
    let popup = document.querySelector(".popup");
    let closePopup = document.querySelector(".close-popup");

    popup.style.display = "block";

    closePopup.addEventListener("click", function(){
        popup.style.display = "none";
    });
    alert(`${id}`);
}