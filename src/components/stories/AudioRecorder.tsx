import { useEffect, useRef, useState } from "react";
import { useAppStore } from "stores/AppStore";
import iconCircle from "assets/images/icons/icon_circle.png";
import iconMicCircle from "assets/images/icons/icon_mic_circle.png";
import iconStopCircle from "assets/images/icons/icon_stop_circle.png";

let mimeType: string | null = null;
if (MediaRecorder.isTypeSupported("audio/webm")) {
  mimeType = "audio/webm";
} else if (MediaRecorder.isTypeSupported("audio/ogg")) {
  mimeType = "audio/ogg";
} else if (MediaRecorder.isTypeSupported("audio/mpeg")) {
  mimeType = "audio/mpeg";
} else if (MediaRecorder.isTypeSupported("audio/mp4")) {
  mimeType = "audio/mp4";
}

export default function AudioRecorder() {
  const { setAudioBlob } = useAppStore();
  const [uploading] = useState(false);
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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

  return (
    <div>
      <div className="w-full h-full">
        {uploading && (
          <div className="flex items-center justify-center w-full h-full">
            <img src={iconCircle} width={70} className="animate-spin-slow" />
          </div>
        )}
        {!uploading && !audioUrl && (
          <div className="w-full h-full flex items-center justify-center">
            {permission && recordingStatus === "inactive" && (
              <button onClick={startRecording}>
                <img width={70} src={iconMicCircle} />
              </button>
            )}
            {permission && recordingStatus === "recording" && (
              <button onClick={stopRecording}>
                <img width={70} src={iconStopCircle} />
              </button>
            )}
          </div>
        )}
      </div>
      {recordingStatus === "inactive" && audioUrl && (
        <audio src={audioUrl} controls autoPlay loop className="hidden" />
      )}
    </div>
  );
}
