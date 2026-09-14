'use client';

import { useEffect } from 'react';

export function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return null;
}
