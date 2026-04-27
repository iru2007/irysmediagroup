"use client";

import { useEffect, useRef } from "react";

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const codeChars = "<!DOCTYPE html><div class='container'><header><nav><ul><li><a href='#'>Home</a></li></ul></nav></header><main><section><h1>Hello World</h1><p>Lorem ipsum</p></section></main><footer></footer></div></html>const app = () => { return <Component /> }function init() { console.log('Hello'); }import React from 'react';export default App;@media screen { .class { display: flex; } }";
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(8, 8, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Geist Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = codeChars[Math.floor(Math.random() * codeChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient color from cyan to violet
        const gradient = ctx.createLinearGradient(x, y - 50, x, y + 50);
        gradient.addColorStop(0, "rgba(0, 200, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 200, 255, 0.8)");
        gradient.addColorStop(1, "rgba(139, 92, 246, 0.3)");
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
}
