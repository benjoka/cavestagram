import { postStory } from "api/stories";
import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { useAppStore } from "stores/AppStore";
import iconCircle from "assets/images/icons/icon_circle.png";
import iconMicCircle from "assets/images/icons/icon_mic_circle.png";
import iconStopCircle from "assets/images/icons/icon_stop_circle.png";
import buttonBorder from "assets/images/icons/button_border.png";

export default function AudioRecorder() {
  const { selfie, setParticipateMode, setSelfie } = useAppStore();
  const [uploading, setUploading] = useState(false);

  const upload = async (uri: string) => {
    if (selfie) {
      setUploading(true);
      const blob = await fetch(uri).then((r) => r.blob());
      postStory(selfie, blob);
      setSelfie(null);
      setParticipateMode(null);
      setUploading(false);
    }
  };
  return (
    <div className="w-full h-full">
      {uploading && (
        <div className="flex items-center justify-center w-full h-full">
          <img src={iconCircle} width={70} className="animate-spin-slow" />
        </div>
      )}
      {!uploading && (
        <ReactMediaRecorder
          askPermissionOnMount
          audio
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
            return (
              <div className="w-full h-full flex items-center justify-center">
                {status !== "recording" && !mediaBlobUrl && (
                  <button onClick={startRecording}>
                    <img width={150} src={iconMicCircle} />
                  </button>
                )}
                {status === "recording" && (
                  <button onClick={stopRecording}>
                    <img width={150} src={iconStopCircle} />
                  </button>
                )}
                {mediaBlobUrl && (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <audio
                      src={mediaBlobUrl}
                      controls
                      autoPlay
                      loop
                      className="hidden"
                    />
                    {selfie && (
                      <div className="w-full aspect-square relative">
                        <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
                        <img
                          src={selfie}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <button
                      className="w-full caves-button"
                      onClick={() => upload(mediaBlobUrl)}
                      style={{
                        backgroundImage: `url(${buttonBorder})`,
                        backgroundSize: "100% 100%",
                        padding: "20px 60px",
                      }}
                    >
                      TEILEN
                    </button>
                  </div>
                )}
              </div>
            );
          }}
        />
      )}
    </div>
  );
}
