import { Story } from "types/Story";
import { create } from "zustand";
import VoicePresentAudio from "assets/audio/grotte_present_intro.mp3";
import VoicePasseAudio from "assets/audio/grotte_passe_intro.mp3";
import WaveSurfer from "wavesurfer.js";

export interface AppStore {
  activeView: string;
  participateMode: string | null;
  selfie: string | null;
  audioBlob: Blob | null;
  stories: Story[];
  audioStream: MediaStream | null;
  recordingStatus: string;
  grottePasseeIntroPlayed: boolean;
  grottePresentIntroPlayed: boolean;
  cavePasseeEntered: boolean;
  caveSound: boolean;
  voicePresentAudio: HTMLAudioElement | null;
  voicePasseAudio: HTMLAudioElement | null;
  currentStoryAudio: string | null;
  setCurrentStoryAudio: (url: string) => void;
  setVoicePresentAudio: (audio: HTMLAudioElement) => void;
  setVoicePasseAudio: (audio: HTMLAudioElement) => void;
  setRecordingStatus: (status: string) => void;
  setGrottePasseeIntroPlayed: (value: boolean) => void;
  setGrottePresentIntroPlayed: (value: boolean) => void;
  setCavePasseeEntered: (value: boolean) => void;
  setCaveSound: (value: boolean) => void;
  setActiveView: (view: string) => void;
  setStories: (stories: Story[]) => void;
  setAudioBlob: (blob: Blob | null) => void;
  setParticipateMode: (mode: string | null) => void;
  setSelfie: (selfie: string | null) => void;
  setAudioStream: (stream: MediaStream | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeView: "grotte-passe",
  participateMode: null,
  selfie: null,
  stories: [],
  audioBlob: null,
  audioStream: null,
  recordingStatus: "inactive",
  grottePasseeIntroPlayed: false,
  grottePresentIntroPlayed: false,
  cavePasseeEntered: false,
  caveSound: false,
  voicePresentAudio: new Audio(VoicePresentAudio),
  voicePasseAudio: new Audio(VoicePasseAudio),
  currentStoryAudio: null,
  setCurrentStoryAudio: (url: string) =>
    set(() => ({ currentStoryAudio: url })),
  setVoicePresentAudio: (audio: HTMLAudioElement) =>
    set(() => ({ voicePresentAudio: audio })),
  setVoicePasseAudio: (audio: HTMLAudioElement) =>
    set(() => ({ voicePasseAudio: audio })),
  setRecordingStatus: (status: string) =>
    set(() => ({ recordingStatus: status })),
  setCavePasseeEntered: (value: boolean) =>
    set(() => ({ cavePasseeEntered: value })),
  setGrottePasseeIntroPlayed: (value: boolean) =>
    set(() => ({ grottePasseeIntroPlayed: value })),
  setGrottePresentIntroPlayed: (value: boolean) =>
    set(() => ({ grottePresentIntroPlayed: value })),
  setCaveSound: (value: boolean) => set(() => ({ caveSound: value })),
  setStories: (stories: Story[]) => set(() => ({ stories: stories })),
  setActiveView: (view: string) => set(() => ({ activeView: view })),
  setAudioBlob: (blob: Blob | null) => set(() => ({ audioBlob: blob })),
  setParticipateMode: (mode: string | null) =>
    set(() => ({ participateMode: mode })),
  setSelfie: (selfie: string | null) => set(() => ({ selfie: selfie })),
  setAudioStream: (stream: MediaStream | null) =>
    set(() => ({ audioStream: stream })),
}));

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
