let timerInterval;

chrome.runtime.onInstalled.addListener(function() {
  console.log("Timeout extension installed.");
});

function openNewTab() {
  chrome.tabs.create({ url: 'https://www.google.com' }, function(newTab) {
    chrome.windows.update(newTab.windowId, { state: 'fullscreen' });
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message) {
  if (message.action === 'startTimer') {
    // Start the timer if not already running
    if (!timerInterval) {
      let randomnmber =Math.random();
      timerInterval = setInterval(openNewTab, randomnmber*100000); 
    }
  } else if (message.action === 'stopTimer') {
    // Stop the timer
    clearInterval(timerInterval);
    timerInterval = null;
  }
});
