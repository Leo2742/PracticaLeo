let intervalId = null;

// Formatează timpul în hh:mm:ss
function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// Actualizează afișajul în popup
function updateDisplay(domain, seconds) {
  const list = document.getElementById("site-list");
  let existing = document.querySelector(`[data-domain="${domain}"]`);

  if (!existing) {
    existing = document.createElement("div");
    existing.dataset.domain = domain;
    existing.style.fontWeight = "bold";
    list.appendChild(existing);
  }

  existing.textContent = `${domain}: ${formatTime(seconds)}`;
}

// Pornește cronometru live
function startLiveTimer(domain, initial) {
  let seconds = initial;
  updateDisplay(domain, seconds);

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    seconds++;
    updateDisplay(domain, seconds);
  }, 1000);
}

// Afișează toate site-urile + live pentru activ
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const domain = new URL(tabs[0].url).hostname;

  chrome.storage.local.get("nettimeData", (result) => {
    const data = result.nettimeData || {};
    const currentTotal = data[domain]?.total || 0;

    for (const [site, info] of Object.entries(data)) {
      if (site !== domain) {
        const list = document.getElementById("site-list");
        const div = document.createElement("div");
        div.textContent = `${site}: ${formatTime(info.total)}`;
        list.appendChild(div);
      }
    }

    startLiveTimer(domain, currentTotal);
  });
});

// Reset total
document.getElementById("reset-btn").addEventListener("click", () => {
  chrome.storage.local.set({ nettimeData: {} }, () => location.reload());
});

document.getElementById("main-page-btn").addEventListener("click", () => {
  const url = chrome.runtime.getURL("index.html");
  chrome.tabs.create({ url });
});
