// script.js
const areaInicialHa = 59300000; // Área inicial en hectáreas
const tasaDeforestacionAnualHa = 123517; // Tasa de deforestación anual en hectáreas

// Porcentajes de deforestación por trimestre
const porcentajePrimerTrimestre = 0.60; // 60%
const porcentajeSegundoTrimestre = 0.10; // 10%
const porcentajeTercerTrimestre = 0.10; // 10%
const porcentajeCuartoTrimestre = 0.20; // 20%

function formatearNumero(numero) {
    let numeroConDecimales = numero.toFixed(2).replace('.', ',');
    return numeroConDecimales.replace(/\d(?=(\d{3})+\,)/g, '$&.');
}

function tasaDeforestacionActual() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // Mes del año (0-11)

    let tasaActual;
    if (mesActual >= 0 && mesActual < 3) { // Enero - Marzo
        tasaActual = tasaDeforestacionAnualHa * porcentajePrimerTrimestre / 3;
    } else if (mesActual >= 3 && mesActual < 6) { // Abril - Junio
        tasaActual = tasaDeforestacionAnualHa * porcentajeSegundoTrimestre / 3;
    } else if (mesActual >= 6 && mesActual < 9) { // Julio - Septiembre
        tasaActual = tasaDeforestacionAnualHa * porcentajeTercerTrimestre / 3;
    } else { // Octubre - Diciembre
        tasaActual = tasaDeforestacionAnualHa * porcentajeCuartoTrimestre / 3;
    }

    const segundosEnUnTrimestre = 91 * 24 * 60 * 60; // Aproximadamente 91 días por trimestre
    return tasaActual / segundosEnUnTrimestre;
}

function calcularAreaActualHa() {
    const ahora = new Date();
    const inicioDelAño = new Date(ahora.getFullYear(), 0, 1);
    const segundosTranscurridos = (ahora - inicioDelAño) / 1000;
    const perdidaAcumuladaHa = segundosTranscurridos * tasaDeforestacionActual();
    return Math.max(areaInicialHa - perdidaAcumuladaHa, 0);
}

function actualizarRelojHa() {
    let areaActualHa = calcularAreaActualHa();

    setInterval(() => {
        const perdidaPorSegundoHa = tasaDeforestacionActual();
        areaActualHa -= perdidaPorSegundoHa;
        if (areaActualHa < 0) areaActualHa = 0;
        document.getElementById('reloj-deforestacion').innerText = formatearNumero(areaActualHa) + ' ha';
    }, 1000); // Actualiza cada segundo
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', actualizarRelojHa);
} else {
    actualizarRelojHa();
}
