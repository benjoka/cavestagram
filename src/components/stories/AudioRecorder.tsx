import { useEffect, useRef, useState } from "react";
import { useAppStore } from "stores/AppStore";
import iconMicCircle from "assets/images/icons/icon_mic_circle.png";
import iconStopCircle from "assets/images/icons/icon_stop_circle.png";
import useLongPress from "hooks/LongPress";
import { stat } from "fs";

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
  const {
    audioBlob,
    setAudioBlob,
    audioStream,
    setAudioStream,
    recordingStatus,
    setRecordingStatus,
  } = useAppStore();
  const [uploading] = useState(false);
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  const onLongPress = () => {
    setRecordingStatus("recording");
    setRecording(true);
    startRecording();
  };

  const onLongPressEnd = () => {
    setRecordingStatus("inactive");
    setRecording(false);
    stopRecording();
  };

  const longPressEvent = useLongPress(onLongPress, onLongPressEnd, {
    shouldPreventDefault: true,
    delay: 0,
  });

  useEffect(() => {
    setRecordingStatus("inactive");
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
        setAudioStream(mediaStream);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (audioStream) {
      setRecordingStatus("recording");
      const media = mimeType
        ? new MediaRecorder(audioStream, { mimeType })
        : new MediaRecorder(audioStream);
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
        {!uploading && !audioBlob && (
          <div className="w-full h-full flex items-center justify-center">
            {permission && (
              <div
                {...longPressEvent}
                style={{
                  userSelect: "none",
                }}
              >
                {!recording && (
                  <img
                    width={70}
                    src={iconMicCircle}
                    style={{
                      userSelect: "none",
                    }}
                  />
                )}
                {recording && (
                  <img
                    width={70}
                    src={iconStopCircle}
                    style={{
                      userSelect: "none",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
