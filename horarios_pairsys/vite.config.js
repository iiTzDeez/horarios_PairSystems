import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/horarios_PairSystems/", // 👈 Nome exato do repo
})
