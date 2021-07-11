// import logo from './logo.svg';
import React, {useRef, useEffect, useState} from 'react';
import './App.css';

const WIDTH: number = 1000;
const HEIGHT: number = 1000;

function App() {
  const canvasRef = useRef<any>(null)
  const contextRef = useRef<any>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas: any = canvasRef.current;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.width = WIDTH;
    canvas.style.height = HEIGHT;

    const context =  canvas.getContext("2d");
    // context.scale(1,1);
    contextRef.current = context;
  }, [])

  const onMouseDown = ({nativeEvent}: {nativeEvent: any}) => {
    const {offsetX, offsetY} = nativeEvent;
    // console.log(offsetX, offsetY)
    // console.log("test");
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.beginPath();
    setIsDrawing(true);
  }

  const onMouseUp = () => {
    // const {offsetX, offsetY} = nativeEvent;
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const onMouseMove = ({nativeEvent}: {nativeEvent: any}) => {
    if (isDrawing) {
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  }

  return (
    <>
    <canvas
      style={{border: "1px solid red"}}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      ref={canvasRef}
    />
    </>
  );
}

export default App;
