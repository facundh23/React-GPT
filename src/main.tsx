import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import ReactGPT from './ReactGpt.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactGPT />
  </React.StrictMode>,
)
