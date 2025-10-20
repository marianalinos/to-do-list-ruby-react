import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssVarsProvider, extendTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Minimal theme setup using MUI's CSS variables provider (supports light/dark)
const theme = extendTheme({
  colorSchemes: {
    light: {},
    dark: {},
  },
})

createRoot(document.getElementById('root')!).render(
  <CssVarsProvider theme={theme} defaultMode="light">
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </CssVarsProvider>
)
