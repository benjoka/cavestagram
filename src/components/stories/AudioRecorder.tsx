import { postStory } from "api/stories";
import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { useAppStore } from "stores/AppStore";
import iconCircle from "assets/images/icons/icon_circle.png";
import iconMic from "assets/images/icons/icon_mic.png";

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
          <img src={iconCircle} width={50} className="animate-spin-slow" />
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
                    <img width={50} src={iconMic} />
                  </button>
                )}
                {status === "recording" && (
                  <button onClick={stopRecording}>
                    <div className="p-[2px] border-white border-2 border-solid rounded-full flex items-center justify-center w-[50px] h-[50px]">
                      <div className="rounded bg-red-500 w-1/2 h-1/2"></div>
                    </div>
                  </button>
                )}
                {mediaBlobUrl && (
                  <div className="w-full h-full flex flex-col items-center justify-evenly">
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
                    <button onClick={() => upload(mediaBlobUrl)}>Upload</button>
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
