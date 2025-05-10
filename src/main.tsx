import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./query/queryClient.ts";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme.ts";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </QueryClientProvider>
);
