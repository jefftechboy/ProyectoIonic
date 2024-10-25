import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'agenda',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    BarcodeScanner: {
      // Configuración opcional si es necesaria
    }
  }
};

export default config;
