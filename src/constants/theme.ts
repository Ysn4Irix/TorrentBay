export const themeColors = {
  dark: {
    background: '#08111F',
    surface: '#0E1A2B',
    surfaceElevated: '#142238',
    surfaceMuted: '#192A42',
    border: '#263A55',
    primary: '#2DD4BF',
    primaryPressed: '#14B8A6',
    primarySoft: '#123D3B',
    textPrimary: '#F4F7FB',
    textSecondary: '#AAB8CC',
    textMuted: '#71819A',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#FB7185',
    info: '#60A5FA',
    vip: '#C084FC',
    scrim: 'rgba(0,0,0,0.64)',
  },
  light: {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceMuted: '#EAF0F5',
    border: '#D5DEE9',
    primary: '#0F766E',
    primaryPressed: '#115E59',
    primarySoft: '#CCFBF1',
    textPrimary: '#102033',
    textSecondary: '#475569',
    textMuted: '#718096',
    success: '#15803D',
    warning: '#B45309',
    error: '#BE123C',
    info: '#1D4ED8',
    vip: '#7E22CE',
    scrim: 'rgba(0,0,0,0.48)',
  },
} as const;

export const colors = {
  ...themeColors.dark,
  // Compatibility aliases for existing screens while Stage 1/2 migrates to semantic names.
  foreground: themeColors.dark.textPrimary,
  muted: themeColors.dark.textSecondary,
  danger: themeColors.dark.error,
  seeders: themeColors.dark.success,
  leechers: themeColors.dark.warning,
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '700' },
  h1: { fontSize: 24, lineHeight: 30, fontWeight: '700' },
  h2: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  h3: { fontSize: 17, lineHeight: 23, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 21, fontWeight: '400' },
  bodyStrong: { fontSize: 15, lineHeight: 21, fontWeight: '600' },
  small: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  caption: { fontSize: 11, lineHeight: 15, fontWeight: '500' },
  metric: { fontSize: 14, lineHeight: 18, fontWeight: '700' },
} as const;
