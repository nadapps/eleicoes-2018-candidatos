import fetch from 'react-native-fetch-polyfill';

const get = async (url) => {
	return fetch(url, {
	    method: 'GET',
	    headers: {
	    	'Accept': 'application/json'
		},
		timeout: 20000
	}).then(response => response.json())
	.catch(error => {error:true});
}

export const cargos = async (estado) => {
    let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/listar/municipios/2022802018/"+estado+"/cargos";
	return await get(url);
}

export const candidatos = async (estado, cargo) => {
	if(estado=="DF" && cargo==7) cargo=8;
    //let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/"+estado+"/2022802018/"+cargo+"/candidatos";
	let url = "http://35.227.86.242/eleicoes/api.php?funcao=candidatos&id_cargo="+cargo+"&local="+estado;
	return await get(url);
}

export const candidatosApuracao = async (estado, cargo) => {
	if(estado=="DF" && cargo==7) cargo=8;
    let url = "http://divulga.tse.jus.br/2018/divulgacao/oficial/297/dadosdivweb/"+estado+"/"+estado+"-c000"+cargo+"-e000297-w.js"
	return await get(url);
}

export const candidato = async (estado, candidato) => {
    let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/"+estado+"/2022802018/candidato/"+candidato;
	return await get(url);
}

export const candidatoGasto = async (estado,cargo,partido,numero,candidato) => {
	if(estado=="DF" && cargo==7) cargo=8;
	let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/prestador/consulta/2022802018/2018/"+estado+"/"+cargo+"/"+partido+"/"+numero+"/"+candidato;
	return await get(url);
}

export const partidos = async () => {
	let url = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/2022802018/BR/2/partidos";
	return await get(url);
}


export default get;