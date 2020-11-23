document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({funcionSuccess: configurarCuentaDeLaOrganizacion, RedirectIfNot: true});
})

function configurarCuentaDeLaOrganizacion(idUsuario){

    axios.get("/getOrganizacion/"+idUsuario)
    .then((response)=>{
        
        let organizacion = response.data.organizacion;
        $("#nombreOrganizacion").html(organizacion.razonSocial);
        $("#tipoOrganizacion").html(organizacion.nombreTipoOrganizacion);
        $("#urlFotoPerfilOrganizacion").attr("src",organizacion.urlFotoPerfilUsuario);
        if(organizacion.descripcionOrganizacion == "")
        {
            organizacion.descripcionOrganizacion = "No has especificado una descripcion todavia";
        }

        $("#descripcionOrganizacion").val(organizacion.descripcionOrganizacion);
        $("#descripcionOrganizacion").toggleClass("loading");
        $("#fechaAltaUsuario").html(`Eres usuario desde el ${moment(organizacion.fechaAltaUsuario, "YYYY-MM-DD HH:mm:ss").format('LL')}`);
        //agregarModalContacto(response.data);
    });
}