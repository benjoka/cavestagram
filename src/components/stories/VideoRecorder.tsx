import { postStory } from "api/stories";
import { useEffect, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { useAppStore } from "stores/AppStore";

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
  return <video ref={videoRef} autoPlay />;
};

export default function VideoRecorder() {
  const { selfie, setParticipateMode } = useAppStore();

  const upload = (uri: string) => {
    postStory(selfie, uri);
    setParticipateMode(null);
  };
  return (
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
            <div>
              {status !== "recording" && (
                <button onClick={startRecording}>Start Recording</button>
              )}
              {status === "recording" && (
                <button onClick={stopRecording}>Stop Recording</button>
              )}
              {mediaBlobUrl && (
                <div>
                  <video src={mediaBlobUrl} controls autoPlay loop />
                  <button onClick={() => upload(mediaBlobUrl)}>Upload</button>
                </div>
              )}
              <VideoPreview stream={previewStream} />
            </div>
          );
        }}
      />
    </div>
  );
}
