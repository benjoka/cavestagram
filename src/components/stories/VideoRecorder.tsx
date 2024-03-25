import { postStory } from "api/stories";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppStore } from "stores/AppStore";
import iconCircle from "assets/images/icons/icon_circle.png";
import Webcam from "react-webcam";
import iconRecordCircle from "assets/images/icons/icon_record_circle.png";
import iconStopCircle from "assets/images/icons/icon_stop_circle.png";
import buttonBorder from "assets/images/icons/button_border.png";

export default function VideoRecorder() {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);

  const { selfie, setParticipateMode, setSelfie } = useAppStore();
  const [uploading, setUploading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const handleDataAvailable = useCallback(
    ({ data }: { data: any }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  useEffect(() => {
    if (recordedChunks.length !== 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      setRecordedVideo(URL.createObjectURL(blob));
    }
  }, [recordedChunks]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  const upload = async () => {
    if (selfie && recordedChunks.length) {
      setUploading(true);
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      await postStory(selfie, blob);
      setSelfie(null);
      setParticipateMode(null);
      setRecordedChunks([]);
      setUploading(false);
    }
  };

  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <div className="w-full h-full relative">
      {uploading && (
        <div className="flex items-center justify-center w-full h-full">
          <img src={iconCircle} width={70} className="animate-spin-slow" />
        </div>
      )}
      {!uploading && (
        <div className="w-full h-full flex flex-col items-center justify-evenly">
          <div className="w-full relative aspect-square">
            <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
            {!recordedVideo && (
              <Webcam
                muted
                audio
                className="w-full h-full object-cover"
                ref={webcamRef}
                mirrored={false}
                videoConstraints={videoConstraints}
              />
            )}
            {recordedVideo && (
              <video
                autoPlay
                loop
                className="w-full h-full object-cover"
                src={recordedVideo}
              />
            )}
          </div>
          <div className="w-full h-[60px] flex items-center justify-center">
            {!capturing && recordedChunks.length === 0 && (
              <button onClick={handleStartCaptureClick}>
                <img width={80} src={iconRecordCircle} />
              </button>
            )}
            {capturing && (
              <button onClick={handleStopCaptureClick}>
                <img width={80} src={iconStopCircle} />
              </button>
            )}
            {!capturing && recordedChunks.length !== 0 && (
              <button
                className="w-full caves-button"
                onClick={upload}
                style={{
                  backgroundImage: `url(${buttonBorder})`,
                  backgroundSize: "100% 100%",
                  padding: "20px 60px",
                }}
              >
                TEILEN
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const VideoPreview = ({ stream }: any) => {
  return (
    <video
      className="w-full h-full object-cover"
      playsInline
      ref={stream}
      autoPlay
    />
  );
};
