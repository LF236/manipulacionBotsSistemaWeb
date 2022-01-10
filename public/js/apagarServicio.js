window.addEventListener('load', () => {
    let botonesListaServicios = document.querySelectorAll('.button-on');
    [...botonesListaServicios].forEach(botonApagar => {
        botonApagar.addEventListener('click', () => {
            let nombreServicioApagar = botonApagar.id;
            let ip = document.querySelector('#bot-id').textContent;
            let hostname = document.querySelector('#hostname').textContent;

            // Obtenemos el elemento que muestra el mensaje cuando prendemos o apagamos un bot
            let mensajeEncenderApagar = document.querySelector('.mensaje-encender-apagar');
            // Encendemos el Spinner
            const spiner = document.querySelector('#spinner');
            spiner.style.display = 'flex';

            axios.get(`http://${ip.trim()}:5000/apagarServicio?servicioApagar=${nombreServicioApagar}&host=${hostname}`)
                .then(response => {
                    // Quitamos el Spinner
                    spiner.style.display = 'none';
                    console.log(response);
                    if (response.data.res) {
                        
                        mensajeEncenderApagar.innerHTML = `<a href="/home">${response.data.msg}</a>`
                        mensajeEncenderApagar.style.display = 'block';
                    }

                })
            console.log(nombreServicioApagar);
        })
    })
})