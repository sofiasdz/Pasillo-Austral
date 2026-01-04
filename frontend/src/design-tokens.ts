/**
 * Design Tokens for Pasillo Austral
 * Extracted from Figma design system
 */

export const colors = {
  primary: '#497fff',
  primaryDark: '#00299b',
  primaryDarker: '#002f95',
  primaryLight: '#3e6ac9',
  background: '#fbfbfb',
  white: '#ffffff',
  gray: {
    50: '#f7f7f7',
    100: '#eaeaea',
    200: '#e2e8f1',
    300: '#e9e9e9',
    400: '#dddcdc',
    500: '#ccc',
    600: '#b7b0b0',
    700: '#a9b4b8',
    800: '#808080',
    900: '#575757',
    950: '#4f5759',
    975: '#404446',
    1000: '#3C3C43',
  },
  text: {
    primary: '#ffffff',
    secondary: '#575757',
    tertiary: '#808080',
    quaternary: '#4f5759',
    link: '#98b6ff',
    linkLight: '#9fbef2',
    inputLabel: '#00299b',
    inputLabelDark: '#002f95',
    muted: '#b7b0b0',
    light: '#ccc',
  },
  border: {
    light: '#e9e9e9',
    medium: '#dddcdc',
    default: '#E2E8F1',
    card: 'rgba(224,220,220,0.5)',
    calendar: 'rgba(128,128,128,0.3)',
    calendarLight: 'rgba(128,128,128,0.2)',
    sidebar: 'rgba(230,230,230,0.5)',
  },
  required: '#ff0000', // Red for asterisk
  overlay: 'rgba(255, 255, 255, 0.3)',
  primaryBg: 'rgba(73,127,255,0.07)',
} as const;

export const typography = {
  fontFamily: {
    primary: "'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif",
    secondary: "'Manrope', system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  fontSize: {
    xs: '9px',
    xxs: '10px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '32px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  lineHeight: {
    normal: 'normal',
    base: 1.5,
    relaxed: '25px',
  },
} as const;

export const spacing = {
  xs: '8px',
  sm: '15px',
  md: '16px',
  lg: '24px',
  xl: '40px',
} as const;

export const borderRadius = {
  sm: '16px',
  lg: '23px',
} as const;

export const layout = {
  cardWidth: '381px',
  headerHeight: 'auto',
  headerPadding: '16px 24px',
  cardPadding: '40px',
} as const;

export const shadows = {
  card: '0px 4px 4px 0px rgba(0,0,0,0.05)',
} as const;

export const gradients = {
  backgroundOverlay: 'linear-gradient(116.12302866340596deg, rgba(73, 127, 255, 1) 0%, rgba(0, 7, 31, 0.47) 99.502%)',
} as const;

