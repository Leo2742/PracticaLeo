function navigateTo(page) {
  const main = document.getElementById('main-content');
  main.innerHTML = `<h3>${page.charAt(0).toUpperCase() + page.slice(1)} Page</h3><p>Content for the ${page} page will appear here.</p>`;
}

function searchHandler(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  const main = document.getElementById('main-content');
  main.innerHTML = `<h3>Search Results</h3><p>You searched for: <strong>${query}</strong></p>`;
}

function initializeApp() {
  const savedUsername = localStorage.getItem('username');
  const savedEmail = localStorage.getItem('email');

  if (savedUsername && savedEmail) {
    document.getElementById('displayUsername').textContent = savedUsername;
    document.getElementById('displayEmail').textContent = savedEmail;
    document.getElementById('navbarUsername').textContent = savedUsername;
  } else {
    const registrationModal = new bootstrap.Modal(document.getElementById('registrationModal'));
    registrationModal.show();
  }
}

function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);

  document.getElementById('displayUsername').textContent = username;
  document.getElementById('displayEmail').textContent = email;
  document.getElementById('navbarUsername').textContent = username;

  const registrationModalEl = document.getElementById('registrationModal');
  const modal = bootstrap.Modal.getInstance(registrationModalEl);
  modal.hide();
}

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  location.reload();
}
