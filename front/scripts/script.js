import { Reloj } from "./Reloj.js";

/* Elemento audio */
const audio = document.getElementsByTagName('audio')[0];

/* Script para el sonido de las horas */
function sonido_hora() {
    audio.src = './front/sonidos/beep02.mp3';
    audio.loopo = false;
    audio.play();
}

/* Script para el sonido de los minutos */
const sonido_minuto = function () {
    audio.src = './front/sonidos/beep01.mp3';
    audio.loop = false;
    audio.play();
}

/* Inicializa la clase Reloj */
const reloj = new Reloj();
// reloj.setHora(sonido_hora);
reloj.setHora(sonido_minuto);
printTiempo();

/* Leer alarma */
const alarma_hora = document.getElementById('alarma-hora');
const alarma_minuto = document.getElementById('alarma-minuto');
if (localStorage.getItem('alarma_hora')) {
    const ls_alarma_hora = parseInt(localStorage.getItem('alarma_hora'));
    alarma_hora.value = ls_alarma_hora;
    reloj.alarma_hora = ls_alarma_hora;
} else {
    alarma_hora.value = 0;
}
if (localStorage.getItem('alarma_minuto')) {
    const ls_alarma_minuto = parseInt(localStorage.getItem('alarma_minuto'));
    alarma_minuto.value = ls_alarma_minuto;
    reloj.alarma_minuto = ls_alarma_minuto;
} else {
    alarma_minuto.value = 0;
}
if (localStorage.getItem('alarma_estado')) {
    const ls_alarma_estado = localStorage.getItem('alarma_estado') === 'true';
    document.getElementById('alarma-activar-desactivar').checked = ls_alarma_estado;
    reloj.setSonidoAlarma(ls_alarma_estado);
}

/* Ventana alarma */
const myModal = new bootstrap.Modal('#alarma-ventana');

/* Eventos sonido y alarma */
document.getElementById('sonido').addEventListener('click', sonidoActivarDesactivar);
document.getElementById('alarma').addEventListener('click', function () { myModal.show(document.getElementById('alarma-ventana')) });
document.getElementById('alarma-guardar').addEventListener('click', alarmaGuardar);
document.getElementById('alarma-activar-desactivar').addEventListener('change', alarmaActivarDesactivar);

/* Segundero */
setInterval(function () {
    reloj.setTiempo();
    printTiempo();
}, 1000);

/* Script para el sonido de la alarma */
const sonido_alarma = function () {
    audio.src = './front/sonidos/alarm01.mp3';
    audio.loop = false;
    audio.play();
}

/* Activa o desactiva el sonido de la alarma */
function alarmaActivarDesactivar(e) {
    const alarma = document.getElementById('alarma');
    if (e.srcElement.checked) {
        alarma.classList.remove('bi-alarm');
        alarma.classList.add('bi-alarm-fill');
        reloj.setSonidoAlarma(true);
    } else {
        alarma.classList.remove('bi-alarm-fill');
        alarma.classList.add('bi-alarm');
        reloj.setSonidoAlarma(false);
    }
}

/* Guarda la hora y el minuto de la alarma, activa el icono y el sonido */
function alarmaGuardar() {
    reloj.setAlarmaHora(alarma_hora.value);
    reloj.setAlarmaMinuto(alarma_minuto.value);
    myModal.hide(document.getElementById('alarma-ventana'));

    reloj.setAlarma(sonido_alarma);
    reloj.setSonidoAlarma(true);

    localStorage.setItem('alarma_estado', document.getElementById('alarma-activar-desactivar').checked);
    localStorage.setItem('alarma_hora', alarma_hora.value);
    localStorage.setItem('alarma_minuto', alarma_minuto.value);
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
    if (e.srcElement.className.includes('bi-volume-mute-fill')) {
        e.srcElement.classList.remove('bi-volume-mute-fill');
        e.srcElement.classList.add('bi-volume-up-fill');
        reloj.setSonido(true);
    } else {
        e.srcElement.classList.remove('bi-volume-up-fill');
        e.srcElement.classList.add('bi-volume-mute-fill');
        reloj.setSonido(false);
    }
}


/* Asigna el color del texto */
function setColorTexto(color) {
    document.documentElement.style.setProperty('--color-texto', color);
}
