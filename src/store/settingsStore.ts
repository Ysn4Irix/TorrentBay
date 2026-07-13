import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { persistentStorage } from '@/services/storage/persistentStorage';

export type AppSettings = {
  showMatureCategories: boolean;
  confirmBeforeOpeningMagnetLinks: boolean;
  magnetNoticeAcknowledged: boolean;
};

type SettingsState = AppSettings & {
  updateSettings: (settings: Partial<AppSettings>) => void;
  setShowMatureCategories: (showMatureCategories: boolean) => void;
  setConfirmBeforeOpeningMagnetLinks: (
    confirmBeforeOpeningMagnetLinks: boolean,
  ) => void;
  acknowledgeMagnetNotice: () => void;
  resetSettings: () => void;
};

export const defaultSettings: AppSettings = {
  showMatureCategories: false,
  confirmBeforeOpeningMagnetLinks: true,
  magnetNoticeAcknowledged: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (settings) => set(settings),
      setShowMatureCategories: (showMatureCategories) =>
        set({ showMatureCategories }),
      setConfirmBeforeOpeningMagnetLinks: (confirmBeforeOpeningMagnetLinks) =>
        set({ confirmBeforeOpeningMagnetLinks }),
      acknowledgeMagnetNotice: () => set({ magnetNoticeAcknowledged: true }),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'torrentbay:settings',
      storage: createJSONStorage(() => persistentStorage),
      partialize: (state) => ({
        showMatureCategories: state.showMatureCategories,
        confirmBeforeOpeningMagnetLinks: state.confirmBeforeOpeningMagnetLinks,
        magnetNoticeAcknowledged: state.magnetNoticeAcknowledged,
      }),
    },
  ),
);
