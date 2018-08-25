
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


export default get;