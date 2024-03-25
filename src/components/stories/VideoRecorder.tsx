import { postStory } from "api/stories";
import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { useAppStore } from "stores/AppStore";
import iconCircle from "assets/images/icons/icon_circle.png";

export default function VideoRecorder() {
  const { selfie, setParticipateMode, setSelfie } = useAppStore();
  const [uploading, setUploading] = useState(false);
  const upload = async (uri: string) => {
    if (selfie) {
      setUploading(true);
      await postStory(selfie, uri);
      setUploading(false);
      setSelfie(null);
      setParticipateMode(null);
    }
  };
  return (
    <div className="w-full h-full relative">
      {uploading && (
        <div className="flex items-center justify-center w-full h-full">
          <img src={iconCircle} width={50} className="animate-spin-slow" />
        </div>
      )}
      {!uploading && (
        <div>
          <ReactMediaRecorder
            askPermissionOnMount
            video
            render={({
              status,
              startRecording,
              stopRecording,
              mediaBlobUrl,
              previewStream,
            }) => {
              return (
                <div className="w-full h-full flex flex-col items-center justify-evenly">
                  <div className="w-full relative aspect-square">
                    <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
                    {mediaBlobUrl && (
                      <video
                        className="w-full h-full object-cover"
                        playsInline
                        src={mediaBlobUrl}
                        autoPlay
                        loop
                      />
                    )}
                    {!mediaBlobUrl && <VideoPreview stream={previewStream} />}
                  </div>
                  <div className="w-full h-[60px] flex items-center justify-center">
                    {status === "idle" && (
                      <button onClick={startRecording}>
                        <div className="p-[2px] border-white border-2 border-solid rounded-full w-[50px] h-[50px]">
                          <div className="rounded-full bg-red-500 w-full h-full"></div>
                        </div>
                      </button>
                    )}
                    {status === "recording" && (
                      <button onClick={stopRecording}>
                        <div className="p-[2px] border-white border-2 border-solid rounded-full flex items-center justify-center w-[50px] h-[50px]">
                          <div className="rounded bg-red-500 w-1/2 h-1/2"></div>
                        </div>
                      </button>
                    )}
                    {status === "stopped" && mediaBlobUrl && (
                      <button onClick={() => upload(mediaBlobUrl)}>
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}

const VideoPreview = ({ stream }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return (
    <video
      className="w-full h-full object-cover"
      playsInline
      ref={videoRef}
      autoPlay
    />
  );
};
