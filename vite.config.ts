import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pigment } from '@pigment-css/vite-plugin';

export default defineConfig({
	plugins: [react(), pigment({})]
});
