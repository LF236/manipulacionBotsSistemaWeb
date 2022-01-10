
window.addEventListener('load', () => {
    // Agregamos un evento al boton de agregar un servicio
    document.querySelector('#registrar').addEventListener('click', (e) => {
        console.log(e.target.form);
        let servicio = e.target.form.servicio.value;
        // Verificamos que el servicio tenga algo
        if (servicio == "") {
            alert('Ingrese un servicio como nombre');
            e.preventDefault();
            return;
        }
        let direccionIp = document.querySelector('#bot-id').textContent;
        let hostname = document.querySelector('#hostname').textContent;

        const spiner = document.querySelector('#spinner');
        spiner.style.display = 'flex';
        console.log(`http://${direccionIp.trim()}:5000/buscarComando?comando=${servicio.trim()}`);
        axios.get(`http://${direccionIp.trim()}:5000/buscarComando?comando=${servicio}`)
            .then(elServicioExiste => {                
                // Quitamos el Spinner
                spiner.style.display = 'none';
                // Obtenemos el elemento con el mensaje 
                let elementoMensaje = document.querySelector('.mensaje-response');
                // Si el servicio existe podemos agregarlo a la DB
                if (elServicioExiste.data.res) {
                    elementoMensaje.innerHTML = `<a href="/home">${elServicioExiste.data.msg}</a>`;
                    elementoMensaje.style.display = 'block';
                }
                else {
                    elementoMensaje.textContent = `${elServicioExiste.data.msg}`;
                    elementoMensaje.style.display = 'block';
                }
            })
        console.log(direccionIp);
        console.log(hostname);
        console.log(servicio);
        e.preventDefault();
    })
})