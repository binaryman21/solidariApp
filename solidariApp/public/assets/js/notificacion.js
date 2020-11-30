

function cargarNotificaciones(usuario){

    axios.get("/listarNotificaciones/" + usuario.idUsuario)
    .then((response)=>{
        if(response.data.result){
            let notificaciones = response.data.notificaciones;
            let noLeidas = response.data.noLeidas;

            //console.log(noLeidas);
            console.log(notificaciones);

            if(!notificaciones == ''){
                mostrarNotificaciones(notificaciones,noLeidas)
            }
        }else{
             console.log('result '+response.data.result+ " msj: "+response.data.message);
        }

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

    //MODIFICO LA CABECERA DEL MODAL
    $("#headNotif").html(`
        <div class="d-flex justify-content-between">
            <div>
                <h3 class="pt-2">Notificaciones</h3>
            </div>
            <div id="dropMarcarLeidas" class="">
                <button class="btn p-2" type="button" id="btnNotifLeidas">
                    <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-check ml-auto text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                    </svg>
                    <span class="tooltipText">Marcar como leídas</span>
                </button>
            </div>
        </div>
    `)

    //DEFINO BTN PARA MARCAR TODAS COMO LEÍDAS
    $("#btnNotifLeidas").on('click',()=>{
        marcarNotifLeidas(notificaciones, noLeidas);
    })

    notificaciones.forEach(notificacion => {
        // console.log(  notificacion );
        //INDIFERENTE PARA CUALQUIER NOTIFICACION
        let fecha = new Date(notificacion.fechaNotificacion).toLocaleDateString('es-AR')
        let nombre;
        let img = notificacion.urlFotoPerfilUsuario;
        let cardNotificacion;
        let msj = notificacion.mensaje;
        let checkNoLeida = '';

        //NOMBRE DEL EMISOR
        if(notificacion.idRolUsuario == "1"){
            nombre = notificacion.emisor.nombreColaborador;
            nombre += " ";
            nombre += notificacion.emisor.apellidoColaborador;
        }else if(notificacion.idRolUsuario == "2"){
            nombre =  notificacion.emisor.razonSocial;
        }

        //INDIFERENTE PARA CUALQUIER NOTIFICACION
        if(notificacion.leido == '1') checkNoLeida = `<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-check ml-auto text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
        </svg>`

        //NOTIFICACIONES EXCLUSIVAS PARA CUANDO ES POR UNA NECESIDAD
        if( notificacion.idMensaje == 1 ){
            let nombreCategoria = notificacion.tipoNecesidad;
            let necesidad = notificacion.necesidad;
            necesidad["nombreCategoria"] = nombreCategoria;

            cardNotificacion = `
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
                            <a class="font-weight-bold text-dark text-decoration-none notificacionEmisor${notificacion.idNotificacion} " href="/ver-colaborador/${notificacion.idEmisor}">${nombre}</a>
                            <div class="d-flex flex-wrap">
                            <p>${msj} con <a class="font-weight-bold text-dark text-decoration-none notificacionVerNecesidad${notificacion.idNotificacion}" href="#modalDetalleNecesidad" data-toggle="modal">${nombreCategoria}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }
        //NOTIFICACIONES EXCLUSIVAS PARA CUANDO UNA ORGANIZACION CALIFICA UNA AYUDA
        else if(notificacion.idMensaje == 2){
            let nombreCategoria = notificacion.tipoNecesidad;
            let necesidad = notificacion.necesidad;
            let trato = notificacion.tratoRecibido;

            necesidad["nombreCategoria"] = nombreCategoria;

            cardNotificacion = `
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
                            <a class="font-weight-bold text-dark text-decoration-none notificacionEmisor${notificacion.idNotificacion} " href="/ver-organizacion/${notificacion.idEmisor}">${nombre}</a>
                            <div class="d-flex flex-wrap">
                            <p>${msj} con  ${nombreCategoria} como ${trato}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }
        // NOTIFICACIONES EXCLUSIVAS PARA CUANDO ES UNA SUSCRIPCION
        else if(notificacion.idMensaje == 3){
            cardNotificacion = `
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
                            <a class="font-weight-bold text-dark text-decoration-none notificacionEmisor${notificacion.idNotificacion} " href="/ver-colaborador/${notificacion.idEmisor}">${nombre}</a>
                            se ha suscrito a tu organizacion
                        </div>
                    </div>
                </div>
            </div>`
        }
        // NOTIFICACIONES EXCLUSIVAS PARA CUANDO UNA ORGANIZACION CREA UNA NECESIDAD
        else if(notificacion.idMensaje == 5){
            let nombreCategoria = notificacion.tipoNecesidad;
            let necesidad = notificacion.necesidad;
            necesidad["nombreCategoria"] = nombreCategoria;

            cardNotificacion = `
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
                            <a class="font-weight-bold text-dark text-decoration-none notificacionEmisor${notificacion.idNotificacion} " href="/ver-organizacion/${notificacion.idEmisor}">${nombre}</a>
                            <div class="d-flex flex-wrap">
                            <p>${msj} <a class="font-weight-bold text-dark text-decoration-none notificacionVerNecesidad${notificacion.idNotificacion}" href="#modalDetalleNecesidad" data-toggle="modal">necesidad</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }
        //NOTIFICACIONES EXCLUSIVAS PARA CUANDO UN COLABORADOR CALIFICA UNA ORGANIZACION
        else if(notificacion.idMensaje == 6){
            let trato = notificacion.tratoRecibido;

            cardNotificacion = `
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
                            <a class="font-weight-bold text-dark text-decoration-none notificacionEmisor${notificacion.idNotificacion} " href="/ver-colaborador/${notificacion.idEmisor}">${nombre}</a>
                            <div class="d-flex flex-wrap">
                            <p>${msj} como ${trato}</p><br>
                            <a class="font-weight-bold text-dark text-decoration-none notificacionVerNecesidad${notificacion.idNotificacion}" href="/ver-organizacion/${notificacion.idReceptor}">¿Quieres ver tus calificaciones?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }

        else if(notificacion.idMensaje == 7){
            let trato = notificacion.tratoRecibido;

            cardNotificacion = `
            <div class="container border-top sombra  p-2">
                <div>
                    <div class="d-flex flex-row">
                        <div>
                            <img class="rounded-circle imgPerfilOrg" src="../assets/img/app-logo/Logo - Chico.png" alt="">
                        </div>
                        <div class="card-text align-self-center mx-2 w-100">
                            <div class="d-flex">
                                <p>${fecha}</p>
                                ${checkNoLeida}
                            </div>
                            <a class="font-weight-bold text-dark text-decoration-none notificacionEmisor${notificacion.idNotificacion} " href="">SolidariApp - Nueva insigna!</a>
                            <div class="d-flex flex-wrap">
                            <p class = "text-primary"><i class ="${notificacion.insignia.icono} mr-2" ></i>${notificacion.insignia.nombreInsignia}</p>
                            <small>${notificacion.insignia.descripcionInsignia}</small>

                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }




        $("#dropNotificaciones").append(cardNotificacion);

        if( notificacion.idMensaje == 1 || notificacion.idMensaje == 5 || notificacion.idMensaje == 6){
            let necesidad = notificacion.necesidad;
            $(`.notificacionVerNecesidad${notificacion.idNotificacion}`).on('click',function(){
                if(!notificacion.leido){
                    notificacion.leido = "1";
                    if(!upDateNotificacion(notificacion)){
                        noLeidas = noLeidas -1;
                        mostrarNotificaciones(notificaciones,noLeidas);
                    };
                }
                if(notificacion.idMensaje == 1 )
                    cargarDatosModalDetalleNecesidad(necesidad, "organizacion");
                else
                    cargarDatosModalDetalleNecesidad(necesidad);


                $('#modalNotificaciones').modal('hide');
            })
        }

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

function crearNotificacionCalificacionColaboracion(idColaboracion){
    JSON.stringify(idColaboracion);
    axios.post("/crearNotificacionCalificacionColaboracion",idColaboracion)
    .then((response)=>{
        if(response.data.resultado){
            console.log('resultNotifCalificacion '+response.data.resultado);

        }else{
            alertify.error(response.data.resultado);
            console.log('resultNotifCalificacion '+response.data.resultado+'\n msj: '+response.data.message);

        }
    });
}

function crearNotificacionCalificacionOrganizacion(calificacion){
    JSON.stringify(calificacion);
    axios.post("/crearNotificacionCalificacionOrganizacion",calificacion)
    .then((response)=>{
        if(response.data.resultado){
            console.log('resultNotifCalificacion '+response.data.resultado);

        }else{
            alertify.error(response.data.resultado);
            console.log('resultNotifCalificacion '+response.data.resultado+'\n msj: '+response.data.message);

        }
    });
}

function marcarNotifLeidas(notificaciones, noLeidas){
    console.log('Entro');
    notificaciones.forEach(notificacion =>{
        if(!notificacion.leido){
            notificacion.leido = "1";
            if(!upDateNotificacion(notificacion)){
                noLeidas = noLeidas -1;
            };
        }
        mostrarNotificaciones(notificaciones, noLeidas);
    })
}
