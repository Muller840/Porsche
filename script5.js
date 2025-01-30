let jugadorActual = 'X'; // Jugador 1 comienza
let tablero = ['', '', '', '', '', '', '', '', ''];
let juegoTerminado = false;
let nombreJugador1, nombreJugador2;

const casillas = document.querySelectorAll('.casilla');
const mensaje = document.getElementById('mensaje');

casillas.forEach(casilla => {
  casilla.addEventListener('click', jugar);
});

function iniciarJuego() {
  nombreJugador1 = document.getElementById('nombre1').value;
  nombreJugador2 = document.getElementById('nombre2').value;

  document.getElementById('formulario-inicio').style.display = 'none';
  mensaje.textContent = `¡Es el turno de ${nombreJugador1}!`;
}

function jugar(event) {
  if (juegoTerminado) return;

  const casilla = event.target;
  const posicion = casilla.dataset.pos;

  if (tablero[posicion] === '') {
    tablero[posicion] = jugadorActual;

    const img = document.createElement('img');
    img.src = jugadorActual === 'X' ? "https://quenoticias.com/wp-content/uploads/2021/09/muneca-del-juego-del-calamar-021-09-27-at-9.07.15-PM.jpeg" : "https://thumbs.dreamstime.com/z/ropa-de-dise%C3%B1o-juegos-calamar-forma-cuadrada-rosa-calamares-pel%C3%ADcula-corea-del-sur-ilustraci%C3%B3n-vectorial-231950678.jpg?w=768";
    casilla.appendChild(img);

    verificarGanador();

    if (!juegoTerminado) {
      cambiarJugador();
    }
  }
}

function cambiarJugador() {
  jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
  mensaje.textContent = jugadorActual === 'X' ? `¡Es el turno de ${nombreJugador1}!` : `¡Es el turno de ${nombreJugador2}!`;
}

function verificarGanador() {
  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combinacion of combinacionesGanadoras) {
    const [a, b, c] = combinacion;
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      const ganador = tablero[a] === 'X' ? nombreJugador1 : nombreJugador2;
      mensaje.textContent = `¡Ganador: ${ganador}!`;
      juegoTerminado = true;
      return;
    }
  }

  if (!tablero.includes('')) {
    mensaje.textContent = '¡Empate!';
    juegoTerminado = true;
  }
}