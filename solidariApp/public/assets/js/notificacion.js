

function cargarNotificaciones(usuario){

    axios.get("/listarNotificaciones/" + usuario.idUsuario)
    .then((response)=>{
        let notificaciones = response.data.notificaciones;
        let noLeidas = response.data.noLeidas;

        //console.log(noLeidas);
        //console.log(notificaciones);

        mostrarNotificaciones(notificaciones,noLeidas)
    })

}
function mostrarNotificaciones(notificaciones,noLeidas){
    // console.log('noLeidas '+noLeidas);
    $("#spinnerNotif").remove();
    $("#dropNotificaciones").empty();
    $("span").remove('#badgeNotif');

    if(noLeidas  >  0){
        $("#logoNotificacion").prepend('<span class="badge badge-light bg-danger text-white" id="badgeNotif">' + noLeidas + '</span>')
    }

    notificaciones.forEach(notificacion => {
        //console.log('notif '+notificacion.fechaNotificacion);
        let fecha = new Date(notificacion.fechaNotificacion).toLocaleDateString('es-AR')
        let nombre;
        let img = notificacion.urlFotoPerfilUsuario;
        let nombreCategoria = notificacion.tipoNecesidad;
        let msj = notificacion.mensaje;
        let necesidad = notificacion.necesidad;
        necesidad["nombreCategoria"] = nombreCategoria;

        let checkNoLeida = '';

        if(notificacion.idRolUsuario == "1"){
            nombre = notificacion.emisor.nombreColaborador;
            nombre += " ";
            nombre += notificacion.emisor.apellidoColaborador;
        }else{
            nombre =  notificacion.emisor.razonSocial;
        }
        if(notificacion.leido == '1') checkNoLeida = `<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-check ml-auto text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>`

        let cardNotificacion = `
            <div class="container border-top sombra  p-2">
                <div>
                    <div class="d-flex flex-row">
                        <div>
                            <img class="rounded-circle imgPerfilOrg" src="${img}" alt="">
                        </div>
                        <div class="card-text align-self-center mx-2 w-100">
                            <div class="d-flex">
                                <p>${fecha}</p>
                                ${checkNoLeida}
                            </div>
                            <a class="font-weight-bold text-dark text-decoration-none notificacionEmisor${notificacion.idNotificacion} " href="/colaborador/${notificacion.idEmisor}">${nombre}</a>
                            <div class="d-flex flex-wrap">
                            <p>${msj} con <a class="font-weight-bold text-dark text-decoration-none notificacionVerNecesidad${notificacion.idNotificacion}" href="#modalDetalleNecesidad" data-toggle="modal">${nombreCategoria}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        $("#dropNotificaciones").append(cardNotificacion);


        $(`.notificacionVerNecesidad${notificacion.idNotificacion}`).on('click',function(){
            cargarDatosModalDetalleNecesidad(necesidad, "organizacion");
            if(!notificacion.leido){
                notificacion.leido = "1";
                if(!upDateNotificacion(notificacion)){
                    noLeidas = noLeidas - 1;
                    mostrarNotificaciones(notificaciones,noLeidas);
                };
            }
            $('#modalNotificaciones').modal('hide');
        })

        $(`.notificacionEmisor${notificacion.idNotificacion}`).on('click',function(){
            if(!notificacion.leido){
                notificacion.leido = "1";
                if(!upDateNotificacion(notificacion)){
                    noLeidas = noLeidas -1;
                    mostrarNotificaciones(notificaciones,noLeidas);
                };
            }
        })
    });

}

function upDateNotificacion(notificacion){
    console.log("notificacion: "+notificacion);
    JSON.stringify(notificacion);
    axios.post("/upDateNotificacion",notificacion)
    .then((response)=>{
        if(response.data.resultado){
            console.log('result '+response.data.resultado);
            return(true);
        }else{
            alertify.error(response.data.message);
            console.log('result '+response.data.resultado);
            return(false);
        }
    });
}

function crearNotificacionColaboracion(necesidad){
    JSON.stringify(necesidad);
    axios.post("/crearNotificacionColaboracion",necesidad)
    .then((response)=>{
        if(response.data.resultado){
            console.log('resultNotif '+response.data.resultado);

        }else{
            alertify.error(response.data.resultado);
            console.log('resultNotif '+response.data.resultado);

        }
    });
}
