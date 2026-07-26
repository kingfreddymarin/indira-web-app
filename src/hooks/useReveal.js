import { useEffect } from 'react';

/**
 * Scroll-triggered reveals — the equivalent of the reference site's Webflow IX2
 * `data-ix` interactions (load-left / load-right / load-under / staggar-load).
 *
 * Any element carrying a `data-ix` attribute starts hidden (see index.css) and
 * gets `.is-in-view` once it enters the viewport, which plays the transition.
 * Elements are observed once and then released.
 */
export default function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-ix]:not(.is-in-view)');
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-in-view'));
      return;
    }

    const reveal = (node) => {
      node.classList.add('is-in-view');
      observer.unobserve(node);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    nodes.forEach((node) => observer.observe(node));

    // Fast scrolling can outrun the observer's delivery, which would strand
    // content at opacity 0. Sweep on scroll so anything already past the fold
    // is revealed regardless.
    let frame = 0;
    const sweep = () => {
      frame = 0;
      document.querySelectorAll('[data-ix]:not(.is-in-view)').forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight) reveal(node);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  });
}
