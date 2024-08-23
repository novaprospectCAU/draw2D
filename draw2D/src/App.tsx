import React, { useState, useRef, useEffect } from "react";

import "./App.css";

function App() {
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightSideBarRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [mode, setMode] = useState<string>("pen"); //mode = "pen" / "eraser" / "spill" / "spoid"
  const [color, setColor] = useState<string>("#000");

  useEffect(() => {
    const canvas = mainCanvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.style.backgroundColor = "#fff";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctxRef.current = ctx;
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && !isSideBarOpen) {
      const { offsetX, offsetY } = e.nativeEvent;
      if (mode === "pen") {
        if (ctxRef.current) {
          ctxRef.current.beginPath();
          ctxRef.current.moveTo(offsetX, offsetY);
        }
        setIsDrawing(true);
      } else if (mode === "eraser") {
      } else if (mode === "spill") {
      } else if (mode === "spoid") {
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const { offsetX, offsetY } = e.nativeEvent;
      if (mode === "pen") {
        if (ctxRef.current) {
          ctxRef.current.lineTo(offsetX, offsetY);
          ctxRef.current.stroke();
        }
      } else if (mode === "eraser") {
      } else if (mode === "spill") {
      } else if (mode === "spoid") {
      }
    }
  };

  const finishDrawing = () => {
    if (isDrawing) {
      if (mode === "pen") {
        if (ctxRef.current) {
          ctxRef.current.closePath();
          setIsDrawing(false);
        }
      } else if (mode === "eraser") {
      } else if (mode === "spill") {
      } else if (mode === "spoid") {
      }
    }
  };

  return (
    <>
      <div className="App">
        <canvas
          ref={mainCanvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          onMouseUp={finishDrawing}
          className="mainCanvas"
        ></canvas>
        <div ref={rightSideBarRef} className="rightSideBar">
          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
