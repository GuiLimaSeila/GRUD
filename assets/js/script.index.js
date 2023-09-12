// alert("Teste de script")

class Equipe {
    constructor(nome, titulares,) {
        this.nome = nome;
        this.titulares = titulares;
        this.id = this.gerarid();
        this.reservas = this.calcularReservas();
        this.totalJogadores = this.calcularTotalJogadores();
    }
    gerarid() {
        return Math.floor(Math.random() * 1000);
    }
    calcularReservas() {
        return Math.floor(this.titulares / 2);
    }
    calcularTotalJogadores() {
        return this.titulares + this.reservas;
    }
}

class EquipeService {
    constructor() {
        this.equipes = [];
    }
    adicionar(parametro) {
        this.equipes.push(parametro);
        clearInputs();
    }
    listarEquipes() {
        return this.equipes;
    }
    listarEquipesporId(id) {
        return this.equipes.find((equipe) => equipe.id == id);
    }
    atualizarEquipe(id, nome, titulares) {
        const equipe = this.listarEquipesporId(id);
        equipe.nome = nome;
        equipe.titulares = titulares;
        equipe.reservas = equipe.calcularReservas();
        equipe.totalJogadores = equipe.calcularTotalJogadores();

        return equipe;
    }
    deletarEquipe(id) {
        return(this.equipes = this.equipes.filter(
            (equipe) => equipe.id != id
            ));
        }
}
function clearInputs() {
    document.getElementById('nomedaEquipe').value = "";
    document.getElementById('quantidade').value = "";
}

const service = new EquipeService();

function criarEquipe() {
    const nome = document.getElementById('nomedaEquipe').value;
    const titulares = Number(document.getElementById('quantidade').value);

    const novaequipe = new Equipe(nome, titulares);
    service.adicionar(novaequipe);
    listarEquipes();
    listarEquipesporId
    document.getElementById('lista').classList.remove('hidden');
    //alert("Nome da equipe: " + nome + "\nQuantidade de titulares: " + titulares);
}

function listarEquipes() {
    const equipes = service.listarEquipes();
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    let content = ""
    equipes.forEach((equipe) => {

        content += `
        <div onclick="listarEquipesporId(${equipe.id})" class="nomeEquipe">
        <p class="nameHover">Nome da equipe: ${equipe.nome}</p>
        </div>
        `;
    });
    lista.innerHTML = content;
}

function listarEquipesporId(id) {
    document.getElementById('listaUnica').classList.remove('hidden');
    const equipes = service.listarEquipesporId(id);
    console.log(equipes);
    const lista = document.getElementById('listaUnica');
    lista.innerHTML = "";

    let content = `
        <div>
        <p>Id: ${equipes.id}</p>
            <p>Nome da equipe: ${equipes.nome}</p>
            <p>Quantidade de titulares: ${equipes.titulares}</p>
            <p>Quantidade de reservas: ${equipes.reservas}</p>
            <p>Quantidade total de jogadores: ${equipes.totalJogadores}</p>
            <div class="btns">
            <button onclick="atualizarEquipe(${equipes.id})" class="editBtn">Editar</button>
            <button onclick="deletarEquipe(${equipes.id})" class="deletBtn">Excluir</button>
            </div>
            </div>
        `
    lista.innerHTML = content;
}

let aux = null;

function atualizarEquipe(id) {
    const equipe = service.listarEquipesporId(id);

    document.getElementById('nomedaEquipe').value = equipe.nome;
    document.getElementById('quantidade').value = equipe.titulares;

    document.getElementById('btnCriar').classList.add('hidden');
    document.getElementById('btnAtualizar').classList.remove('hidden');

    aux = id;
}

function editarEquipe() {
    const nome = document.getElementById('nomedaEquipe').value;
    const titulares = Number(document.getElementById('quantidade').value);

    service.atualizarEquipe(aux, nome, titulares);
    listarEquipes();
    listarEquipesporId(aux);
    clearInputs();

    document.getElementById('btnCriar').classList.remove('hidden');
    document.getElementById('btnAtualizar').classList.add('hidden');
    
    aux = null;
}

function deletarEquipe(id) {
    service.deletarEquipe(id);
    listarEquipes();
    document.getElementById('listaUnica').classList.add('hidden');

    if(service.equipes.length == 0){
    document.getElementById('lista').classList.add('hidden');
    }
}