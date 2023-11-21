document.addEventListener('DOMContentLoaded', function() {
    // Function to start the timer
    function startTimer() {
      // Set the interval to open a new tab every 10 minutes
      chrome.runtime.sendMessage({ action: 'startTimer' });
    }
  
    // Function to stop the timer
    function stopTimer() {
      // Clear the interval
      chrome.runtime.sendMessage({ action: 'stopTimer' });
    }
  
    // Add click event listeners to the buttons
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('stopTimer').addEventListener('click', stopTimer);
  });
  