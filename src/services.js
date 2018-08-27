
const get = async (url) => {
	return fetch(url, {
	    method: 'GET',
	    headers: {
	    	'Accept': 'application/json'
	    }
	}).then(response => response.json());
}

export const cargos = async (estado) => {
    let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/listar/municipios/2022802018/"+estado+"/cargos";
	return await get(url);
}

export const candidatos = async (estado, cargo) => {
    let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/"+estado+"/2022802018/"+cargo+"/candidatos";
	return await get(url);
}

export const candidato = async (estado, candidato) => {
    let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/"+estado+"/2022802018/candidato/"+candidato;
	return await get(url);
}

export const candidatoGasto = async (estado,cargo,partido,numero,candidato) => {
	let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/2022802018/2018/"+estado+"/"+cargo+"/"+partido+"/"+numero+"/"+candidato;
	return await get(url);
}

export const partidos = async () => {
	let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/2022802018/BR/2/partidos";
	return await get(url);
}


export default get;