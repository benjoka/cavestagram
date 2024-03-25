import { postStory } from "api/stories";
import { ReactMediaRecorder } from "react-media-recorder";
import { useAppStore } from "stores/AppStore";

export default function AudioRecorder() {
  const { selfie, setParticipateMode } = useAppStore();
  const upload = async (uri: string) => {
    if (selfie) {
      postStory(selfie, uri);
      setParticipateMode(null);
    }
  };
  return (
    <div>
      <ReactMediaRecorder
        askPermissionOnMount
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
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
                  <audio src={mediaBlobUrl} controls autoPlay loop />
                  <button onClick={() => upload(mediaBlobUrl)}>Upload</button>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
