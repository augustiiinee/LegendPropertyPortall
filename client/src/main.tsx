import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from '@/components/ui/theme-provider';
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme({
  className: "light-theme",
  mode: "light",
});

root.render(
  <ThemeProvider defaultTheme="light" storageKey="legend-management-theme">
    <App />
  </ThemeProvider>
);
