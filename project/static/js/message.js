const signedup = document.getElementById('signedup');

setTimeout(() => {
  signedup.style.display = 'none';
}, 1000);

signedup.style.display = 'block';
signedup.style.color = 'black';
signedup.style.position = 'fixed';
signedup.style.top = '20px';
signedup.style.background = 'white';
signedup.style.right = '20px';
signedup.style.padding = '10px';
signedup.style.borderRadius = '10px';
signedup.style.animation = 'slide-out 3s ease-in-out';

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes slide-out {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(100%);
    }
    80% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`, styleSheet.cssRules.length);
