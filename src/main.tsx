import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
});

// Global promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById("root");

if (!rootElement) {
    console.error("Failed to find the root element");
} else {
    const root = createRoot(rootElement);

    try {
        root.render(<App />);
        console.log("App rendered successfully");
    } catch (error) {
        console.error("Error rendering the app:", error);

        // Create fallback UI if render fails
        rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h2>Something went wrong</h2>
        <p>The application failed to load properly. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0ea5e9; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;">
          Refresh Page
        </button>
      </div>
    `;
    }
}