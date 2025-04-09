document.getElementById('openSettingsBtn').addEventListener('click', function () {
    document.getElementById('settingsMenu').classList.add('open');
  });

  document.getElementById('closeSettingsBtn').addEventListener('click', function () {
    document.getElementById('settingsMenu').classList.remove('open');
  });
  document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openSettingsBtn');
    const closeBtn = document.getElementById('closeSettingsBtn');
    const menu = document.getElementById('settingsMenu');
  
    if (openBtn && closeBtn && menu) {
      openBtn.addEventListener('click', () => {
        menu.classList.add('open');
      });
  
      closeBtn.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    }
  });
