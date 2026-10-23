"use client";

import { useEffect } from "react";

/**
 * Capa global de movimiento: pinta la barra de lectura y lleva las
 * coordenadas del puntero a los elementos `.spotlight`. Un solo listener
 * delegado en el documento, limitado a un cálculo por fotograma.
 */
export function MotionLayer() {
  useEffect(() => {
    // En pantallas táctiles no hay puntero que seguir.
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last || !(last.target instanceof Element)) return;
      const element = last.target.closest<HTMLElement>(".spotlight");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${last.clientX - rect.left}px`);
      element.style.setProperty("--my", `${last.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden />;
}
