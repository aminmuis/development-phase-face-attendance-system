import {
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  detectFaces,
  loadFaceDetector,
} from "../services/faceDetector";

type CameraStatus =
  | "idle"
  | "starting"
  | "active"
  | "error";

export default function AttendancePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionIntervalRef = useRef<number | null>(null);
  const stableDetectionCountRef = useRef(0);
const faceCapturedRef = useRef(false);
const detectionBusyRef = useRef(false);

  const [cameraStatus, setCameraStatus] =
    useState<CameraStatus>("idle");

  const [capturedImage, setCapturedImage] =
    useState<string | null>(null);

  const [message, setMessage] = useState(
    "Kamera belum dinyalakan.",
  );

  const cameraActive = cameraStatus === "active";
  const cameraStarting = cameraStatus === "starting";

function stopFaceDetection() {

 if (detectionIntervalRef.current !== null) {

 window.clearInterval(detectionIntervalRef.current);

 detectionIntervalRef.current = null;

 }

}

function startFaceDetection() {
  stopFaceDetection();

  stableDetectionCountRef.current = 0;
  faceCapturedRef.current = false;
  detectionBusyRef.current = false;

  detectionIntervalRef.current = window.setInterval(async () => {
    const video = videoRef.current;

    if (!video || video.readyState < 2) {
      return;
    }

    if (detectionBusyRef.current) {
      return;
    }

    detectionBusyRef.current = true;

    try {
      const result = await detectFaces(video);
      const faceCount = result.detections.length;

      if (faceCount === 0) {
        stableDetectionCountRef.current = 0;

        if (faceCapturedRef.current) {
          faceCapturedRef.current = false;
        }

        setMessage("Mencari wajah...");
        return;
      }

      if (faceCount > 1) {
        stableDetectionCountRef.current = 0;
        setMessage("Pastikan hanya satu wajah di depan kamera.");
        return;
      }

      if (faceCapturedRef.current) {
        setMessage(
          "Gambar sudah diambil. Silakan keluar dari area kamera.",
        );
        return;
      }

      stableDetectionCountRef.current += 1;

      const progress = stableDetectionCountRef.current;

      setMessage(
        `Menstabilkan wajah ${progress}/3...`,
      );

      if (progress >= 3) {
        captureImage();

        faceCapturedRef.current = true;
        stableDetectionCountRef.current = 0;

        setMessage(
          "Wajah stabil. Gambar diambil otomatis.",
        );
      }
    } catch (error) {
      console.error(
        "Automatic face detection error:",
        error,
      );

      setMessage("Deteksi wajah mengalami masalah.");
    } finally {
      detectionBusyRef.current = false;
    }
  }, 500);
}

  async function startCamera() {
    try {
      setCameraStatus("starting");
      setMessage("Memuat model deteksi wajah...");
await loadFaceDetector();

setMessage("Model siap. Meminta izin kamera...");

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Browser ini tidak mendukung akses kamera.",
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });

      streamRef.current = stream;

      if (!videoRef.current) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });

        throw new Error(
          "Elemen video tidak ditemukan.",
        );
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setCameraStatus("active");
      setMessage("Kamera berhasil dinyalakan.");
      startFaceDetection();
    } catch (error: unknown) {
      console.error("Camera error:", error);

      streamRef.current
        ?.getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;
      setCameraStatus("error");

      if (
        error instanceof DOMException &&
        error.name === "NotAllowedError"
      ) {
        setMessage(
          "Izin kamera ditolak. Izinkan akses kamera melalui pengaturan browser.",
        );
        return;
      }

      if (
        error instanceof DOMException &&
        error.name === "NotFoundError"
      ) {
        setMessage(
          "Kamera tidak ditemukan pada perangkat.",
        );
        return;
      }

      if (
        error instanceof DOMException &&
        error.name === "NotReadableError"
      ) {
        setMessage(
          "Kamera sedang digunakan oleh aplikasi lain.",
        );
        return;
      }

      if (error instanceof Error) {
        setMessage(error.message);
        return;
      }

      setMessage("Kamera gagal dinyalakan.");
    }
  }

  function stopCamera() {
    stopFaceDetection();
    stableDetectionCountRef.current = 0;
faceCapturedRef.current = false;
detectionBusyRef.current = false;
    streamRef.current
      ?.getTracks()
      .forEach((track) => {
        track.stop();
      });

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraStatus("idle");
    setMessage("Kamera telah dimatikan.");
  }

  function captureImage() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setMessage(
        "Elemen kamera belum tersedia.",
      );
      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      setMessage(
        "Kamera belum siap. Tunggu beberapa saat.",
      );
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setMessage(
        "Browser gagal memproses gambar.",
      );
      return;
    }

    /*
     * Tampilan video menggunakan efek cermin.
     * Canvas juga dibalik agar foto sesuai preview.
     */
    context.save();
context.translate(canvas.width, 0);
context.scale(-1, 1);

context.drawImage(
  video,
  0,
  0,
  canvas.width,
  canvas.height,
);

context.restore();

const imageData = canvas.toDataURL(
  "image/jpeg",
  0.85,
);
setCapturedImage(imageData);
    setMessage("Gambar berhasil diambil.");
  }

async function testFaceDetection() {
  const video = videoRef.current;

  if (!video || !cameraActive) {
    setMessage("Nyalakan kamera terlebih dahulu.");
    return;
  }

  try {
    setMessage("Memeriksa wajah...");

    const result = await detectFaces(video);
    const faceCount = result.detections.length;

    if (faceCount === 0) {
      setMessage("Wajah belum terdeteksi.");
      return;
    }

    if (faceCount === 1) {
      setMessage("Satu wajah terdeteksi.");
      return;
    }

    setMessage(`${faceCount} wajah terdeteksi.`);
  } catch (error) {
    console.error("Face detection error:", error);
    setMessage("Deteksi wajah gagal dijalankan.");
  }
}

  function deleteCapturedImage() {
    setCapturedImage(null);
    setMessage("Hasil gambar telah dihapus.");
  }

  useEffect(() => {
    return () => {
      stopFaceDetection();
      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    };
  }, []);

  return (
    <main className="attendance-page">
      <section className="attendance-heading">
        <div>
          <p className="section-eyebrow">
            Real Camera Test
          </p>

          <h1>Uji Kamera Absensi</h1>

          <p>
            Nyalakan kamera, lalu ambil gambar untuk menguji fitur
            dasar absensi.
          </p>
        </div>

        <span
          className={`camera-state ${cameraStatus}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </span>
      </section>

      <section className="attendance-workspace">
        <div className="camera-panel">
          <div className="camera-viewport">
            <video
              ref={videoRef}
              className="camera-video"
              autoPlay
              muted
              playsInline
            />

            {!cameraActive && (
              <div className="camera-placeholder">
                <div
                  className="camera-placeholder-icon"
                  aria-hidden="true"
                >
                  ◎
                </div>

                <strong>Kamera belum aktif</strong>

                <span>
                  Tekan tombol Nyalakan Kamera untuk memulai.
                </span>
              </div>
            )}

            {cameraActive && (
              <div
                className="camera-guide"
                aria-hidden="true"
              >
                <span className="guide-corner top-left" />
                <span className="guide-corner top-right" />
                <span className="guide-corner bottom-left" />
                <span className="guide-corner bottom-right" />
              </div>
            )}
          </div>

          <div className="camera-controls">
            {!cameraActive ? (
              <button
                type="button"
                className="button button-primary"
                onClick={startCamera}
                disabled={cameraStarting}
              >
                {cameraStarting
                  ? "Menyalakan..."
                  : "Nyalakan Kamera"}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={captureImage}
                >
                  Ambil Gambar
                </button>

                <button
  type="button"
  className="button button-secondary"
  onClick={testFaceDetection}
>
  Tes Deteksi Wajah
</button>

                <button
                  type="button"
                  className="button button-danger"
                  onClick={stopCamera}
                >
                  Matikan Kamera
                </button>
              </>
            )}
          </div>
        </div>

        <aside className="capture-panel">
          <div className="capture-panel-heading">
            <div>
              <p className="section-eyebrow">
                Preview
              </p>

              <h2>Hasil Gambar</h2>
            </div>

            {capturedImage !== null && (
              <button
                type="button"
                className="text-button"
                onClick={deleteCapturedImage}
              >
                Hapus
              </button>
            )}
          </div>

          <div className="capture-preview">
            {capturedImage !== null ? (
              createElement("img", {
                src: capturedImage,
                alt: "Hasil pengambilan gambar dari kamera",
                className: "captured-image",
              })
            ) : (
              <div className="capture-empty">
                <span>Belum ada gambar</span>

                <small>
                  Hasil pengambilan kamera akan ditampilkan di sini.
                </small>
              </div>
            )}
          </div>

          <div className="capture-information">
            <strong>Pengujian saat ini</strong>

            <ul>
              <li>Izin akses kamera browser</li>
              <li>Video langsung dari webcam</li>
              <li>Pengambilan frame menjadi gambar</li>
              <li>Preview hasil pengambilan gambar</li>
              <li>Penghentian kamera dengan benar</li>
            </ul>
          </div>
        </aside>
      </section>

      <canvas
        ref={canvasRef}
        className="hidden-canvas"
      />
    </main>
  );
}