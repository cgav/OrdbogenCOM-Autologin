(() => {

  const button = document.getElementById('loginButton');
  if (!button) {
    return;
  }

  if (button.textContent.trim() === 'Log ind') {
    chrome.runtime.sendMessage({ type: 'LOG_ME_IN' }, (response) => {
      if (response.error) {
        console.error(response.error);
        return;
      }
      window.location.href = "http://www.ordbogen.com/singlesignon/unilogin.php";
    });
  }

})();