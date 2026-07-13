import { afterEach, describe, expect, test } from 'bun:test';

import { defaultSettings, useSettingsStore } from '@/store/settingsStore';

describe('settingsStore', () => {
  afterEach(() => {
    useSettingsStore.getState().resetSettings();
  });

  test('uses the required defaults', () => {
    expect(useSettingsStore.getState()).toMatchObject(defaultSettings);
  });

  test('updates and resets settings', () => {
    useSettingsStore.getState().setShowMatureCategories(true);
    useSettingsStore.getState().setConfirmBeforeOpeningMagnetLinks(false);
    useSettingsStore.getState().acknowledgeMagnetNotice();

    expect(useSettingsStore.getState()).toMatchObject({
      showMatureCategories: true,
      confirmBeforeOpeningMagnetLinks: false,
      magnetNoticeAcknowledged: true,
    });

    useSettingsStore.getState().resetSettings();
    expect(useSettingsStore.getState()).toMatchObject(defaultSettings);
  });
});
