import axios from 'axios';

export const getCandidatos = async (estado, cargo) => {
  if (estado == 'DF' && cargo == 7) cargo = 8;
  const url =
    'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/' +
    estado +
    '/2022802018/' +
    cargo +
    '/candidatos';

  const result = await axios.get(url);
  return result.data.candidatos;
};

export const getCandidato = async (estado, candidato) => {
  const url =
    'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/' +
    estado +
    '/2022802018/candidato/' +
    candidato;

  const result = await axios.get(url);
  return result.data;
};

export const getCandidatoGasto = async (
  estado,
  cargo,
  partido,
  numero,
  candidato
) => {
  if (estado == 'DF' && cargo == 7) cargo = 8;
  const url =
    'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/2022802018/2018/' +
    estado +
    '/' +
    cargo +
    '/' +
    partido +
    '/' +
    numero +
    '/' +
    candidato;

  const result = await axios.get(url);
  return result.data;
};
