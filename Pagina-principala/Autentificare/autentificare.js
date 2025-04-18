function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
    alert("Completează toate câmpurile.");
    return;
  }

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('isLoggedIn', 'true'); 

  alert("Înregistrare reușită!");

  window.location.href = "pagina-principala.html";
}
function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
    alert("Completează toate câmpurile.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Email invalid.");
    return;
  }

  if (password.length < 6) {
    alert("Parola trebuie să aibă cel puțin 6 caractere.");
    return;
  }

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('isLoggedIn', 'true'); 

  alert("Înregistrare reușită!");

  window.location.href = "../pagina-principala.html";
}