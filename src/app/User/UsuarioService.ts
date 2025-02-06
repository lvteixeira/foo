import HttpUtil from "./HttpUtil";

export default class UsuarioService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8080/postagem";
  }

  async listar(): Promise<any> {
    try {
      return await HttpUtil.get(this.baseUrl);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async criarUsuario(payload: any): Promise<any> {
    try {
      return await HttpUtil.post(this.baseUrl, payload);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async recuperarPorId(id: string): Promise<any> {
    try {
      const url = this.baseUrl + "/" + id;
      return await HttpUtil.get(url);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async atualizarUsuario(payload: any, id: string): Promise<any> {
    try {
      const url = this.baseUrl + "/" + id;
      return await HttpUtil.put(url, payload);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async removerUsuario(id: string): Promise<any> {
    try {
      const url = this.baseUrl + "/" + id;
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