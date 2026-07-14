(() => {
  const root = document.documentElement;
  const mobileQuery = window.matchMedia('(max-width: 760px)');

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  const closeMainNav = () => {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    root.classList.remove('nav-open');
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      root.classList.toggle('nav-open', isOpen);
    });

    navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMainNav();
    });
  }

  const docsSidebar = document.querySelector('.docs-sidebar');
  const docsToggle = document.querySelector('.docs-sidebar-toggle');
  const docsToc = document.getElementById('docs-toc');

  const closeDocsToc = () => {
    if (!docsSidebar || !docsToggle) return;
    docsSidebar.classList.remove('open');
    docsToggle.setAttribute('aria-expanded', 'false');
  };

  if (docsSidebar && docsToggle && docsToc) {
    docsToggle.addEventListener('click', () => {
      const isOpen = docsSidebar.classList.toggle('open');
      docsToggle.setAttribute('aria-expanded', String(isOpen));
    });

    docsToc.addEventListener('click', (event) => {
      if (mobileQuery.matches && event.target.closest('a')) closeDocsToc();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMainNav();
    closeDocsToc();
  });

  mobileQuery.addEventListener?.('change', (event) => {
    if (!event.matches) {
      closeMainNav();
      closeDocsToc();
    }
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copy);
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.innerText);
        const previous = button.textContent;
        button.textContent = 'Copied';
        window.setTimeout(() => { button.textContent = previous; }, 1200);
      } catch {
        button.textContent = 'Select + copy';
      }
    });
  });
})();
