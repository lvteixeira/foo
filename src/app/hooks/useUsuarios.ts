import { useQuery } from "@tanstack/react-query";
import { UsuarioService } from "../service/UsuarioService";
import type { Usuario } from "../types/Usuario";

export const USERS_QUERY_KEY = ["usuarios"] as const;

export function useUsuarios() {
  const service = new UsuarioService();

  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: service.listar,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
