function navigateTo(page) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h3>${page.charAt(0).toUpperCase() + page.slice(1)} Page</h3>
        <p>Content for the ${page} page will appear here.</p>
    `;
}

function logout() {
    localStorage.clear();
    alert("Ai fost delogat.");
    window.location.href = "autentificare.html";
}

window.onload = function () {
    const username = localStorage.getItem('username') || 'Hizrian';
    const email = localStorage.getItem('email') || 'Administrator';

    document.getElementById('displayUsername').textContent = username;
    document.getElementById('displayEmail').textContent = email;
}
