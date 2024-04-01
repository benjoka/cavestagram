import { useEffect, useState } from "react";
import AudioVisualiser from "./AudioVisualiser";

export default function AudioAnalyser({ audio }: { audio: any }) {
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  const source = audioContext.createMediaStreamSource(audio);
  const [rafId, setRafId] = useState<number | null>(null);
  useEffect(() => {
    source.connect(analyser);
    tick();
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      analyser.disconnect();
      source.disconnect();
    };
  }, []);

  const tick = () => {
    analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);
    setRafId(requestAnimationFrame(tick));
  };

  return <AudioVisualiser audio={audioData} />;
}
