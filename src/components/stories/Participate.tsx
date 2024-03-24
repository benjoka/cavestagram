import { useEffect, useState } from "react";
import VideoRecorder from "./VideoRecorder";
import AudioRecorder from "./AudioRecorder";
import SelfieCamera from "./SelfieCamera";
import { useAppStore } from "stores/AppStore";

export default function Participate() {
  const { participateMode, setParticipateMode } = useAppStore();
  return (
    <div className="w-full h-full">
      {participateMode === "selfie" && <SelfieCamera></SelfieCamera>}
      {participateMode === "video" && <VideoRecorder></VideoRecorder>}
      {participateMode === "audio" && <AudioRecorder></AudioRecorder>}
    </div>
  );
}
