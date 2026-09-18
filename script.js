function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealItems = document.querySelectorAll('.reveal-item');

  if (revealItems.length) {
    const revealConfig = {
      threshold: 0.2,
      rootMargin: '0px 0px -18% 0px'
    };
    const revealThreshold = 0.2;

    const showAll = () => {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    };

    try {
      if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
        showAll();
        return;
      }

      let observer;

      const reveal = (entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < revealThreshold) {
          return;
        }

        const item = entry.target;
        item.classList.add('is-visible');
        observer.unobserve(item);
      };

      revealItems.forEach((item) => {
        item.classList.add('reveal-ready');
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          observer = new IntersectionObserver((entries) => {
            entries.forEach(reveal);
          }, revealConfig);

          revealItems.forEach((item) => {
            observer.observe(item);
          });
        });
      });
    } catch (error) {
      showAll();
    }
  }
}

initScrollReveal();
