const validarDirIP = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}

window.addEventListener('load', (e) => {
    let buttonForm = document.querySelector('#btn-send');
    let mensajeError = document.querySelector('.mensaje-error');
    buttonForm.addEventListener('click', (e) => {
        console.log(e.target.form)
        // Verificamos el nombre del bot
        if (e.target.form.name.value == "") {
            mensajeError.textContent = 'ERROR - El campo del nombre del Bot no debe estar vacio';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        if (e.target.form.name.value.length < 3) {
            mensajeError.textContent = 'ERROR - El campo del nombre del Bot debe ser más largo';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        // Verificamos el Hostname
        if (e.target.form.host.value == "") {
            mensajeError.textContent = 'ERROR - El campo del hostname no debe estar vacio';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        if (e.target.form.host.value.length < 3) {
            mensajeError.textContent = 'ERROR - El hotname debe ser más largo';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        // Verificamos la direccion IP
        if (e.target.form.ip.value == "") {
            mensajeError.textContent = 'ERROR - El campo de la IP no debe estar vacio';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        if (!validarDirIP(e.target.form.ip.value)) {
            mensajeError.textContent = 'ERROR - El formato de la dirección IP esta incorrecto';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        // Verificamos el password
        if (e.target.form.password.value == "") {
            mensajeError.textContent = 'ERROR - El campo del password no debe estar vacio';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        if (e.target.form.password.value.length < 3) {
            mensajeError.textContent = 'ERROR - El password debe ser más largo';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }
    })
})