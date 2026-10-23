"use client";

import { useEffect } from "react";

/**
 * Capa global de movimiento: pinta la barra de lectura y lleva las
 * coordenadas del puntero a los elementos `.spotlight` y `.tilt`. Un solo
 * listener delegado en el documento, limitado a un cálculo por fotograma.
 */
export function MotionLayer() {
  useEffect(() => {
    // Avisa al script de layout.tsx de que React ya está al mando.
    document.documentElement.classList.add("hydrated");
  }, []);

  useEffect(() => {
    // En pantallas táctiles no hay puntero que seguir.
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const release = () => {
      if (!tilted) return;
      tilted.style.removeProperty("--rx");
      tilted.style.removeProperty("--ry");
      delete tilted.dataset.tilting;
      tilted = null;
    };

    const apply = () => {
      frame = 0;
      if (!last || !(last.target instanceof Element)) return release();
      const { clientX, clientY } = last;

      const spot = last.target.closest<HTMLElement>(".spotlight");
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${clientX - rect.left}px`);
        spot.style.setProperty("--my", `${clientY - rect.top}px`);
      }

      // `data-tilt` fija el ángulo máximo en grados (8 por defecto).
      const tilt = last.target.closest<HTMLElement>(".tilt");
      if (tilt !== tilted) release();
      if (!tilt) return;
      const rect = tilt.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const max = Number(tilt.dataset.tilt) || 8;
      tilt.style.setProperty("--rx", `${((0.5 - y) * max).toFixed(2)}deg`);
      tilt.style.setProperty("--ry", `${((x - 0.5) * max).toFixed(2)}deg`);
      tilt.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      tilt.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      tilt.dataset.tilting = "";
      tilted = tilt;
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      last = null;
      release();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden />;
}
