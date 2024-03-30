import { postStory } from "api/stories";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppStore } from "stores/AppStore";
import iconCircle from "assets/images/icons/icon_circle.png";
import iconRecordCircle from "assets/images/icons/icon_record_circle.png";
import iconStopCircle from "assets/images/icons/icon_stop_circle.png";
import buttonBorder from "assets/images/icons/button_border.png";

let mimeType = "";
if (MediaRecorder.isTypeSupported("video/webm; codecs=vp9")) {
  mimeType = "video/webm; codecs=vp9";
} else if (MediaRecorder.isTypeSupported("video/webm")) {
  mimeType = "video/webm";
} else if (MediaRecorder.isTypeSupported("video/mp4")) {
  mimeType = "video/mp4";
}

export default function VideoRecorder() {
  const { selfie, setParticipateMode, setSelfie } = useAppStore();
  const [uploading, setUploading] = useState(false);
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const liveVideoFeed = useRef<HTMLVideoElement | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    getCameraPermission();
  }, []);
  const getCameraPermission = async () => {
    setRecordedVideo(null);
    //get video and audio permissions and then stream the result media stream to the videoSrc variable
    if ("MediaRecorder" in window && liveVideoFeed.current) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };
        const audioConstraints = { audio: true };
        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        setPermission(true);

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        setStream(combinedStream);

        liveVideoFeed.current.srcObject = videoStream;
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
      const media = new MediaRecorder(stream, { mimeType });
      mediaRecorder.current = media;
      mediaRecorder.current.start();
      let localVideoChunks: any = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localVideoChunks.push(event.data);
      };
      setVideoChunks(localVideoChunks);
    }
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    if (mediaRecorder.current && stream) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        const videoBlob = new Blob(videoChunks, { type: mimeType });
        setBlob(videoBlob);
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideo(videoUrl);
        stream.getTracks().forEach((track) => track.stop());
      };
    }
  };

  const upload = async () => {
    if (selfie && blob) {
      setUploading(true);
      await postStory(selfie, blob);
      setSelfie(null);
      setParticipateMode(null);
      setRecordedVideo(null);
      setUploading(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      {uploading && (
        <div className="flex items-center justify-center w-full h-full">
          <img src={iconCircle} width={70} className="animate-spin-slow" />
        </div>
      )}
      {!uploading && (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="w-full relative aspect-square mb-[20px]">
            <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
            {!recordedVideo && (
              <video
                playsInline
                ref={liveVideoFeed}
                autoPlay
                className="w-full h-full object-cover"
              ></video>
            )}
            {recordedVideo && (
              <video
                playsInline
                autoPlay
                loop
                className="w-full h-full object-cover"
                src={recordedVideo}
              ></video>
            )}
          </div>
          <div className="w-full h-[60px] flex items-center justify-center z-20 mt-[40px]">
            {permission && recordingStatus === "inactive" && !recordedVideo && (
              <button onClick={startRecording}>
                <img width={80} src={iconRecordCircle} />
              </button>
            )}
            {permission &&
              recordingStatus === "recording" &&
              !recordedVideo && (
                <button onClick={stopRecording}>
                  <img width={80} src={iconStopCircle} />
                </button>
              )}
            {recordingStatus === "inactive" && recordedVideo && (
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
