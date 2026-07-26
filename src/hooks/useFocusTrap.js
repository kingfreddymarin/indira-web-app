import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Keeps keyboard focus inside an open overlay, closes it on Escape, and returns
 * focus to whatever opened it. Used by the mobile nav and the credential dialog.
 */
export default function useFocusTrap(isOpen, onClose) {
  const containerRef = useRef(null);
  const restoreRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    restoreRef.current = document.activeElement;
    const container = containerRef.current;

    const focusables = () =>
      Array.from(container?.querySelectorAll(FOCUSABLE) ?? []).filter(
        (node) => node.offsetParent !== null || node === document.activeElement
      );

    // Move focus in without yanking the page around
    focusables()[0]?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose?.();
        return;
      }
      if (event.key !== 'Tab') return;

      const nodes = focusables();
      if (!nodes.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return containerRef;
}
