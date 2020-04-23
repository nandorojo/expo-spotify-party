import { Platform } from 'react-native'

const baseFontSize = 18

const ThemeUi = {
  colors: {
    primary: '#1DB954',
    secondary: '#E936A0',
    accent: '',
    gray: '',
    background: '#000000',
    text: '#ffffff',
    border: '',
    surface: '#080f1e',
    muted: '#131313',
    alert: 'red',
  },
  spacing: [
    0,
    baseFontSize * 0.75,
    baseFontSize,
    baseFontSize * 1.1,
    baseFontSize * 1.3,
    baseFontSize * 1.5,
    baseFontSize * 1.7,
    baseFontSize * 2,
  ],
  fontSizes: [
    baseFontSize,
    baseFontSize * 1.1,
    baseFontSize * 1.3,
    baseFontSize * 1.5,
    baseFontSize * 1.7,
    baseFontSize * 2,
  ],
  radii: [2, 4, 6, 8, 10],
  sizes: {
    container: Platform.OS === 'web' ? '66rem' : '100%',
  },
  borders: [2, 4, 6, 8, 10],
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600' as '600',
    bold: 'bold',
  },
}

export { ThemeUi }

export type ThemeProps = { theme: typeof ThemeUi }
