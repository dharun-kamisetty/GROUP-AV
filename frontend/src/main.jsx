import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { ThemeProvider } from "./app/contexts/ThemeContext.jsx";
import "./styles/index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
