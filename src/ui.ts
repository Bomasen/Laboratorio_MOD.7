import { handleNuevo, handlePedir, handleSalir, handleVerSiguiente } from "./motor";

import { partida, Estado } from "./model";

export const mostrarPuntos = () => {
  const puntos = document.getElementById("puntos");
  puntos && puntos instanceof HTMLSpanElement
    ? (puntos.textContent = partida.puntuacion.toString())
    : console.error("No se puede mostrar puntuación");
};

export const cambiarUrlCarta = (urlCarta: string) => {
  const carta = document.getElementById("carta");
  if (carta && carta instanceof HTMLImageElement) carta.src = urlCarta;
};

export const mostrarMensaje = (estado: Estado, puntos: number) => {
  const mensaje = document.getElementById("mensaje");
  let texto: string = "";
  if (mensaje && mensaje instanceof HTMLDivElement) {
    switch (estado) {
      case "INICIO_PARTIDA":
        texto = "!!EMPIEZA EL JUEGO!!";
        break;
      case "MOSTRAR_PUNTOS":
        texto = `Has sumado ${puntos} puntos!!`;
        break;
      case "PARTIDA_GANADA":
        texto = "🏆¡Lo has clavado! ¡Enhorabuena!🏆";
        break;
      case "PARTIDA_PERDIDA":
        texto = "💀!!GAME OVER!!💀";
        break;
      case "ME_PLANTO_MENOR_IGUAL_4":
        texto = "Has sido muy conservador 🧐";
        break;
      case "ME_PLANTO_MENOR_6":
        texto = "Te ha entrado el canguelo eh?😰";
        break;
      case "ME_PLANTO_MAYOR_IGUAL_6":
        texto = "Casi casi....🥈";
        break;
      default:
        texto = "ERROR INESPERADO AL MOSTRAR MENSAJE";
    }
    mensaje.textContent = texto;
  }
};

export const eventos = () => {
  const pedir = document.getElementById("pedir");
  pedir && pedir instanceof HTMLButtonElement
    ? pedir.addEventListener("click", handlePedir)
    : console.error("Error en el botón Pedir");

  const salir = document.getElementById("salir");
  salir && salir instanceof HTMLButtonElement
    ? salir.addEventListener("click", handleSalir)
    : console.error("Error en el botón Salir");

  const nuevo = document.getElementById("nuevo");
  nuevo && nuevo instanceof HTMLButtonElement
    ? nuevo.addEventListener("click", handleNuevo)
    : console.error("Error en el boton Nuevo");

  const verSiguiente = document.getElementById("verSiguiente");
  verSiguiente && verSiguiente instanceof HTMLButtonElement
    ? verSiguiente.addEventListener("click", handleVerSiguiente)
    : console.error("Error en el boton Ver");
};

export const visibilidadBotones = (estado: Estado) => {
  if (
    estado === "PARTIDA_GANADA" ||
    estado === "PARTIDA_PERDIDA" ||
    estado === "ME_PLANTO_MAYOR_IGUAL_6" ||
    estado === "ME_PLANTO_MENOR_6" ||
    estado === "ME_PLANTO_MENOR_IGUAL_4"
  ) {
    const pedir = document.getElementById("pedir");
    pedir && pedir instanceof HTMLButtonElement
      ? pedir.remove()
      : console.error("Error al cambiar visualización botón Pedir");

    const salir = document.getElementById("salir");
    salir && salir instanceof HTMLButtonElement
      ? salir.remove()
      : console.error("Error al cambiar visualización botón Salir");

    const nuevo = document.getElementById("nuevo");
    nuevo && nuevo instanceof HTMLButtonElement
      ? (nuevo.style.display = "inline-block")
      : console.error("Error al cambiar visualización botón Nuevo");

    const verSiguiente = document.getElementById("verSiguiente");
    verSiguiente && verSiguiente instanceof HTMLButtonElement && partida.puntuacion < 7.5
      ? (verSiguiente.style.display = "inline-block")
      : console.error("Error al cambiar visualización botón Ver");
  }
};
