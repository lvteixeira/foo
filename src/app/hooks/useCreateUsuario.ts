import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsuarioService } from "../service/UsuarioService";
import type { Usuario } from "../types/UsuarioDTO";
import { USERS_QUERY_KEY } from "./useUsuarios";

export function useCreateUsuario() {
  const service = new UsuarioService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (usuario: Usuario) => service.criarUsuario(usuario),
    onSuccess: (newUsuario: Usuario) => {
      //queryClient.setQueryData(USERS_QUERY_KEY, (old: Usuario[] = []) => [...old, newUsuario]);
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error: Error) => {
      console.error("Falha ao criar usuário", error.message);
    },
  });
}
