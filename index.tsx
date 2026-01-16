import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Agentic AI Integrators: Initializing Cognitive Framework...");

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("CRITICAL_FAILURE: Root container not found in DOM.");
}