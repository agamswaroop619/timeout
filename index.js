let timerInterval;

chrome.runtime.onInstalled.addListener(function() {
  console.log("Timeout extension installed.");
});

function openNewTab(imageUrl) {
  chrome.tabs.create({ url: imageUrl }, function(newTab) {
    chrome.windows.update(newTab.windowId, { state: 'fullscreen' });
  });
}

// Function to fetch image URL from an API
function fetchImageUrl() {
  const accessKey = '1yMmCBil52fEDEXjurr-nlzYLYueM8MZM48Rj03pjsI'; // Replace with your Unsplash access key
  const query = 'horror'; // Replace with your desired query

  const requestUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      const imagesArray = data.results; 
      const randomNumber = Math.floor(Math.random() * imagesArray.length);
      const imageUrl = imagesArray[randomNumber].urls.regular;
      openNewTab(imageUrl);
    })
    .catch(error => console.error('Error fetching image:', error));
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message) {
  if (message.action === 'startTimer') {
    // Start the timer if not already running
    if (!timerInterval) {
      let randomnmber =Math.random();
      timerInterval = setInterval(openNewTab, randomnmber*1000); 
    }
  } else if (message.action === 'stopTimer') {
    // Stop the timer
    clearInterval(timerInterval);
    timerInterval = null;
  }
});
