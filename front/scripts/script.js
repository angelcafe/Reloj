import { Reloj } from "./Reloj.js";

/* Inicializa la clase Reloj */
const reloj = new Reloj();
reloj.setHora(sonidoHora);
printTiempo();

/* Segundero */
setInterval(function () {
    reloj.setTiempo();
    printTiempo();
}, 1000);

/* Crear constantes */
const audio = document.getElementsByTagName('audio')[0];
const alarma_hora = document.getElementById('alarma-hora');
const alarma_minuto = document.getElementById('alarma-minuto');
obtenerDatos();

/* Definir los elementos y sus correspondientes funciones */
const elementos = [
    { id: 'sonido', evento: 'click', funcion: sonidoActivarDesactivar },
    { id: 'alarma', evento: 'click', funcion: alarmaActivarDesactivar },
    { id: 'alarma-hora', evento: 'change', funcion: alarmaGuardar },
    { id: 'alarma-minuto', evento: 'change', funcion: alarmaGuardar },
    { id: 'modo-oscuro', evento: 'click', funcion: activarDesactivarModoOscuro }
];

/* Agregar los event listeners utilizando un bucle */
elementos.forEach(elemento => {
    document.getElementById(elemento.id).addEventListener(elemento.evento, elemento.funcion);
});

/* Script para el sonido de la alarma */
const sonido_alarma = function () {
    audio.src = './front/sonidos/alarm01.mp3';
    audio.loop = false;
    audio.play();
}
reloj.setAlarma(sonido_alarma);

function activarDesactivarModoOscuro(e) {
    const dt = document.getElementsByTagName('html')[0];
    if (dt.getAttribute('data-bs-theme') === 'dark') {
        dt.setAttribute('data-bs-theme', 'light');
    } else {
        dt.setAttribute('data-bs-theme', 'dark');
    }
}

/* Activa o desactiva el sonido de la alarma */
function alarmaActivarDesactivar(estado) {
    const elemento = document.getElementById('alarma').classList;
    const claseAlarmaFill = 'bi-alarm-fill';
    const claseAlarma = 'bi-alarm';

    if (typeof estado === 'object') {
        estado = !elemento.contains(claseAlarmaFill);
    }

    if (estado) {
        elemento.replace(claseAlarma, claseAlarmaFill);
        reloj.setSonidoAlarma(true);
        localStorage.setItem('alarma_estado', true);
    } else {
        audio.pause();
        elemento.replace(claseAlarmaFill, claseAlarma);
        reloj.setSonidoAlarma(false);
        localStorage.setItem('alarma_estado', false);
    }
}

/* Guarda la hora y el minuto de la alarma */
function alarmaGuardar() {
    reloj.setAlarmaHora(alarma_hora.value);
    reloj.setAlarmaMinuto(alarma_minuto.value);
    localStorage.setItem('alarma_hora', alarma_hora.value);
    localStorage.setItem('alarma_minuto', alarma_minuto.value);
}

function obtenerDatos() {
    const obtenerYAsignar = (clave, elemento, propiedad) => {
        const valorLocalStorage = localStorage.getItem(clave);
        if (valorLocalStorage) {
            const valorParseado = parseInt(valorLocalStorage);
            elemento.value = valorParseado;
            reloj[propiedad] = valorParseado;
        } else {
            elemento.value = 0;
        }
    };

    obtenerYAsignar('alarma_hora', alarma_hora, 'alarma_hora');
    obtenerYAsignar('alarma_minuto', alarma_minuto, 'alarma_minuto');

    const lsAlarmaEstado = localStorage.getItem('alarma_estado');
    if (lsAlarmaEstado) {
        const lsAlarmaEstadoBooleano = lsAlarmaEstado === 'true';
        reloj.setSonidoAlarma(lsAlarmaEstadoBooleano);
        alarmaActivarDesactivar(lsAlarmaEstadoBooleano);
    }
}

/* Muestra el tiempo */
function printTiempo() {
    document.getElementById('horas').innerText = reloj.getHoras();
    document.getElementById('minutos').innerText = reloj.getMinutos();
    document.getElementById('segundos').innerText = reloj.getSegundos();
}

/* Activa o desactiva el sonido */
/* Esto se hace porque por defecto, en un navegador, no suena nada sin pulsar en la ventana */
function sonidoActivarDesactivar(e) {
    const elemento = e.target.classList;

    if (elemento.contains('bi-volume-mute-fill')) {
        elemento.replace('bi-volume-mute-fill', 'bi-volume-up-fill');
        reloj.setSonido(true);
    } else {
        elemento.replace('bi-volume-up-fill', 'bi-volume-mute-fill');
        reloj.setSonido(false);
    }
}

/* Script para el sonido de las horas */
function sonidoHora() {
    audio.src = './front/sonidos/beep01.mp3';
    audio.loopo = false;
    audio.play();
}
