import { partida, Estado } from "./model";
import {
  cambiarUrlCarta,
  mostrarMensaje,
  mostrarPuntos,
  visibilidadBotones,
} from "./ui";

export const numeroAleatorio = (): number => Math.floor(Math.random() * 10 + 1);

export const numeroCarta = (numeroAleatorio: number): number =>
  numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;

const obtenerPuntos = (numeroCarta: number) =>
  numeroCarta <= 7 ? numeroCarta : 0.5;

const sumarPuntos = (puntos: number): number => partida.puntuacion + puntos;

const setPuntuacion = (nuevosPuntos: number) =>
  (partida.puntuacion = nuevosPuntos);

const obtenerUrlCarta = (numeroCarta: number): string => {
  switch (numeroCarta) {
    case 1:
      return "src/img/1_as-copas.jpg";
    case 2:
      return "src/img/2_dos-copas.jpg";
    case 3:
      return "src/img/3_tres-copas.jpg";
    case 4:
      return "src/img/4_cuatro-copas.jpg";
    case 5:
      return "src/img/5_cinco-copas.jpg";
    case 6:
      return "src/img/6_seis-copas.jpg";
    case 7:
      return "src/img/7_siete-copas.jpg";
    case 10:
      return "src/img/10_sota-copas.jpg";
    case 11:
      return "src/img/11_caballo-copas.jpg";
    case 12:
      return "src/img/12_rey-copas.jpg";
    default:
      return "Número de carta inesperado";
  }
};

export const handlePedir = () => {
  const generarCarta: number = numeroCarta(numeroAleatorio());
  const urlCarta: string = obtenerUrlCarta(generarCarta);
  cambiarUrlCarta(urlCarta);
  const puntos: number = obtenerPuntos(generarCarta);
  const nuevoPuntos: number = sumarPuntos(puntos);
  setPuntuacion(nuevoPuntos);
  mostrarPuntos();
  const estado: Estado = gestionPartida(partida.puntuacion);
  mostrarMensaje(estado, puntos);
  visibilidadBotones(estado);
};

export const handleSalir = () => {
  const estado: Estado = gestionMePlanto(partida.puntuacion);
  mostrarMensaje(estado, 0);
  visibilidadBotones(estado);
};

export const handleNuevo = () => location.reload();

let resetHandleVerSiguiente = false;
export const handleVerSiguiente = () => {
  if (!resetHandleVerSiguiente) {
    const generarCarta: number = numeroCarta(numeroAleatorio());
    const urlCarta: string = obtenerUrlCarta(generarCarta);
    cambiarUrlCarta(urlCarta);
    const puntos: number = obtenerPuntos(generarCarta);
    const nuevoPuntos: number = sumarPuntos(puntos);
    setPuntuacion(nuevoPuntos);
    mostrarPuntos();
    resetHandleVerSiguiente = true;
  }
};

export const gestionPartida = (puntuacion: number): Estado => {
  if (puntuacion === 7.5) {
    return "PARTIDA_GANADA";
  }
  if (puntuacion > 7.5) {
    return "PARTIDA_PERDIDA";
  }
  return "MOSTRAR_PUNTOS";
};

export const gestionMePlanto = (puntuacion: number): Estado => {
  if (puntuacion >= 6 && puntuacion <= 7) {
    return "ME_PLANTO_MAYOR_IGUAL_6";
  }
  return puntuacion <= 4 ? "ME_PLANTO_MENOR_IGUAL_4" : "ME_PLANTO_MENOR_6";
};
