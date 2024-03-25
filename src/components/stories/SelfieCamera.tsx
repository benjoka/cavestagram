import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useAppStore } from "stores/AppStore";
import iconCam from "assets/images/icons/icon_cam.png";
import iconMic from "assets/images/icons/icon_mic.png";
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
        <div className="w-full h-full flex">
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
      <div className="w-full h-[60px] flex items-center justify-center">
        {!selfie && (
          <button onClick={capture}>
            <div className="p-[2px] border-white border-2 border-solid rounded-full">
              <div className="rounded-full bg-white w-[50px] h-[50px]"></div>
            </div>
          </button>
        )}
        {selfie && (
          <div className="w-full flex justify-evenly">
            <button className="p-4" onClick={() => setParticipateMode("video")}>
              <img width={50} src={iconCam} />
            </button>
            <button className="p-4" onClick={() => setParticipateMode("audio")}>
              <img width={50} src={iconMic} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
