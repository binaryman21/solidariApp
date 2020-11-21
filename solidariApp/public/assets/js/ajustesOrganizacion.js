document.addEventListener('DOMContentLoaded', () => {

    //isLoggedIn redirecciona si no esta logueado. y llamara a la funcion pasandole 
    //el id del usuario que esta en la session
    isLoggedIn({funcionSuccess: configurarCuentaDeLaOrganizacion, RedirectIfNot: true});
    
})

function configurarCuentaDeLaOrganizacion(idUsuario){

    axios.get("/getColaborador/"+idUsuario)
    .then((response)=>{
        
        colaboraor = response.data;
    });
}
