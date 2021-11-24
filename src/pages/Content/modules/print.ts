export const printLine = (line) => {
  let target: HTMLElement;

  function sendText(e) {
    console.log(e.target);
    e.preventDefault();

    document.removeEventListener('mousemove', selectText);
    e.target.style.background = 'none';
    chrome.runtime.sendMessage(e.target.textContent);
  }

  function selectText(e) {
    e.preventDefault();

    if (target === e.target) return;
    else {
      if (target) {
        target.style.background = 'none';
        target.removeEventListener('click', sendText);
      }

      target = e.target as HTMLElement;
      target.style.background = 'grey';

      target.addEventListener('click', sendText);
    }
  }

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.zIndex = '99999999999999999';
  iframe.style.border = 'none';
  iframe.src = chrome.runtime.getURL('content.html');

  document.body.insertBefore(iframe, document.body.firstChild);

  chrome.runtime.onMessage.addListener((message) => {
    if (message === 'selectText') {
      document.addEventListener('mousemove', selectText);
    }
  });
};
