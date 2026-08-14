function obtenerUbicacionReal() {
    // Verificamos si el navegador soporta geolocalización
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Éxito: El usuario permitió el acceso
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;
                
                console.H("Ubicación obtenida:", latitud, longitud);
                
                // Aquí puedes enviar las coordenadas a tu mapa o servidor
                centrarMapa(latitud, longitud);
            },
            (error) => {
                // Error o el usuario denegó el permiso
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Has denegado el permiso de ubicación. Usaremos una vista general.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("La información de ubicación no está disponible.");
                        break;
                    case error.TIMEOUT:
                        alert("La petición para obtener la ubicación ha caducado.");
                        break;
                }
                // Aquí defines tu ubicación por defecto como respaldo
                usarUbicacionPredeterminada();
            },
            {
                enableHighAccuracy: true, // Intenta usar GPS si está disponible
                timeout: 10000,           // Tiempo máximo de espera (10 segundos)
                maximumAge: 0             // No usar ubicaciones guardadas en caché
            }
        );
    } else {
        alert("Tu navegador no soporta geolocalización.");
        usarUbicacionPredeterminada();
    }
}