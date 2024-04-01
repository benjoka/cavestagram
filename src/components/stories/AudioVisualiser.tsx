import { useEffect, useRef, useState } from "react";

export default function AudioVisualiser({ audio }: { audio: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    draw();
  });

  const draw = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const height = canvas.height;
      const width = canvas.width;
      const context = canvas.getContext("2d");
      let x = 0;
      const sliceWidth = (width * 1.0) / audio.length;
      if (context) {
        context.lineWidth = 1;
        context.strokeStyle = "rgba(255,255,255,0.8)";
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.moveTo(0, height / 2);
        context.lineCap = "round";
        context.lineJoin = "round";
        for (const item of audio) {
          const y = (item / 255.0) * height;
          context.lineTo(x, y);
          x += sliceWidth;
        }
        context.lineTo(x, height / 2);
        context.stroke();
      }
    }
  };
  return (
    <div className="absolute top-0 w-full h-full py-[50px] bg-black/50">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
