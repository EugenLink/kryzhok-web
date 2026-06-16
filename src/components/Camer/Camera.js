import React, { useRef, useEffect, useState } from "react";
import Tesseract from "tesseract.js";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
    }

    startCamera();
  }, []);

  const takePhotoAndRead = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    setLoading(true);

    const result = await Tesseract.recognize(
      imageData,
      "rus+eng", // русский + английский
      {
        logger: (m) => console.log(m),
      },
    );

    setText(result.data.text);
    setLoading(false);
  };

  return (
    <div>
      <h2>Камера + OCR</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "500px" }}
      />

      <br />
      <button onClick={takePhotoAndRead}>Считать текст</button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {loading && <p>Распознаю...</p>}

      <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
    </div>
  );
}
