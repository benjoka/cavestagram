import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useAppStore } from "stores/AppStore";

export default function SelfieCamera() {
  const webcamRef = useRef<any>(null);
  const { setSelfie, participateMode, setParticipateMode } = useAppStore();

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setSelfie(imageSrc);
      setParticipateMode("type");
    }
  }, [webcamRef]);
  return (
    <div>
      <Webcam ref={webcamRef} />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
}
