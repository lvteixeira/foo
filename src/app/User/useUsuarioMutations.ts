import { useMutation, useQueryClient } from "@tanstack/react-query";
import UsuarioService from "./UsuarioService";
import { Usuario } from "./UsuarioDTO";

export default function useUsuarioMutations(setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>) {
  const service = new UsuarioService();
  const queryClient = useQueryClient();

  const listar = useMutation({
    mutationFn: service.listar,
    onSuccess: (data: Usuario[]) => {
      setUsuarios(data);
    },
    onError: (error: Error) => {
      console.error("Falha ao listar usuários", error);
    },
  });

  const criar = useMutation({
    mutationFn: service.criarUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
    onError: (error: Error) => {
      console.error("Falha ao criar usuário", error);
    },
  });

  return { listar, criar };
}