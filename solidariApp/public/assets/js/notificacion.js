

function cargarNotificaciones(usuario){

    axios.get("/listarNotificaciones/" + usuario.idUsuario)
    .then((response)=>{
        let notificaciones = response.data.notificaciones;
        let msj = response.data.result;
        let noLeidas = notificaciones.noLeidas;
        if(noLeidas  >  0){
            $("span").remove('.badge');
            $("#logoNotificacion").prepend('<span class="badge badge-light bg-danger text-white">' + noLeidas + '</span>')
        }

        notificaciones.forEach(notificacion => {

        });

        // notificaciones.forEach(notificacion => {
        //     console.log(notificacion);
        // });
        // console.log('resultado'+msj);
    })
}
