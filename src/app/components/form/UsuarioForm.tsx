"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UsuarioDTO, { Usuario, getInitialValues } from "../../types/UsuarioDTO";
import useCreateUsuario from "../../hooks/useCreateUsuario";
import useUsuarios from "../../hooks/useUsuarios";

export default function UsuarioForm() {
  const { data: usuarios } = useUsuarios();
  const criarUsuario = useCreateUsuario();
  const validationSchema = UsuarioDTO;
  const initialValues: Usuario = getInitialValues();

  async function handleSubmit(values: Usuario): Promise<void> {
    criarUsuario.mutate(values);
  }

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="inputNome">
              <label htmlFor="nome">Nome: </label>
              <Field type="text" name="nome" />
              <ErrorMessage name="nome" component="div" className="error" />
            </div>
            <div className="inputSobrenome">
              <label htmlFor="sobrenome">Sobrenome: </label>
              <Field type="text" name="sobrenome" />
              <ErrorMessage name="sobrenome" component="div" className="error" />
            </div>
            <div className="inputEmail">
              <label htmlFor="email">E-mail: </label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="submit">
              <button type="submit" disabled={criarUsuario.isPending}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {usuarios && (
        <div className="lista-usuarios">
          <h2>Lista de Usuários</h2>
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                {usuario.nome} {usuario.sobrenome}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
