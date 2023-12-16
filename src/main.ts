//funciones generales
let puntuacion: number = 0;

const numeroAleatorio = (): number => Math.floor(Math.random() * 12 + 1);

//mostrar puntuación
const mostrarPuntos = () => {
  const puntos = document.getElementById("puntos");
  Boolean(puntos) && puntos instanceof HTMLSpanElement
    ? (puntos.textContent = puntuacion.toString())
    : console.error("No se puede mostrar puntuación");
};

//generar numero de carta
const numeroCarta = (numeroAleatorio: number) => {
  if (numeroAleatorio === 8 || numeroAleatorio === 9) {
    return numeroAleatorio + 2;
  } else if (numeroAleatorio >= 1 && numeroAleatorio <= 12) {
    return numeroAleatorio;
  } else {
    console.error("Error inesperado al generar número de carta");
    return -1;
  }
};

//sumar puntuación
const sumarPuntos = (numeroCarta: number): number =>
  numeroCarta <= 7 ? (puntuacion += numeroCarta) : (puntuacion += 0.5);

//mostrar carta
const mostrarCarta = (numeroCarta: number) => {
  const carta = document.getElementById("carta");
  if (Boolean(carta) && carta instanceof HTMLImageElement) {
    switch (numeroCarta) {
      case 0.01:
        carta.src = "src/img/0_gameOver.jpg";
        mostrarMensaje("💀!!GAME OVER!!💀");
        break;
      case 0.02:
        carta.src = "src/img/win.png";
        break;
      case 1:
        carta.src = "src/img/1_as-copas.jpg";
        mostrarMensaje("+1 punto!!");
        break;
      case 2:
        carta.src = "src/img/2_dos-copas.jpg";
        mostrarMensaje("+2 puntos!!");
        break;
      case 3:
        carta.src = "src/img/3_tres-copas.jpg";
        mostrarMensaje("+3 puntos!!");
        break;
      case 4:
        carta.src = "src/img/4_cuatro-copas.jpg";
        mostrarMensaje("+4 puntos!!");
        break;
      case 5:
        carta.src = "src/img/5_cinco-copas.jpg";
        mostrarMensaje("+5 puntos!!");
        break;
      case 6:
        carta.src = "src/img/6_seis-copas.jpg";
        mostrarMensaje("+6 puntos!!");
        break;
      case 7:
        carta.src = "src/img/7_siete-copas.jpg";
        mostrarMensaje("+7 puntos!!");
        break;
      case 10:
        carta.src = "src/img/10_sota-copas.jpg";
        mostrarMensaje("+0,5 puntos!!");
        break;
      case 11:
        carta.src = "src/img/11_caballo-copas.jpg";
        mostrarMensaje("+0,5 puntos!!");
        break;
      case 12:
        carta.src = "src/img/12_rey-copas.jpg";
        mostrarMensaje("+0,5 puntos!!");
        break;
      default:
        console.error("Número de carta inesperado");
        break;
    }
  } else {
    console.error("No se puede mostrar carta");
  }
};

//mostrar mensajes
const mostrarMensaje = (texto: string) => {
  const mensaje = document.getElementById("mensaje");
  Boolean(mensaje) && mensaje instanceof HTMLDivElement
    ? (mensaje.textContent = texto)
    : console.error("No se puede mostrar mensaje");
};

//ejecuciones handle de los eventos de los botones
const handlePedir = () => {
  const generarCarta: number = numeroCarta(numeroAleatorio());
  mostrarCarta(generarCarta);
  sumarPuntos(generarCarta);
  mostrarPuntos();
  gameOver();
};

const handleSalir = () => mePlanto(puntuacion);

const handleNuevo = () => empezarDeNuevo();

const handleVer = () => verResultadoSiguiente();

//eventos
const eventos = () => {
  const pedir = document.getElementById("pedir");
  Boolean(pedir) && pedir instanceof HTMLButtonElement
    ? pedir.addEventListener("click", handlePedir)
    : console.error("Error en el botón pedir");

  const salir = document.getElementById("salir");
  Boolean(salir) && salir instanceof HTMLButtonElement
    ? salir.addEventListener("click", handleSalir)
    : console.error("Error en el botón salir");

  const nuevo = document.getElementById("nuevo");
  Boolean(nuevo) && nuevo instanceof HTMLButtonElement
    ? nuevo.addEventListener("click", handleNuevo)
    : console.error("Error en el boton nuevo");

  const ver = document.getElementById("ver");
  Boolean(ver) && ver instanceof HTMLButtonElement
    ? ver.addEventListener("click", handleVer)
    : console.error("Error en el boton ver");
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarPuntos();
  eventos();
  mostrarMensaje("!!Empieza el juego!!");
});

//Ocultar y mostrar botones
const cambiarVistaBotones = () => {
  const pedir = document.getElementById("pedir");
  const salir = document.getElementById("salir");
  const nuevo = document.getElementById("nuevo");
  const ver = document.getElementById("ver");
  if (
    Boolean(pedir) &&
    pedir instanceof HTMLButtonElement &&
    Boolean(salir) &&
    salir instanceof HTMLButtonElement &&
    Boolean(nuevo) &&
    nuevo instanceof HTMLButtonElement &&
    Boolean(ver) &&
    ver instanceof HTMLButtonElement
  ) {
    pedir.remove();
    salir.remove();
    nuevo.style.display = "inline-block";
    if (puntuacion < 7.5) ver.style.display = "inline-block";
  } else {
    console.error("Error al cambiar visualización de los botones");
  }
};

//fin de la partida
const gameOver = () => {
  if (puntuacion > 7.5) {
    cambiarVistaBotones();
    mostrarCarta(0.01);
  }
};

//funcion plantarse
const mePlanto = (puntuacion: number) => {
  cambiarVistaBotones();
  switch (true) {
    case puntuacion <= 4:
      mostrarMensaje("Has sido muy conservador 🧐");
      break;
    case puntuacion < 6:
      mostrarMensaje("Te ha entrado el canguelo eh?😰");
      break;
    case puntuacion >= 6 && puntuacion <= 7:
      mostrarMensaje("Casi casi....🥈");
      break;
    case puntuacion === 7.5:
      mostrarMensaje("🏆¡Lo has clavado! ¡Enhorabuena!🏆");
      mostrarCarta(0.02);
      break;
    default:
      console.error("Número de puntuación inesperado");
      break;
  }
};
//empezar otra partida
const empezarDeNuevo = () => location.reload();

//ver el resultado que tocaba despues
const verResultadoSiguiente = () => {
  const generarCarta: number = numeroCarta(numeroAleatorio());
  mostrarCarta(generarCarta);
  sumarPuntos(generarCarta);
  mostrarPuntos();
};
