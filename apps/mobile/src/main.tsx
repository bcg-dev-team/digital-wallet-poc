import { createRoot } from "react-dom/client";
import { ClickToComponent } from "click-to-react-component";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    {import.meta.env.DEV && <ClickToComponent editor="cursor" />}
    <App />
  </>
);