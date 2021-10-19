function guardarInfo() {

    let contador_data = 1;

    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_data);
    } else {
        contador_data = localStorage.getItem("contador");
    };

    var nombre = document.getElementById('nombre-usuario').value;
    var correo = document.getElementById('correo-electronico').value;
    var correovfy = document.getElementById('correo-electronico-vfy').value;
    var contrasena = document.getElementById('contrasena').value;

    if(correo !== correovfy){

    Swal.fire({
        width: 450,
        icon: 'error',
        title: 'Oops...',
        text: 'Los correos no coinciden'
        
    })

    } else if ((nombre === "" || correo === "" || contrasena === "")){

    Swal.fire({
        width: 450,
        icon: 'warning',
        title: '¡Cuidado!',
        text: 'Te faltan datos por llenar'
        
    })

    } else {

    localStorage.setItem("nombre_" + contador_data, nombre);
    localStorage.setItem("correo_" + contador_data, correo);
    localStorage.setItem("contrasena_" + contador_data, contrasena);
    contador_data = parseInt(contador_data) + 1;
    localStorage.setItem("contador", contador_data);
    console.log(contador_data);
    let contador_actual = parseInt(contador_data) - 1;

    listadoInfo(contador_actual);

    document.getElementById("mi_formulario").reset();
}
};


function listadoInfo(contador_actual = 1, actualizar_tabla = false) {

    let body_tabla = document.querySelector("#data-usuario");

    if (actualizar_tabla) {
        let contador_futuro = localStorage.getItem('contador');
        for (let x = 1; x < contador_futuro; x++) {
            if(localStorage.getItem("nombre_" + x) !== null && localStorage.getItem("correo_" + x) && localStorage.getItem("contrasena_" + x) !== null){
            body_tabla.innerHTML += `
            <tr>
                <td>${localStorage.getItem('nombre_' + x)}</td>
                <td>${localStorage.getItem('correo_' + x)}</td>
                <td>
                    <i class="fas fa-pen mx-2" onclick="editar_elemento(${x})"></i>
                    <i class="fas fa-trash mx-2" onclick="borrar_elemento(${x})"></i>
                </td>
            </tr>
            `
        }
    }   
    } else {
        body_tabla.innerHTML += `
        <tr>
            <td>${localStorage.getItem('nombre_' + contador_actual)}</td>
            <td>${localStorage.getItem('correo_' + contador_actual)}</td>
            <td>
                <i class="fas fa-pen mx-2" onclick="editar_elemento(${contador_actual})"></i>
                <i class="fas fa-trash mx-2" onclick="borrar_elemento(${contador_actual})"></i>
            </td>
        </tr>
        `
    };
};

listadoInfo(1, true);


function editar_elemento(indice_dato) {

    let boton = document.querySelector("#btn-registro");
    boton.setAttribute('onclick', `actualizar_elemento(${indice_dato})`)
    boton.innerHTML = "Actualizar";

    let titulo_formulario = document.querySelector("#titulo_accion");
    titulo_formulario.innerHTML = `Modificar datos de registro.`;

    document.getElementById("nombre-usuario").value = localStorage.getItem("nombre_" + indice_dato);
    document.getElementById("correo-electronico").value = localStorage.getItem("correo_" + indice_dato);
    document.getElementById("contrasena").value = localStorage.getItem("contrasena_" + indice_dato);

    console.log(input_nombreusuario.value);
    console.log(input_correo.value);
    console.log(input_contrasena.value);
};


function actualizar_elemento(indice_dato) {
    console.log(indice_dato)
    var nombre_actualizado = document.getElementById('nombre-usuario').value;
    var correo_actualizado = document.getElementById('correo-electronico').value;
    var contrasena_actualizado = document.getElementById('contrasena').value;

    localStorage.setItem("nombre_" + indice_dato, nombre_actualizado);
    localStorage.setItem("correo_" + indice_dato, correo_actualizado);
    localStorage.setItem("contrasena_" + indice_dato, contrasena_actualizado);

    let body_tabla = document.querySelector("#data-usuario");
    body_tabla.innerHTML = '';

    let titulo_formulario = document.querySelector("#titulo_accion");
    titulo_formulario.innerHTML = "Datos modificados";

    listadoInfo(1, true);
    let boton = document.getElementById("btn-registro");
    boton.setAttribute('onclick', 'guardar_data()');
    boton.innerHTML = "Registrarse";

    document.getElementById("mi_formulario").reset();
};


function borrar_elemento(indice_dato){
    console.log(indice_dato);

    Swal.fire({
        title: '¿Estás seguro de querer eliminar este dato?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí. Borrar',
        allowOutsideClick: false,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let body_tabla = document.querySelector("#data-usuario");
            body_tabla.innerHTML = '';

            localStorage.removeItem("nombre_" + indice_dato);
            localStorage.removeItem("correo_" + indice_dato);
            localStorage.removeItem("contrasena_" + indice_dato);
            listadoInfo(1, true);


            Swal.fire({
                title: 'El dato ha sido eliminado.',
                icon: 'success'
            })
            document.getElementById("mi_formulario").reset();
        };
    });
};
