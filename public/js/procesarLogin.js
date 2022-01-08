window.addEventListener('load', () => {
    const validarEmail = (valor) => {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
            return true;
        } else {
            return false;
        }
    }
    // Agregamos un eveto al busmit
    let butonSubmitFormLogin = document.querySelector('#btn-send');
    let mensajeError = document.querySelector('.mensaje-error');
    butonSubmitFormLogin.addEventListener('click', (e) => {
        // Verificamos que el correo no sea NULO
        if (e.target.form.user.value == "") {
            mensajeError.textContent = 'ERROR - El campo de usuario no puede estar vacio';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }

        // Verificamos que el password no este vacio
        if (e.target.form.password.value == "") {
            mensajeError.textContent = 'ERROR - El password no puede estar vacio';
            mensajeError.style.display = 'block';
            e.preventDefault();
            return;
        }
    })
})