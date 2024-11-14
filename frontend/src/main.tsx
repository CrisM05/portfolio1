import "./styles/index.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import TypingContextProvider from "./contexts/TypingContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TypingContextProvider>
      <App />
    </TypingContextProvider>
  </StrictMode>
);
