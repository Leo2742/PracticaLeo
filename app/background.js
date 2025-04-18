let currentTabId = null;
let currentDomain = null;
let startTime = null;
let windowFocused = true;

// Obține domeniul din URL
function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// Salvează timpul pentru un domeniu
function saveTime(domain, duration) {
  if (!domain || duration <= 0) return;

  chrome.storage.local.get("nettimeData", (res) => {
    const data = res.nettimeData || {};
    if (!data[domain]) {
      data[domain] = { total: 0, visits: [] };
    }

    data[domain].total += duration;
    data[domain].visits.push({
      timestamp: new Date().toLocaleString(),
      duration,
    });

    chrome.storage.local.set({ nettimeData: data });
  });
}

// Oprește cronometrul curent
function stopTimer() {
  if (startTime && currentDomain) {
    const now = Date.now();
    const seconds = Math.floor((now - startTime) / 1000);
    saveTime(currentDomain, seconds);
  }
  startTime = null;
  currentDomain = null;
}

// Pornește cronometrul pentru un nou site
function startTimer(url) {
  currentDomain = getDomain(url);
  startTime = Date.now();
}

// Când se schimbă tabul
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    stopTimer();
    if (windowFocused && tab && tab.active && tab.status === "complete") {
      startTimer(tab.url);
    }
    currentTabId = tab.id;
  });
});

// Când se schimbă URL-ul
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.status === "complete") {
    stopTimer();
    if (windowFocused && tab.active) {
      startTimer(tab.url);
    }
  }
});

// Focus pe fereastră (când utilizatorul iese/intră din Chrome)
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    windowFocused = false;
    stopTimer();
  } else {
    windowFocused = true;
    if (currentTabId !== null) {
      chrome.tabs.get(currentTabId, (tab) => {
        if (tab && tab.active) startTimer(tab.url);
      });
    }
  }
});

// Închidere extensie
chrome.runtime.onSuspend.addListener(() => {
  stopTimer();
});
