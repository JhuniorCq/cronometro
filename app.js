const botonReinicio = document.getElementById('btn-reinicio');
const botonPlayPausa = document.getElementById('btn-play-pausa');
const contenedorTiempo = document.getElementById('contenedor-tiempo');

let horas = 0, minutos = 0, segundos = 0;
let estadoCronometro = 'pausa';
let intervaloTiempo; //Guardará el ID del setInterval utilizado

const cambiarPlayPausa = () => {

    if(estadoCronometro === 'pausa') {
        intervaloTiempo = setInterval(actualizarCronometro, 1000);
        botonPlayPausa.innerHTML = '<img src="assets/img/pausa.png" alt="play-pausa">';
        estadoCronometro = 'reproduciendo';
        console.log('Estaba en pausa, ahora me reproducire')
    } else {
        clearInterval(intervaloTiempo); // Con eso se dejará de ejecutar la función del setInterval
        botonPlayPausa.innerHTML = '<img src="assets/img/play.png" alt="play-pausa">';
        estadoCronometro = 'pausa';
        console.log('Estaba en reproduccion, ahora estare en pausa')
    }
}

const actualizarCronometro = () => {
    segundos++;

    if(segundos/60 === 1) {
        segundos = 0;
        minutos++;

        if(minutos/60 === 1) {
            minutos = 0;
            horas++;
        }
    }

    //Ahora vamos a agregarle el "0" a la Izquierda en los Seg., Min., y Horas
    segundosConFormato = asignarFormato(segundos);
    minutosConFormato = asignarFormato(minutos);
    horasConFormato = asignarFormato(horas);

    contenedorTiempo.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`
}

const asignarFormato = (unidadTiempo) => {
    return unidadTiempo < 10 ? '0' + unidadTiempo: unidadTiempo;
}

const reiniciarCronometro = () => {
    console.log('Me estoy reiniciado')
    //Si el estado ya estaba en 'pausa' estas 3 líneas se repiten con las 3 líneas del ELSE de la función cambiarPlayPausa
    clearInterval(intervaloTiempo);
    botonPlayPausa.innerHTML = '<img src="assets/img/play.png" alt="play-pausa">';
    estadoCronometro = 'pausa';
    //Si el estado es 'reproduciendo' las 3 líenas de acá arriba y las 2 de acá abajo NO son repetidas 
    contenedorTiempo.innerText = '00:00:00';
    horas = 0, minutos = 0, segundos = 0;
}

botonPlayPausa.addEventListener('click', cambiarPlayPausa);
botonReinicio.addEventListener('click', reiniciarCronometro);