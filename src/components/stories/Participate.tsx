import { useCallback, useEffect, useRef, useState } from "react";
import AudioRecorder from "./AudioRecorder";
import { useAppStore } from "stores/AppStore";
import iconRecordCircle from "assets/images/icons/icon_record_circle.png";
import Webcam from "react-webcam";
import { fetchStories, postStory } from "api/stories";
import buttonBorder from "assets/images/icons/button_border.png";
import iconRetake from "assets/images/icons/icon_retake.png";
import iconCircle from "assets/images/icons/icon_circle.png";
import AudioAnalyser from "./AudioAnalyser";
import AudioWave from "./AudioWave";

export default function Participate() {
  const webcamRef = useRef<any>(null);
  const [uploading, setUploading] = useState(false);

  const {
    selfie,
    setSelfie,
    setStories,
    audioBlob,
    audioStream,
    recordingStatus,
    setAudioBlob,
    setParticipateMode,
    voicePresentAudio,
  } = useAppStore();

  useEffect(() => {
    if (voicePresentAudio) {
      voicePresentAudio.pause();
    }
  }, []);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setSelfie(imageSrc);
    }
  }, [webcamRef]);

  const upload = async () => {
    if (selfie && audioBlob) {
      setUploading(true);
      await postStory(selfie, audioBlob);
      setStories(await fetchStories());
      setSelfie(null);
      setParticipateMode(null);
      setUploading(false);
      setAudioBlob(null);
    }
  };

  const renderLoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <img src={iconCircle} width={70} className="animate-spin-slow" />
      </div>
    );
  };

  const renderParticipateView = () => {
    return (
      <div className="w-full h-full">
        <div className="w-full relative">
          <div className="w-full h-full flex">
            <div className="w-full h-full aspect-square ">
              <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
              {!selfie && (
                <Webcam
                  ref={webcamRef}
                  className="w-full h-full object-cover"
                />
              )}
              {selfie && (
                <div className="relative w-full h-full">
                  <img src={selfie} className="w-full h-full object-cover" />
                  {audioStream &&
                    !audioBlob &&
                    recordingStatus === "recording" && (
                      <AudioAnalyser audio={audioStream} />
                    )}
                  {audioBlob && (
                    <div className="absolute w-full h-full top-0">
                      <AudioWave
                        url={URL.createObjectURL(audioBlob)}
                        autoPlay
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-[60px] flex items-center justify-center z-20 relative">
          {!selfie && (
            <button onClick={capture}>
              <img width={80} src={iconRecordCircle} />
            </button>
          )}
          {selfie && !audioBlob && (
            <button
              className="absolute bottom-0 right-0"
              onClick={() => setSelfie(null)}
            >
              <img width={50} src={iconRetake} />
            </button>
          )}
          {audioBlob && (
            <button
              className="absolute bottom-0 right-0"
              onClick={() => setAudioBlob(null)}
            >
              <img width={50} src={iconRetake} />
            </button>
          )}
          {selfie && <AudioRecorder></AudioRecorder>}
          {audioBlob && (
            <button
              className="w-1/2 caves-button"
              onClick={() => upload()}
              style={{
                backgroundImage: `url(${buttonBorder})`,
                backgroundSize: "100% 100%",
                padding: "15px 20px",
                fontSize: 23,
              }}
            >
              TEILEN
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {uploading && renderLoadingSpinner()}
      {!uploading && renderParticipateView()}
    </div>
  );
}
