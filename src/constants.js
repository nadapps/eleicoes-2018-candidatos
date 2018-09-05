export const APP_NAME = 'Eleições 2018';

export const coresPartidos = {
    "avante": "#1DAAB1",
    "dc": "#005E9A",
    "dem": "#0A2327",
    "mdb": "#00A550",
    "novo": "#FF830D",
    "patri": "#3B5998",
    "pcb": "#E02323",
    "pcdob": "#E02323",
    "pco": "#E02323",
    "pdt": "#AA2222",
    "phs": "#FFA215",
    "pmb": "#046E9E",
    "pmn": "#E02323",
    "pode": "#3684C6",
    "pp": "#223486",
    "ppl": "#026232",
    "pps": "#DC2720",
    "pr": "#301B6A",
    "prb": "#01A8C8",
    "pros": "#F49D46",
    "prp": "#0061AD",
    "prtb": "#040097",
    "psb": "#E02323",
    "psc": "#009241",
    "psd": "#034872",
    "psdb": "#FAB11D",
    "psl": "#193769",
    "psol": "#C91216",
    "pstu": "#E02323",
    "pt": "#C91216",
    "ptb": "#302E29",
    "ptc": "#0263A8",
    "pv": "#0E3604",
    "rede": "#FC6C30",
    "solidariedade": "#1E1848"
  };

const estadosArray = [
        {
            bandeira: "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bandeira_do_Acre.svg/300px-Bandeira_do_Acre.svg.png",
            estadoabrev: "AC",
            estado: "Acre"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bandeira_de_Alagoas.svg/300px-Bandeira_de_Alagoas.svg.png",
            estadoabrev: "AL",
            estado: "Alagoas"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bandeira_do_Amap%C3%A1.svg/300px-Bandeira_do_Amap%C3%A1.svg.png",
            estadoabrev: "AP",
            estado: "Amapá"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bandeira_do_Amazonas.svg/300px-Bandeira_do_Amazonas.svg.png",
            estadoabrev: "AM",
            estado: "Amazonas"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Bandeira_da_Bahia.svg/300px-Bandeira_da_Bahia.svg.png",
            estadoabrev: "BA",
            estado: "Bahia"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bandeira_do_Cear%C3%A1.svg/300px-Bandeira_do_Cear%C3%A1.svg.png",
            estadoabrev: "CE",
            estado: "Ceará"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Bandeira_do_Distrito_Federal_%28Brasil%29.svg/300px-Bandeira_do_Distrito_Federal_%28Brasil%29.svg.png",
            estadoabrev: "DF",
            estado: "Distrito Federal"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bandeira_do_Esp%C3%ADrito_Santo.svg/300px-Bandeira_do_Esp%C3%ADrito_Santo.svg.png",
            estadoabrev: "ES",
            estado: "Espírito Santo"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_Goi%C3%A1s.svg/200px-Flag_of_Goi%C3%A1s.svg.png",
            estadoabrev: "GO",
            estado: "Goiás"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Bandeira_do_Maranh%C3%A3o.svg/300px-Bandeira_do_Maranh%C3%A3o.svg.png",
            estadoabrev: "MA",
            estado: "Maranhão"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Bandeira_de_Mato_Grosso.svg/300px-Bandeira_de_Mato_Grosso.svg.png",
            estadoabrev: "MT",
            estado: "Mato Grosso"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Bandeira_de_Mato_Grosso_do_Sul.svg/300px-Bandeira_de_Mato_Grosso_do_Sul.svg.png",
            estadoabrev: "MS",
            estado: "Mato Grosso do Sul"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Bandeira_de_Minas_Gerais.svg/300px-Bandeira_de_Minas_Gerais.svg.png",
            estadoabrev: "MG",
            estado: "Minas Gerais"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bandeira_do_Par%C3%A1.svg/300px-Bandeira_do_Par%C3%A1.svg.png",
            estadoabrev: "PA",
            estado: "Pará"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Bandeira_da_Para%C3%ADba.svg/300px-Bandeira_da_Para%C3%ADba.svg.png",
            estadoabrev: "PB",
            estado: "Paraíba"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bandeira_do_Paran%C3%A1.svg/300px-Bandeira_do_Paran%C3%A1.svg.png",
            estadoabrev: "PR",
            estado: "Paraná"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Bandeira_de_Pernambuco.svg/300px-Bandeira_de_Pernambuco.svg.png",
            estadoabrev: "PE",
            estado: "Pernambuco"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Bandeira_do_Piau%C3%AD.svg/300px-Bandeira_do_Piau%C3%AD.svg.png",
            estadoabrev: "PI",
            estado: "Piauí"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bandeira_do_estado_do_Rio_de_Janeiro.svg/300px-Bandeira_do_estado_do_Rio_de_Janeiro.svg.png",
            estadoabrev: "RJ",
            estado: "Rio de Janeiro"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Bandeira_do_Rio_Grande_do_Norte.svg/300px-Bandeira_do_Rio_Grande_do_Norte.svg.png",
            estadoabrev: "RN",
            estado: "Rio Grande do Norte"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Bandeira_do_Rio_Grande_do_Sul.svg/300px-Bandeira_do_Rio_Grande_do_Sul.svg.png",
            estadoabrev: "RS",
            estado: "Rio Grande do Sul"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Bandeira_de_Rond%C3%B4nia.svg/300px-Bandeira_de_Rond%C3%B4nia.svg.png",
            estadoabrev: "RO",
            estado: "Rondônia"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bandeira_de_Roraima.svg/300px-Bandeira_de_Roraima.svg.png",
            estadoabrev: "RR",
            estado: "Roraima"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Bandeira_de_Santa_Catarina.svg/300px-Bandeira_de_Santa_Catarina.svg.png",
            estadoabrev: "SC",
            estado: "Santa Catarina"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg/300px-Bandeira_do_estado_de_S%C3%A3o_Paulo.svg.png",
            estadoabrev: "SP",
            estado: "São Paulo"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bandeira_de_Sergipe.svg/300px-Bandeira_de_Sergipe.svg.png",
            estadoabrev: "SE",
            estado: "Sergipe"
        },
        {
            bandeira: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Bandeira_do_Tocantins.svg/300px-Bandeira_do_Tocantins.svg.png",
            estadoabrev: "TO",
            estado: "Tocantins"
        }
    ];

const cargosArray = [
    {
        "codigo": 3,
        "sigla": null,
        "nome": "Governador",
        "titular": false,
        "contagem": 7
        },
        // {
        // "codigo": 4,
        // "sigla": null,
        // "nome": "Vice-governador",
        // "titular": false,
        // "contagem": 7
        // },
        {
        "codigo": 5,
        "sigla": null,
        "nome": "Senador",
        "titular": false,
        "contagem": 12
        },
        {
        "codigo": 6,
        "sigla": null,
        "nome": "Deputado Federal",
        "titular": false,
        "contagem": 354
        },
        {
        "codigo": 7,
        "sigla": null,
        "nome": "Deputado Estadual",
        "titular": false,
        "contagem": 677
        }
    ];

export const getEstado = (estado) => {
    for(let i = 0; i < estadosArray.length; i++){
        if(estadosArray[i].estadoabrev.toLocaleLowerCase()===estado.toLocaleLowerCase())
            return estadosArray[i];
    }
    return "";
}

export const getCargo = (cargo) => {
    for(let i = 0; i < cargosArray.length; i++){
        if(cargosArray[i].nome.toLocaleLowerCase()===cargo.toLocaleLowerCase())
            return cargosArray[i];
    }
    return "";
}

export const numeroParaReal = (value) => {
    if(value) {
        value = value*100;
        var str = value+'';
        var onlystr = str.split('.');
        str = onlystr[0];
        if(onlystr.length > 1){
            onlystr = onlystr[1];
            if(onlystr.charAt(0) == 9){
                str = (parseInt(str)+1)+'';
            }
        }
        if(str === '' || parseFloat(value) <= 0) return '0,00';
        var onlystr = str.replace(/[^0-9]/,'');
        str = parseInt(onlystr);
        str = str/100;
        return "R$ "+str.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    } else {
        return 'R$ 0,00';
    }
}

export const estados = estadosArray;
export const cargos = cargosArray;