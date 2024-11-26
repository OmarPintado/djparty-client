import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DjPartyApp from "./DjPartyApp.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./context/UserContextProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <BrowserRouter>
          
            <DjPartyApp />
          
        </BrowserRouter>
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
