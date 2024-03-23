import { useEffect, useState } from "react";
import VideoRecorder from "./VideoRecorder";
import AudioRecorder from "./AudioRecorder";
import SelfieCamera from "./SelfieCamera";
import { useAppStore } from "stores/AppStore";

export default function Participate() {
  const { participateMode, setParticipateMode } = useAppStore();
  return (
    <div>
      {participateMode === "selfie" && <SelfieCamera></SelfieCamera>}
      {participateMode === "type" && (
        <div>
          <button className="p-4" onClick={() => setParticipateMode("video")}>
            Video
          </button>
          <button className="p-4" onClick={() => setParticipateMode("audio")}>
            Audio
          </button>
        </div>
      )}
      {participateMode === "video" && <VideoRecorder></VideoRecorder>}
      {participateMode === "audio" && <AudioRecorder></AudioRecorder>}
    </div>
  );
}
