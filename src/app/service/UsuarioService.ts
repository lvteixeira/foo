import HttpUtil from "../util/HttpUtil";
import Constantes from "../util/Constantes";

export default class UsuarioService {
  async listar(): Promise<any> {
    try {
      return await HttpUtil.get(Constantes.URL_USUARIO);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async criarUsuario(payload: any): Promise<any> {
    try {
      return await HttpUtil.post(Constantes.URL_USUARIO, payload);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async recuperarPorId(id: string): Promise<any> {
    try {
      const url = Constantes.URL_USUARIO + "/" + id;
      return await HttpUtil.get(url);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarUsuario(payload: any, id: string): Promise<any> {
    try {
      const url = Constantes.URL_USUARIO + "/" + id;
      return await HttpUtil.put(url, payload);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async removerUsuario(id: string): Promise<any> {
    try {
      const url = Constantes.URL_USUARIO + "/" + id;
      return await HttpUtil.delete(url);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error: any) {
    if (error.response && error.response.status === 404) {
      console.error("Resource not found:", error.response);
    } else {
      console.error("An error occurred:", error);
    }
    throw error;
  }
}