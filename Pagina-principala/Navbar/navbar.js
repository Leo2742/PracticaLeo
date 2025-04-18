function navigateTo(page) {
    const main = document.getElementById('main-content');
    if (main) {
      main.innerHTML = `
        <h3>${capitalize(page)} Page</h3>
        <p>Conținutul paginii <strong>${page}</strong> va apărea aici.</p>
      `;
    }
  }
  
  function logout() {
    localStorage.clear();
    alert('Ai fost delogat.');
    location.reload();
  }
  
  function searchHandler(event) {
    event.preventDefault();
    const input = document.getElementById('searchInput');
    const query = input.value.trim();
  
    if (query.length === 0) {
      alert("Introduceți un termen de căutare.");
      return;
    }
  
    const main = document.getElementById('main-content');
    if (main) {
      main.innerHTML = `
        <h3>Rezultate pentru: "${query}"</h3>
        <p>Nu au fost găsite rezultate reale, dar această zonă ar putea afișa rezultate dinamice.</p>
      `;
    }
  
    input.value = "";
  }
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Utilizator';
    const email = localStorage.getItem('email') || 'Email necunoscut';
  
    const displayUsername = document.getElementById('displayUsername');
    const displayEmail = document.getElementById('displayEmail');
    const navbarUsername = document.getElementById('navbarUsername');
  
    if (displayUsername) displayUsername.textContent = username;
    if (displayEmail) displayEmail.textContent = email;
    if (navbarUsername) navbarUsername.textContent = username;
  });
  