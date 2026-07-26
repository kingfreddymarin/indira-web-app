import { useEffect, useState } from 'react';

/**
 * Reports which section is currently in view so the nav can mark it.
 * Picks the section nearest the top of the reading area rather than the first
 * one merely intersecting, which keeps the marker steady on long sections.
 */
export default function useScrollSpy(ids, offset = 120) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!ids.length) return undefined;

    let frame = 0;

    const measure = () => {
      frame = 0;
      let best = null;
      let bestDistance = Infinity;

      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        const { top, bottom } = node.getBoundingClientRect();
        if (bottom < offset) return;
        const distance = Math.abs(top - offset);
        if (top - offset <= 0 || distance < bestDistance) {
          if (distance < bestDistance) {
            bestDistance = distance;
            best = id;
          }
        }
      });

      // At the very bottom of the page, the last section wins
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        best = ids[ids.length - 1];
      }

      setActiveId(best);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return activeId;
}
