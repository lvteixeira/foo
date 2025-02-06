"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UsuarioDTO, { Usuario, getInitialValues } from "./UsuarioDTO";
import UsuarioService from "./UsuarioService";

export default function UsuarioForm() {
  const validationSchema = UsuarioDTO;
  const initialValues: Usuario = getInitialValues();
  const service: UsuarioService = new UsuarioService();

  async function handleSubmit(values: Usuario, actions: any): Promise<void> {
    console.log(values);
    try {
      await service.criarUsuario(values);
    } catch (e) {
      console.error("Falha ao criar usuário", e);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}