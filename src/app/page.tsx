"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsuarioForm from "./components/form/UsuarioForm";

const queryClient = new QueryClient();

export default function Home() {
  return(
    <QueryClientProvider client={queryClient}>
      <UsuarioForm />
    </QueryClientProvider>
  );
}