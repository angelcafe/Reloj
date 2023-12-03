class Reloj {
    constructor() {
        this.alarma_hora = 0;
        this.alarma_minuto = 0;
        this.funcion_alarma = null;
        this.funcion_hora = null;
        this.sonido_hora = false;
        this.sonido_alarma = false;
        this.setTiempo();
    }

    /* Getters */
    getAlarmaHora() {
        return this.alarma_hora;
    }

    getAlarmaMinuto() {
        return this.alarma_minuto;
    }

    getHoras() {
        return ('0' + this.horas).slice(-2);
    }

    getMinutos() {
        return ('0' + this.minutos).slice(-2);
    }

    getSegundos() {
        return ('0' + this.segundos).slice(-2);
    }

    getSonido() {
        return this.sonido_hora;
    }

    getSonidoAlarma() {
        return this.sonido_alarma;
    }

    /* Setters */
    setAlarma(funcion) {
        this.funcion_alarma = funcion;
    }

    setAlarmaMinuto(minuto) {
        this.alarma_minuto = parseInt(minuto);
    }

    setAlarmaHora(hora) {
        this.alarma_hora = parseInt(hora);
    }

    setHora(funcion) {
        this.funcion_hora = funcion;
    }

    setSonido(estado) {
        this.sonido_hora = estado;
    }

    setSonidoAlarma(estado) {
        this.sonido_alarma = estado;
    }

    setTiempo() {
        const date = new Date();
        this.segundos = date.getSeconds();
        this.minutos = date.getMinutes();
        this.horas = date.getHours();
        this.sonidos();
    }

    /* Métodos */
    sonidos() {
        if (this.sonido_alarma && this.segundos === 0 && this.alarma_minuto === this.minutos && this.alarma_hora === this.horas) {
            this.funcion_alarma();
        } else if (this.sonido_hora && this.segundos === 0 && this.minutos === 0) {
            // } else if (this.sonido_hora && this.segundos === 0) {
            this.funcion_hora();
        }
    }

}

export {
    Reloj
}