/**
 * Design Tokens for Pasillo Austral
 * Extracted from Figma design system
 */

export const colors = {
  primary: '#497fff',
  primaryDark: '#00299b',
  primaryDarker: '#002f95',
  background: '#fbfbfb',
  white: '#ffffff',
  text: {
    primary: '#ffffff',
    secondary: '#575757',
    link: '#98b6ff',
    linkLight: '#9fbef2',
    inputLabel: '#00299b',
    inputLabelDark: '#002f95',
  },
  border: {
    light: '#e9e9e9',
    medium: '#dddcdc',
  },
  required: '#ff0000', // Red for asterisk
  overlay: 'rgba(255, 255, 255, 0.3)',
} as const;

export const typography = {
  fontFamily: {
    primary: "'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  fontSize: {
    xs: '9px',
    sm: '16px',
    base: '18px',
    md: '20px',
    lg: '32px',
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    black: 900,
  },
  lineHeight: {
    normal: 'normal',
    base: 1.5,
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
  card: '0 4px 6px rgba(0, 0, 0, 0.1)',
} as const;

export const gradients = {
  backgroundOverlay: 'linear-gradient(116.12302866340596deg, rgba(73, 127, 255, 1) 0%, rgba(0, 7, 31, 0.47) 99.502%)',
} as const;

