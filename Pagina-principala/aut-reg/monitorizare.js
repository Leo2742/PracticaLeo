// Începutul sesiunii
const startTime = Date.now();

// Numele sau URL-ul paginii curente
const currentPage = window.location.pathname;

// === Salvare pagini vizitate ===
let visitedPages = JSON.parse(localStorage.getItem("visitedPages") || "[]");
if (!visitedPages.includes(currentPage)) {
  visitedPages.push(currentPage);
  localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
}

// === Salvare timp total petrecut pe site ===
window.addEventListener("beforeunload", () => {
  const endTime = Date.now();
  const sessionTime = Math.floor((endTime - startTime) / 1000); // în secunde

  const previousTotal = parseInt(localStorage.getItem("totalTime") || "0");
  const newTotal = previousTotal + sessionTime;

  localStorage.setItem("totalTime", newTotal);
});

// Afișează timpul total într-un element cu id="total-time"
const totalTime = parseInt(localStorage.getItem("totalTime") || "0");
const totalTimeElement = document.getElementById("total-time");
if (totalTimeElement) {
  totalTimeElement.textContent = `Timp total: ${totalTime} secunde`;
}

// Afișează paginile într-un <ul id="pages-list">
const pagesList = document.getElementById("pages-list");
if (pagesList) {
  visitedPages.forEach(page => {
    const li = document.createElement("li");
    li.textContent = page;
    pagesList.appendChild(li);
  });
}