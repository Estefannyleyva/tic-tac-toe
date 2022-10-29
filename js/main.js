let posicionesOcupadas = {};
let state = {
    turno: 'jugador 1',
    jugadasRestantes: 9,
    ganador: 'aun no hay ganador'
};
const combinaciones = [
    ['01', '02', '03'],
    ['04', '05', '06'],
    ['07', '08', '09'], 
    ['01', '04', '07'],
    ['02', '05', '08'],
    ['03', '06', '09'],
    ['01', '05', '09'],
    ['03', '05', '07']
]
let jugadorActual = "X";
const botones = document.querySelectorAll('.buttons');
const ganadorP = document.getElementById('ganador')
const estadoJuego = document.getElementById('status-juego')
const reset = document.getElementById('reset')
function eventoBoton () {
    let id = this.getAttribute('id');
    this.innerText = jugadorActual;
    this.disabled = true;
    posicionesOcupadas[id] =jugadorActual
    
    state.jugadasRestantes --
    ganador(posicionesOcupadas, combinaciones)
    cambioJugador()
    if(state.turno === 'jugador 2'){
        let bgo = document.getElementsByTagName('body');
        bgo.style.backgroundImage = 'url(../img/04.jpg)'
        console.log(bgo.style.backgroundImage)
    }
    estadoJuego.innerText = `Turno:${state.turno} 
    Restantes:${state.jugadasRestantes}
    ganador:${state.ganador}
    `;

};
function cambioJugador(id) {
    if(state.turno === 'jugador 1'){
        state.turno = 'jugador 2';
        jugadorActual = 'O';
    }else{
        state.turno = 'jugador 1';
        jugadorActual = 'X';
    };
};

function ganador(posiciones,combinaciones) { 
    for (const iterador of combinaciones) {
        if(posiciones[iterador[0]] === 'X'&& posiciones[iterador[1]] === 'X' && posiciones[iterador[2]] === 'X'){
            state.ganador = state.turno;
            ganadorP.innerText = `🎊✨${jugadorActual} WIN!!🎈🎉`;
        }else if(posiciones[iterador[0]] === 'O'&& posiciones[iterador[1]] === 'O' && posiciones[iterador[2]] === 'O'){
            ganadorP.innerText = `🎊✨${jugadorActual} WIN!!🎈🎉`;
            state.ganador = state.turno;
        }else{
            if(state.jugadasRestantes ===0){
                ganadorP.innerText = `😅Empate🙂`;
            };
            
        };
    };
};

function resetear() {
    if(ganadorP.innerText !== ' '){
        botones.forEach(boton => {
            boton.disabled=false;
            boton.innerText =' '})
        posicionesOcupadas = {};
        state = {
            turno: 'jugador 1',
            jugadasRestantes: 9,
            ganador: 'aun no hay ganador'
        };
        jugadorActual = "X";
    }
    estadoJuego.innerText = ''
    ganadorP.innerText = ''
}

botones.forEach((boton) => boton.addEventListener('click', eventoBoton));
reset.addEventListener('click', resetear)