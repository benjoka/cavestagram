import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useAppStore } from "stores/AppStore";

export default function SelfieCamera() {
  const webcamRef = useRef<any>(null);
  const { selfie, setSelfie, participateMode, setParticipateMode } =
    useAppStore();

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setSelfie(imageSrc);
    }
  }, [webcamRef]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-evenly">
      <div className="w-full relative">
        <div className="w-full h-full">
          <div className="w-full h-full aspect-square ">
            <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
            {!selfie && (
              <Webcam ref={webcamRef} className="w-full h-full object-cover" />
            )}
            {selfie && (
              <img src={selfie} className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
      <div className="h-[60px]">
        {!selfie && (
          <button onClick={capture}>
            <div className="p-[2px] border-white border-2 border-solid rounded-full">
              <div className="rounded-full bg-white w-[50px] h-[50px]"></div>
            </div>
          </button>
        )}
        {selfie && (
          <div>
            <button className="p-4" onClick={() => setParticipateMode("video")}>
              Video
            </button>
            <button className="p-4" onClick={() => setParticipateMode("audio")}>
              Audio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
