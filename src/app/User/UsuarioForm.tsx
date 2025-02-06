"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UsuarioDTO, { Usuario, getInitialValues } from "./UsuarioDTO";
import useUsuarioMutations from "./useUsuarioMutations";

export default function UsuarioForm() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const validationSchema = UsuarioDTO;
  const initialValues: Usuario = getInitialValues();
  const { listar, criar } = useUsuarioMutations(setUsuarios);

  useEffect(() => {
    listar.mutate();
  }, []);

  async function handleSubmit(values: Usuario, actions: any): Promise<void> {
    criar.mutate(values, {
      onSettled: () => {
        actions.setSubmitting(false);
      },
    });
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
              <button type="submit" disabled={criar.isPending}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}