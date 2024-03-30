import { postStory } from "api/stories";
import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { useAppStore } from "stores/AppStore";
import iconCircle from "assets/images/icons/icon_circle.png";
import iconMicCircle from "assets/images/icons/icon_mic_circle.png";
import iconStopCircle from "assets/images/icons/icon_stop_circle.png";
import buttonBorder from "assets/images/icons/button_border.png";

let mimeType: string | null = null;
if (MediaRecorder.isTypeSupported("audio/webm")) {
  mimeType = "audio/webm";
} else if (MediaRecorder.isTypeSupported("audio/aac")) {
  mimeType = "audio/aac";
}

export default function AudioRecorder() {
  const { selfie, setParticipateMode, setSelfie } = useAppStore();
  const [uploading, setUploading] = useState(false);
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [audioChunks, setAudioChunks] = useState([]);

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (stream) {
      setRecordingStatus("recording");
      const media = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorder.current = media;
      mediaRecorder.current.start();
      let localAudioChunks: any = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      setRecordingStatus("inactive");
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        const audioBlob = mimeType
          ? new Blob(audioChunks, { type: mimeType })
          : new Blob(audioChunks);
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        setAudioChunks([]);
      };
    }
  };

  const upload = async (uri: string) => {
    if (selfie && audioBlob) {
      setUploading(true);
      postStory(selfie, audioBlob);
      setSelfie(null);
      setParticipateMode(null);
      setUploading(false);
      setAudioUrl(null);
      setAudioBlob(null);
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
        <div className="w-full h-full flex items-center justify-center">
          {permission && recordingStatus === "inactive" && !audioUrl && (
            <button onClick={startRecording}>
              <img width={150} src={iconMicCircle} />
            </button>
          )}
          {permission && recordingStatus === "recording" && (
            <button onClick={stopRecording}>
              <img width={150} src={iconStopCircle} />
            </button>
          )}
          {recordingStatus === "inactive" && audioUrl && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <audio src={audioUrl} controls autoPlay loop className="hidden" />
              {selfie && (
                <div className="w-full aspect-square relative">
                  <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
                  <img src={selfie} className="object-cover w-full h-full" />
                </div>
              )}
              <button
                className="w-full caves-button"
                onClick={() => upload(audioUrl)}
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
      )}
    </div>
  );
}
