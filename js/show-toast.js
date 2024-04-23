let successMsg = '<span class="material-symbols-outlined">check_circle</span>Sucesso';
let errorMsg = '<span class="material-symbols-outlined">cancel</span>Erro';

function showToast(msg) {
  let toastBox = document.getElementById('toast-box');
  if (!toastBox) {
    console.error("Elemento toast-box não encontrado!");
    return;
  }

  let toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = msg;
  toastBox.appendChild(toast);

  if (msg.includes('Erro')) {
    toast.classList.add('error');
  }

  setTimeout(() => {
    toast.remove();
  }, 6000);
}