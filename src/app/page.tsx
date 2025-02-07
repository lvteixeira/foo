"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsuarioForm from "./components/form/UsuarioForm";

// Create a client outside the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export default function Home() {
  return(
    <QueryClientProvider client={queryClient}>
      <UsuarioForm />
    </QueryClientProvider>
  );
}
