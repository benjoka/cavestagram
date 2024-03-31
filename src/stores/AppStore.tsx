import { Story } from "types/Story";
import { create } from "zustand";

export interface AppStore {
  activeView: string;
  participateMode: string | null;
  selfie: string | null;
  audioBlob: Blob | null;
  stories: Story[];
  setActiveView: (view: string) => void;
  setStories: (stories: Story[]) => void;
  setAudioBlob: (blob: Blob | null) => void;
  setParticipateMode: (mode: string | null) => void;
  setSelfie: (selfie: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeView: "grotte-passe",
  participateMode: null,
  selfie: null,
  stories: [],
  audioBlob: null,
  setStories: (stories: Story[]) =>
    set(() => ({ stories: shuffleArray(stories) })),
  setActiveView: (view: string) => set(() => ({ activeView: view })),
  setAudioBlob: (blob: Blob | null) => set(() => ({ audioBlob: blob })),
  setParticipateMode: (mode: string | null) =>
    set(() => ({ participateMode: mode })),
  setSelfie: (selfie: string | null) => set(() => ({ selfie: selfie })),
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
