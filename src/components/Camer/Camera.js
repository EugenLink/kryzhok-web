import React, { useRef, useEffect } from "react";

export default function Camera() {
  const videoRef = useRef(null);

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
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "500px" }}
      />
    </div>
  );
}
