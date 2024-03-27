import { create } from "zustand";

export const useEventCreation = create((set) => ({
  bannerImage: null,
  setBannerImage: (bannerImage) => set({ bannerImage }),
}));
