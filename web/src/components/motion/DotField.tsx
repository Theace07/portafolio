"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Separación de la cuadrícula y radio de influencia del puntero, en px. */
const GAP = 26;
const RADIUS = 160;
/** Cuánto se apartan los puntos del cursor. */
const PUSH = 12;

type Dot = { x: number; y: number; energy: number };

/**
 * Cuadrícula de puntos que se enciende y se aparta alrededor del cursor.
 * Va en canvas sobre el padre (que debe ser `relative`). Solo pinta mientras
 * hay algo que animar: en reposo no gasta ni un fotograma.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const interactive =
      window.matchMedia("(hover: hover)").matches && !prefersReducedMotion();

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let pointerX = -1e4;
    let pointerY = -1e4;
    let frame = 0;
    let visible = true;
    let colors = { dot: "#5d7276", accent: "#a97bff", aqua: "#5fd3c4" };

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      const read = (name: string, fallback: string) =>
        style.getPropertyValue(name).trim() || fallback;
      colors = {
        dot: read("--faint", colors.dot),
        accent: read("--accent", colors.accent),
        aqua: read("--aqua", colors.aqua),
      };
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      let settling = false;

      // Primera pasada: la trama base, cuadraditos de 1,5 px como el grano del fondo.
      ctx.fillStyle = colors.dot;
      ctx.globalAlpha = 0.35;
      for (const dot of dots) {
        const dx = dot.x - pointerX;
        const dy = dot.y - pointerY;
        const distance = Math.hypot(dx, dy);
        const target = distance < RADIUS ? 1 - distance / RADIUS : 0;
        // Se sigue animando mientras algún punto cambie, no mientras esté
        // encendido: con el cursor quieto el bucle también se detiene.
        const delta = target - dot.energy;
        if (Math.abs(delta) > 0.004) {
          dot.energy += delta * 0.14;
          settling = true;
        } else {
          dot.energy = target;
        }
        if (dot.energy < 0.05) ctx.fillRect(dot.x - 0.75, dot.y - 0.75, 1.5, 1.5);
      }

      // Segunda pasada: solo los puntos encendidos, apartados del cursor.
      for (const dot of dots) {
        if (dot.energy < 0.05) continue;
        const dx = dot.x - pointerX;
        const dy = dot.y - pointerY;
        const distance = Math.hypot(dx, dy) || 1;
        const push = dot.energy * dot.energy * PUSH;
        ctx.globalAlpha = Math.min(1, 0.25 + dot.energy);
        ctx.fillStyle = dot.energy > 0.55 ? colors.accent : colors.aqua;
        ctx.beginPath();
        ctx.arc(dot.x + (dx / distance) * push, dot.y + (dy / distance) * push, 0.9 + dot.energy * 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (settling && visible) frame = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    };

    const layout = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) dots.push({ x, y, energy: 0 });
      }
      schedule();
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      schedule();
    };
    const onLeave = () => {
      pointerX = pointerY = -1e4;
      schedule();
    };

    readColors();
    layout();

    const resize = new ResizeObserver(layout);
    resize.observe(host);
    // Al cambiar de tema cambian los colores: se releen y se repinta.
    const theme = new MutationObserver(() => {
      readColors();
      schedule();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    onScreen.observe(host);

    if (interactive) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      theme.disconnect();
      onScreen.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden />;
}
