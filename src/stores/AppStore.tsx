import { create } from "zustand";

export interface AppStore {
  activeView: string;
  participateMode: string | null;
  selfie: string | null;
  audioBlob: Blob | null;
  setActiveView: (view: string) => void;
  setAudioBlob: (blob: Blob | null) => void;
  setParticipateMode: (mode: string | null) => void;
  setSelfie: (selfie: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeView: "grotte-passe",
  participateMode: null,
  selfie: null,
  audioBlob: null,
  setActiveView: (view: string) => set(() => ({ activeView: view })),
  setAudioBlob: (blob: Blob | null) => set(() => ({ audioBlob: blob })),
  setParticipateMode: (mode: string | null) =>
    set(() => ({ participateMode: mode })),
  setSelfie: (selfie: string | null) => set(() => ({ selfie: selfie })),
}));
