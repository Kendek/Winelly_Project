import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mergeConfig } from 'vitest/config'

export default mergeConfig(
  defineConfig({ plugins: [react()] }),
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/tests/setup.ts'],
    },
  })
)
