import {
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

let faceDetector: FaceDetector | null = null;

export async function loadFaceDetector(): Promise<FaceDetector> {
  if (faceDetector !== null) {
    return faceDetector;
  }

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "/models/blaze_face_short_range.tflite",
    },
    runningMode: "VIDEO",
    minDetectionConfidence: 0.6,
  });

  return faceDetector;
}