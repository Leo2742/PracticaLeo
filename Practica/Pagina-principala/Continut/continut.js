function updateMainContent(page) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h3>${page.charAt(0).toUpperCase() + page.slice(1)} Page</h3>
        <p>Content for the ${page} page will appear here.</p>
        <img src="depositphotos_43925813-stock-photo-like.jpg" alt="Like Icon">
    `;
}
