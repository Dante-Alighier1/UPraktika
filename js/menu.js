// modal.js

document.addEventListener('DOMContentLoaded', () => {
    // Открытие модального окна
    const openButtons = document.querySelectorAll('.button');
  
    openButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const modal = document.getElementById(targetId);
        if (modal) modal.style.display = 'flex';
      });
    });
  
    // Закрытие модалки
    const modals = document.querySelectorAll('.modal');
  
    modals.forEach(modal => {
      const closeBtn = modal.querySelector('.close-button');
  
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });
  });
  