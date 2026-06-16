import React, { useRef, useEffect, useState } from "react";

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [data, setData] = useState(
    "https://i.scdn.co/image/ab67616d0000b2738cdfe55fa7cf10ad94b05c1d",
  );
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    console.log(imageData); // тут твоя картинка
    setData(imageData);
  };
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // задняя камера
        });

        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Ошибка доступа к камере:", err);
      }
    }

    startCamera();
  }, []);

  return (
    <div>
      <h2>Камера</h2>
      <button onClick={takePhoto}>Считать</button>
      <img src={data} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "500px" }}
      />
    </div>
  );
}
