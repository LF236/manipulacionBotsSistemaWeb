window.addEventListener('load', () => {
    let botonesListaServicios = document.querySelectorAll('.button-off');
    [...botonesListaServicios].forEach(botonServicio => {
        //console.log(botonServicio);
        botonServicio.addEventListener('click', (e) => {
            let nombreServicioEncender = botonServicio.id;
            let ip = document.querySelector('#bot-id').textContent;
            let hostname = document.querySelector('#hostname').textContent;

            // Obtenemos el elemento que muestra el mensaje cuando prendemos o apagamos un bot
            let mensajeEncenderApagar = document.querySelector('.mensaje-encender-apagar');
            // Encendemos el Spinner
            const spiner = document.querySelector('#spinner');
            spiner.style.display = 'flex';

            axios.get(`https://${ip.trim()}:5000/encenderServicio?servicioEncender=${nombreServicioEncender}&host=${hostname}`)
                .then(response => {
                    // Quitamos el Spinner
                    spiner.style.display = 'none';
                    if(response.data.res) {
                        console.log(response);
                        console.log(nombreServicioEncender);
                        console.log(ip);
                        console.log(hostname);
                        mensajeEncenderApagar.innerHTML = `<a href="/home">${response.data.msg}</a>`
                        mensajeEncenderApagar.style.display = 'block';
                    }
                    
                })

        })
    })
    //console.log(botonesListaServicios);
})