import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsuarioService } from "../service/UsuarioService";
import type { Usuario } from "../types/Usuario";

export const USERS_QUERY_KEY = ["usuarios"] as const;

function useUsuarioMutations(setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>) {
  const service = new UsuarioService();
  const queryClient = useQueryClient();

  const listar = useMutation({
    mutationFn: service.listar,
    onSuccess: (data: Usuario[]) => {
      setUsuarios(data);
      // Cache data
      queryClient.setQueryData(USERS_QUERY_KEY, data);
    },
    onError: (error: Error) => {
      console.error("Falha ao listar usuários", error.message);
    },
  });

  const criar = useMutation({
    mutationFn: (usuario: Usuario) => service.criarUsuario(usuario),
    onSuccess: (newUsuario: Usuario) => {
      // Optimistic update
      queryClient.setQueryData(USERS_QUERY_KEY, (old: Usuario[] = []) => [...old, newUsuario]);
      // Invalidate to ensure data consistency
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error: Error) => {
      console.error("Falha ao criar usuário", error.message);
    },
  });

  return { listar, criar };
}

export default useUsuarioMutations;
