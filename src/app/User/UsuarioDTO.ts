import * as Yup from "yup";

const UsuarioDTO = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  sobrenome: Yup.string().required("Sobrenome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
});

export function getInitialValues(): Usuario {
  return {
    nome: "",
    sobrenome: "",
    email: "",
  };
}

export type Usuario = Yup.InferType<typeof UsuarioDTO>;
export default UsuarioDTO;